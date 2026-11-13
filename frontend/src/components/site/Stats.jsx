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
  <div id="stats" data-testid="stats-section" className="mt-8">
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <div key={s.label} className="rounded-xl bg-white p-5 md:p-6">
          <dd className="font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            <CountUp to={s.value} suffix={s.suffix} testId={`stat-value-${i}`} />
          </dd>
          <dt className="mt-5 text-sm font-semibold text-navy">{s.label}</dt>
          <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.description}</p>
        </div>
      ))}
    </dl>
  </div>
);
