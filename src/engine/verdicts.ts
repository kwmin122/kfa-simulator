import type { Coach, Player, PlayerVerdict, Position, RoleQuality, VerdictLevel } from "@/data/types";
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

/** How well a coach's system meets a core player's thrive conditions (0–1). */
function condProvOf(player: Player, coach: Coach): number {
  if (!player.core) return 0.5;
  const conds = player.core.conditions.map((c) => conditionMet(coach.axes[c.axis], c.prefer, c.target) * c.weight);
  const cw = player.core.conditions.reduce((a, c) => a + c.weight, 0);
  return cw ? conds.reduce((a, b) => a + b, 0) / cw : 0.5;
}

/** Key players are graded on ROLE QUALITY (never "benched"). Their hand-written
 *  scenario text is selected by how well the system serves their strengths. */
export function keyPlayerVerdict(player: Player, coach: Coach, inXi: boolean): PlayerVerdict {
  // 손흥민·이재성을 벤치에 둔 홍명보의 '선택 실패' — 그라운드에 없으면 장점도 없다.
  if (!inXi) {
    return {
      playerId: player.id, level: "benched", roleQuality: "misused", buff: -10, inXi: false,
      reason: `${player.shortName}을 벤치에 두는 선택 — 그라운드에 없으니 장점이 발휘되지 못한다.`,
    };
  }
  const cp = condProvOf(player, coach);
  const rq: RoleQuality = cp >= 0.74 ? "optimal" : cp < 0.66 ? "misused" : "limited";
  const level: VerdictLevel = rq === "optimal" ? "thrives" : rq === "misused" ? "sacrificed" : "neutral";
  const reason = player.roles ? player.roles[rq] : (rq === "optimal" ? player.core!.thrive : player.core!.die);
  return { playerId: player.id, level, roleQuality: rq, buff: Math.round((cp - 0.5) * 30), inXi: true, reason };
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

/** Verdict for any player: key players (with role scenarios) get role-quality;
 *  depth players get the absolute fit verdict. */
function verdictFor(player: Player, coach: Coach, inXi: boolean): PlayerVerdict {
  return player.roles ? keyPlayerVerdict(player, coach, inXi) : playerVerdict(player, coach, inXi);
}

/** The 6 key players always (role-quality) + the biggest non-key movers. */
export function keyVerdicts(coach: Coach, squad: Player[], xiIds: Set<string>): PlayerVerdict[] {
  const all = squad.map((p) => verdictFor(p, coach, xiIds.has(p.id)));
  const byId = new Map(all.map((v) => [v.playerId, v]));
  const picked = new Map<string, PlayerVerdict>();
  for (const id of KEY_PLAYER_IDS) {
    const v = byId.get(id);
    if (v) picked.set(id, v);
  }
  for (const v of [...all].sort((a, b) => Math.abs(b.buff) - Math.abs(a.buff))) {
    if (picked.size >= 9) break;
    if (Math.abs(v.buff) >= 6 && !v.roleQuality) picked.set(v.playerId, v);
  }
  // key players first (canonical order), then movers
  return [...picked.values()].sort((a, b) => {
    const ai = KEY_PLAYER_IDS.indexOf(a.playerId), bi = KEY_PLAYER_IDS.indexOf(b.playerId);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    return b.buff - a.buff;
  });
}
