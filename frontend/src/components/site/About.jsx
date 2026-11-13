import { ABOUT } from "@/data/content";
import { ImageReveal, Reveal } from "./primitives";
import { Stats } from "./Stats";

export const About = () => (
  <section id="about" data-testid="about-section" className="relative bg-mist py-20 md:py-28">
    <div className="container-x">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow text-gold-deep">About Apna Travels</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 data-testid="about-heading" className="h-display mt-5 max-w-3xl text-[2.2rem] text-navy sm:text-5xl">
              Over a decade connecting businesses with global talent.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p data-testid="about-description" className="mt-5 max-w-2xl text-base leading-relaxed text-navy/65 md:text-lg">
              {ABOUT.paragraphs[0]}
            </p>
          </Reveal>
        </div>

        <ImageReveal
          testId="about-image"
          src={ABOUT.imageSmall}
          alt="Professionals in a corporate meeting"
          className="aspect-[4/3] overflow-hidden rounded-xl lg:col-span-5"
        />
      </div>

      <Stats />

      <div className="mt-16 pt-12 md:mt-20">
        <Reveal><p className="eyebrow text-gold-deep">The values we work by</p></Reveal>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.08}
              className={`group border-b border-navy/15 py-7 sm:pr-8 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:pl-8" : ""}`}
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
