import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/data/content";

const CountUp = ({ to, suffix, testId }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} data-testid={testId} className="tabular-nums">
      {n}<span className="text-gold">{suffix}</span>
    </span>
  );
};

export const Stats = () => (
  <section id="stats" data-testid="stats-section" className="relative bg-navy text-white">
    <div className="container-x">
      <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-12 md:py-16 ${i % 2 ? "pl-6 md:pl-10" : "pr-6"} ${i > 0 ? "lg:pl-10" : ""} ${
              i % 2 ? "border-l border-white/10" : ""
            } ${i === 2 ? "lg:border-l border-t lg:border-t-0 border-white/10" : ""} ${i === 3 ? "border-t lg:border-t-0" : ""}`}
          >
            <dd className="font-display text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              <CountUp to={s.value} suffix={s.suffix} testId={`stat-value-${i}`} />
            </dd>
            <dt className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-slate2">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
