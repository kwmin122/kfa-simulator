import type { Coach, Player, RankingRow, SimulationResult, StyleDelta, TeamStyle } from "@/data/types";
import { SQUAD_VERSION } from "@/data/squad";
import { bestXI } from "./buildXI";
import { computeFit, teamStyle } from "./fit";
import { keyVerdicts } from "./verdicts";
import { solvesSA, saCounterfactual } from "./saSolve";
import { project, scenarios } from "./projection";
import { narrate, deriveStrengthsWeaknesses } from "./narrate";

/** Risk of being exposed in behind: high line + weak settled defence. */
function lineRisk(coach: Coach, style: TeamStyle): number {
  return Math.round(Math.min(100, Math.max(0, coach.axes.pressHeight * 0.6 + (100 - style.defense) * 0.4)));
}

/** Team-style change vs the Hong baseline — the star of the result screen. */
function buildBaselineDelta(coach: Coach, style: TeamStyle, baseStyle: TeamStyle, baseLineRisk: number): StyleDelta[] {
  const deltas: StyleDelta[] = [
    { key: "press", label: "전방 압박", delta: style.press - baseStyle.press, good: true },
    { key: "transition", label: "공격 속도", delta: style.transition - baseStyle.transition, good: true },
    { key: "attack", label: "공격 생산력", delta: style.attack - baseStyle.attack, good: true },
    { key: "buildUp", label: "빌드업 안정", delta: style.buildUp - baseStyle.buildUp, good: true },
    { key: "control", label: "경기 장악", delta: style.control - baseStyle.control, good: true },
    { key: "lineRisk", label: "뒷공간 리스크", delta: lineRisk(coach, style) - baseLineRisk, good: false },
  ];
  return deltas.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

function buildHeadline(coach: Coach, fit: number, deltas: StyleDelta[]): string {
  const top = deltas[0];
  const dir = top.delta >= 0 ? `${top.label} ↑` : `${top.label} ↓`;
  const fitWord = fit >= 80 ? "최적의 궁합" : fit >= 70 ? "좋은 궁합" : fit >= 60 ? "보통 궁합" : "마찰이 큰 궁합";
  return `${coach.name}가 오면 홍명보 대비 ${dir}${Math.abs(top.delta) >= 8 ? `(${top.delta >= 0 ? "+" : ""}${top.delta})` : ""} — 현 스쿼드와는 ${fitWord}(${fit}).`;
}

export function simulate(coach: Coach, squad: Player[], baseline: Coach): SimulationResult {
  const { formation, xi } = bestXI(coach, squad);
  const xiIds = new Set(xi.map((s) => s.player.id));

  const baseBuilt = bestXI(baseline, squad);
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
  const baselineDelta = buildBaselineDelta(coach, style, baseStyle, baseLineRisk);
  const headline = buildHeadline(coach, fit.fitScore, baselineDelta);

  const explanation = narrate({ coach, fit: fit.fitScore, axes: fit.axes, style, keyVerdicts: verdicts, counterfactual: cf, wcReach });

  return {
    coachId: coach.id, squadVersion: SQUAD_VERSION, formation, xi,
    fitScore: fit.fitScore, axes: fit.axes, teamStyle: style,
    strengths, weaknesses, keyVerdicts: verdicts,
    saResolution: saRes, saCounterfactual: cf,
    predictedXg, wcReach, wcScenarios, baselineDelta, headline, explanation,
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
