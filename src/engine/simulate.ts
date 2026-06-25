import type { Coach, Player, RankingRow, SimulationResult } from "@/data/types";
import { SQUAD_VERSION } from "@/data/squad";
import { buildXI } from "./buildXI";
import { fiveAxisFit, teamStyle, realismAxis } from "./fit";
import { keyVerdicts } from "./verdicts";
import { solvesSA, saCounterfactual } from "./saSolve";
import { project } from "./projection";
import { narrate, deriveStrengthsWeaknesses } from "./narrate";

export function simulate(coach: Coach, squad: Player[], baseline: Coach): SimulationResult {
  const { formation, xi } = buildXI(coach, squad);
  const xiIds = new Set(xi.map((s) => s.player.id));
  const baselineXi = buildXI(baseline, squad);

  const fit = fiveAxisFit(coach, squad, xiIds);
  const style = teamStyle(coach, xi);
  const { strengths, weaknesses } = deriveStrengthsWeaknesses(style);
  const verdicts = keyVerdicts(coach, squad, xiIds);

  const saRes = solvesSA(coach, squad);
  const baseSaRes = solvesSA(baseline, squad);
  const cf = saCounterfactual(saRes, baseSaRes);

  const { predictedXg, wcReach } = project(fit.fitScore, style);
  const explanation = narrate({ coach, fit: fit.fitScore, axes: fit.axes, style, keyVerdicts: verdicts, counterfactual: cf, wcReach });
  void baselineXi;

  return {
    coachId: coach.id,
    squadVersion: SQUAD_VERSION,
    formation,
    xi,
    fitScore: fit.fitScore,
    axes: fit.axes,
    teamStyle: style,
    strengths,
    weaknesses,
    keyVerdicts: verdicts,
    saResolution: saRes,
    saCounterfactual: cf,
    predictedXg,
    wcReach,
    explanation,
  };
}

export function simulateAll(coaches: Coach[], squad: Player[], baseline: Coach): SimulationResult[] {
  return coaches.map((c) => simulate(c, squad, baseline));
}

export function rankCoaches(coaches: Coach[], squad: Player[], baseline: Coach): RankingRow[] {
  return coaches
    .map((c): RankingRow => {
      if (!c.profiled) {
        return { coachId: c.id, coachName: c.name, tier: c.tier, fitScore: 0, expected: "group", realism: Math.round(realismAxis(c)), profiled: false };
      }
      const sim = simulate(c, squad, baseline);
      return { coachId: c.id, coachName: c.name, tier: c.tier, fitScore: sim.fitScore, expected: sim.wcReach.expected, realism: sim.axes.realism, profiled: true };
    })
    .sort((a, b) => Number(b.profiled) - Number(a.profiled) || b.fitScore - a.fitScore);
}
