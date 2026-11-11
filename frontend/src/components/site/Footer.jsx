import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { COMPANY, NAV, OFFICES, SERVICES } from "@/data/content";
import { waLink } from "@/lib/enquiry";
import { Logo } from "./primitives";

const Col = ({ title, children }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{title}</p>
    <div className="mt-6 space-y-3 text-sm text-white/65">{children}</div>
  </div>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-navy-3 pt-20 text-white">
    <div className="container-x">
      <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-10" testId="footer-logo" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/60">{COMPANY.description}</p>
          <div className="mt-8 border-l-2 border-gold pl-4 text-xs leading-relaxed">
            <p className="font-semibold uppercase tracking-[0.18em] text-white/80">{COMPANY.regLabel}</p>
            <p data-testid="footer-reg-no" className="mt-1 text-slate2">Regn No. {COMPANY.regNo}</p>
          </div>
        </div>
        <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8">
          <Col title="Navigate">
            {[...NAV, { id: "services", label: "Services" }, { id: "contact", label: "Contact Us" }].map((n) => (
              <a key={n.id} href={`#${n.id}`} data-testid={`footer-link-${n.id}`} className="block transition-colors hover:text-white">{n.label}</a>
            ))}
          </Col>
          <Col title="Services">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#service-${s.id}`} data-testid={`footer-service-${s.id}`} className="block transition-colors hover:text-white">{s.title}</a>
            ))}
          </Col>
          <Col title="Contact">
            <p className="leading-relaxed">{COMPANY.address}</p>
            <a href={COMPANY.phoneHref} data-testid="footer-phone" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-gold" /> {COMPANY.phone}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 text-gold" /> {COMPANY.whatsapp}</a>
            <div className="pt-4">
              {OFFICES.map((o) => (
                <p key={o.country} className="text-xs leading-relaxed text-white/50">
                  <span className="text-white/75">{o.country}:</span> {o.cities.map((c) => c.name + (c.hq ? " (HQ)" : "")).join(" · ")}
                </p>
              ))}
            </div>
          </Col>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
        <a href="#home" data-testid="footer-back-to-top" className="inline-flex items-center gap-2 hover:text-white">Back to top <ArrowUp className="h-3.5 w-3.5" /></a>
      </div>
    </div>
  </footer>
);

export const WhatsAppFloat = () => (
  <a
    href={waLink("Hello Apna Travels, I would like to know more about your manpower services.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Chat on WhatsApp ${COMPANY.whatsapp}`}
    data-testid="whatsapp-float-btn"
    className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-4 pr-4 text-navy shadow-[0_18px_40px_-12px_rgba(0,0,0,.45)] transition-[padding,transform] duration-500 hover:-translate-y-0.5 md:bottom-8 md:right-8"
  >
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03" /></svg>
    <span className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity,margin] duration-500 group-hover:ml-3 group-hover:max-w-[160px] group-hover:opacity-100">Chat on WhatsApp</span>
  </a>
);
