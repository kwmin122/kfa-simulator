import type { PlayerVerdict } from "@/data/types";
import { squad, KEY_PLAYER_IDS } from "@/data/squad";
import { VERDICT_META } from "@/lib/format";

const nameOf = (id: string) => squad.find((p) => p.id === id)?.name ?? id;
const FOCUS = new Set(["son-heungmin", "lee-kangin", "kim-minjae"]);

/** Editorial survival table: who lives / dies under this system. */
export default function SurvivalTable({ verdicts }: { verdicts: PlayerVerdict[] }) {
  // key players first (in canonical order), then movers
  const order = (v: PlayerVerdict) => {
    const i = KEY_PLAYER_IDS.indexOf(v.playerId);
    return i === -1 ? 99 : i;
  };
  const rows = [...verdicts].sort((a, b) => order(a) - order(b) || b.buff - a.buff);

  return (
    <div className="divide-y divide-line">
      {rows.map((v) => {
        const m = VERDICT_META[v.level];
        return (
          <div key={v.playerId} className="grid grid-cols-[6.5rem_5.5rem_1fr] items-start gap-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground">{nameOf(v.playerId)}</span>
              {FOCUS.has(v.playerId) && <span className="text-[9px] font-bold text-kr-red">★</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ color: m.color }}>{m.arrow}</span>
              <span className="text-xs font-semibold" style={{ color: m.color }}>{m.label}</span>
              {v.buff !== 0 && <span className="font-mono text-[10px] text-muted">{v.buff > 0 ? "+" : ""}{v.buff}</span>}
            </div>
            <p className="text-xs leading-snug text-muted">{v.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
