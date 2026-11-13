import { WHY } from "@/data/content";
import { Reveal } from "./primitives";

export const WhyUs = () => (
  <section id="why" data-testid="why-section" className="bg-navy-2 py-20 text-white md:py-28">
    <div className="container-x">
      <div className="mx-auto max-w-4xl">
        <Reveal><span className="eyebrow text-gold">Why choose Apna Travels</span></Reveal>
        <Reveal delay={0.08}>
          <h2 data-testid="why-heading" className="h-display mt-5 text-[2.2rem] sm:text-4xl lg:text-5xl">
            Skills Verified <span className="text-gold">Before</span> Selection.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/65">{WHY.intro}</p>
        </Reveal>

        <ol className="mt-9 grid gap-3 md:grid-cols-3">
          {WHY.steps.map((s, i) => (
            <Reveal key={i} delay={0.1 * i} as="li">
              <div data-testid={`why-step-${i + 1}`} className="h-full border-t border-white/15 py-5 md:pr-5">
                <span className="font-display text-sm font-semibold text-gold/90">0{i + 1}</span>
                <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">{s}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.24} className="mt-7 border-l-2 border-gold pl-4">
          <p data-testid="why-trade-testing-card" className="text-sm font-semibold text-white">{WHY.highlight}</p>
          <p className="mt-1 text-sm text-white/60">{WHY.partner}</p>
        </Reveal>
      </div>
    </div>
  </section>
);
