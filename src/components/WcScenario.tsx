import type { WcScenarios } from "@/data/types";
import { ROUND_LABEL } from "@/lib/format";

/** Best / average / worst scenario band — not a single asserted probability. */
export default function WcScenario({ scenarios }: { scenarios: WcScenarios }) {
  const cols: { key: keyof WcScenarios; label: string; tone: string }[] = [
    { key: "worst", label: "최악", tone: "var(--bad)" },
    { key: "average", label: "평균", tone: "var(--accent)" },
    { key: "best", label: "최고", tone: "var(--good)" },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line">
        {cols.map((c) => (
          <div key={c.key} className="px-3 py-4 text-center">
            <div className="text-[11px] text-muted">{c.label}</div>
            <div className="mt-1 font-display text-2xl" style={{ color: c.tone }}>
              {ROUND_LABEL[scenarios[c.key] as keyof typeof ROUND_LABEL]}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-muted">{scenarios.note}</p>
    </div>
  );
}
