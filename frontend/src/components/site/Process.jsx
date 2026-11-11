import { motion, useReducedMotion } from "framer-motion";
import { FileText, Megaphone, ListChecks, BadgeCheck, Video, Stamp, PlaneTakeoff } from "lucide-react";
import { PROCESS } from "@/data/content";
import { SectionHead } from "./primitives";

const ICONS = [FileText, Megaphone, ListChecks, BadgeCheck, Video, Stamp, PlaneTakeoff];
const EASE = [0.2, 0.7, 0.2, 1];

export const Process = () => {
  const reduce = useReducedMotion();
  return (
    <section id="process" data-testid="process-section" className="relative bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          label="Our Process"
          title="From Demand Letter to Deployment."
          text="Seven clear steps take every requirement from the employer's brief to a candidate on the ground."
          testId="process-heading"
        />

        <div className="relative mt-20">
          {/* connecting line: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-[23px] top-0 h-full w-px bg-navy/15 lg:left-0 lg:top-[23px] lg:h-px lg:w-full" />
          <motion.div
            className="absolute left-[23px] top-0 h-full w-px origin-top bg-gold lg:hidden"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.2, ease: EASE }}
          />
          <motion.div
            className="absolute left-0 top-[23px] hidden h-px w-full origin-left bg-gold lg:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.2, ease: EASE }}
          />

          <ol className="relative grid gap-12 lg:grid-cols-7 lg:gap-6">
            {PROCESS.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <motion.li
                  key={p.title}
                  data-testid={`process-step-${i + 1}`}
                  className="group grid grid-cols-[48px_1fr] gap-6 lg:block"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
                >
                  <span className="relative z-10 grid h-12 w-12 place-items-center border border-navy/15 bg-mist text-navy transition-colors duration-500 group-hover:border-gold group-hover:bg-navy group-hover:text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div className="lg:mt-8 lg:pr-2">
                    <span className="font-display text-sm font-semibold text-gold-deep">Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
