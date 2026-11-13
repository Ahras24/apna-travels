import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { COMPANY, NAV, SERVICES } from "@/data/content";
import { waLink } from "@/lib/enquiry";
import { Logo } from "./primitives";

const Col = ({ title, children }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{title}</p>
    <div className="mt-6 space-y-3 text-sm text-white/65">{children}</div>
  </div>
);

export const Footer = () => {
  const { pathname } = useLocation();
  const homeHref = (id) => pathname === "/" ? `#${id}` : `/#${id}`;
  const serviceHref = (id) => pathname === "/services" ? `#service-${id}` : `/services#service-${id}`;

  return (
  <footer data-testid="site-footer" className="bg-navy-3 pt-20 text-white">
    <div className="container-x">
      <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo
            variant="updated"
            className="w-[150px] sm:w-[170px] lg:w-[190px] xl:w-[205px]"
            testId="footer-logo"
          />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/60">{COMPANY.description}</p>
          <div className="mt-8 border-l-2 border-gold pl-4 text-xs leading-relaxed">
            <p className="font-semibold uppercase tracking-[0.18em] text-white/80">{COMPANY.regLabel}</p>
            <p data-testid="footer-reg-no" className="mt-1 text-slate2">Regn No. {COMPANY.regNo}</p>
          </div>
        </div>
        <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8">
          <Col title="Navigate">
            {[...NAV, { id: "contact", label: "Contact Us" }].map((n) => (
              <a key={n.id} href={n.id === "services" ? "/services" : homeHref(n.id)} data-testid={`footer-link-${n.id}`} className="block transition-colors hover:text-white">{n.label}</a>
            ))}
          </Col>
          <Col title="Services">
            {SERVICES.map((s) => (
              <a key={s.id} href={serviceHref(s.id)} data-testid={`footer-service-${s.id}`} className="block transition-colors hover:text-white">{s.title}</a>
            ))}
          </Col>
          <Col title="Contact">
            <p className="leading-relaxed">{COMPANY.address}</p>
            <a href={COMPANY.phoneHref} data-testid="footer-phone" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-gold" /> {COMPANY.phone}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 text-gold" /> {COMPANY.whatsapp}</a>
          </Col>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
        <a href={homeHref("home")} data-testid="footer-back-to-top" className="inline-flex items-center gap-2 hover:text-white">Back to top <ArrowUp className="h-3.5 w-3.5" /></a>
      </div>
    </div>
  </footer>
  );
};
