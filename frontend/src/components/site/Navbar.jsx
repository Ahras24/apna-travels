import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV, COMPANY } from "@/data/content";
import { waLink } from "@/lib/enquiry";
import { Logo } from "./primitives";

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

const ALL = ["home", "about", "why", "industries", "process", "reach", "clients", "team", "contact"];
const MAP = { why: "about", team: "clients" };

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const raw = useActiveSection(ALL);
  const active = pathname === "/services" ? "services" : MAP[raw] || raw;
  const compact = scrolled || pathname !== "/";
  const homeHref = (id) => pathname === "/" ? `#${id}` : `/#${id}`;
  const navHref = (id) => id === "services" ? "/services" : homeHref(id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        compact
          ? `border-b border-white/10 bg-navy/95 py-4 lg:py-3.5 xl:py-3 ${open ? "" : "backdrop-blur-md"}`
          : "border-b border-transparent bg-transparent py-7 lg:py-8 xl:py-7"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href={homeHref("home")} data-testid="nav-logo-link" aria-label="Apna Travels home">
          <Logo variant="updated" className="w-[150px] transition-[width] duration-500 sm:w-[170px] lg:w-[190px] xl:w-[205px]" />
        </a>

        <nav aria-label="Primary" className="hidden lg:ml-auto lg:block">
          <ul className="flex items-center gap-1 lg:mr-5">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={navHref(n.id)}
                  data-testid={`nav-link-${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`group relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    active === n.id ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                      active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={homeHref("contact")} data-testid="nav-contact-btn" className="btn-gold hidden !py-2.5 !px-5 sm:inline-flex">
            Contact Us <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={waLink("Hello Apna Travels, I would like to know more about your manpower services.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat on WhatsApp ${COMPANY.whatsapp}`}
            title="Chat on WhatsApp"
            data-testid="nav-whatsapp-btn"
            className="grid h-11 w-11 shrink-0 place-items-center text-[#25D366] transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.97 11.97 0 0 0 5.86 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.41ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.86 9.86 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 6.99 2.9 9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
            </svg>
          </a>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] grid h-11 w-11 place-items-center border border-white/20 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-navy px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <ul className="flex flex-col">
              {[...NAV, { id: "contact", label: "Contact Us" }].map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  className="border-b border-white/10"
                >
                  <a
                    href={navHref(n.id)}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${n.id}`}
                    className="flex items-baseline justify-between py-5 font-display text-3xl font-semibold text-white"
                  >
                    {n.label}
                    <span className="font-body text-xs text-gold">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-1 text-sm text-slate2">
              <p>{COMPANY.regLabel}</p>
              <p className="text-white/80">Regn No. {COMPANY.regNo}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
