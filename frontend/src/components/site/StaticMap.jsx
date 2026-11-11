import { useMemo } from "react";
import dots from "@/data/worldDots.json";
import { DESTINATIONS, OFFICES } from "@/data/content";

// Equirectangular crop around India and the Gulf
const B = { w: 18, e: 98, n: 42, s: 4 };
const W = 800;
const H = (W * (B.n - B.s)) / (B.e - B.w) * 1.15;
const px = (lat, lng) => [((lng - B.w) / (B.e - B.w)) * W, ((B.n - lat) / (B.n - B.s)) * H];

export const StaticMap = ({ focus }) => {
  const pts = useMemo(() => dots.filter(([la, ln]) => la <= B.n && la >= B.s && ln >= B.w && ln <= B.e), []);
  const hq = OFFICES[0].cities[0];
  const [hx, hy] = px(hq.lat, hq.lng);
  return (
    <svg data-testid="static-map" viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Map showing offices in India and recruitment destinations across the Gulf">
      {pts.map(([la, ln, t], i) => {
        const [x, y] = px(la, ln);
        return <circle key={i} cx={x} cy={y} r={t ? 5 : 4} fill={t === 2 ? "#D5A94F" : t === 1 ? "#E9EEF5" : "#3A4E68"} opacity={t ? 0.9 : 0.8} />;
      })}
      {DESTINATIONS.map((d) => {
        const [x, y] = px(d.lat, d.lng);
        const mx = (x + hx) / 2, my = Math.min(y, hy) - 70;
        return <path key={d.name} d={`M${hx},${hy} Q${mx},${my} ${x},${y}`} fill="none" stroke="#D5A94F" strokeWidth="1.5" strokeDasharray="4 5" opacity=".8" />;
      })}
      {DESTINATIONS.map((d) => {
        const [x, y] = px(d.lat, d.lng);
        const on = focus && focus.name === d.name;
        return (
          <g key={d.name}>
            <circle cx={x} cy={y} r={on ? 14 : 10} fill="none" stroke="#D5A94F" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="5" fill="#D5A94F" />
          </g>
        );
      })}
      {OFFICES.flatMap((o) => o.cities).filter((c) => c.lng > B.w && c.lng < B.e).map((c) => {
        const [x, y] = px(c.lat, c.lng);
        return <rect key={c.name} x={x - 5} y={y - 5} width="10" height="10" fill={c.hq ? "#D5A94F" : "#FFFFFF"} stroke="#101E30" strokeWidth="2" />;
      })}
    </svg>
  );
};
