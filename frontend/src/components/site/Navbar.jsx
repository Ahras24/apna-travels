import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV, COMPANY } from "@/data/content";
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

const ALL = ["home", "about", "why", "services", "industries", "process", "reach", "clients", "team", "contact"];
const MAP = { why: "about", services: "about", reach: "process", team: "clients" };

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const raw = useActiveSection(ALL);
  const active = MAP[raw] || raw;

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
        scrolled ? "border-b border-white/10 bg-navy/95 py-3 backdrop-blur-md" : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" data-testid="nav-logo-link" aria-label="Apna Travels home">
          <Logo className={`transition-[height] duration-500 ${scrolled ? "h-8" : "h-9 sm:h-10"}`} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
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
          <a href="#contact" data-testid="nav-contact-btn" className="btn-gold hidden !py-2.5 !px-5 sm:inline-flex">
            Contact Us <ArrowUpRight className="h-4 w-4" />
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
                    href={`#${n.id}`}
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
