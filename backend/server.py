import asyncio
from contextlib import suppress
from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
from bson import Binary
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

INDEXES: dict[str, list[IndexModel]] = {
    "enquiries": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
    "resumes": [IndexModel([("id", ASCENDING)], name="id", unique=True)],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


app = FastAPI()
api_router = APIRouter(prefix="/api")

PHONE_RE = re.compile(r"^[+()\d\s-]{7,20}$")
MAX_RESUME = 5 * 1024 * 1024
RESUME_TYPES = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def short_ref() -> str:
    return "AT-" + uuid.uuid4().hex[:6].upper()


class EmployerEnquiry(BaseModel):
    company_name: str = Field(min_length=2, max_length=160)
    contact_person: str = Field(min_length=2, max_length=120)
    country: str = Field(min_length=2, max_length=80)
    email: EmailStr
    phone: str
    positions: str = Field(min_length=2, max_length=600)
    workers: int = Field(ge=1, le=100000)
    additional: Optional[str] = Field(default="", max_length=2000)

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        if not PHONE_RE.match(v.strip()):
            raise ValueError("Invalid phone number")
        return v.strip()


class EnquiryOut(BaseModel):
    id: str
    ref: str
    kind: str
    resume_id: Optional[str] = None
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Apna Travels API"}


@api_router.post("/enquiries/employer", response_model=EnquiryOut)
async def create_employer(payload: EmployerEnquiry):
    doc = {"id": str(uuid.uuid4()), "ref": short_ref(), "kind": "employer",
           "data": payload.model_dump(), "created_at": now_iso()}
    await db.enquiries.insert_one(doc)
    return EnquiryOut(id=doc["id"], ref=doc["ref"], kind="employer", created_at=doc["created_at"])


@api_router.post("/enquiries/candidate", response_model=EnquiryOut)
async def create_candidate(
    full_name: str = Form(..., min_length=2, max_length=120),
    phone: str = Form(...),
    email: EmailStr = Form(...),
    category: str = Form(..., min_length=2, max_length=120),
    experience: float = Form(..., ge=0, le=60),
    preferred_country: str = Form(..., min_length=2, max_length=80),
    resume: Optional[UploadFile] = File(None),
):
    if not PHONE_RE.match(phone.strip()):
        raise HTTPException(status_code=422, detail="Invalid phone number")
    resume_id = None
    if resume is not None and resume.filename:
        if resume.content_type not in RESUME_TYPES:
            raise HTTPException(status_code=422, detail="Resume must be a PDF or Word document")
        content = await resume.read()
        if len(content) > MAX_RESUME:
            raise HTTPException(status_code=422, detail="Resume must be 5 MB or smaller")
        resume_id = uuid.uuid4().hex
        await db.resumes.insert_one({"id": resume_id, "filename": resume.filename[:200],
                                     "content_type": resume.content_type, "size": len(content),
                                     "data": Binary(content), "created_at": now_iso()})
    doc = {"id": str(uuid.uuid4()), "ref": short_ref(), "kind": "candidate",
           "data": {"full_name": full_name.strip(), "phone": phone.strip(), "email": str(email),
                    "category": category, "experience": experience,
                    "preferred_country": preferred_country},
           "resume_id": resume_id, "created_at": now_iso()}
    await db.enquiries.insert_one(doc)
    return EnquiryOut(id=doc["id"], ref=doc["ref"], kind="candidate", resume_id=resume_id, created_at=doc["created_at"])


@api_router.get("/resumes/{resume_id}")
async def get_resume(resume_id: str):
    doc = await db.resumes.find_one({"id": resume_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Resume not found")
    safe = re.sub(r'[^A-Za-z0-9._ -]', '_', doc["filename"])
    return Response(content=bytes(doc["data"]), media_type=doc["content_type"],
                    headers={"Content-Disposition": f'inline; filename="{safe}"'})


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
