import type { Attributes, Player, Position, StyleAxes } from "@/data/types";

// ──────────────────────────────────────────────────────────────────────────
// The discrimination core. A player's value for a slot depends on the SYSTEM,
// not just raw quality — same squad, different coach → different XI. All linear
// weighted sums so the UI can explain "why" and weights stay tunable.
// ──────────────────────────────────────────────────────────────────────────

type AttrKey = keyof Attributes;
type WeightMap = Partial<Record<AttrKey, number>>;

/** Weighted 0–100 score of a player's attributes under a weight map. */
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

/** Base attribute emphasis per position role. */
const ROLE_WEIGHTS: Record<Position, WeightMap> = {
  GK: { positioning: 0.5, buildUp: 0.3, aerial: 0.2 },
  CB: { tackling: 1, positioning: 1, aerial: 0.8, pace: 0.6, buildUp: 0.5 },
  RB: { pace: 0.9, stamina: 0.9, tackling: 0.7, positioning: 0.6, buildUp: 0.5, creativity: 0.4 },
  LB: { pace: 0.9, stamina: 0.9, tackling: 0.7, positioning: 0.6, buildUp: 0.5, creativity: 0.4 },
  RWB: { pace: 1, stamina: 1, creativity: 0.6, dribbling: 0.6, tackling: 0.5, buildUp: 0.5 },
  LWB: { pace: 1, stamina: 1, creativity: 0.6, dribbling: 0.6, tackling: 0.5, buildUp: 0.5 },
  DM: { tackling: 1, positioning: 1, stamina: 0.8, buildUp: 0.8, pressing: 0.6 },
  CM: { stamina: 0.9, buildUp: 0.9, creativity: 0.8, pressing: 0.7, tackling: 0.6, positioning: 0.6 },
  AM: { creativity: 1, buildUp: 0.8, dribbling: 0.8, finishing: 0.7, positioning: 0.6 },
  RM: { pace: 0.9, stamina: 0.9, creativity: 0.7, dribbling: 0.8, pressing: 0.6, finishing: 0.5 },
  LM: { pace: 0.9, stamina: 0.9, creativity: 0.7, dribbling: 0.8, pressing: 0.6, finishing: 0.5 },
  RW: { pace: 1, dribbling: 0.9, creativity: 0.8, finishing: 0.8, pressing: 0.6 },
  LW: { pace: 1, dribbling: 0.9, creativity: 0.8, finishing: 0.8, pressing: 0.6 },
  SS: { finishing: 1, creativity: 0.8, positioning: 0.8, dribbling: 0.7, pace: 0.6 },
  ST: { finishing: 1, positioning: 0.9, aerial: 0.7, pace: 0.7, pressing: 0.6 },
};

/** Position families for emergency / out-of-position fills. */
const FAMILY: Position[][] = [
  ["RB", "LB", "RWB", "LWB"],
  ["CB"],
  ["DM", "CM"],
  ["AM", "CM", "SS"],
  ["RW", "LW", "RM", "LM"],
  ["ST", "SS"],
];

function sameFamily(a: Position, b: Position): boolean {
  return FAMILY.some((f) => f.includes(a) && f.includes(b));
}

/** How naturally a player fills a role (0–1). */
export function positionMatch(player: Player, role: Position): number {
  if (player.primary === role) return 1;
  if (player.eligible.includes(role)) return 0.86;
  if (player.eligible.some((p) => sameFamily(p, role))) return 0.7;
  if (player.group === groupOf(role)) return 0.4;
  return 0.2;
}

function groupOf(role: Position): Player["group"] {
  if (role === "GK") return "GK";
  if (["CB", "RB", "LB", "RWB", "LWB"].includes(role)) return "DF";
  if (["DM", "CM", "AM", "RM", "LM"].includes(role)) return "MF";
  return "FW";
}

const WIDE: Position[] = ["RB", "LB", "RWB", "LWB", "RW", "LW", "RM", "LM"];

/**
 * Modulate base role weights by the coach's style axes — MULTIPLICATIVELY, so a
 * strong style sharply re-ranks who fits. This is the engine's discrimination:
 * same player is worth very different amounts to a gegenpress vs a possession
 * coach. Still a linear weighted sum downstream → fully explainable.
 */
export function styleWeights(role: Position, axes: StyleAxes): WeightMap {
  const base: WeightMap = { ...ROLE_WEIGHTS[role] };
  const n = (v: number) => v / 100;
  const press = n(axes.pressHeight);
  const buildDemand = n((axes.possession + axes.buildFromBack) / 2);
  const poss = n(axes.possession);
  const vert = n((axes.verticality + axes.tempo) / 2);
  const wide = n(axes.width);

  // per-attribute multiplier reflecting how much THIS coach values it
  const MULT: Partial<Record<AttrKey, number>> = {
    pressing: 0.5 + 1.15 * press,
    stamina: 0.8 + 0.5 * press,
    buildUp: 0.5 + 1.1 * buildDemand,
    creativity: 0.65 + 0.95 * poss,
    dribbling: 0.85 + 0.3 * poss,
    pace: 0.65 + 0.85 * vert + (WIDE.includes(role) ? 0.35 * wide : 0),
    finishing: 0.95 + 0.12 * vert,
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
    // GKs scored on keeper rating + distribution weighted by build-from-back.
    const gk = player.gkRating ?? 40;
    const dist = player.attributes.buildUp;
    const w = axes.buildFromBack / 100;
    return gk * (1 - 0.25 * w) + dist * (0.25 * w);
  }
  const pm = positionMatch(player, role);
  const attr = weighted(player.attributes, styleWeights(role, axes));
  // position match gates the attribute score (out-of-position players punished).
  return pm * attr;
}
