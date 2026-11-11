import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { COMPANY, GULF_COUNTRIES } from "@/data/content";

const EASE = [0.2, 0.7, 0.2, 1];

const Line = ({ children, delay, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Fade = ({ children, delay, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export const Hero = () => (
  <section id="home" data-testid="hero-section" className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
    <img
      src="/brand/hero.jpg"
      alt="A hand connecting a global network of people, with India highlighted on the world map"
      className="absolute inset-0 -z-20 h-full w-full animate-slow-zoom object-cover object-[70%_center]"
      fetchpriority="high"
    />
    <div className="absolute inset-0 -z-10 bg-navy/50" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#101E30_0%,rgba(16,30,48,.85)_38%,rgba(16,30,48,.25)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(0deg,#101E30,transparent)]" />
    <div className="hairline-grid pointer-events-none absolute inset-0 -z-10" />

    <div className="container-x relative pb-24 pt-36 md:pb-28">
      <Fade delay={0.2}>
        <div data-testid="hero-registration" className="mb-10 inline-flex items-start gap-3 border-l-2 border-gold pl-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div className="text-xs leading-relaxed">
            <p className="font-semibold uppercase tracking-[0.2em] text-white/90">{COMPANY.regLabel}</p>
            <p className="mt-1 font-medium tracking-wide text-slate2">Regn No. <span className="text-white/80">{COMPANY.regNo}</span></p>
          </div>
        </div>
      </Fade>

      <h1 data-testid="hero-headline" className="h-display text-[3rem] leading-[0.98] sm:text-7xl lg:text-[6.4rem]">
        <Line delay={0.35}>Great people.</Line>
        <Line delay={0.5} className="text-gold">Global possibility.</Line>
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
        <Fade delay={0.8} className="lg:col-span-6">
          <p data-testid="hero-description" className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {COMPANY.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" data-testid="hero-hire-btn" className="btn-gold">
              Hire Manpower <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" data-testid="hero-services-btn" className="btn-ghost">Our Services</a>
          </div>
        </Fade>

        <Fade delay={1.05} className="lg:col-span-5 lg:col-start-8">
          <div data-testid="hero-route" className="border-t border-white/15 pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">India → The Gulf</p>
            <p className="mt-3 font-display text-lg font-medium leading-snug text-white/85">
              {GULF_COUNTRIES.join(" · ")}
            </p>
          </div>
        </Fade>
      </div>
    </div>

    <a
      href="#stats"
      data-testid="hero-scroll-indicator"
      aria-label="Scroll to next section"
      className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 md:right-12 md:flex"
    >
      <span className="[writing-mode:vertical-rl]">Scroll</span>
      <span className="relative h-10 w-px bg-white/20">
        <span className="absolute -left-[2px] top-0 h-1.5 w-[5px] rounded-full bg-gold animate-scroll-dot" />
      </span>
    </a>
  </section>
);
