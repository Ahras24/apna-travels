import { TEAM } from "@/data/content";
import { Reveal } from "./primitives";

export const Team = () => (
  <section id="team" data-testid="team-section" className="bg-mist py-20 md:py-28">
    <div className="container-x">
      <div className="mx-auto max-w-3xl border-l-2 border-gold pl-6 md:pl-10">
        <Reveal><span className="eyebrow text-gold-deep">Our Team</span></Reveal>
        <Reveal delay={0.1}>
          <blockquote data-testid="team-quote" className="mt-5 font-display text-2xl font-medium leading-relaxed text-navy md:text-3xl">
            “{TEAM.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 border-t border-navy/15 pt-5">
          <p data-testid="team-name" className="font-display text-lg font-semibold text-navy">{TEAM.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">{TEAM.role}</p>
        </Reveal>
      </div>
    </div>
  </section>
);
