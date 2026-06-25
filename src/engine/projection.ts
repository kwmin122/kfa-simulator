import type { PredictedXg, SubScores, WcReach, WcRound } from "@/data/types";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
const r2 = (v: number) => Math.round(v * 100) / 100;

export interface Projection {
  predictedXg: PredictedXg;
  wcReach: WcReach;
  power: number;
}

/**
 * Map fit + radar into an estimated neutral-match xG and a World Cup reach
 * distribution. All MODEL ESTIMATES — calibrated to football sense (this squad
 * tops out around R16/QF), not to any ground truth.
 */
export function project(fit: number, sub: SubScores): Projection {
  const attackIdx = sub.attack * 0.55 + sub.transition * 0.3 + sub.buildUp * 0.15;
  const defIdx = sub.defense * 0.7 + sub.press * 0.3;

  const xgFor = r2(clamp(0.55 + ((attackIdx - 50) / 40) * 0.9 + ((fit - 65) / 100) * 0.6, 0.4, 2.8));
  const xgAgainst = r2(clamp(1.55 - ((defIdx - 50) / 40) * 0.85, 0.4, 2.4));

  const power = clamp(
    fit * 0.45 + ((attackIdx + defIdx) / 2) * 0.35 + (xgFor - xgAgainst) * 8 + 18,
    20,
    92,
  );

  // probability of reaching at least each round
  const adv = clamp(8 + (power - 45) * 2.3, 3, 90) / 100; // reach Round of 32 (escape group)
  const m16 = clamp01((power - 52) / 35);
  const mQ = clamp01((power - 58) / 38);
  const mS = clamp01((power - 66) / 40);
  const mF = clamp01((power - 72) / 46);

  const reachR32 = adv;
  const reachR16 = reachR32 * m16;
  const reachQ = reachR16 * mQ;
  const reachS = reachQ * mS;
  const reachF = reachS * mF;

  // mass = probability the run ENDS at this round
  const probs: Record<WcRound, number> = {
    group: 1 - reachR32,
    round32: reachR32 - reachR16,
    round16: reachR16 - reachQ,
    quarter: reachQ - reachS,
    semi: reachS - reachF,
    final: reachF,
  };

  const expected = (Object.entries(probs).sort((a, b) => b[1] - a[1])[0][0]) as WcRound;
  const band: WcReach["band"] = power >= 66 ? "높음" : power >= 54 ? "중간" : "낮음";

  return {
    predictedXg: { for: xgFor, against: xgAgainst },
    wcReach: { probs, expected, band, adv16: Math.round(adv * 100) },
    power: Math.round(power),
  };
}

export const ROUND_LABEL: Record<WcRound, string> = {
  group: "조별리그 탈락",
  round32: "32강",
  round16: "16강",
  quarter: "8강",
  semi: "4강",
  final: "결승",
};
