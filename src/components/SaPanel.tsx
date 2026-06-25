import type { SaTagResolution, SimulationResult } from "@/data/types";
import { SA_MATCH } from "@/data/saMatch";
import { VERDICT_BADGE } from "@/lib/format";

type SaCounterfactual = SimulationResult["saCounterfactual"];

export default function SaPanel({
  resolution,
  counterfactual,
}: {
  resolution: SaTagResolution[];
  counterfactual: SaCounterfactual;
}) {
  const shift = counterfactual.winShift;
  const shiftColor = shift >= 6 ? "var(--good)" : shift > -5 ? "var(--muted)" : "var(--bad)";
  return (
    <div>
      <div className="mb-4 rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">남아공전이 달랐을까?</span>
          <span className="font-mono text-xs text-muted">
            실제: 대한민국 {SA_MATCH.score.kr}–{SA_MATCH.score.opp} 남아공
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{counterfactual.summary}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted">결과 시프트(홍명보 대비)</span>
          <span className="font-mono text-sm font-bold" style={{ color: shiftColor }}>
            {shift > 0 ? "+" : ""}
            {shift}
          </span>
          <span className="text-[10px] text-muted">· 모델 추정</span>
        </div>
      </div>

      <div className="space-y-2">
        {resolution.map((r) => {
          const b = VERDICT_BADGE[r.verdict];
          return (
            <div key={r.key} className="rounded-lg border border-border bg-surface p-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{r.label}</span>
                <span className="whitespace-nowrap text-xs font-bold" style={{ color: b.color }}>
                  {b.label}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full" style={{ width: `${r.mitigation}%`, background: b.color }} />
              </div>
              <p className="mt-1 text-[11px] leading-snug text-muted">{r.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
