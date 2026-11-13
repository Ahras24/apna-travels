import { useState } from "react";
import { motion } from "framer-motion";
import { CLIENTS, CLIENT_TABS } from "@/data/content";
import { Reveal, SectionHead } from "./primitives";

const MIN_PER_HALF = 14;

const fill = (names) => {
  const out = [];
  while (out.length < MIN_PER_HALF) out.push(...names);
  return out;
};

const ClientTrack = ({ tab, items, duration }) => (
  <>
    <div
      className="marquee-track marquee-rtl flex w-max items-center"
      style={{ animationDuration: `${duration}s` }}
      aria-label={`${tab.label} clients`}
    >
      {[0, 1].map((half) => (
        <ul key={half} aria-hidden={half === 1 ? "true" : undefined} className="flex shrink-0 items-center">
          {items.map((name, i) => (
            <li key={`${half}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-display text-xl font-semibold tracking-tight text-navy transition-colors duration-300 hover:text-gold-deep md:px-9 md:text-[1.7rem]">
                {name}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </li>
          ))}
        </ul>
      ))}
    </div>
    <span className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-[linear-gradient(90deg,#F5F7FA,rgba(245,247,250,0))] md:w-24" />
    <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-[linear-gradient(270deg,#F5F7FA,rgba(245,247,250,0))] md:w-24" />
  </>
);

export const Clients = () => {
  const [selected, setSelected] = useState(CLIENT_TABS[0]);
  const names = CLIENTS[selected.id] || [];
  const items = fill(names);
  const duration = Math.max(40, items.length * 3.2);
  const clientCount = names.length;

  return (
    <section id="clients" data-testid="clients-section" className="overflow-hidden bg-mist py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          label="Our Clients"
          title="Trusted by Companies Across the Gulf."
          text="A selection of companies Apna Travels has supplied manpower to."
          testId="clients-heading"
        />

        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Select client country"
            data-testid="clients-country-selector"
            className="flex flex-wrap gap-2"
          >
            {CLIENT_TABS.map((tab) => (
              <button
                key={tab.id}
                id={`clients-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected.id === tab.id}
                aria-controls={`clients-panel-${tab.id}`}
                data-testid={`clients-tab-${tab.id}`}
                onClick={() => setSelected(tab)}
                className={`border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  selected.id === tab.id
                    ? "border-navy bg-navy text-white"
                    : "border-navy/15 bg-white text-navy/65 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-navy/50" aria-live="polite">
            {clientCount} companies in {selected.label}
          </p>
        </Reveal>
      </div>

      <div data-testid="clients-marquees" className="mt-5">
        <motion.div
          key={selected.id}
          role="tabpanel"
          id={`clients-panel-${selected.id}`}
          aria-labelledby={`clients-tab-${selected.id}`}
          data-testid={`clients-row-${selected.id}`}
          className="marquee-row relative overflow-hidden border-y border-navy/10 py-8 md:py-12"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ClientTrack tab={selected} items={items} duration={duration} />
        </motion.div>
      </div>

    </section>
  );
};
