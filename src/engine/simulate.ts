import type { Coach, Player, RankingRow, SimulationResult, StyleDelta, TeamStyle } from "@/data/types";
import { SQUAD_VERSION } from "@/data/squad";
import { COACH_HOOKS } from "@/data/coaches";
import { bestXI, fixedXI } from "./buildXI";
import { HONG_SA_FORMATION, HONG_SA_XI } from "@/data/saMatch";
import { computeFit, teamStyle } from "./fit";
import { keyVerdicts } from "./verdicts";
import { solvesSA, saCounterfactual } from "./saSolve";
import { project, scenarios } from "./projection";
import { narrate, deriveStrengthsWeaknesses, wcNarrative } from "./narrate";

/** Risk of being exposed in behind: high line + weak settled defence. */
function lineRisk(coach: Coach, style: TeamStyle): number {
  return Math.round(Math.min(100, Math.max(0, coach.axes.pressHeight * 0.6 + (100 - style.defense) * 0.4)));
}

/** 사용자 기대 "공격성" = 지공 자원 + 전환 + 압박 (지공 생산력만 보면 직관과 충돌). */
const threatOf = (s: TeamStyle) => Math.round((s.attack + s.transition + s.press) / 3);

/** Team-style change vs the Hong baseline — the star of the result screen.
 *  Note: teamStyle.attack ≈ "지공 생산성"(개인 공격 자원), 전환/압박은 별도. 사용자가
 *  체감하는 공격성은 threat(공격 위협도)로 묶어서 보여준다. */
