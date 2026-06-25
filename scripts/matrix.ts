// Verification: Hong must land bottom-cluster + 조별/32강 modal. Axes 1&3 must swing.
import { squad } from "../src/data/squad";
import { coaches, BASELINE_COACH } from "../src/data/coaches";
import { simulate, rankCoaches } from "../src/engine";
import { ROUND_LABEL } from "../src/engine/projection";

const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);

console.log("\n=== 5-axis breakdown ===");
const sims = coaches.map((c) => simulate(c, squad, BASELINE_COACH));
for (const s of sims) {
  const c = coaches.find((x) => x.id === s.coachId)!;
  const a = s.axes;
  console.log(
    `${pad(c.name, 14)} fit ${pad(String(s.fitScore), 3)} | core ${pad(String(a.coreImpact), 2)}/30 exec ${pad(String(a.tacticalExec), 2)}/25 weak ${pad(String(a.weaknessFix), 2)}/20 tourn ${pad(String(a.tournamentFit), 2)}/15 real ${pad(String(a.realism), 2)}/10 | WC ${pad(ROUND_LABEL[s.wcReach.expected], 8)} adv16 ${s.wcReach.adv16}%`,
  );
}

console.log("\n=== core player verdicts ===");
for (const s of sims) {
  const c = coaches.find((x) => x.id === s.coachId)!;
  const ids = ["son-heungmin", "lee-kangin", "kim-minjae"];
  const t = ids.map((id) => { const v = s.keyVerdicts.find((v) => v.playerId === id); return id.split("-")[0] + ":" + v?.level + "(" + (v && v.buff > 0 ? "+" : "") + v?.buff + ")"; }).join("  ");
  console.log(`${pad(c.name, 14)} ${t}`);
}

console.log("\n=== axis spread (discrimination check) ===");
for (const k of ["coreImpact", "tacticalExec", "weaknessFix"] as const) {
  const vals = sims.map((s) => s.axes[k]);
  console.log(`  ${k}: min ${Math.min(...vals)} max ${Math.max(...vals)} swing ${Math.max(...vals) - Math.min(...vals)}`);
}

console.log("\n=== Ranking ===");
for (const r of rankCoaches(coaches, squad, BASELINE_COACH)) {
  console.log(`  ${pad(r.coachName, 14)} fit=${pad(String(r.fitScore), 3)} ${ROUND_LABEL[r.expected]} (real ${r.realism}/10, ${r.tier})`);
}

const hong = sims.find((s) => s.coachId === "hong-myungbo")!;
const ranks = rankCoaches(coaches, squad, BASELINE_COACH);
const hongRank = ranks.findIndex((r) => r.coachId === "hong-myungbo") + 1;
console.log(`\n>>> ACCEPTANCE: Hong rank ${hongRank}/${ranks.length}, fit ${hong.fitScore}, WC modal ${ROUND_LABEL[hong.wcReach.expected]}, adv16 ${hong.wcReach.adv16}%`);
console.log();
