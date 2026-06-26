import type { Coach, Player, PlayerVerdict, Position, VerdictLevel } from "@/data/types";
import { KEY_PLAYER_IDS } from "@/data/squad";
import { formationSlots } from "./formations";
import { conditionMet } from "./fit";
import { slotScore } from "./scoring";

export const FOCUS_PLAYER_IDS = ["son-heungmin", "lee-kangin", "kim-minjae"];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function bestSlotFit(player: Player, coach: Coach): number {
  const roles = Array.from(new Set(formationSlots(coach.formation).map((s) => s.role))) as Position[];
  return Math.max(...roles.map((r) => slotScore(player, r, coach.axes)));
}

/** Absolute verdict: does THIS system suit the player's strengths? */
export function playerVerdict(player: Player, coach: Coach, inXi: boolean): PlayerVerdict {
  let buff: number;
  let reason: string;

  if (player.core) {
    const conds = player.core.conditions.map((c) => conditionMet(coach.axes[c.axis], c.prefer, c.target) * c.weight);
    const cw = player.core.conditions.reduce((a, c) => a + c.weight, 0);
    const condProv = cw ? conds.reduce((a, b) => a + b, 0) / cw : 0.5;
    buff = Math.round((condProv - 0.5) * 32);
    reason = buff >= 4 ? player.core.thrive : buff <= -4 ? player.core.die : `${coach.dna[0]} 시스템에서 무난히 제 역할을 합니다.`;
  } else {
    const fit = bestSlotFit(player, coach);
    buff = Math.round(clamp((fit - 62) / 2.4, -13, 13));
    reason = `${coach.dna[0]} 시스템 적합도 ${Math.round(fit)} — ${buff >= 4 ? "역할 확대" : buff <= -4 ? "경쟁 심화" : "제 역할 유지"}`;
  }

  let level: VerdictLevel;
  if (!inXi) {
    level = "benched";
    // Don't show a thrive/die line for someone who isn't even in the XI.
    reason = buff >= 4
      ? `스타일은 맞지만 ${coach.formation} 베스트 11 경쟁에서 밀립니다.`
      : `${coach.formation}에서 자리가 애매해 베스트 11에 들지 못합니다.`;
  } else if (buff >= 5) level = "thrives";
  else if (buff <= -5) level = "sacrificed";
  else level = "neutral";

  return { playerId: player.id, level, buff, reason, inXi };
}

/** The 6 key players always + the biggest non-key movers. */
export function keyVerdicts(coach: Coach, squad: Player[], xiIds: Set<string>): PlayerVerdict[] {
  const all = squad.map((p) => playerVerdict(p, coach, xiIds.has(p.id)));
  const byId = new Map(all.map((v) => [v.playerId, v]));
  const picked = new Map<string, PlayerVerdict>();
  for (const id of KEY_PLAYER_IDS) {
    const v = byId.get(id);
    if (v) picked.set(id, v);
  }
  for (const v of [...all].sort((a, b) => Math.abs(b.buff) - Math.abs(a.buff))) {
    if (picked.size >= 9) break;
    if (Math.abs(v.buff) >= 6) picked.set(v.playerId, v);
  }
  return [...picked.values()].sort((a, b) => b.buff - a.buff);
}
