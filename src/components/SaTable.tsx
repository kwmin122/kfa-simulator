import type { SaTagResolution } from "@/data/types";
import { SA_MATCH } from "@/data/saMatch";
import { VERDICT_BADGE } from "@/lib/format";

/** South-Africa 6-problem resolution table. Absolute (not vs Hong). */
export default function SaTable({
  resolution,
  counterfactual,
}: {
  resolution: SaTagResolution[];
  counterfactual: { summary: string; winShift: number };
}) {
  const shift = counterfactual.winShift;
  const shiftColor = shift >= 6 ? "var(--good)" : shift > -5 ? "var(--muted)" : "var(--bad)";
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between border-b border-line pb-2">
        <span className="text-xs text-muted">실제: 대한민국 {SA_MATCH.score.kr}–{SA_MATCH.score.opp} 남아공</span>
        <span className="text-xs text-muted">
          결과 시프트 <span className="font-mono font-bold" style={{ color: shiftColor }}>{shift > 0 ? "+" : ""}{shift}</span>
        </span>
      </div>
      <div className="divide-y divide-line">
        {resolution.map((r) => {
          const b = VERDICT_BADGE[r.verdict];
          return (
            <div key={r.key} className="grid grid-cols-[1fr_auto] items-center gap-3 py-2">
              <div className="min-w-0">
                <div className="text-sm text-foreground">{r.label}</div>
                <div className="mt-1 h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full" style={{ width: `${r.mitigation}%`, background: b.color }} />
                </div>
              </div>
              <span className="whitespace-nowrap text-xs font-bold" style={{ color: b.color }}>{b.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{counterfactual.summary}</p>
    </div>
  );
}
