import axios from "axios";
import { COMPANY } from "@/data/content";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const waLink = (text) => `https://wa.me/${COMPANY.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const resumeUrl = (id) => `${API}/resumes/${id}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export const rules = {
  required: (v) => (String(v ?? "").trim() ? "" : "This field is required"),
  email: (v) => (EMAIL_RE.test(String(v).trim()) ? "" : "Enter a valid email address"),
  phone: (v) => (PHONE_RE.test(String(v).trim()) ? "" : "Enter a valid phone number, e.g. +966 5X XXX XXXX"),
  min2: (v) => (String(v).trim().length >= 2 ? "" : "Please enter at least 2 characters"),
  positiveInt: (v) => (/^\d+$/.test(String(v)) && Number(v) >= 1 ? "" : "Enter a whole number of 1 or more"),
  years: (v) => (/^\d+(\.\d)?$/.test(String(v)) && Number(v) <= 60 ? "" : "Enter years of experience (0–60)"),
};

export const validate = (values, schema) => {
  const errors = {};
  Object.entries(schema).forEach(([k, fns]) => {
    for (const fn of fns) { const m = fn(values[k]); if (m) { errors[k] = m; break; } }
  });
  return errors;
};

// Pre-open a tab synchronously (avoids popup blockers), then point it at WhatsApp after saving.
export const submitThenWhatsApp = async ({ request, buildMessage }) => {
  const win = window.open("", "_blank");
  try {
    const { data } = await request();
    const url = waLink(buildMessage(data));
    if (win) win.location.href = url;
    return { data, url, opened: !!win };
  } catch (e) {
    if (win) win.close();
    const detail = e?.response?.data?.detail;
    throw new Error(
      typeof detail === "string" ? detail : Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") : "We couldn't send your enquiry. Please check your connection and try again."
    );
  }
};

export const http = axios;
