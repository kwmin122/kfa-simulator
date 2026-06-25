// ──────────────────────────────────────────────────────────────────────────
// Core domain types for the deterministic coach-fit engine.
// All attribute numbers are 0–100 SUBJECTIVE ESTIMATES anchored to public
// ratings (EA Sports FC) + scouting profile. Not official stats. See /methodology.
// ──────────────────────────────────────────────────────────────────────────

/** Fine-grained position roles used for XI slotting. */
export type Position =
  | "GK"
  | "RB"
  | "RWB"
  | "CB"
  | "LB"
  | "LWB"
  | "DM"
  | "CM"
  | "AM"
  | "RM"
  | "LM"
  | "RW"
  | "LW"
  | "SS" // second striker / shadow
  | "ST";

/** Broad bucket for grouping/UI. */
export type PositionGroup = "GK" | "DF" | "MF" | "FW";

/** The 11 normalized outfield attributes the engine reasons over (0–100). */
export interface Attributes {
  pace: number;
  stamina: number;
  pressing: number; // willingness + engine to press high
  buildUp: number; // progressive/secure passing
  creativity: number; // chance creation, vision, final ball
  dribbling: number; // 1v1 carrying
  finishing: number; // goal threat
  aerial: number; // duels in the air
  tackling: number; // ball-winning, defensive actions
  positioning: number; // off-ball intelligence both phases
  leadership: number; // experience, on-pitch authority
}

export interface Player {
  id: string;
  name: string; // Korean display name
  nameEn: string;
  number?: number;
  group: PositionGroup;
  primary: Position;
  /** All positions the player can credibly fill (includes primary). */
  eligible: Position[];
  age: number;
  club: string;
  caps?: number;
  foot: "L" | "R" | "B";
  captain?: boolean;
  attributes: Attributes;
  /** Goalkeeper-only overall (0–100); undefined for outfielders. */
  gkRating?: number;
  /** EA FC overall we anchored to, for transparency. */
  fcAnchor?: number;
  note?: string; // one-line scouting tag (KR)
}

// ── Coach / tactical model ────────────────────────────────────────────────

export type CoachTier = "national" | "free" | "club";

/** Six tactical style axes (0–100). Each has a named low/high pole in the UI. */
export interface StyleAxes {
  possession: number; // 0 = direct/long, 100 = patient possession
  pressHeight: number; // 0 = deep block, 100 = high press
  tempo: number; // 0 = slow/controlled, 100 = high tempo/vertical
  width: number; // 0 = narrow, 100 = touchline width
  verticality: number; // 0 = circulation, 100 = fast forward penetration
  buildFromBack: number; // 0 = bypass/long, 100 = play out from GK/CB
}

/** A weighted squad requirement the coach's system demands. */
export interface Requirement {
  key: RequirementKey;
  weight: number; // 0–1 importance
  label: string; // KR human label
}

export type RequirementKey =
  | "ballPlayingCB"
  | "paceWingers"
  | "holdingDM"
  | "boxToBoxCM"
  | "creativeAM"
  | "mobileStriker"
  | "targetStriker"
  | "overlappingFB"
  | "pressResistantMF"
  | "highStaminaFront"
  | "aerialCB"
  | "sweeperKeeper";

export interface Coach {
  id: string;
  name: string;
  nameEn: string;
  tier: CoachTier;
  /** Current job / status (KR). */
  status: string;
  nationality: string;
  age?: number;
  /** Primary formation, e.g. "4-3-3". */
  formation: string;
  altFormations?: string[];
  axes: StyleAxes;
  requirements: Requirement[];
  dna: string[]; // tactical DNA tags (KR), e.g. ["게겐프레스", "풀백 인버티드"]
  blurb: string; // one-paragraph identity (KR)
  /** True when we have a full tactical profile; false = "프로필 필요". */
  profiled: boolean;
  sources: string[]; // URLs we used
}

// ── South Africa match diagnosis ──────────────────────────────────────────

export type SaTagKey =
  | "bluntAttack"
  | "noPenetration"
  | "slowBuildUp"
  | "rotationMisfire"
  | "lowPressTrigger"
  | "lateGameFade";

export interface SaTag {
  key: SaTagKey;
  label: string; // KR
  evidence: string; // what in the match suggests it (KR)
  /** Style axes / requirements whose presence mitigates this problem. */
  mitigatedBy: {
    axes?: Partial<Record<keyof StyleAxes, number>>; // axis → target level that helps
    requirements?: RequirementKey[];
  };
}

// ── Simulation output (the "simulations" entity) ──────────────────────────
// Produced deterministically by the engine from (coach × squad). This is the
// contract the UI renders. Every number is a MODEL ESTIMATE, label as such.

/** One filled slot in the best XI. */
export interface XiSlot {
  role: Position;
  player: Player;
  /** 0–100 how well this player fits this slot in this system. */
  slotFit: number;
}

/** Six fit sub-scores driving the radar (0–100). */
export interface SubScores {
  buildUp: number;
  press: number;
  transition: number;
  attack: number;
  defense: number;
  depth: number;
}

export type VerdictLevel = "thrives" | "neutral" | "sacrificed" | "benched";

export interface PlayerVerdict {
  playerId: string;
  level: VerdictLevel;
  /** signed delta vs baseline usefulness, for sorting (−100..100). */
  delta: number;
  reason: string; // KR, templated from the numbers
  inXi: boolean;
}

export interface SaTagResolution {
  key: SaTagKey;
  label: string;
  /** 0–100 how much this coach's system mitigates the problem. */
  mitigation: number;
  verdict: "solved" | "improved" | "unchanged"; // ✅ / △ / ❌
  reason: string; // KR
}

export type WcRound =
  | "group"
  | "round32"
  | "round16"
  | "quarter"
  | "semi"
  | "final";

export interface WcReach {
  /** probability mass per round reached (0–1), sums conceptually to 1. */
  probs: Record<WcRound, number>;
  /** most likely round + qualitative band. */
  expected: WcRound;
  band: "낮음" | "중간" | "높음";
  /** model probability of escaping the group (0–100). */
  adv16: number;
}

/** Estimated expected goals for a neutral WC group match (model estimate). */
export interface PredictedXg {
  for: number;
  against: number;
}

/** The full simulation result for one coach against the current squad. */
export interface SimulationResult {
  coachId: string;
  squadVersion: string;
  formation: string;
  xi: XiSlot[];
  fitScore: number; // 0–100 overall
  subScores: SubScores;
  strengths: string[]; // KR, derived
  weaknesses: string[]; // KR, derived
  keyVerdicts: PlayerVerdict[]; // Son / Lee Kang-in / Kim Min-jae + movers
  saResolution: SaTagResolution[];
  saCounterfactual: {
    /** shift in result likelihood vs the actual 0-1 loss. */
    summary: string; // KR
    winShift: number; // −100..100 (positive = more likely to avoid defeat)
  };
  predictedXg: PredictedXg;
  wcReach: WcReach;
  explanation: string; // KR narrative, templated (no AI)
}

/** Ranking row for the compatibility board. */
export interface RankingRow {
  coachId: string;
  coachName: string;
  tier: CoachTier;
  fitScore: number;
  expected: WcRound;
  profiled: boolean;
}
