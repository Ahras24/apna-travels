import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { DESTINATIONS } from "@/data/content";
import { Reveal, SectionHead } from "./primitives";
import { StaticMap } from "./StaticMap";

const GlobeCanvas = lazy(() => import("./GlobeCanvas"));

const canUse3D = () => {
  if (typeof window === "undefined" || window.innerWidth < 768) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
};

const Item = ({ label, sub, active, onEnter, testId, square }) => (
  <li>
    <button
      type="button"
      data-testid={testId}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onEnter}
      className={`flex w-full items-center justify-between gap-3 border-b border-white/10 py-3 text-left transition-colors duration-300 ${active ? "text-white" : "text-white/65 hover:text-white"}`}
    >
      <span className="flex items-center gap-3">
        <span className={`h-2 w-2 ${square ? "" : "rounded-full"} ${active ? "bg-gold" : square ? "bg-white/70" : "border border-gold"}`} />
        <span className="text-[15px] font-medium">{label}</span>
      </span>
      {sub && <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{sub}</span>}
    </button>
  </li>
);

export const GlobalReach = () => {
  const wrap = useRef(null);
  const labelRef = useRef(null);
  const inView = useInView(wrap, { once: true, margin: "200px" });
  const reduce = useReducedMotion();
  const [three, setThree] = useState(false);
  const [focus, setFocus] = useState(DESTINATIONS[0]);

  useEffect(() => { setThree(canUse3D() && !reduce); }, [reduce]);

  return (
    <section id="reach" data-testid="reach-section" className="relative overflow-hidden bg-navy py-24 text-white md:py-36">
      <div className="container-x">
        <SectionHead
          dark
          label="Our Global Reach"
          title="Connecting Talent Across Borders."
          text="We connect skilled professionals from India with employers across the Gulf and other international markets."
          testId="reach-heading"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div ref={wrap} className="relative lg:col-span-7">
            <div className={`relative w-full ${three ? "aspect-square" : "aspect-[16/10]"}`}>
              {three && inView ? (
                <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.3em] text-slate2">Loading globe…</div>}>
                  <GlobeCanvas focus={focus} labelRef={labelRef} />
                  <div ref={labelRef} className="pointer-events-none absolute left-0 top-0 transition-opacity duration-300" data-testid="globe-label">
                    <div className="ml-4 -translate-y-1/2 whitespace-nowrap border-l-2 border-gold bg-navy/90 px-3 py-1.5 text-xs font-semibold text-white">
                      {focus.name}{focus.note ? ` — ${focus.note}` : ""}
                    </div>
                  </div>
                </Suspense>
              ) : (
                <StaticMap focus={focus} />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate2">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-gold" /> Recruitment destination</span>
              {three && <span className="hidden md:inline">Drag to rotate · hover a location to focus</span>}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                <MapPin className="h-4 w-4" /> Recruitment destinations
              </h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8" data-testid="destinations-list">
                {DESTINATIONS.map((d) => (
                  <Item key={d.name} label={d.name} active={focus.name === d.name} onEnter={() => setFocus(d)} testId={`destination-${d.name.toLowerCase().replace(/\s+/g, "-")}`} />
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
