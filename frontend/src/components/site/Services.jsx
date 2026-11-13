import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import { ImageReveal, Reveal, SectionHead } from "./primitives";

export const prefillEmployer = (positions) => {
  window.sessionStorage.setItem("apna:prefill-employer", positions);
  window.dispatchEvent(new CustomEvent("apna:prefill-employer", { detail: { positions } }));
};

const Roles = ({ s, contactHref }) => {
  return (
    <div className="mt-8">
      <ul className="flex flex-wrap gap-2" data-testid={`service-roles-${s.id}`}>
        {s.roles.map((r) => (
          <li key={r} className="border border-navy/15 bg-white px-3 py-1.5 text-[13px] font-medium text-navy/80">{r}</li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a
          href={contactHref}
          onClick={() => prefillEmployer(s.title)}
          data-testid={`service-hire-${s.id}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-deep"
        >
          Hire Manpower <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

const Copy = ({ s, i, contactHref }) => (
  <div>
    <p className="font-body text-xs font-semibold tracking-[0.2em] text-gold-deep">
      {String(i + 1).padStart(2, "0")} <span className="text-navy/30">/ {String(SERVICES.length).padStart(2, "0")}</span>
    </p>
    <h3 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-navy md:text-[2.5rem]">{s.title}</h3>
    <p className="mt-5 max-w-md text-base leading-relaxed text-navy/65">{s.desc}</p>
    <Roles s={s} contactHref={contactHref} />
  </div>
);

const SplitRow = ({ s, i, flip, contactHref }) => (
  <article id={`service-${s.id}`} data-testid={`service-block-${s.id}`} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
    <ImageReveal src={s.image} alt={s.title} className={`aspect-[4/3] lg:col-span-7 ${flip ? "lg:order-2" : ""}`} />
    <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}><Copy s={s} i={i} contactHref={contactHref} /></Reveal>
  </article>
);

const BannerRow = ({ s, i, contactHref }) => (
  <article id={`service-${s.id}`} data-testid={`service-block-${s.id}`} className="relative">
    <ImageReveal src={s.image} alt={s.title} className="aspect-[4/3] md:aspect-[21/9]" />
    <Reveal className="relative -mt-16 mx-4 bg-mist p-8 shadow-[0_30px_60px_-30px_rgba(16,30,48,.35)] md:absolute md:bottom-0 md:right-0 md:m-0 md:w-[48%] md:p-12 lg:w-[42%]">
      <Copy s={s} i={i} contactHref={contactHref} />
    </Reveal>
  </article>
);

export const Services = ({ contactHref = "#contact" }) => (
  <section id="services" data-testid="services-section" className="bg-mist py-24 md:py-36">
    <div className="container-x">
      <div className="grid gap-10 border-b border-navy/15 pb-16 lg:grid-cols-12 lg:items-end">
        <SectionHead
          className="lg:col-span-7"
          label="Our Services"
          title="Manpower Solutions for Every Business Need."
          text="From skilled technical workers to experienced professionals, Apna Travels connects businesses with the manpower they need."
          testId="services-heading"
        />
        <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
          <nav aria-label="Service categories" data-testid="services-index">
            <ol className="columns-1 text-sm sm:columns-2 lg:columns-1">
              {SERVICES.map((s, i) => (
                <li key={s.id} className="break-inside-avoid border-t border-navy/10">
                  <a href={`#service-${s.id}`} data-testid={`services-index-${s.id}`} className="group flex items-baseline gap-3 py-2.5 text-navy/70 transition-colors hover:text-navy">
                    <span className="text-[11px] font-semibold text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </div>

      <div className="mt-20 space-y-24 md:space-y-36">
        {SERVICES.map((s, i) =>
          i % 3 === 2 ? <BannerRow key={s.id} s={s} i={i} contactHref={contactHref} /> : <SplitRow key={s.id} s={s} i={i} flip={i % 3 === 1} contactHref={contactHref} />
        )}
      </div>

      <Reveal className="mt-28 flex flex-col items-start justify-between gap-8 bg-navy p-10 text-white md:flex-row md:items-center md:p-14">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Need a role not listed here?</p>
          <p className="mt-3 max-w-xl font-display text-2xl font-semibold leading-snug md:text-3xl">Tell us the positions and numbers you need — our team will respond.</p>
        </div>
        <a href={contactHref} data-testid="services-cta-hire" className="btn-gold shrink-0">Hire Manpower <ArrowRight className="h-4 w-4" /></a>
      </Reveal>
    </div>
  </section>
);
