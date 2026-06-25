import { test } from "node:test";
import assert from "node:assert/strict";
import { squad } from "@/data/squad";
import { coaches, BASELINE_COACH, klopp, guardiola, mourinho } from "@/data/coaches";
import { simulate, simulateAll, rankCoaches } from "./index";

const sims = simulateAll(coaches, squad, BASELINE_COACH);
const byId = (id: string) => sims.find((s) => s.coachId === id)!;

test("XI has 11 unique players, all slots filled", () => {
  for (const s of sims) {
    assert.equal(s.xi.length, 11, `${s.coachId} XI length`);
    const ids = new Set(s.xi.map((x) => x.player.id));
    assert.equal(ids.size, 11, `${s.coachId} unique`);
    assert.ok(s.xi.every((x) => x.player), "all slots filled");
  }
});

test("scores within 0–100", () => {
  for (const s of sims) {
    assert.ok(s.fitScore >= 0 && s.fitScore <= 100);
    for (const v of Object.values(s.subScores)) assert.ok(v >= 0 && v <= 100);
    for (const r of s.saResolution) assert.ok(r.mitigation >= 0 && r.mitigation <= 100);
  }
});

test("deterministic: same input → identical output", () => {
  const a = simulate(klopp, squad, BASELINE_COACH);
  const b = simulate(klopp, squad, BASELINE_COACH);
  assert.deepEqual(a, b);
});

test("ranking sorted by fit desc, profiled first", () => {
  const rows = rankCoaches(coaches, squad, BASELINE_COACH);
  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1];
    const cur = rows[i];
    const prevKey = [prev.profiled ? 1 : 0, prev.fitScore];
    const curKey = [cur.profiled ? 1 : 0, cur.fitScore];
    assert.ok(prevKey[0] > curKey[0] || (prevKey[0] === curKey[0] && prevKey[1] >= curKey[1]));
  }
});

test("engine DISCRIMINATES by style (the load-bearing property)", () => {
  // gegenpress presses harder than a low block
  assert.ok(byId("klopp").subScores.press > byId("mourinho").subScores.press + 8);
  // possession coach builds up better than a low block
  assert.ok(byId("guardiola").subScores.buildUp > byId("mourinho").subScores.buildUp + 8);
  // sterile possession fits THIS pacey, thin-at-build squad worse than counter/transition
  assert.ok(byId("guardiola").fitScore < byId("mourinho").fitScore);
  assert.ok(byId("guardiola").fitScore < byId("klopp").fitScore);
});

test("key-player verdict changes by system (Lee Kang-in)", () => {
  const lkiKlopp = byId("klopp").keyVerdicts.find((v) => v.playerId === "lee-kangin")!;
  const lkiHong = byId("hong-myungbo").keyVerdicts.find((v) => v.playerId === "lee-kangin")!;
  assert.notEqual(lkiKlopp.level, lkiHong.level); // sacrificed/benched vs neutral
});

test("WC reach probabilities form a distribution", () => {
  for (const s of sims) {
    const sum = Object.values(s.wcReach.probs).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1) < 1e-6, `${s.coachId} sums to 1`);
    assert.ok(s.predictedXg.for > 0 && s.predictedXg.against > 0);
  }
});

test("baseline counterfactual winShift is zero vs itself", () => {
  assert.equal(byId("hong-myungbo").saCounterfactual.winShift, 0);
});

void guardiola;
