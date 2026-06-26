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

// ── Phase 1.5: profile audit gate ──────────────────────────────────────────
const REPORTED_SHORTLIST = ["marsch", "seabra", "casas", "gunes", "lage", "monk"];

test("status and provenance.currentJob don't contradict on 무직", () => {
  for (const c of coaches) {
    assert.equal(c.status.includes("무직"), c.provenance.currentJob.includes("무직"), `${c.id} status/currentJob 무직 mismatch`);
  }
});

test("confidence 'high' never relies on wiki/namu alone", () => {
  for (const c of coaches) {
    if (c.provenance.confidence === "high") {
      const onlyWiki = c.sources.every((s) => /wikipedia|namu\.wiki/.test(s));
      assert.ok(!onlyWiki && c.sources.length >= 2, `${c.id} high confidence needs ≥2 solid (non-wiki) sources`);
    }
  }
});

test("reported 2024 shortlist coaches are marked 보도 in note", () => {
  for (const id of REPORTED_SHORTLIST) {
    const c = coaches.find((x) => x.id === id)!;
    assert.ok(c.provenance.note?.includes("보도"), `${id} must be marked as reported (보도)`);
  }
});

test("media/meme coaches are confidence low", () => {
  for (const c of coaches) {
    if (c.meme || c.tier === "media") assert.equal(c.provenance.confidence, "low", `${c.id} meme/media must be low confidence`);
  }
});

test("headline leads with a positive (never with risk); baseline is the failing 기준선", () => {
  const hong = byId("hong-myungbo");
  assert.ok(hong.headline.includes("기준선") || hong.headline.includes("위기"));
  const m = byId("marsch");
  assert.ok(!m.headline.startsWith("제시 마치가 오면 한국은 뒷공간"), "headline must not lead with risk");
});

test("Hong baseline is 3-back (3-4-3) per the SA-match lineup", () => {
  const hong = coaches.find((c) => c.id === "hong-myungbo")!;
  assert.equal(hong.formation, "3-4-3");
});

// ── Phase Q: ground-truth + quality gates ──────────────────────────────────
import { HONG_SA_XI } from "@/data/saMatch";

test("홍명보 baseline = 실제 남아공전 XI (bestXI 아님), 손흥민·이재성 벤치", () => {
  const hong = byId("hong-myungbo");
  const xiIds = hong.xi.map((s) => s.player.id);
  assert.deepEqual(xiIds, HONG_SA_XI, "홍명보 XI는 실제 남아공전 라인업과 일치해야 함");
  assert.ok(!xiIds.includes("son-heungmin"), "손흥민은 홍명보 XI에 없어야(벤치)");
  assert.ok(!xiIds.includes("lee-jaesung"), "이재성은 홍명보 XI에 없어야(벤치)");
});

test("핵심 선수는 role-quality로 평가 (이강인 '탈락' 금지)", () => {
  for (const s of sims) {
    const lki = s.keyVerdicts.find((v) => v.playerId === "lee-kangin")!;
    assert.ok(["optimal", "limited", "misused"].includes(lki.roleQuality ?? ""), `${s.coachId} 이강인 roleQuality 필요`);
  }
  // 홍명보의 이강인은 misused 또는 limited (장점이 안 살아남)
  const hongLki = byId("hong-myungbo").keyVerdicts.find((v) => v.playerId === "lee-kangin")!;
  assert.ok(["misused", "limited"].includes(hongLki.roleQuality!), "홍명보 이강인은 misused/limited여야");
  // 손흥민(핵심3)은 후보 감독 XI에 항상 포함
  const bento = byId("bento");
  assert.ok(bento.xi.some((x) => x.player.id === "son-heungmin"), "후보 감독은 손흥민을 벤치 안 함");
});

test("이름 렌더: 옌스 카스트로프 shortName ≠ 트로프, 전원 shortName 보유", () => {
  for (const p of squad) assert.ok(p.shortName && p.shortName.length > 0, `${p.id} shortName`);
  const castrop = squad.find((p) => p.id === "jens-castrop")!;
  assert.notEqual(castrop.shortName, "트로프");
  assert.equal(castrop.shortName, "옌스");
});

test("WC narrative는 감독마다 달라야 (2명 이상 동일 = 실패)", () => {
  const profiled = sims.filter((s) => s.coachId !== "hong-myungbo");
  const set = new Set(profiled.map((s) => s.wcNarrative));
  assert.equal(set.size, profiled.length, "WC narrative가 중복되는 감독이 있음");
});

test("every player has confidence + sourceNote + strengths/weaknesses + valid attrs", () => {
  for (const p of squad) {
    assert.ok(p.confidence, `${p.id} confidence`);
    assert.ok(p.sourceNote, `${p.id} sourceNote`);
    assert.ok(p.strengths && p.strengths.length >= 1, `${p.id} strengths`);
    assert.ok(p.weaknesses && p.weaknesses.length >= 1, `${p.id} weaknesses`);
    for (const v of Object.values(p.attributes)) assert.ok(v >= 0 && v <= 100, `${p.id} attr range`);
  }
});

void marsch;
