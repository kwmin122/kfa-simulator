import type { PlayerVerdict } from "@/data/types";
import { squad } from "@/data/squad";
import { VERDICT_META } from "@/lib/format";

const nameOf = (id: string) => squad.find((p) => p.id === id)?.name ?? id;
const FOCUS = new Set(["son-heungmin", "lee-kangin", "kim-minjae"]);

export default function KeyPlayers({ verdicts }: { verdicts: PlayerVerdict[] }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {verdicts.map((v) => {
        const m = VERDICT_META[v.level];
        return (
          <div
            key={v.playerId}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3"
            style={{ borderLeft: `3px solid ${m.color}` }}
          >
            <span className="mt-0.5 text-lg" style={{ color: m.color }}>
              {m.arrow}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{nameOf(v.playerId)}</span>
                {FOCUS.has(v.playerId) && (
                  <span className="rounded bg-kr-red/15 px-1.5 py-0.5 text-[9px] font-bold text-kr-red">핵심</span>
                )}
                <span className="text-xs font-semibold" style={{ color: m.color }}>
                  {m.label}
                </span>
                {v.delta !== 0 && (
                  <span className="font-mono text-[11px] text-muted">
                    {v.delta > 0 ? "+" : ""}
                    {v.delta}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-snug text-muted">{v.reason}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
