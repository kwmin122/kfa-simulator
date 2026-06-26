import { test } from "node:test";
import assert from "node:assert/strict";
import { squad } from "@/data/squad";
import { coaches, BASELINE_COACH, marsch, klopp } from "@/data/coaches";
import { simulate, simulateAll, rankCoaches } from "./index";

const sims = simulateAll(coaches, squad, BASELINE_COACH);
const byId = (id: string) => sims.find((s) => s.coachId === id)!;

test("XI has 11 unique players", () => {
  for (const s of sims) {
    assert.equal(s.xi.length, 11);
    assert.equal(new Set(s.xi.map((x) => x.player.id)).size, 11);
  }
});

test("fitScore = 4 axes (realism removed), each within cap, sum ≤ 100", () => {
  for (const s of sims) {
    const a = s.axes;
    assert.ok(a.coreImpact >= 0 && a.coreImpact <= 33);
    assert.ok(a.tacticalExec >= 0 && a.tacticalExec <= 28);
    assert.ok(a.weaknessFix >= 0 && a.weaknessFix <= 22);
    assert.ok(a.tournamentFit >= 0 && a.tournamentFit <= 17);
    assert.equal(s.fitScore, a.coreImpact + a.tacticalExec + a.weaknessFix + a.tournamentFit);
    assert.ok(!("realism" in a));
  }
});

test("deterministic", () => {
  assert.deepEqual(simulate(klopp, squad, BASELINE_COACH), simulate(klopp, squad, BASELINE_COACH));
});

test("every coach has provenance with confidence + source", () => {
  for (const c of coaches) {
    assert.ok(c.provenance, `${c.id} provenance`);
    assert.ok(["high", "medium", "low"].includes(c.provenance.confidence));
    assert.ok(c.provenance.sourceUrl && c.provenance.lastCheckedAt);
  }
});

test("simulate uses bestXI — altFormations can change the chosen formation", () => {
  // At least one coach should end up on a NON-primary formation for this squad.
  const switched = sims.filter((s) => {
    const c = coaches.find((x) => x.id === s.coachId)!;
    return s.formation !== c.formation;
  });
  assert.ok(switched.length >= 1, "no coach used an alternate formation — bestXI not effective");
});

test("baselineDelta is computed; Hong vs himself is all zero", () => {
  const hong = byId("hong-myungbo");
  assert.ok(hong.baselineDelta.length >= 5);
  assert.ok(hong.baselineDelta.every((d) => d.delta === 0));
  // a contrasting coach has non-zero deltas
  assert.ok(byId("marsch").baselineDelta.some((d) => d.delta !== 0));
});

test("WC output is a scenario band (best/avg/worst), not a single assertion", () => {
  for (const s of sims) {
    assert.ok(s.wcScenarios.best && s.wcScenarios.average && s.wcScenarios.worst);
    assert.ok(s.wcScenarios.note.length > 0);
  }
});

test("meme coaches stay in the ranking, flagged", () => {
  const rows = rankCoaches(coaches, squad, BASELINE_COACH);
  assert.ok(rows.some((r) => r.coachId === "gamst" && r.meme));
  assert.ok(rows.some((r) => r.coachId === "handongsuk" && r.meme));
});

test("Hong scores LOW on weakness-fix and core usage (NOT a forced last place)", () => {
  const hong = byId("hong-myungbo");
  const others = sims.filter((s) => s.coachId !== "hong-myungbo" && !coaches.find((c) => c.id === s.coachId)!.meme);
  const avgWeak = others.reduce((a, s) => a + s.axes.weaknessFix, 0) / others.length;
  const avgCore = others.reduce((a, s) => a + s.axes.coreImpact, 0) / others.length;
  assert.ok(hong.axes.weaknessFix < avgWeak, "Hong should fix the SA problems less than the field average");
  assert.ok(hong.axes.coreImpact <= avgCore, "Hong should use the core players no better than the field average");
});

void marsch;
