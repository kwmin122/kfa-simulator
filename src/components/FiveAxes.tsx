import type { FiveAxes } from "@/data/types";
import { AXIS_LABEL, AXIS_MAX, fitTone } from "@/lib/format";

const ORDER: (keyof FiveAxes)[] = ["coreImpact", "tacticalExec", "weaknessFix", "tournamentFit", "realism"];

/** The 5-axis decomposition of the 적합도 score — explainability, not an oracle. */
export default function FiveAxes({ axes }: { axes: FiveAxes }) {
  return (
    <div className="space-y-3">
      {ORDER.map((k) => {
        const val = axes[k];
        const max = AXIS_MAX[k];
        const pct = (val / max) * 100;
        return (
          <div key={k}>
            <div className="mb-1 flex items-baseline justify-between text-xs">
              <span className="text-foreground">{AXIS_LABEL[k]}</span>
              <span className="font-mono text-muted">
                <span className="text-foreground">{val}</span>/{max}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-background">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: fitTone(pct) }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
