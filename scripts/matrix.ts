// Verification matrix — eyeball engine discrimination (advisor's key check).
// Run: npx tsx scripts/matrix.ts
import { squad } from "../src/data/squad";
import { coaches, BASELINE_COACH } from "../src/data/coaches";
import { simulate, rankCoaches } from "../src/engine";

const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);

console.log("\n=== XI by coach (does the team change?) ===");
const xis: Record<string, string[]> = {};
for (const c of coaches) {
  const sim = simulate(c, squad, BASELINE_COACH);
  xis[c.id] = sim.xi.map((s) => s.player.id);
  const names = sim.xi.map((s) => `${s.role}:${s.player.name}`).join("  ");
  console.log(`\n${c.name} [${c.formation}] fit=${sim.fitScore}`);
  console.log("  " + names);
  console.log(
    "  sub: " +
      Object.entries(sim.subScores)
        .map(([k, v]) => `${k}=${v}`)
        .join(" "),
  );
  const lki = sim.keyVerdicts.find((v) => v.playerId === "lee-kangin");
  const son = sim.keyVerdicts.find((v) => v.playerId === "son-heungmin");
  const kmj = sim.keyVerdicts.find((v) => v.playerId === "kim-minjae");
  console.log(`  이강인=${lki?.level}(${lki?.delta})  손흥민=${son?.level}(${son?.delta})  김민재=${kmj?.level}(${kmj?.delta})`);
  console.log(`  xG ${sim.predictedXg.for} : ${sim.predictedXg.against}  | WC=${sim.wcReach.expected} adv16=${sim.wcReach.adv16}% winShift=${sim.saCounterfactual.winShift}`);
}

console.log("\n=== XI difference vs Klopp (players changed) ===");
const ref = new Set(xis["klopp"]);
for (const c of coaches) {
  if (c.id === "klopp") continue;
  const diff = xis[c.id].filter((id) => !ref.has(id)).length;
  console.log(`  ${pad(c.name, 10)} differs by ${diff} players`);
}

console.log("\n=== Ranking ===");
for (const r of rankCoaches(coaches, squad, BASELINE_COACH)) {
  console.log(`  ${pad(r.coachName, 12)} fit=${r.fitScore} expected=${r.expected} (${r.tier})`);
}
console.log();
