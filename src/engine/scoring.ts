import type { Attributes, Player, Position, StyleAxes } from "@/data/types";

// ──────────────────────────────────────────────────────────────────────────
// Slot scoring over the 8 tactic-matched categories. Style weighting is
// MULTIPLICATIVE so a strong system sharply re-ranks who fits. Linear sums →
// explainable. Same player is worth different amounts to different coaches.
// ──────────────────────────────────────────────────────────────────────────

type AttrKey = keyof Attributes;
type WeightMap = Partial<Record<AttrKey, number>>;

export function weighted(attrs: Attributes, w: WeightMap): number {
  let sum = 0;
  let tot = 0;
  for (const k in w) {
    const wk = w[k as AttrKey]!;
    sum += wk * attrs[k as AttrKey];
    tot += wk;
  }
  return tot === 0 ? 0 : sum / tot;
}

/** Base attribute emphasis per role over {buildUp, progression, finishing, pressWork, defending}. */
const ROLE_WEIGHTS: Record<Position, WeightMap> = {
  GK: { defending: 0.7, buildUp: 0.3 },
  CB: { defending: 1, buildUp: 0.6, pressWork: 0.5, progression: 0.3 },
  RB: { pressWork: 0.85, progression: 0.8, defending: 0.7, buildUp: 0.5 },
  LB: { pressWork: 0.85, progression: 0.8, defending: 0.7, buildUp: 0.5 },
  RWB: { progression: 1, pressWork: 1, buildUp: 0.5, defending: 0.5 },
  LWB: { progression: 1, pressWork: 1, buildUp: 0.5, defending: 0.5 },
  DM: { defending: 0.9, buildUp: 0.9, pressWork: 0.8, progression: 0.5 },
  CM: { buildUp: 0.85, progression: 0.8, pressWork: 0.8, defending: 0.6, finishing: 0.4 },
  AM: { progression: 1, buildUp: 0.8, finishing: 0.8, pressWork: 0.4 },
  RM: { progression: 0.9, pressWork: 0.8, buildUp: 0.6, finishing: 0.6 },
  LM: { progression: 0.9, pressWork: 0.8, buildUp: 0.6, finishing: 0.6 },
  RW: { progression: 1, finishing: 0.85, pressWork: 0.6, buildUp: 0.5 },
  LW: { progression: 1, finishing: 0.85, pressWork: 0.6, buildUp: 0.5 },
  SS: { finishing: 1, progression: 0.85, buildUp: 0.6 },
  ST: { finishing: 1, progression: 0.7, pressWork: 0.6, defending: 0.3 },
};

const FAMILY: Position[][] = [
  ["RB", "LB", "RWB", "LWB"],
  ["CB"],
  ["DM", "CM"],
  ["AM", "CM", "SS"],
  ["RW", "LW", "RM", "LM"],
  ["ST", "SS"],
];

const sameFamily = (a: Position, b: Position) => FAMILY.some((f) => f.includes(a) && f.includes(b));

function groupOf(role: Position): Player["group"] {
  if (role === "GK") return "GK";
  if (["CB", "RB", "LB", "RWB", "LWB"].includes(role)) return "DF";
  if (["DM", "CM", "AM", "RM", "LM"].includes(role)) return "MF";
  return "FW";
}

export function positionMatch(player: Player, role: Position): number {
  if (player.primary === role) return 1;
  if (player.eligible.includes(role)) return 0.86;
  if (player.eligible.some((p) => sameFamily(p, role))) return 0.7;
  if (player.group === groupOf(role)) return 0.4;
  return 0.2;
}

const WIDE: Position[] = ["RB", "LB", "RWB", "LWB", "RW", "LW", "RM", "LM"];

/** Multiply base role weights by how much the coach's style values each trait. */
export function styleWeights(role: Position, axes: StyleAxes): WeightMap {
  const base: WeightMap = { ...ROLE_WEIGHTS[role] };
  const n = (v: number) => v / 100;
  const press = n(axes.pressHeight);
  const build = n((axes.possession + axes.buildFromBack) / 2);
  const vert = n((axes.verticality + axes.tempo) / 2);
  const wide = n(axes.width);

  const MULT: Partial<Record<AttrKey, number>> = {
    pressWork: 0.5 + 1.15 * press,
    buildUp: 0.55 + 1.0 * build,
    progression: 0.7 + 0.7 * vert + (WIDE.includes(role) ? 0.3 * wide : 0),
    finishing: 0.95 + 0.12 * vert,
    defending: 1,
  };
  for (const k in base) {
    const m = MULT[k as AttrKey];
    if (m !== undefined) base[k as AttrKey] = base[k as AttrKey]! * m;
  }
  return base;
}

/** Player's fit (0–100) for a slot under a coach's system. */
export function slotScore(player: Player, role: Position, axes: StyleAxes): number {
  if (role === "GK") {
    const gk = player.gkRating ?? 40;
    const dist = player.attributes.buildUp;
    const w = axes.buildFromBack / 100;
    return gk * (1 - 0.25 * w) + dist * (0.25 * w);
  }
  const pm = positionMatch(player, role);
  const attr = weighted(player.attributes, styleWeights(role, axes));
  // small lift for genuine NT fit + current form
  const intangible = 0.9 + 0.06 * (player.attributes.ntFit / 100) + 0.04 * (player.attributes.form / 100);
  return pm * attr * intangible;
}
