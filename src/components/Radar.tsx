import type { TeamStyle } from "@/data/types";
import { STYLE_LABEL } from "@/lib/format";

const KEYS: (keyof TeamStyle)[] = ["buildUp", "press", "transition", "attack", "defense", "control"];

function points(s: TeamStyle, scale: number, cx: number, cy: number) {
  return KEYS.map((k, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / KEYS.length;
    const r = (s[k] / 100) * scale;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  });
}

export default function Radar({ style, baseline, color = "var(--accent)" }: { style: TeamStyle; baseline?: TeamStyle; color?: string }) {
  const cx = 110, cy = 110, scale = 86;
  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  const main = points(style, scale, cx, cy);
  const base = baseline ? points(baseline, scale, cx, cy) : null;

  return (
    <svg viewBox="0 0 220 230" className="w-full max-w-[300px]">
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={poly(KEYS.map((_, i) => {
          const ang = -Math.PI / 2 + (i * 2 * Math.PI) / KEYS.length;
          return [cx + r * scale * Math.cos(ang), cy + r * scale * Math.sin(ang)];
        }))} fill="none" stroke="var(--line)" strokeWidth="1" />
      ))}
      {KEYS.map((k, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / KEYS.length;
        const lx = cx + (scale + 16) * Math.cos(ang);
        const ly = cy + (scale + 16) * Math.sin(ang);
        return (
          <g key={k}>
            <line x1={cx} y1={cy} x2={cx + scale * Math.cos(ang)} y2={cy + scale * Math.sin(ang)} stroke="var(--line)" strokeWidth="0.7" />
            <text x={lx} y={ly} fill="var(--muted)" fontSize="11" textAnchor="middle" dominantBaseline="middle">{STYLE_LABEL[k]}</text>
          </g>
        );
      })}
      {base && <polygon points={poly(base)} fill="var(--muted)" fillOpacity="0.1" stroke="var(--muted)" strokeWidth="1.4" strokeDasharray="3 3" />}
      <polygon points={poly(main)} fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2" />
      {main.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill={color} />)}
      {baseline && <text x={cx} y={224} fontSize="9" textAnchor="middle" fill="var(--muted)">실선=후보 · 점선=홍명보</text>}
    </svg>
  );
}
