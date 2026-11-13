import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Building2, ArrowRight } from "lucide-react";
import { API, http, rules, submitThenWhatsApp, validate } from "@/lib/enquiry";
import { GULF_COUNTRIES } from "@/data/content";
import { TextField, AreaField, SelectField, SubmitButton, FormError, SuccessPanel } from "./FormFields";

const EMPTY = { company_name: "", contact_person: "", country: "", email: "", phone: "", positions: "", workers: "", additional: "" };
const SCHEMA = {
  company_name: [rules.required, rules.min2],
  contact_person: [rules.required, rules.min2],
  country: [rules.required],
  email: [rules.required, rules.email],
  phone: [rules.required, rules.phone],
  positions: [rules.required, rules.min2],
  workers: [rules.required, rules.positiveInt],
};
const COUNTRIES = [...GULF_COUNTRIES, "India", "Other"];

const message = (v, ref, saveFailed) =>
  [
    `*New Employer Enquiry*${ref ? ` (Ref ${ref})` : ""}`,
    saveFailed && "Website save failed; sending details via WhatsApp.",
    `Company: ${v.company_name}`,
    `Contact person: ${v.contact_person}`,
    `Country: ${v.country}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Positions required: ${v.positions}`,
    `Number of workers: ${v.workers}`,
    v.additional && `Additional requirements: ${v.additional}`,
    "— Sent from apnatravels.org",
  ].filter(Boolean).join("\n");

export const EmployerForm = () => {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle" });
  const formRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      setV((p) => ({ ...p, positions: p.positions ? `${p.positions}, ${e.detail.positions}` : e.detail.positions }));
      setState({ status: "idle" });
    };
    window.addEventListener("apna:prefill-employer", h);
    const positions = window.sessionStorage.getItem("apna:prefill-employer");
    if (positions) {
      window.sessionStorage.removeItem("apna:prefill-employer");
      h({ detail: { positions } });
    }
    return () => window.removeEventListener("apna:prefill-employer", h);
  }, []);

  const set = (k) => (val) => { setV((p) => ({ ...p, [k]: val })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(v, SCHEMA);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Please complete the highlighted fields.");
      formRef.current?.querySelector(`#emp-${Object.keys(errs)[0].replace(/_/g, "-")}`)?.focus();
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await submitThenWhatsApp({
        request: () => http.post(`${API}/enquiries/employer`, { ...v, workers: Number(v.workers) }),
        buildMessage: (d) => message(v, d.ref, d.saveFailed),
      });
      setState({
        status: res.saved ? "success" : "whatsapp",
        ref: res.data?.ref,
        url: res.url,
        opened: res.opened,
        saved: res.saved,
        saveError: res.saveError,
      });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  };

  const reset = () => { setV(EMPTY); setErrors({}); setState({ status: "idle" }); };
  const f = (k, label, extra = {}) => ({ id: `emp-${k.replace(/_/g, "-")}`, label, value: v[k], onChange: set(k), error: errors[k], dark: true, ...extra });

  return (
    <div id="employer-enquiry" data-testid="employer-pathway" className="relative flex h-full flex-col bg-navy p-7 text-white sm:p-10 lg:p-12">
      <span className="absolute left-0 top-0 h-[3px] w-24 bg-gold" />
      <div className="flex items-center gap-3 text-gold">
        <Building2 className="h-5 w-5" strokeWidth={1.6} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">For Employers</span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">Hire Manpower</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">Share your requirement and our team will get back to you with suitable, trade-tested candidates.</p>

      {state.status === "success" || state.status === "whatsapp" ? (
        <SuccessPanel dark refNo={state.ref} url={state.url} opened={state.opened} saved={state.saved} saveError={state.saveError} onReset={reset} testId="employer-success" />
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate data-testid="employer-form" className="mt-9 grid gap-5 sm:grid-cols-2">
          <TextField {...f("company_name", "Company name")} autoComplete="organization" />
          <TextField {...f("contact_person", "Contact person")} autoComplete="name" />
          <SelectField {...f("country", "Country")} options={COUNTRIES} placeholder="Select country" />
          <TextField {...f("email", "Email address")} type="email" autoComplete="email" />
          <TextField {...f("phone", "Phone number")} type="tel" autoComplete="tel" placeholder="+966 …" />
          <TextField {...f("workers", "Number of workers")} type="number" min="1" inputMode="numeric" />
          <AreaField {...f("positions", "Required job positions")} className="sm:col-span-2" rows={2} placeholder="e.g. 20 Welders, 5 Mobile Crane Operators" />
          <AreaField {...f("additional", "Additional requirements (optional)")} className="sm:col-span-2" placeholder="Timelines, salary range, accommodation…" />
          <div className="space-y-4 sm:col-span-2">
            <FormError dark message={state.status === "error" ? state.message : ""} testId="employer-form-error" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SubmitButton loading={state.status === "loading"} testId="employer-submit-btn">
                Send via WhatsApp <ArrowRight className="h-4 w-4" />
              </SubmitButton>
              <p className="text-xs leading-relaxed text-white/45 sm:max-w-[16rem]">Your enquiry is saved, then opens in WhatsApp addressed to our team.</p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
