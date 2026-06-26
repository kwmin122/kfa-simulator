import Link from "next/link";
import CompareHero, { type CompareItem } from "@/components/CompareHero";
import RageGauge from "@/components/RageGauge";
import VoteWidget from "@/components/VoteWidget";
import CircularGallery from "@/components/CircularGallery";
import RankingBoard from "@/components/RankingBoard";
import Reveal from "@/components/Reveal";
import { squad } from "@/data/squad";
import { requirementSupply } from "@/engine";
import { allCandidates, candidatesByFit, getSim, ranking, baselineSim, baselineCoach } from "@/lib/sims";
import { fitTone, ROUND_LABEL, TIER_LABEL, VERDICT_META } from "@/lib/format";

const CORE = [
  { id: "son-heungmin", short: "손흥민" },
  { id: "lee-kangin", short: "이강인" },
  { id: "kim-minjae", short: "김민재" },
];
const LEVEL_SHORT: Record<string, string> = { thrives: "산다", neutral: "유지", sacrificed: "축소", benched: "탈락" };

const compareItems: CompareItem[] = candidatesByFit.map((c) => {
  const sim = getSim(c.id)!;
  const pos = sim.baselineDelta.filter((d) => d.good && d.delta >= 4).slice(0, 3);
  const caveat = sim.baselineDelta.find((d) => !d.good && d.delta >= 6);
  return {
    id: c.id, name: c.name, tier: TIER_LABEL[c.tier], meme: !!c.meme,
    fitScore: sim.fitScore, formation: sim.formation, headline: sim.headline, whatIf: sim.whatIf,
    deltas: [...pos, ...(caveat ? [caveat] : [])].map((d) => ({ label: d.label, delta: d.delta, good: d.good })),
    core: CORE.map((cp) => {
      const v = sim.keyVerdicts.find((x) => x.playerId === cp.id);
      const meta = VERDICT_META[v?.level ?? "neutral"];
      return { name: cp.short, level: LEVEL_SHORT[v?.level ?? "neutral"], color: meta.color };
    }),
  };
});

const galleryItems = allCandidates.map((c) => ({
  id: c.id, name: c.name, tier: c.tier, formation: c.formation,
  fit: getSim(c.id)?.fitScore ?? 0, dna: c.dna,
}));

const STRUCTURAL = (
  [
    { key: "ballPlayingCB", label: "후방 빌드업 CB" },
    { key: "sweeperKeeper", label: "빌드업 가담 GK" },
    { key: "targetStriker", label: "제공권 타깃 9번" },
    { key: "creativeAM", label: "창의적 10번" },
  ] as const
).map((r) => ({ ...r, supply: Math.round(requirementSupply(r.key, squad)) })).sort((a, b) => a.supply - b.supply);

const top3 = candidatesByFit.slice(0, 3);
const profiledCandidates = candidatesByFit.filter((c) => getSim(c.id)?.fitScore);
const aboveHong = profiledCandidates.filter((c) => (getSim(c.id)?.fitScore ?? 0) > baselineSim.fitScore).length;

