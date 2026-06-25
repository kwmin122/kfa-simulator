import { squad } from "@/data/squad";
import { coaches, candidateCoaches, BASELINE_COACH } from "@/data/coaches";
import type { Coach, SimulationResult } from "@/data/types";
import { simulate, rankCoaches } from "@/engine";

// Precompute every simulation once (deterministic, build-time friendly).
const SIMS: Record<string, SimulationResult> = {};
for (const c of coaches) SIMS[c.id] = simulate(c, squad, BASELINE_COACH);

export const baselineCoach = BASELINE_COACH;
export const baselineSim = SIMS[BASELINE_COACH.id];

export function getCoach(id: string): Coach | undefined {
  return coaches.find((c) => c.id === id);
}
export function getSim(id: string): SimulationResult | undefined {
  return SIMS[id];
}
export const allCoaches = coaches;
export const allCandidates = candidateCoaches;
export const ranking = rankCoaches(coaches, squad, BASELINE_COACH);

/** Candidate coaches sorted by fit (for the gallery / way-forward). */
export const candidatesByFit = [...candidateCoaches].sort(
  (a, b) => (SIMS[b.id]?.fitScore ?? 0) - (SIMS[a.id]?.fitScore ?? 0),
);
