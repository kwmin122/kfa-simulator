import type { SubScores } from "@/data/types";
import { SUB_LABEL } from "@/lib/format";

const KEYS: (keyof SubScores)[] = ["buildUp", "press", "transition", "attack", "defense", "depth"];

function points(sub: SubScores, scale: number, cx: number, cy: number) {
  return KEYS.map((k, i) => {
    const ang = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / KEYS.length;
    const r = (sub[k] / 100) * scale;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  });
}

/** Hexagonal radar of the six fit sub-scores. Optional baseline overlay. */
export default function Radar({
  sub,
  baseline,
  color = "var(--accent)",
}: {
  sub: SubScores;
  baseline?: SubScores;
  color?: string;
}) {
  const S = 100;
  const cx = 110;
  const cy = 110;
  const scale = 86;
  const rings = [0.25, 0.5, 0.75, 1];

  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  const main = points(sub, scale, cx, cy);
  const base = baseline ? points(baseline, scale, cx, cy) : null;

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[300px]">
      {/* grid rings */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={poly(
            KEYS.map((_, i) => {
              const ang = -Math.PI / 2 + (i * 2 * Math.PI) / KEYS.length;
              return [cx + r * scale * Math.cos(ang), cy + r * scale * Math.sin(ang)];
            }),
          )}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      {/* spokes + labels */}
      {KEYS.map((k, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / KEYS.length;
        const lx = cx + (scale + 16) * Math.cos(ang);
        const ly = cy + (scale + 16) * Math.sin(ang);
        return (
          <g key={k}>
            <line x1={cx} y1={cy} x2={cx + scale * Math.cos(ang)} y2={cy + scale * Math.sin(ang)} stroke="var(--border)" strokeWidth="0.7" />
            <text x={lx} y={ly} fill="var(--muted)" fontSize="11" textAnchor="middle" dominantBaseline="middle">
              {SUB_LABEL[k]}
            </text>
          </g>
        );
      })}
      {/* baseline (Hong) */}
      {base && (
        <polygon points={poly(base)} fill="var(--muted)" fillOpacity="0.12" stroke="var(--muted)" strokeWidth="1.4" strokeDasharray="3 3" />
      )}
      {/* main */}
      <polygon points={poly(main)} fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2" />
      {main.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill={color} />
      ))}
      <text x={cx} y={S + 108} fontSize="9" textAnchor="middle" fill="var(--muted)">
        {baseline ? "실선=후보 · 점선=홍명보" : ""}
      </text>
    </svg>
  );
}
