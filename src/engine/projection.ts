import type { PredictedXg, TeamStyle, WcReach, WcRound } from "@/data/types";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
const r2 = (v: number) => Math.round(v * 100) / 100;

export interface Projection { predictedXg: PredictedXg; wcReach: WcReach; power: number }

/** Map 5-axis fit + team style → estimated xG and a WC reach distribution.
 *  Calibrated to football sense (this squad tops ~QF; a failing setup risks the
 *  group). All MODEL ESTIMATES. */
export function project(fit: number, sub: TeamStyle): Projection {
  const attackIdx = sub.attack * 0.5 + sub.transition * 0.3 + sub.buildUp * 0.2;
  const defIdx = sub.defense * 0.7 + sub.press * 0.3;

  const xgFor = r2(clamp(0.5 + ((attackIdx - 50) / 40) * 0.9 + ((fit - 60) / 100) * 0.5, 0.4, 2.8));
  const xgAgainst = r2(clamp(1.55 - ((defIdx - 50) / 40) * 0.85, 0.4, 2.4));

  const power = clamp(fit * 0.9 + (attackIdx - 50) * 0.1 + (defIdx - 50) * 0.1, 18, 92);

  // 2026 WC: 48 teams, top-2 + best-thirds advance to Round of 32.
  const reachR32 = clamp(34 + (power - 48) * 2.0, 8, 95) / 100;
  const reachR16 = reachR32 * clamp01((power - 50) / 32);
  const reachQ = reachR16 * clamp01((power - 58) / 34);
  const reachS = reachQ * clamp01((power - 66) / 38);
  const reachF = reachS * clamp01((power - 72) / 44);

  const probs: Record<WcRound, number> = {
    group: 1 - reachR32,
    round32: reachR32 - reachR16,
    round16: reachR16 - reachQ,
    quarter: reachQ - reachS,
    semi: reachS - reachF,
    final: reachF,
  };
  const expected = (Object.entries(probs).sort((a, b) => b[1] - a[1])[0][0]) as WcRound;
  const band: WcReach["band"] = power >= 66 ? "높음" : power >= 52 ? "중간" : "낮음";

  return {
    predictedXg: { for: xgFor, against: xgAgainst },
    wcReach: { probs, expected, band, adv16: Math.round(reachR32 * 100) },
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
