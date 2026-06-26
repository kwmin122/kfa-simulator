// Verification: Hong LOW on weakness-fix + core usage (not forced last);
// bestXI reflects altFormations; baselineDelta + scenarios present.
import { squad } from "../src/data/squad";
import { coaches, BASELINE_COACH } from "../src/data/coaches";
import { simulate, rankCoaches } from "../src/engine";
import { ROUND_LABEL } from "../src/engine/projection";

const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);
const sims = coaches.map((c) => simulate(c, squad, BASELINE_COACH));

console.log("\n=== 4-axis breakdown (fit = core33+exec28+weak22+tourn17) ===");
for (const s of sims) {
  const c = coaches.find((x) => x.id === s.coachId)!;
  const a = s.axes;
  console.log(
    `${pad(c.name, 13)} fit ${pad(String(s.fitScore), 3)} | core ${pad(String(a.coreImpact), 2)} exec ${pad(String(a.tacticalExec), 2)} weak ${pad(String(a.weaknessFix), 2)} tourn ${pad(String(a.tournamentFit), 2)} | ${pad(s.formation, 7)} | WC ${pad(ROUND_LABEL[s.wcScenarios.average], 8)} (최악 ${ROUND_LABEL[s.wcScenarios.worst]}~최고 ${ROUND_LABEL[s.wcScenarios.best]}) ${c.meme ? "[밈]" : ""}`,
  );
}

console.log("\n=== altFormation 반영 (primary와 다른 포메이션 채택) ===");
for (const s of sims) {
  const c = coaches.find((x) => x.id === s.coachId)!;
  if (s.formation !== c.formation) console.log(`  ${pad(c.name, 13)} ${c.formation} → ${s.formation}`);
}

console.log("\n=== baselineDelta 예시 (마치 vs 홍명보) ===");
const m = sims.find((s) => s.coachId === "marsch")!;
for (const d of m.baselineDelta) console.log(`  ${pad(d.label, 12)} ${d.delta >= 0 ? "+" : ""}${d.delta} ${d.good ? "" : "(낮을수록 좋음)"}`);
console.log("  headline:", m.headline);

console.log("\n=== Ranking ===");
for (const r of rankCoaches(coaches, squad, BASELINE_COACH)) {
  console.log(`  ${pad(r.coachName, 13)} fit=${pad(String(r.fitScore), 3)} ${ROUND_LABEL[r.expected]} (${r.confidence}${r.meme ? ", 밈" : ""}, ${r.tier})`);
}

const hong = sims.find((s) => s.coachId === "hong-myungbo")!;
const field = sims.filter((s) => s.coachId !== "hong-myungbo" && !coaches.find((c) => c.id === s.coachId)!.meme);
const avgWeak = field.reduce((a, s) => a + s.axes.weaknessFix, 0) / field.length;
const avgCore = field.reduce((a, s) => a + s.axes.coreImpact, 0) / field.length;
console.log(`\n>>> 홍명보 weak ${hong.axes.weaknessFix} (평균 ${avgWeak.toFixed(1)}) / core ${hong.axes.coreImpact} (평균 ${avgCore.toFixed(1)}) — 둘 다 평균 이하여야 함`);
console.log();
