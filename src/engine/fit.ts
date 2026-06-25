import type {
  Attributes, Coach, FiveAxes, Player, Position, RequirementKey,
  StyleAxes, TeamStyle, XiSlot,
} from "@/data/types";
import { saTags } from "@/data/saMatch";
import { KEY_PLAYER_IDS } from "@/data/squad";

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const topN = (xs: number[], n: number) => [...xs].sort((a, b) => b - a).slice(0, n);

/** How well a coach axis meets an absolute condition (0–1, steep). */
export function conditionMet(axisVal: number, prefer: "high" | "low", target: number): number {
  if (prefer === "high") return clamp01((axisVal - (target - 30)) / 30);
  return clamp01((target + 30 - axisVal) / 30);
}

const canPlay = (p: Player, roles: Position[]) =>
  roles.some((r) => p.primary === r || p.eligible.includes(r));

function bestScore(squad: Player[], roles: Position[], f: (a: Attributes) => number): number {
  const c = squad.filter((p) => canPlay(p, roles)).map((p) => f(p.attributes));
  return c.length ? Math.max(...c) : 0;
}
function topAvg(squad: Player[], roles: Position[], n: number, f: (a: Attributes) => number): number {
  const c = squad.filter((p) => canPlay(p, roles)).map((p) => f(p.attributes));
  return c.length ? mean(topN(c, n)) : 0;
}

// ── requirement supply (does the squad HAVE the tools) ─────────────────────
const SUPPLY: Record<RequirementKey, (sq: Player[]) => number> = {
  ballPlayingCB: (s) => bestScore(s, ["CB"], (a) => a.buildUp),
  paceWingers: (s) => topAvg(s, ["RW", "LW", "RM", "LM"], 2, (a) => a.progression),
  holdingDM: (s) => bestScore(s, ["DM"], (a) => a.defending * 0.5 + a.pressWork * 0.3 + a.buildUp * 0.2),
  boxToBoxCM: (s) => bestScore(s, ["CM", "DM"], (a) => a.pressWork * 0.4 + a.progression * 0.3 + a.buildUp * 0.3),
  creativeAM: (s) => bestScore(s, ["AM", "CM"], (a) => a.progression * 0.6 + a.buildUp * 0.4),
  mobileStriker: (s) => bestScore(s, ["ST", "SS"], (a) => a.pressWork * 0.4 + a.progression * 0.4 + a.finishing * 0.2),
  targetStriker: (s) => bestScore(s, ["ST"], (a) => a.defending * 0.5 + a.finishing * 0.5),
  overlappingFB: (s) => topAvg(s, ["RB", "LB", "RWB", "LWB"], 2, (a) => a.progression * 0.5 + a.pressWork * 0.3 + a.buildUp * 0.2),
  pressResistantMF: (s) => bestScore(s, ["DM", "CM", "AM"], (a) => a.buildUp * 0.6 + a.progression * 0.4),
  highStaminaFront: (s) => topAvg(s, ["RW", "LW", "ST", "AM", "SS", "RM", "LM"], 3, (a) => a.pressWork),
  aerialCB: (s) => bestScore(s, ["CB"], (a) => a.defending),
  sweeperKeeper: (s) => bestScore(s, ["GK"], (a) => a.buildUp),
};

export function requirementSupply(key: RequirementKey, squad: Player[]): number {
  return clamp(SUPPLY[key](squad));
}

export interface ReqBreakdown { key: RequirementKey; label: string; weight: number; supply: number }

// ── AXIS 2 — tactical execution (0–25) ─────────────────────────────────────
// Reward systems the squad can execute, scaled by AMBITION so a "ask little"
// coach can't max it out just by demanding nothing.
export function tacticalExec(coach: Coach, squad: Player[]): { score: number; breakdown: ReqBreakdown[] } {
  const breakdown: ReqBreakdown[] = coach.requirements.map((r) => ({
    key: r.key, label: r.label, weight: r.weight, supply: Math.round(requirementSupply(r.key, squad)),
  }));
  const wsum = breakdown.reduce((a, r) => a + r.weight, 0);
  const supplyAvg = wsum ? breakdown.reduce((a, r) => a + r.weight * r.supply, 0) / wsum : 0;
  const ambition = clamp01(wsum / 4.2); // ~5 strong requirements = full ambition
  const score = (supplyAvg / 100) * (0.55 + 0.45 * ambition) * 25;
  return { score, breakdown };
}

// ── AXIS 1 — core-player impact (0–30), ABSOLUTE ───────────────────────────
export function corePlayerScore(player: Player, coach: Coach, inXi: boolean): number {
  if (!player.core) return 0;
  const roles = new Set<Position>();
  // formation roles
  const f = coach.formation;
  void f;
  const conds = player.core.conditions.map((c) =>
    conditionMet(coach.axes[c.axis], c.prefer, c.target) * c.weight,
  );
  const cw = player.core.conditions.reduce((a, c) => a + c.weight, 0);
  const condProv = cw ? conds.reduce((a, b) => a + b, 0) / cw : 0.5;
  void roles;
  const xiFactor = inXi ? 1 : 0.45;
  return clamp01(condProv) * xiFactor; // 0–1
}

