import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLIENTS, CLIENT_TABS } from "@/data/content";
import { SectionHead, Reveal } from "./primitives";

const INITIAL = 24;

export const Clients = () => {
  const [tab, setTab] = useState("sa");
  const [all, setAll] = useState(false);
  const list = CLIENTS[tab] || [];
  const shown = all ? list : list.slice(0, INITIAL);

  return (
    <section id="clients" data-testid="clients-section" className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-7"
            label="Our Clients"
            title="Trusted by Companies Across the Gulf."
            text="A selection of companies Apna Travels has supplied manpower to."
            testId="clients-heading"
          />
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-navy/55">
              Names are shown as typographic listings, grouped by destination country as provided by the company. Logos are not displayed.
            </p>
          </Reveal>
        </div>

        <div role="tablist" aria-label="Clients by country" className="mt-14 flex gap-1 overflow-x-auto border-b border-navy/15" data-testid="clients-tabs">
          {CLIENT_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              data-testid={`clients-tab-${t.id}`}
              onClick={() => { setTab(t.id); setAll(false); }}
              className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors duration-300 ${tab === t.id ? "text-navy" : "text-navy/45 hover:text-navy"}`}
            >
              {t.label}
              <span className="ml-2 text-[11px] font-medium text-gold-deep">{CLIENTS[t.id].length}</span>
              {tab === t.id && <motion.span layoutId="client-tab" className="absolute inset-x-0 -bottom-px h-[2px] bg-gold" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            data-testid={`clients-grid-${tab}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {shown.map((name, i) => (
              <li
                key={name}
                className="group flex items-center gap-4 border-b border-navy/10 py-5 pr-4 transition-colors duration-300 hover:bg-white sm:px-4"
              >
                <span className="w-6 shrink-0 text-[11px] font-semibold tabular-nums text-navy/30 group-hover:text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[15px] font-semibold leading-snug text-navy">{name}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-navy/50">…and many more.</p>
          {list.length > INITIAL && (
            <button type="button" data-testid="clients-show-all" onClick={() => setAll((v) => !v)} className="btn-navy">
              {all ? "Show fewer" : `Show all ${list.length} companies`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
