import type { StyleDelta } from "@/data/types";

/** Diverging bars: change vs Hong baseline. Positive = right, negative = left.
 *  lineRisk increase is bad (warn color). Editorial, no glow. */
export default function BaselineDelta({ deltas }: { deltas: StyleDelta[] }) {
  const max = Math.max(12, ...deltas.map((d) => Math.abs(d.delta)));
  return (
    <div className="space-y-2.5">
      {deltas.map((d) => {
        const pct = (Math.abs(d.delta) / max) * 50; // half-width each side
        const isBad = (!d.good && d.delta > 0) || (d.good && d.delta < 0);
        const color = d.delta === 0 ? "var(--muted)" : isBad ? "var(--bad)" : "var(--good)";
        const right = d.delta >= 0;
        return (
          <div key={d.key} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-2">
            <span className="text-xs text-foreground">{d.label}</span>
            <div className="relative h-3 rounded-sm bg-background/70">
              <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
              <div
                className="absolute inset-y-0 rounded-sm"
                style={{
                  width: `${pct}%`,
                  [right ? "left" : "right"]: "50%",
                  background: color,
                  opacity: d.delta === 0 ? 0.3 : 0.9,
                }}
              />
            </div>
            <span className="text-right font-mono text-xs font-semibold" style={{ color }}>
              {d.delta > 0 ? "+" : ""}{d.delta}
            </span>
          </div>
        );
      })}
      <p className="pt-1 text-[10px] text-muted">홍명보(3-4-3) 대비 팀 스타일 변화 · 뒷공간 리스크는 ↑가 나쁨 · 모델 추정</p>
    </div>
  );
}