function buildBaselineDelta(coach: Coach, style: TeamStyle, baseStyle: TeamStyle, baseLineRisk: number): StyleDelta[] {
  const deltas: StyleDelta[] = [
    { key: "threat", label: "공격 위협도", delta: threatOf(style) - threatOf(baseStyle), good: true },
    { key: "press", label: "전방 압박", delta: style.press - baseStyle.press, good: true },
    { key: "transition", label: "빠른 전환", delta: style.transition - baseStyle.transition, good: true },
    { key: "buildUp", label: "빌드업 안정", delta: style.buildUp - baseStyle.buildUp, good: true },
    { key: "attack", label: "지공 생산성", delta: style.attack - baseStyle.attack, good: true },
    { key: "control", label: "경기 장악", delta: style.control - baseStyle.control, good: true },
    { key: "lineRisk", label: "뒷공간 리스크", delta: lineRisk(coach, style) - baseLineRisk, good: false },
  ];
  return deltas.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

/** Headline: lead with the coach's DISTINCT identity (hook), then the dynamic
 *  궁합. Each coach reads differently. Never lead with risk. */
/** "남아공전이 이 감독이었다면" 가상 스코어. 홍명보는 실제 0-1을 재현. 절대 궁합(fit)에
 *  비례 — 평범한 감독은 비기고, 잘 맞는 감독만 크게 이긴다. 모델 추정, 0~4 / 0~3 캡. */
function whatIfScore(predictedXg: { for: number; against: number }, fit: number, isBaseline: boolean): { kr: number; opp: number } {
  if (isBaseline) return { kr: 0, opp: 1 }; // 실제 결과
  const edge = (fit - 56) / 14; // fit 56→0(고전), 70→+1, 84→+2 (남아공은 이겨야 할 상대)
  const kr = Math.min(4, Math.max(0, Math.round(0.6 + edge * 0.8 + (predictedXg.for - 1.0) * 1.2)));
  const opp = Math.min(3, Math.max(0, Math.round(1.2 - edge * 0.5 - (1.1 - predictedXg.against))));
  return { kr, opp };
}

function buildHeadline(coach: Coach, fit: number, deltas: StyleDelta[], isBaseline: boolean): string {
  if (isBaseline) {
    return "현재 기준선 — 남아공전 0-1 패, 조별 탈락 위기. 개인 공격 자원은 좋지만 3백 고집과 느린 전환으로 손흥민·이강인·황희찬의 장점이 한 화면에 묶이지 못합니다.";
  }
  const fitWord = fit >= 80 ? "최적의 궁합" : fit >= 70 ? "좋은 궁합" : fit >= 60 ? "보통 궁합" : "마찰이 큰 궁합";

  const hook = COACH_HOOKS[coach.id];
  if (hook) return `${hook}. 현 스쿼드와 ${fitWord}(${fit}).`;

  // fallback (no hook yet): positive-first dynamic
  const positives = deltas.filter((d) => d.good && d.delta >= 4).sort((a, b) => b.delta - a.delta);
  const caveat = deltas
    .filter((d) => (!d.good && d.delta >= 6) || (d.good && d.delta <= -6))
    .sort((a, b) => (b.good ? -b.delta : b.delta) - (a.good ? -a.delta : a.delta))[0];
  let s = positives.length
    ? `${coach.name}가 오면 한국은 ${positives.slice(0, 2).map((p) => p.label).join("·")}에서 확 살아납니다`
    : `${coach.name}가 와도 홍명보 대비 스타일 변화는 크지 않습니다`;
  if (caveat) s += `. 단, ${caveat.label}는 ${!caveat.good ? "크게 커집니다" : "줄어듭니다"}`;
  return `${s} — 현 스쿼드와 ${fitWord}(${fit}).`;
}

/** Hong (baseline) uses his ACTUAL South Africa XI, not a computed best XI —
 *  so benching Son/Lee Jae-sung shows up as the real failure it was. */
const buildCoachXI = (coach: Coach, squad: Player[], baseline: Coach) =>
  coach.id === baseline.id ? fixedXI(squad, HONG_SA_FORMATION, HONG_SA_XI, coach) : bestXI(coach, squad);

export function simulate(coach: Coach, squad: Player[], baseline: Coach): SimulationResult {
  const { formation, xi } = buildCoachXI(coach, squad, baseline);
  const xiIds = new Set(xi.map((s) => s.player.id));

  const baseBuilt = fixedXI(squad, HONG_SA_FORMATION, HONG_SA_XI, baseline);
  const baseStyle = teamStyle(baseline, baseBuilt.xi);
  const baseLineRisk = lineRisk(baseline, baseStyle);

  const fit = computeFit(coach, squad, xiIds);
  const style = teamStyle(coach, xi);
  const { strengths, weaknesses } = deriveStrengthsWeaknesses(style);
  const verdicts = keyVerdicts(coach, squad, xiIds);

  const saRes = solvesSA(coach, squad);
  const cf = saCounterfactual(saRes, solvesSA(baseline, squad));

  const { predictedXg, wcReach } = project(fit.fitScore, style);
  const wcScenarios = scenarios(wcReach);
  const isBaseline = coach.id === baseline.id;
  const baselineDelta = buildBaselineDelta(coach, style, baseStyle, baseLineRisk);
  const headline = buildHeadline(coach, fit.fitScore, baselineDelta, isBaseline);

  const explanation = narrate({ coach, fit: fit.fitScore, axes: fit.axes, style, keyVerdicts: verdicts, counterfactual: cf, wcReach, isBaseline });

  return {
    coachId: coach.id, squadVersion: SQUAD_VERSION, formation, xi,
    fitScore: fit.fitScore, axes: fit.axes, teamStyle: style,
    strengths, weaknesses, keyVerdicts: verdicts,
    saResolution: saRes, saCounterfactual: cf,
    predictedXg, wcReach, wcScenarios, baselineDelta,
    whatIf: whatIfScore(predictedXg, fit.fitScore, isBaseline),
    wcNarrative: wcNarrative(coach, fit.fitScore, style, wcScenarios, isBaseline),
    headline, explanation,
  };
}

export function simulateAll(coaches: Coach[], squad: Player[], baseline: Coach): SimulationResult[] {
  return coaches.map((c) => simulate(c, squad, baseline));
}

/** Compatibility ranking — includes meme coaches (flagged), sorted by fit. */
export function rankCoaches(coaches: Coach[], squad: Player[], baseline: Coach): RankingRow[] {
  return coaches
    .map((c): RankingRow => {
      const base = { coachId: c.id, coachName: c.name, tier: c.tier, confidence: c.provenance.confidence, meme: !!c.meme, profiled: c.profiled };
      if (!c.profiled) return { ...base, fitScore: 0, expected: "group" };
      const sim = simulate(c, squad, baseline);
      return { ...base, fitScore: sim.fitScore, expected: sim.wcReach.expected };
    })
    .sort((a, b) => Number(b.profiled) - Number(a.profiled) || b.fitScore - a.fitScore);
}
