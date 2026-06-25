import type {
  Attributes,
  Coach,
  Player,
  Position,
  RequirementKey,
  SubScores,
  XiSlot,
} from "@/data/types";

// ── helpers ───────────────────────────────────────────────────────────────

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const topN = (xs: number[], n: number) => [...xs].sort((a, b) => b - a).slice(0, n);

/** generic overall (0–100) for depth/baseline; prefers the anchored FC rating. */
export function overall(p: Player): number {
  if (p.gkRating) return p.gkRating;
  if (p.fcAnchor) return p.fcAnchor;
  const a = p.attributes;
  return mean([a.pace, a.stamina, a.buildUp, a.creativity, a.dribbling, a.finishing, a.tackling, a.positioning]);
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

// ── requirement supply (does the squad HAVE what the coach needs) ──────────

const SUPPLY: Record<RequirementKey, (sq: Player[]) => number> = {
  ballPlayingCB: (s) => bestScore(s, ["CB"], (a) => a.buildUp * 0.7 + a.positioning * 0.3),
  paceWingers: (s) => topAvg(s, ["RW", "LW", "RM", "LM"], 2, (a) => a.pace * 0.6 + a.dribbling * 0.4),
  holdingDM: (s) => bestScore(s, ["DM"], (a) => a.tackling * 0.4 + a.positioning * 0.3 + a.stamina * 0.3),
  boxToBoxCM: (s) => bestScore(s, ["CM", "DM"], (a) => a.stamina * 0.4 + a.buildUp * 0.3 + a.finishing * 0.15 + a.tackling * 0.15),
  creativeAM: (s) => bestScore(s, ["AM", "CM"], (a) => a.creativity * 0.7 + a.buildUp * 0.3),
  mobileStriker: (s) => bestScore(s, ["ST", "SS"], (a) => a.pace * 0.4 + a.stamina * 0.3 + a.pressing * 0.3),
  targetStriker: (s) => bestScore(s, ["ST"], (a) => a.aerial * 0.5 + a.finishing * 0.3 + a.positioning * 0.2),
  overlappingFB: (s) => topAvg(s, ["RB", "LB", "RWB", "LWB"], 2, (a) => a.pace * 0.5 + a.stamina * 0.3 + a.creativity * 0.2),
  pressResistantMF: (s) => bestScore(s, ["DM", "CM", "AM"], (a) => a.buildUp * 0.5 + a.creativity * 0.25 + a.dribbling * 0.25),
  highStaminaFront: (s) => topAvg(s, ["RW", "LW", "ST", "AM", "SS", "RM", "LM"], 3, (a) => a.stamina * 0.5 + a.pressing * 0.5),
  aerialCB: (s) => bestScore(s, ["CB"], (a) => a.aerial),
  sweeperKeeper: (s) => bestScore(s, ["GK"], (a) => a.buildUp),
};

/** Squad's supply (0–100) for a single requirement key. */
export function requirementSupply(key: RequirementKey, squad: Player[]): number {
  return clamp(SUPPLY[key](squad));
}

export interface ReqBreakdown {
  key: RequirementKey;
  label: string;
  weight: number;
  supply: number; // 0–100
}

/** Structural index of how well the squad can play out from the back. */
function squadBuildIndex(squad: Player[]): number {
  const cb = topAvg(squad, ["CB"], 2, (a) => a.buildUp);
  const dm = bestScore(squad, ["DM"], (a) => a.buildUp);
  const gk = bestScore(squad, ["GK"], (a) => a.buildUp);
  return cb * 0.5 + dm * 0.3 + gk * 0.2;
}
function squadPaceIndex(squad: Player[]): number {
  return topAvg(squad, ["RW", "LW", "ST", "RM", "LM"], 3, (a) => a.pace);
}

/**
 * Style fit multiplier (~0.8–1.08). On a FIXED squad this is the main source of
 * score spread: a possession-maximalist who needs a build-from-back the squad
 * can't supply is penalised; a vertical/transition coach who suits the squad's
 * pace is rewarded. (See advisor note: counter/transition > sterile possession.)
 */
export function styleFit(coach: Coach, squad: Player[]): { mult: number; buildGap: number; vertReward: number } {
  const buildIdx = squadBuildIndex(squad);
  const paceIdx = squadPaceIndex(squad);
  const demand = coach.axes.buildFromBack * 0.6 + coach.axes.possession * 0.4;
  const buildGap = Math.max(0, demand - buildIdx);
  const penaltyBuild = (Math.min(buildGap, 40) / 40) * 0.14;
  const vertReward = ((coach.axes.verticality - 50) / 50) * ((paceIdx - 65) / 35) * 0.08;
  const mult = Math.min(1.08, Math.max(0.8, 1 - penaltyBuild + vertReward));
  return { mult, buildGap, vertReward };
}

export interface FitResult {
  fitScore: number;
  breakdown: ReqBreakdown[];
  styleMult: number;
}

/** Overall coach-squad fit (0–100) + per-requirement breakdown for the UI. */
export function fitScore(coach: Coach, squad: Player[]): FitResult {
  const breakdown: ReqBreakdown[] = coach.requirements.map((r) => ({
    key: r.key,
    label: r.label,
    weight: r.weight,
    supply: Math.round(clamp(SUPPLY[r.key](squad))),
  }));
  const wsum = breakdown.reduce((a, r) => a + r.weight, 0);
  const base = wsum ? breakdown.reduce((a, r) => a + r.weight * r.supply, 0) / wsum : 0;
  const { mult } = styleFit(coach, squad);
  return { fitScore: Math.round(clamp(base * mult)), breakdown, styleMult: mult };
}

// ── radar sub-scores (how good the team WILL BE under this coach) ──────────

const isBack = (r: Position) => ["CB", "RB", "LB", "RWB", "LWB"].includes(r);
const isDM = (r: Position) => r === "DM";
const isMid = (r: Position) => ["DM", "CM", "AM", "RM", "LM"].includes(r);
const isFront = (r: Position) => ["RW", "LW", "ST", "SS", "AM", "RM", "LM"].includes(r);

export function subScores(coach: Coach, xi: XiSlot[], bench: Player[]): SubScores {
  const A = (slot: XiSlot) => slot.player.attributes;
  const ax = coach.axes;

  const buildPool = xi.filter((s) => isBack(s.role) || isMid(s.role));
  const buildUp = clamp(mean(buildPool.map((s) => A(s).buildUp)) * (0.7 + 0.3 * (ax.buildFromBack / 100)));

  const outfield = xi.filter((s) => s.role !== "GK");
  const press = clamp(
    mean(outfield.map((s) => (A(s).pressing + A(s).stamina) / 2)) * (0.62 + 0.4 * (ax.pressHeight / 100)),
  );

  const transPool = xi.filter((s) => isFront(s.role) || (isBack(s.role) && s.role !== "CB"));
  const transition = clamp(
    mean(transPool.map((s) => A(s).pace)) * 0.7 + ((ax.verticality + ax.tempo) / 2) * 0.3,
  );

  const frontPool = xi.filter((s) => isFront(s.role));
  const attack = clamp(mean(frontPool.map((s) => A(s).finishing * 0.55 + A(s).creativity * 0.45)));

  const defPool = xi.filter((s) => isBack(s.role) || isDM(s.role));
  const gk = xi.find((s) => s.role === "GK");
  const defBase = mean(defPool.map((s) => A(s).tackling * 0.4 + A(s).positioning * 0.35 + A(s).aerial * 0.25));
  const defense = clamp(defBase * 0.85 + (gk?.player.gkRating ?? 60) * 0.15);

  const depth = clamp(mean(topN(bench.map(overall), 6)));

  return {
    buildUp: Math.round(buildUp),
    press: Math.round(press),
    transition: Math.round(transition),
    attack: Math.round(attack),
    defense: Math.round(defense),
    depth: Math.round(depth),
  };
}
