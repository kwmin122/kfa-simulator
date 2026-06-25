import type { Coach, Player, XiSlot } from "@/data/types";
import { formationSlots } from "./formations";
import { positionMatch, slotScore } from "./scoring";

export interface XiResult {
  formation: string;
  xi: XiSlot[]; // in formation order (matches slot coords)
  bench: Player[]; // unused squad members
}

/**
 * Build the best XI for a coach against a squad, style-weighted (not just by
 * raw quality) and scarce-position-first to avoid greedy mis-assignments.
 * Deterministic: stable tie-breaks by player id.
 */
export function buildXI(coach: Coach, squad: Player[], formationName?: string): XiResult {
  const formation = formationName ?? coach.formation;
  const slots = formationSlots(formation);

  // Order slots by scarcity (fewest credible fillers first), GK always first.
  const order = slots
    .map((s, i) => {
      const credible = squad.filter((p) => positionMatch(p, s.role) >= 0.6).length;
      const scarcity = s.role === "GK" ? -1 : credible;
      return { i, scarcity };
    })
    .sort((a, b) => a.scarcity - b.scarcity || a.i - b.i);

  const used = new Set<string>();
  const assigned: (XiSlot | null)[] = new Array(slots.length).fill(null);

  for (const { i } of order) {
    const role = slots[i].role;
    let best: Player | null = null;
    let bestScore = -1;
    for (const p of squad) {
      if (used.has(p.id)) continue;
      const sc = slotScore(p, role, coach.axes);
      // deterministic tie-break: higher score, then lower id
      if (sc > bestScore || (sc === bestScore && best && p.id < best.id)) {
        bestScore = sc;
        best = p;
      }
    }
    if (best) {
      used.add(best.id);
      assigned[i] = {
        role,
        player: best,
        slotFit: Math.round(Math.min(100, Math.max(0, bestScore))),
      };
    }
  }

  const xi = assigned.filter((s): s is XiSlot => s !== null);
  const bench = squad.filter((p) => !used.has(p.id));
  return { formation, xi, bench };
}

/**
 * A good coach adapts shape to personnel: try the coach's primary + alternate
 * formations and keep the one that yields the strongest XI for THIS squad.
 * Adds realism (Xabi reaches for 3-4-2-1 to fit a creator) and discrimination.
 */
export function bestXI(coach: Coach, squad: Player[]): XiResult {
  const options = Array.from(new Set([coach.formation, ...(coach.altFormations ?? [])]));
  let best: XiResult | null = null;
  let bestSum = -1;
  for (const f of options) {
    const r = buildXI(coach, squad, f);
    const sum = r.xi.reduce((a, s) => a + s.slotFit, 0);
    if (sum > bestSum) {
      bestSum = sum;
      best = r;
    }
  }
  return best ?? buildXI(coach, squad);
}
