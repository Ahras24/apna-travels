import { ABOUT, COMPANY } from "@/data/content";
import { ImageReveal, Reveal } from "./primitives";

export const About = () => (
  <section id="about" data-testid="about-section" className="relative bg-mist py-24 md:py-36">
    <div className="container-x">
      <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <Reveal><span className="eyebrow text-gold-deep">About Apna Travels</span></Reveal>
          <Reveal delay={0.08}>
            <h2 data-testid="about-heading" className="h-display mt-6 text-[2.3rem] text-navy sm:text-5xl lg:text-[3.9rem]">
              Far Away From a Typical Recruitment Agency.
            </h2>
          </Reveal>

          <Reveal delay={0.16} className="mt-12 flex items-end gap-5">
            <span data-testid="about-established-year" className="font-display text-[5.5rem] font-semibold leading-none tracking-tighter text-navy md:text-[7rem]">
              {COMPANY.established}
            </span>
            <span className="mb-3 max-w-[9rem] border-l border-gold pl-4 text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-navy/60">
              Year established
            </span>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <div className="space-y-6 text-base leading-[1.8] text-navy/70 md:text-[17px]">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={i === 0 ? "font-display text-xl font-medium leading-relaxed text-navy md:text-2xl" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-12">
        <ImageReveal
          testId="about-image-large"
          src={ABOUT.imageLarge}
          alt="Site engineers in safety gear reviewing plans on a construction site"
          className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:h-[560px]"
        />
        <div className="flex flex-col gap-6 lg:col-span-5">
          <ImageReveal
            testId="about-image-small"
            src={ABOUT.imageSmall}
            alt="Professionals in a corporate meeting"
            className="aspect-[16/10] lg:aspect-auto lg:h-[260px]"
          />
          <Reveal className="flex flex-1 flex-col justify-between bg-navy p-8 text-white md:p-10">
            <div data-testid="about-vision">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Vision</p>
              <p className="mt-3 font-display text-xl font-medium leading-snug md:text-2xl">{ABOUT.vision}</p>
            </div>
            <div data-testid="about-mission" className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Mission</p>
              <p className="mt-3 text-base leading-relaxed text-white/75">{ABOUT.mission}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 lg:mt-32">
        <Reveal><p className="eyebrow text-gold-deep">The values we work by</p></Reveal>
        <div className="mt-10 grid border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.08}
              className={`group border-b border-navy/15 py-8 sm:pr-8 lg:border-b-0 lg:py-10 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:pl-8" : ""}`}
            >
              <div data-testid={`about-value-${v.title.toLowerCase()}`}>
                <span className="font-body text-xs font-semibold text-gold-deep">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-navy transition-transform duration-500 group-hover:translate-x-1">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/60">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
