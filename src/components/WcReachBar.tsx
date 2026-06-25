import type { WcReach, WcRound } from "@/data/types";
import { ROUND_LABEL } from "@/lib/format";

const ORDER: WcRound[] = ["group", "round32", "round16", "quarter", "semi", "final"];

export default function WcReachBar({ reach }: { reach: WcReach }) {
  const bandColor = reach.band === "높음" ? "var(--good)" : reach.band === "중간" ? "var(--warn)" : "var(--bad)";
  const max = Math.max(...ORDER.map((r) => reach.probs[r]));
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-xs text-muted">예상 도달 라운드</span>
          <div className="text-2xl font-black text-foreground">{ROUND_LABEL[reach.expected]}</div>
        </div>
        <div className="text-right">
          <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${bandColor} 18%, transparent)`, color: bandColor }}>
            가능성 {reach.band}
          </span>
          <div className="mt-1 font-mono text-xs text-muted">조 통과 {reach.adv16}%</div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {ORDER.map((r) => {
          const pct = Math.round(reach.probs[r] * 100);
          const isExp = r === reach.expected;
          return (
            <div key={r} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-right text-[11px]" style={{ color: isExp ? "var(--foreground)" : "var(--muted)" }}>
                {ROUND_LABEL[r]}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(reach.probs[r] / (max || 1)) * 100}%`,
                    background: isExp ? bandColor : "var(--border)",
                  }}
                />
              </div>
              <span className="w-9 text-right font-mono text-[11px] text-muted">{pct}%</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-muted">라운드별 종료 확률 · 모델 추정</p>
    </div>
  );
}
