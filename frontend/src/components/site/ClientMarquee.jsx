import { CLIENTS, CLIENT_TABS } from "@/data/content";
import { Reveal, SectionHead } from "./primitives";

const MIN_PER_HALF = 14;

// Repeat short lists so one half of the track always exceeds the viewport width.
const fill = (names) => {
  const out = [];
  while (out.length < MIN_PER_HALF) out.push(...names);
  return out;
};

const Track = ({ names, half }) => (
  <ul aria-hidden={half === 1 ? "true" : undefined} className="flex shrink-0 items-center">
    {names.map((n, i) => (
      <li key={`${half}-${i}`} className="flex items-center">
        <span className="whitespace-nowrap px-6 font-display text-xl font-semibold tracking-tight text-navy transition-colors duration-300 hover:text-gold-deep md:px-9 md:text-[1.7rem]">
          {n}
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </li>
    ))}
  </ul>
);

const Row = ({ tab, index }) => {
  const names = CLIENTS[tab.id] || [];
  const items = fill(names);
  const ltr = (index + 1) % 2 === 1; // odd rows → left-to-right, even rows → right-to-left
  const duration = Math.max(40, items.length * 3.2);
  return (
    <div data-testid={`clients-row-${tab.id}`} className="marquee-row group relative flex items-stretch border-b border-navy/10">
      <div className="relative z-10 flex w-[118px] shrink-0 flex-col justify-center border-r border-navy/10 bg-mist px-4 py-6 sm:w-[170px] md:w-[230px] md:px-10">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
        <span data-testid={`clients-label-${tab.id}`} className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.14em] text-navy md:text-base">
          {tab.label}
        </span>
        <span className="mt-1 text-[11px] text-navy/45">{names.length} companies</span>
        <span className="pointer-events-none absolute inset-y-0 -right-16 w-16 bg-[linear-gradient(90deg,#F5F7FA,rgba(245,247,250,0))]" />
      </div>
      <div className="relative flex min-w-0 flex-1 overflow-hidden py-6 md:py-8">
        <div
          className={`marquee-track flex w-max ${ltr ? "marquee-ltr" : "marquee-rtl"}`}
          style={{ animationDuration: `${duration}s` }}
          aria-label={`${tab.label} clients: ${names.join(", ")}`}
          role="list"
        >
          <Track names={items} half={0} />
          <Track names={items} half={1} />
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,#F5F7FA,rgba(245,247,250,0))]" />
      </div>
    </div>
  );
};

export const Clients = () => (
  <section id="clients" data-testid="clients-section" className="overflow-hidden bg-mist py-24 md:py-36">
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
            Names are shown as typographic listings, grouped by destination country as provided by the company. Hover a row to pause it.
          </p>
        </Reveal>
      </div>
    </div>

    <div data-testid="clients-marquees" className="mt-16 border-t border-navy/10">
      {CLIENT_TABS.map((t, i) => <Row key={t.id} tab={t} index={i} />)}
    </div>

    <div className="container-x mt-8">
      <p className="text-sm text-navy/50">…and many more.</p>
    </div>
  </section>
);
