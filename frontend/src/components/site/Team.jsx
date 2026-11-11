import { Quote } from "lucide-react";
import { TEAM } from "@/data/content";
import { Reveal } from "./primitives";

export const Team = () => (
  <section id="team" data-testid="team-section" className="relative bg-navy-2 py-24 text-white md:py-32">
    <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
      <Reveal className="lg:col-span-4">
        <div data-testid="team-photo-placeholder" className="relative aspect-[4/5] max-w-sm overflow-hidden border border-white/10 bg-navy">
          <div className="hairline-grid absolute inset-0" />
          <span className="absolute inset-0 grid place-items-center font-display text-[7rem] font-semibold tracking-tighter text-white/10">ZA</span>
          <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate2">Photo to be supplied</span>
          <span className="absolute left-0 top-0 h-16 w-px bg-gold" />
          <span className="absolute left-0 top-0 h-px w-16 bg-gold" />
        </div>
      </Reveal>
      <div className="lg:col-span-7 lg:col-start-6">
        <Reveal><span className="eyebrow text-gold">Our Team</span></Reveal>
        <Reveal delay={0.1}>
          <Quote className="mt-10 h-10 w-10 text-gold" strokeWidth={1.2} />
          <blockquote data-testid="team-quote" className="mt-6 font-display text-2xl font-medium leading-[1.35] text-white md:text-[2.2rem]">
            “{TEAM.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex items-center gap-5 border-t border-white/10 pt-6">
          <div>
            <p data-testid="team-name" className="font-display text-lg font-semibold">{TEAM.name}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{TEAM.role}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
