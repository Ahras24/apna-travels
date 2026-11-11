import { BadgeCheck } from "lucide-react";
import { WHY } from "@/data/content";
import { ImageReveal, Reveal } from "./primitives";

export const WhyUs = () => (
  <section id="why" data-testid="why-section" className="relative overflow-hidden bg-navy-2 py-24 text-white md:py-36">
    <div className="container-x grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Reveal><span className="eyebrow text-gold">Why choose Apna Travels</span></Reveal>
        <Reveal delay={0.08}>
          <h2 data-testid="why-heading" className="h-display mt-6 text-[2.3rem] sm:text-5xl lg:text-[3.6rem]">
            Skills Verified <span className="text-gold">Before</span> Selection.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{WHY.intro}</p>
        </Reveal>

        <ol className="mt-14 space-y-0">
          {WHY.steps.map((s, i) => (
            <Reveal key={i} delay={0.1 * i} as="li">
              <div data-testid={`why-step-${i + 1}`} className="grid grid-cols-[64px_1fr] gap-4 border-t border-white/10 py-7">
                <span className="font-display text-4xl font-semibold leading-none text-gold/90">{i + 1}</span>
                <p className="text-base leading-relaxed text-white/85 md:text-[17px]">{s}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="relative lg:col-span-5 lg:col-start-8">
        <ImageReveal
          testId="why-image"
          src={WHY.image}
          alt="Technicians in coveralls working at a vocational training workshop"
          className="aspect-[4/5] w-full"
        />
        <Reveal delay={0.2} className="relative -mt-24 ml-6 mr-0 sm:ml-16 lg:-ml-20">
          <div data-testid="why-trade-testing-card" className="border-t-2 border-gold bg-navy p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] md:p-10">
            <BadgeCheck className="h-8 w-8 text-gold" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight md:text-[1.7rem]">{WHY.highlight}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{WHY.partner}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
