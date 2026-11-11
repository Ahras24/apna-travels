import { useRef, useState } from "react";
import { toast } from "sonner";
import { UserRound, ArrowRight, Paperclip, X } from "lucide-react";
import { API, http, resumeUrl, rules, submitThenWhatsApp, validate } from "@/lib/enquiry";
import { GULF_COUNTRIES, SERVICES } from "@/data/content";
import { TextField, SelectField, SubmitButton, FormError, SuccessPanel } from "./FormFields";

const EMPTY = { full_name: "", phone: "", email: "", category: "", experience: "", preferred_country: "" };
const SCHEMA = {
  full_name: [rules.required, rules.min2],
  phone: [rules.required, rules.phone],
  email: [rules.required, rules.email],
  category: [rules.required],
  experience: [rules.required, rules.years],
  preferred_country: [rules.required],
};
const CATEGORIES = [...SERVICES.map((s) => s.title), "Other"];
const PREFERRED = [...GULF_COUNTRIES, "Any Gulf country"];
const TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX = 5 * 1024 * 1024;

const message = (v, d) =>
  [
    `*New Candidate Enquiry* (Ref ${d.ref})`,
    `Name: ${v.full_name}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    `Job category: ${v.category}`,
    `Experience: ${v.experience} years`,
    `Preferred country: ${v.preferred_country}`,
    d.resume_id ? `Resume: ${resumeUrl(d.resume_id)}` : "Resume: not attached",
    "— Sent from apnatravels.org",
  ].join("\n");

const ResumeField = ({ file, setFile, error, setError }) => {
  const input = useRef(null);
  const pick = (f) => {
    if (!f) return;
    if (!TYPES.includes(f.type)) return setError("Please upload a PDF or Word document");
    if (f.size > MAX) return setError("Resume must be 5 MB or smaller");
    setError(""); setFile(f);
  };
  return (
    <div className="sm:col-span-2">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/70">Resume upload (PDF or Word, max 5 MB)</span>
      {file ? (
        <div className="flex h-12 items-center justify-between border border-gold/60 bg-gold/10 px-4 text-sm text-navy" data-testid="cand-resume-selected">
          <span className="flex min-w-0 items-center gap-2"><Paperclip className="h-4 w-4 shrink-0" /><span className="truncate">{file.name}</span></span>
          <button type="button" aria-label="Remove resume" data-testid="cand-resume-remove" onClick={() => { setFile(null); if (input.current) input.current.value = ""; }}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="cand-resume"
          className="flex h-12 cursor-pointer items-center gap-3 border border-dashed border-navy/30 bg-white px-4 text-sm text-navy/60 transition-colors hover:border-gold hover:text-navy"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files?.[0]); }}
        >
          <Paperclip className="h-4 w-4" /> Choose a file or drop it here
        </label>
      )}
      <input ref={input} id="cand-resume" data-testid="cand-resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
      {error && <p role="alert" data-testid="cand-resume-error" className="mt-1.5 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
};

export const CandidateForm = () => {
  const [v, setV] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState("");
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle" });

  const set = (k) => (val) => { setV((p) => ({ ...p, [k]: val })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(v, SCHEMA);
    setErrors(errs);
    if (Object.keys(errs).length || fileErr) {
      toast.error("Please complete the highlighted fields.");
      return;
    }
    setState({ status: "loading" });
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => fd.append(k, val));
    if (file) fd.append("resume", file);
    try {
      const res = await submitThenWhatsApp({
        request: () => http.post(`${API}/enquiries/candidate`, fd),
        buildMessage: (d) => message(v, d),
      });
      setState({ status: "success", ref: res.data.ref, url: res.url, opened: res.opened });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  };

  const reset = () => { setV(EMPTY); setFile(null); setErrors({}); setState({ status: "idle" }); };
  const f = (k, label) => ({ id: `cand-${k.replace(/_/g, "-")}`, label, value: v[k], onChange: set(k), error: errors[k] });

  return (
    <div id="candidate-enquiry" data-testid="candidate-pathway" className="relative flex h-full flex-col border border-navy/10 bg-white p-7 sm:p-10 lg:p-12">
      <div className="flex items-center gap-3 text-gold-deep">
        <UserRound className="h-5 w-5" strokeWidth={1.6} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">For Candidates</span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy">Explore Job Opportunities</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/60">Looking for work in the Gulf? Share your details and resume, and our team will contact you about suitable openings.</p>

      {state.status === "success" ? (
        <SuccessPanel refNo={state.ref} url={state.url} opened={state.opened} onReset={reset} testId="candidate-success" />
      ) : (
        <form onSubmit={onSubmit} noValidate data-testid="candidate-form" className="mt-9 grid gap-5 sm:grid-cols-2">
          <TextField {...f("full_name", "Full name")} autoComplete="name" className="sm:col-span-2" />
          <TextField {...f("phone", "Phone number")} type="tel" autoComplete="tel" placeholder="+91 …" />
          <TextField {...f("email", "Email address")} type="email" autoComplete="email" />
          <SelectField {...f("category", "Interested job category")} options={CATEGORIES} placeholder="Select category" />
          <TextField {...f("experience", "Years of experience")} type="number" min="0" step="0.5" inputMode="decimal" />
          <SelectField {...f("preferred_country", "Preferred country")} options={PREFERRED} placeholder="Select country" className="sm:col-span-2" />
          <ResumeField file={file} setFile={setFile} error={fileErr} setError={setFileErr} />
          <div className="space-y-4 sm:col-span-2">
            <FormError message={state.status === "error" ? state.message : ""} testId="candidate-form-error" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SubmitButton loading={state.status === "loading"} testId="candidate-submit-btn" variant="navy">
                Send via WhatsApp <ArrowRight className="h-4 w-4" />
              </SubmitButton>
              <p className="text-xs leading-relaxed text-navy/45 sm:max-w-[16rem]">Your resume is stored securely and a link is included in the WhatsApp message.</p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
