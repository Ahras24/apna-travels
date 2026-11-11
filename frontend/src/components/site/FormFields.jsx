import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ExternalLink, AlertCircle, Loader2 } from "lucide-react";

const tone = (dark) =>
  dark
    ? "h-12 rounded-none border-white/20 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:ring-gold focus-visible:ring-offset-0 focus-visible:border-gold"
    : "h-12 rounded-none border-navy/20 bg-white text-navy placeholder:text-navy/35 focus-visible:ring-gold focus-visible:ring-offset-0 focus-visible:border-gold";

const Wrap = ({ id, label, error, dark, children, className = "" }) => (
  <div className={className}>
    <Label htmlFor={id} className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/70" : "text-navy/70"}`}>
      {label}
    </Label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" data-testid={`${id}-error`} className={`mt-1.5 text-xs font-medium ${dark ? "text-[#F2B8A2]" : "text-red-700"}`}>
        {error}
      </p>
    )}
  </div>
);

export const TextField = ({ id, label, value, onChange, error, dark, type = "text", placeholder, className, ...rest }) => (
  <Wrap id={id} label={label} error={error} dark={dark} className={className}>
    <Input
      id={id}
      data-testid={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${tone(dark)} ${error ? "border-red-400" : ""}`}
      {...rest}
    />
  </Wrap>
);

export const AreaField = ({ id, label, value, onChange, error, dark, placeholder, className, rows = 3 }) => (
  <Wrap id={id} label={label} error={error} dark={dark} className={className}>
    <Textarea
      id={id}
      data-testid={id}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      className={`${tone(dark)} h-auto min-h-[96px] ${error ? "border-red-400" : ""}`}
    />
  </Wrap>
);

export const SelectField = ({ id, label, value, onChange, error, dark, options, placeholder = "Select", className }) => (
  <Wrap id={id} label={label} error={error} dark={dark} className={className}>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} data-testid={id} aria-invalid={!!error} className={`${tone(dark)} ${error ? "border-red-400" : ""}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-none border-navy/15 bg-white text-navy">
        {options.map((o) => (
          <SelectItem key={o} value={o} data-testid={`${id}-option-${o.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="rounded-none focus:bg-mist">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Wrap>
);

export const SubmitButton = ({ loading, children, testId, variant = "gold" }) => (
  <button type="submit" disabled={loading} data-testid={testId} className={`${variant === "gold" ? "btn-gold" : "btn-navy"} w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto`}>
    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving your enquiry…</> : children}
  </button>
);

export const FormError = ({ message, dark, testId }) =>
  message ? (
    <div role="alert" data-testid={testId} className={`flex items-start gap-3 border-l-2 border-red-400 p-4 text-sm ${dark ? "bg-red-500/10 text-white" : "bg-red-50 text-red-800"}`}>
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {message}
    </div>
  ) : null;

export const SuccessPanel = ({ dark, refNo, url, opened, onReset, testId }) => (
  <div data-testid={testId} className="py-6">
    <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.5} />
    <h4 className={`mt-5 font-display text-2xl font-semibold ${dark ? "text-white" : "text-navy"}`}>Enquiry saved — reference {refNo}</h4>
    <p className={`mt-3 max-w-md text-sm leading-relaxed ${dark ? "text-white/70" : "text-navy/65"}`}>
      {opened
        ? "WhatsApp has opened with your details filled in. Press send in WhatsApp to deliver it to our team."
        : "Open WhatsApp to send your details to our team."}
    </p>
    <div className="mt-7 flex flex-wrap gap-3">
      <a href={url} target="_blank" rel="noopener noreferrer" data-testid={`${testId}-whatsapp`} className="btn-gold">
        {opened ? "Open WhatsApp again" : "Open WhatsApp"} <ExternalLink className="h-4 w-4" />
      </a>
      <button type="button" onClick={onReset} data-testid={`${testId}-reset`} className={dark ? "btn-ghost" : "btn-navy"}>
        Send another enquiry
      </button>
    </div>
  </div>
);