export default function Home() {
  const best = top3[0];
  const bestSim = getSim(best.id)!;

  return (
    <main className="mx-auto w-full max-w-4xl px-5">
      {/* Hero (compact) */}
      <section className="pb-6 pt-12 sm:pt-16">
        <Reveal immediate>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-kr-red">
            <span className="h-px w-8 bg-kr-red" /> KFA COACH SIMULATOR
          </div>
        </Reveal>
        <Reveal immediate delay={0.05}>
          <h1 className="headline mt-3 text-[2rem] sm:text-6xl">만약, 이 감독이었다면</h1>
        </Reveal>
        <Reveal immediate delay={0.1}>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            남아공전 0–1 패 이후 — 후보 감독을 고르면 <span className="text-foreground">홍명보(3-4-3, 궁합 {baselineSim.fitScore}) 대비</span> 한국 축구가
            어떻게 달라지는지, 손흥민·이강인·김민재가 사는지 죽는지 설명 가능한 점수 엔진으로 비교합니다.
          </p>
        </Reveal>
      </section>

      {/* Rage gauge + 투표 — 교체 시급도 본 뒤 바로 한 표 */}
      <Reveal immediate delay={0.12}>
        <div className="mb-5 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <RageGauge baselineFit={baselineSim.fitScore} aboveCount={aboveHong} total={profiledCandidates.length} bestName={best.name} bestFit={bestSim.fitScore} />
          <VoteWidget coaches={candidatesByFit.map((c) => ({ id: c.id, name: c.name }))} simUrgency={Math.round((aboveHong / profiledCandidates.length) * 100)} />
        </div>
      </Reveal>

      {/* Comparison-first hero — the product's core */}
      <Reveal immediate delay={0.16}>
        <CompareHero items={compareItems} baseline={{ name: baselineCoach.name, formation: baselineSim.formation, fitScore: baselineSim.fitScore }} />
      </Reveal>

      {/* Ranking */}
      <section id="ranking" className="scroll-mt-20 py-12">
        <Reveal>
          <h2 className="headline text-3xl">스쿼드 궁합 랭킹</h2>
          <p className="mt-2 text-sm text-muted">&ldquo;감독이 좋은가&rdquo;가 아니라 <span className="text-foreground">현 26인이 그 축구를 실제로 수행할 수 있나</span> — 4축 100점(현실성 제외).</p>
        </Reveal>
        <div className="mt-5"><RankingBoard rows={ranking} /></div>
      </section>

      {/* Demoted gallery */}
      <section className="border-t border-line py-12">
        <Reveal>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted">감독 둘러보기</h2>
          <p className="mb-6 mt-1 text-xs text-muted">카드를 넘겨 다른 감독으로 바로 이동</p>
        </Reveal>
        <CircularGallery items={galleryItems} />
      </section>

      {/* Way forward */}
      <section id="way-forward" className="scroll-mt-20 border-t border-line py-12">
        <Reveal>
          <h2 className="headline text-3xl">앞으로 한국 국대를 어떻게?</h2>
          <p className="mt-2 text-sm text-muted">랭킹·궁합·문제 해결을 묶은 종합 제언 — 모델 추정</p>
        </Reveal>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-bold text-foreground">최적 궁합 Top 3</h3>
              <div className="mt-3 space-y-2.5">
                {top3.map((c, i) => {
                  const sim = getSim(c.id)!;
                  return (
                    <Link key={c.id} href={`/coach/${c.id}`} className="flex items-center gap-3 rounded-xl bg-background/40 p-2.5 transition-colors hover:bg-background">
                      <span className="font-display text-2xl" style={{ color: fitTone(sim.fitScore) }}>{i + 1}</span>
                      <div className="flex-1">
                        <div className="font-bold">{c.name}{c.meme ? <span className="ml-1 text-[10px] text-warn">예능</span> : null}</div>
                        <div className="text-[11px] text-muted">{c.dna.slice(0, 2).join("·")} · 평균 {ROUND_LABEL[sim.wcScenarios.average]}</div>
                      </div>
                      <span className="font-mono text-xl font-bold" style={{ color: fitTone(sim.fitScore) }}>{sim.fitScore}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-bold text-foreground">스쿼드의 구조적 약점</h3>
              <p className="mt-1 text-xs text-muted">감독을 바꿔도 남는, 선수 구성 차원의 빈자리</p>
              <div className="mt-3 space-y-2">
                {STRUCTURAL.slice(0, 3).map((r) => (
                  <div key={r.key} className="flex items-center gap-2">
                    <span className="w-28 shrink-0 text-xs text-foreground">{r.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
                      <div className="h-full rounded-full" style={{ width: `${r.supply}%`, background: fitTone(r.supply) }} />
                    </div>
                    <span className="w-7 text-right font-mono text-xs" style={{ color: fitTone(r.supply) }}>{r.supply}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                현 스쿼드는 <span className="text-foreground">{bestSim.teamStyle.transition >= 70 ? "빠른 전환·측면 스피드" : "측면 자원"}</span>이 강점이라
                <span className="text-foreground"> {best.name} 류의 {best.dna[0]}</span>와 가장 잘 맞습니다.
                다만 <span className="text-foreground">{STRUCTURAL[0].label}</span>의 빈자리는 전술로 가리기 어려워, 장기적으로는 그 포지션 육성이 핵심입니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