export function coreImpact(coach: Coach, squad: Player[], xiIds: Set<string>): number {
  const keys = squad.filter((p) => p.core);
  let num = 0, den = 0;
  for (const p of keys) {
    const w = KEY_PLAYER_IDS.indexOf(p.id) < 3 ? 1 : 0.7; // Son/LKI/KMJ heavier
    num += w * corePlayerScore(p, coach, xiIds.has(p.id));
    den += w;
  }
  return (den ? num / den : 0) * 30;
}

// ── AXIS 3 — weakness fix (0–20), ABSOLUTE ─────────────────────────────────
export function weaknessFixAxis(coach: Coach, squad: Player[]): { score: number; perTag: { key: string; fix: number }[] } {
  const perTag = saTags.map((tag) => {
    const axisScores: number[] = [];
    if (tag.fixedBy.axes) {
      for (const [ax, spec] of Object.entries(tag.fixedBy.axes)) {
        axisScores.push(conditionMet(coach.axes[ax as keyof StyleAxes], spec!.prefer, spec!.target));
      }
    }
    const axesScore = axisScores.length ? mean(axisScores) : 0.5;
    const reqScores = (tag.fixedBy.requirements ?? []).map((r) => requirementSupply(r, squad) / 100);
    const reqScore = reqScores.length ? mean(reqScores) : 0.5;
    // axes (coach choice) dominates — that's where Hong fails
    const fix = clamp01(0.82 * axesScore + 0.18 * reqScore);
    return { key: tag.key, fix };
  });
  return { score: mean(perTag.map((t) => t.fix)) * 20, perTag };
}

// ── AXIS 4 — tournament fit (0–15) ─────────────────────────────────────────
export function tournamentFit(coach: Coach): number {
  const i = coach.intangibles;
  const raw =
    (100 - i.complexity) * 0.2 + i.planB * 0.2 + i.tournamentXP * 0.25 +
    i.defensiveStability * 0.15 + i.starManagement * 0.2;
  return (raw / 100) * 15;
}

// ── AXIS 5 — realism (0–10) ────────────────────────────────────────────────
export function realismAxis(coach: Coach): number {
  const r = coach.realism;
  const raw = r.koreaPlausibility * 0.4 + r.available * 0.2 + r.asiaNtXP * 0.2 + r.squadControl * 0.2;
  return (raw / 100) * 10;
}

// ── Combined 5-axis fit ────────────────────────────────────────────────────
export interface FitResult { fitScore: number; axes: FiveAxes; breakdown: ReqBreakdown[]; weaknessPerTag: { key: string; fix: number }[] }

export function fiveAxisFit(coach: Coach, squad: Player[], xiIds: Set<string>): FitResult {
  const exec = tacticalExec(coach, squad);
  const core = coreImpact(coach, squad, xiIds);
  const weak = weaknessFixAxis(coach, squad);
  const tourn = tournamentFit(coach);
  const real = realismAxis(coach);
  const axes: FiveAxes = {
    coreImpact: Math.round(core),
    tacticalExec: Math.round(exec.score),
    weaknessFix: Math.round(weak.score),
    tournamentFit: Math.round(tourn),
    realism: Math.round(real),
  };
  const fitScore = clamp(axes.coreImpact + axes.tacticalExec + axes.weaknessFix + axes.tournamentFit + axes.realism);
  return { fitScore: Math.round(fitScore), axes, breakdown: exec.breakdown, weaknessPerTag: weak.perTag };
}

// ── Team style radar (how they'll actually play) ───────────────────────────
const isBack = (r: Position) => ["CB", "RB", "LB", "RWB", "LWB"].includes(r);
const isMid = (r: Position) => ["DM", "CM", "AM", "RM", "LM"].includes(r);
const isFront = (r: Position) => ["RW", "LW", "ST", "SS", "AM", "RM", "LM"].includes(r);

export function teamStyle(coach: Coach, xi: XiSlot[]): TeamStyle {
  const A = (s: XiSlot) => s.player.attributes;
  const ax = coach.axes;
  const outfield = xi.filter((s) => s.role !== "GK");
  const buildPool = xi.filter((s) => isBack(s.role) || isMid(s.role));
  const frontPool = xi.filter((s) => isFront(s.role));
  const defPool = xi.filter((s) => isBack(s.role) || s.role === "DM");
  const gk = xi.find((s) => s.role === "GK");

  return {
    buildUp: Math.round(clamp(mean(buildPool.map((s) => A(s).buildUp)) * (0.7 + 0.3 * ax.buildFromBack / 100))),
    press: Math.round(clamp(mean(outfield.map((s) => A(s).pressWork)) * (0.62 + 0.4 * ax.pressHeight / 100))),
    transition: Math.round(clamp(mean(frontPool.map((s) => A(s).progression)) * 0.7 + (ax.verticality + ax.tempo) / 2 * 0.3)),
    attack: Math.round(clamp(mean(frontPool.map((s) => A(s).finishing * 0.55 + A(s).progression * 0.45)))),
    defense: Math.round(clamp(mean(defPool.map((s) => A(s).defending)) * 0.85 + (gk?.player.gkRating ?? 60) * 0.15)),
    control: Math.round(clamp(mean(buildPool.map((s) => A(s).buildUp)) * 0.6 + ax.possession * 0.4)),
  };
}
