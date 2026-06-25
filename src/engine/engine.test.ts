import { test } from "node:test";
import assert from "node:assert/strict";
import { squad } from "@/data/squad";
import { coaches, BASELINE_COACH, bento, klopp, mourinho } from "@/data/coaches";
import { simulate, simulateAll, rankCoaches } from "./index";

const sims = simulateAll(coaches, squad, BASELINE_COACH);
const byId = (id: string) => sims.find((s) => s.coachId === id)!;

test("XI has 11 unique players, all slots filled", () => {
  for (const s of sims) {
    assert.equal(s.xi.length, 11, `${s.coachId} XI length`);
    assert.equal(new Set(s.xi.map((x) => x.player.id)).size, 11);
  }
});

test("five axes within their caps; fit = sum", () => {
  for (const s of sims) {
    const a = s.axes;
    assert.ok(a.coreImpact >= 0 && a.coreImpact <= 30);
    assert.ok(a.tacticalExec >= 0 && a.tacticalExec <= 25);
    assert.ok(a.weaknessFix >= 0 && a.weaknessFix <= 20);
    assert.ok(a.tournamentFit >= 0 && a.tournamentFit <= 15);
    assert.ok(a.realism >= 0 && a.realism <= 10);
    assert.equal(s.fitScore, a.coreImpact + a.tacticalExec + a.weaknessFix + a.tournamentFit + a.realism);
  }
});

test("deterministic", () => {
  assert.deepEqual(simulate(klopp, squad, BASELINE_COACH), simulate(klopp, squad, BASELINE_COACH));
});

test("ACCEPTANCE: Hong is bottom cluster with 조별 탈락 as modal outcome", () => {
  const ranks = rankCoaches(coaches, squad, BASELINE_COACH);
  const hongRank = ranks.findIndex((r) => r.coachId === "hong-myungbo");
  assert.ok(hongRank >= ranks.length - 2, `Hong should be bottom cluster, got rank ${hongRank + 1}/${ranks.length}`);
  assert.equal(byId("hong-myungbo").wcReach.expected, "group", "Hong's modal WC outcome must be group exit");
});

test("realism caps the unrealistic stars (Klopp high football, low total via realism)", () => {
  assert.ok(byId("klopp").axes.realism <= 4, "Klopp realism must be low");
  assert.ok(byId("klopp").axes.coreImpact >= 18, "Klopp football quality stays high");
});

test("core verdicts are absolute & vary (Son under-used by Hong, alive elsewhere)", () => {
  const sonHong = byId("hong-myungbo").keyVerdicts.find((v) => v.playerId === "son-heungmin")!;
  const sonKlopp = byId("klopp").keyVerdicts.find((v) => v.playerId === "son-heungmin")!;
  assert.ok(sonKlopp.buff > sonHong.buff, "Son thrives more under a vertical-transition coach than Hong");
});

test("WC reach probabilities form a distribution", () => {
  for (const s of sims) {
    const sum = Object.values(s.wcReach.probs).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1) < 1e-6);
    assert.ok(s.predictedXg.for > 0 && s.predictedXg.against > 0);
  }
});

void [bento, mourinho];
