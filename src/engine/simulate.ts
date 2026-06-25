import type { Coach, Player, RankingRow, SimulationResult } from "@/data/types";
import { SQUAD_VERSION } from "@/data/squad";
import { buildXI } from "./buildXI";
import { fitScore, subScores } from "./fit";
import { keyVerdicts } from "./verdicts";
import { solvesSA, saCounterfactual } from "./saSolve";
import { project } from "./projection";
import { narrate, deriveStrengthsWeaknesses } from "./narrate";

/**
 * Full deterministic simulation of one coach against the squad. `baseline` is
 * the incumbent (Hong) used for player verdicts and the SA counterfactual.
 */
export function simulate(coach: Coach, squad: Player[], baseline: Coach): SimulationResult {
  const { formation, xi, bench } = buildXI(coach, squad);
  const xiIds = new Set(xi.map((s) => s.player.id));

  const base = buildXI(baseline, squad);
  const baselineXiIds = new Set(base.xi.map((s) => s.player.id));

  const fit = fitScore(coach, squad);
  const sub = subScores(coach, xi, bench);
  const { strengths, weaknesses } = deriveStrengthsWeaknesses(sub);

  const verdicts = keyVerdicts({ coach, baseline, squad, xiIds, baselineXiIds });

  const saRes = solvesSA(coach, squad, xiIds);
  const baseSaRes = solvesSA(baseline, squad, baselineXiIds);
  const cf = saCounterfactual(saRes, baseSaRes);

  const { predictedXg, wcReach } = project(fit.fitScore, sub);

  const explanation = narrate({
    coach,
    squad,
    fit: fit.fitScore,
    breakdown: fit.breakdown,
    sub,
    keyVerdicts: verdicts,
    counterfactual: cf,
    wcReach,
  });

  return {
    coachId: coach.id,
    squadVersion: SQUAD_VERSION,
    formation,
    xi,
    fitScore: fit.fitScore,
    subScores: sub,
    strengths,
    weaknesses,
    keyVerdicts: verdicts,
    saResolution: saRes,
    saCounterfactual: { summary: cf.summary, winShift: cf.winShift },
    predictedXg,
    wcReach,
    explanation,
  };
}

/** Simulate every coach against the squad. */
export function simulateAll(coaches: Coach[], squad: Player[], baseline: Coach): SimulationResult[] {
  return coaches.map((c) => simulate(c, squad, baseline));
}

/** Compatibility ranking board (profiled coaches first, by fit desc). */
export function rankCoaches(coaches: Coach[], squad: Player[], baseline: Coach): RankingRow[] {
  return coaches
    .map((c): RankingRow => {
      if (!c.profiled) {
        return { coachId: c.id, coachName: c.name, tier: c.tier, fitScore: 0, expected: "group", profiled: false };
      }
      const sim = simulate(c, squad, baseline);
      return {
        coachId: c.id,
        coachName: c.name,
        tier: c.tier,
        fitScore: sim.fitScore,
        expected: sim.wcReach.expected,
        profiled: true,
      };
    })
    .sort((a, b) => Number(b.profiled) - Number(a.profiled) || b.fitScore - a.fitScore);
}
