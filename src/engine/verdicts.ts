import type { Coach, Player, PlayerVerdict, Position, VerdictLevel } from "@/data/types";
import { formationSlots } from "./formations";
import { slotScore } from "./scoring";

/** Players the user explicitly cares about — always given a verdict. */
export const FOCUS_PLAYER_IDS = ["son-heungmin", "lee-kangin", "kim-minjae"];

/** Best value a coach's SYSTEM extracts from a player (max slot fit, 0–100). */
export function usefulness(player: Player, coach: Coach): number {
  const roles = Array.from(new Set(formationSlots(coach.formation).map((s) => s.role))) as Position[];
  return Math.max(...roles.map((r) => slotScore(player, r, coach.axes)));
}

/** A short KR reason citing the coach's dominant demand vs the player's trait. */
function reasonFor(player: Player, coach: Coach, delta: number): string {
  const a = player.attributes;
  const ax = coach.axes;
  // dominant style lever
  const levers: [string, number, number][] = [
    ["고강도 압박", ax.pressHeight, a.pressing],
    ["점유·빌드업", (ax.possession + ax.buildFromBack) / 2, a.buildUp],
    ["빠른 수직 전환", (ax.verticality + ax.tempo) / 2, a.pace],
  ];
  levers.sort((x, y) => y[1] - x[1]);
  const [name, demand, trait] = levers[0];
  const fit = trait >= 70 ? "강점" : trait >= 55 ? "보통" : "약점";
  if (delta >= 5) return `${name} 시스템에 ${name === "고강도 압박" ? "활동량·압박" : "강점"}(${Math.round(trait)})이 맞물려 역할 확대`;
  if (delta <= -6) return `${name}(요구 ${Math.round(demand)}) 대비 해당 능력 ${fit}(${Math.round(trait)}) → 역할 축소·경쟁 심화`;
  return `${name} 시스템에서 무난히 제 역할 유지`;
}

export interface VerdictInput {
  coach: Coach;
  baseline: Coach;
  squad: Player[];
  xiIds: Set<string>;
  baselineXiIds: Set<string>;
}

export function playerVerdict(player: Player, inp: VerdictInput): PlayerVerdict {
  const u = usefulness(player, inp.coach);
  const ub = usefulness(player, inp.baseline);
  const delta = Math.round(u - ub);
  const inXi = inp.xiIds.has(player.id);
  const inBaseXi = inp.baselineXiIds.has(player.id);

  let level: VerdictLevel;
  if (!inXi && inBaseXi) level = "benched";
  else if (!inXi) level = "neutral";
  else if (delta >= 5) level = "thrives";
  else if (delta <= -6) level = "sacrificed";
  else level = "neutral";

  return { playerId: player.id, level, delta, reason: reasonFor(player, inp.coach, delta), inXi };
}

/** Focus players + biggest movers (winners & losers), deduped. */
export function keyVerdicts(inp: VerdictInput): PlayerVerdict[] {
  const all = inp.squad.map((p) => playerVerdict(p, inp));
  const byId = new Map(all.map((v) => [v.playerId, v]));

  const picked = new Map<string, PlayerVerdict>();
  for (const id of FOCUS_PLAYER_IDS) {
    const v = byId.get(id);
    if (v) picked.set(id, v);
  }
  const movers = [...all].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  for (const v of movers) {
    if (picked.size >= 7) break;
    if (Math.abs(v.delta) >= 5) picked.set(v.playerId, v);
  }
  return [...picked.values()].sort((a, b) => b.delta - a.delta);
}
