import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/data/content";
import { Reveal, SectionHead } from "./primitives";

// Editorial bento: index → grid span classes (lg). 7 items across a 12-col grid.
const SPANS = [
  "sm:col-span-2 lg:col-span-8 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
];

const Card = ({ item, i }) => (
  <Reveal delay={(i % 3) * 0.08} className={`${SPANS[i]} min-h-[340px]`}>
    <article
      data-testid={`industry-card-${i}`}
      className="group relative h-full min-h-[340px] overflow-hidden bg-navy-2"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-[transform,opacity] [transition-duration:1200ms] ease-out group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,30,48,.95)_0%,rgba(16,30,48,.35)_55%,rgba(16,30,48,.1)_100%)]" />
      <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
          <span className="grid h-10 w-10 place-items-center border border-white/25 text-white transition-[background-color,border-color,transform] duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="max-w-md">
          <h3 className={`font-display font-semibold leading-tight text-white ${i === 0 || i === 6 ? "text-3xl md:text-4xl" : "text-2xl"}`}>{item.title}</h3>
          <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/75 opacity-0 transition-[max-height,opacity] duration-700 group-hover:max-h-24 group-hover:opacity-100 max-lg:max-h-24 max-lg:opacity-100">
            {item.desc}
          </p>
          <span className="mt-5 block h-px w-12 bg-gold transition-[width] duration-700 group-hover:w-24" />
        </div>
      </div>
    </article>
  </Reveal>
);

export const Industries = () => (
  <section id="industries" data-testid="industries-section" className="relative bg-navy py-24 text-white md:py-36">
    <div className="container-x">
      <SectionHead
        dark
        label="Industries"
        title="Supporting the Industries That Build Our World."
        text="Every sector we recruit for is drawn from the roles we supply every day — on sites, in plants, in kitchens and in offices."
        testId="industries-heading"
      />
      <div className="mt-16 grid auto-rows-[340px] gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {INDUSTRIES.map((item, i) => <Card key={item.title} item={item} i={i} />)}
      </div>
    </div>
  </section>
);
