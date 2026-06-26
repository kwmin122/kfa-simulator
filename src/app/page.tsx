import Link from "next/link";
import type { Coach, SimulationResult } from "@/data/types";
import SimulatorDeck from "@/components/SimulatorDeck";
import VoteWidget from "@/components/VoteWidget";
import type { CompareItem } from "@/components/CompareHero";
import Reveal from "@/components/Reveal";
import { squad } from "@/data/squad";
import { requirementSupply } from "@/engine";
import { candidatesByFit, getSim, baselineSim, baselineCoach } from "@/lib/sims";
import { fitTone, ROUND_LABEL, TIER_LABEL, ROLEQ_META } from "@/lib/format";

const CORE = [
  { id: "son-heungmin", short: "손흥민" },
  { id: "lee-kangin", short: "이강인" },
  { id: "kim-minjae", short: "김민재" },
];
const RQ_SHORT: Record<string, string> = { optimal: "최적", limited: "제한", misused: "죽음" };

// Profiled candidates only (real sims), sorted by fit — the deck picker & ranking.
const profiledCandidates = candidatesByFit.filter((c) => getSim(c.id)?.fitScore);

// Serializable data for the client deck.
const deckOrder = profiledCandidates.map((c) => c.id);
const deckSims: Record<string, SimulationResult> = {};
const deckCoaches: Record<string, Coach> = {};
for (const c of [...profiledCandidates, baselineCoach]) {
  deckSims[c.id] = getSim(c.id)!;
  deckCoaches[c.id] = c;
}

const compareItems: CompareItem[] = profiledCandidates.map((c) => {
  const sim = getSim(c.id)!;
  const pos = sim.baselineDelta.filter((d) => d.good && d.delta >= 4).slice(0, 3);
  const caveat = sim.baselineDelta.find((d) => !d.good && d.delta >= 6);
  return {
    id: c.id, name: c.name, tier: TIER_LABEL[c.tier], meme: !!c.meme,
    fitScore: sim.fitScore, formation: sim.formation, headline: sim.headline, whatIf: sim.whatIf, wcNarrative: sim.wcNarrative,
    deltas: [...pos, ...(caveat ? [caveat] : [])].map((d) => ({ label: d.label, delta: d.delta, good: d.good })),
    core: CORE.map((cp) => {
      const v = sim.keyVerdicts.find((x) => x.playerId === cp.id);
      const rq = v?.roleQuality ?? "limited";
      return { name: cp.short, level: RQ_SHORT[rq], color: ROLEQ_META[rq].color };
    }),
  };
});

const STRUCTURAL = (
  [
    { key: "ballPlayingCB", label: "후방 빌드업 CB" },
    { key: "sweeperKeeper", label: "빌드업 가담 GK" },
    { key: "targetStriker", label: "제공권 타깃 9번" },
    { key: "creativeAM", label: "창의적 10번" },
  ] as const
).map((r) => ({ ...r, supply: Math.round(requirementSupply(r.key, squad)) })).sort((a, b) => a.supply - b.supply);

const top3 = profiledCandidates.slice(0, 3);
const aboveHong = profiledCandidates.filter((c) => (getSim(c.id)?.fitScore ?? 0) > baselineSim.fitScore).length;

export default function Home() {
  const best = top3[0];
  const bestSim = getSim(best.id)!;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-5">
      {/* 한눈에 시뮬레이터 덱 — 감독 고르면 결과로 슬라이드, 분석 진입부는 옆에서 슬라이드-인 */}
      <Reveal immediate>
        <SimulatorDeck sims={deckSims} coachMeta={deckCoaches} order={deckOrder} baselineId={baselineCoach.id} />
      </Reveal>

      {/* 전국 팬 투표 */}
      <section id="vote" className="scroll-mt-20 pt-12">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">당신의 한 표</h2>
          <p className="mt-2 text-sm text-muted">홍명보 감독, 교체해야 하나? — 픽한 감독의 분석도 함께 떠요.</p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-4 max-w-md">
            <VoteWidget coaches={compareItems} baselineFit={baselineSim.fitScore} simUrgency={Math.round((aboveHong / profiledCandidates.length) * 100)} />
          </div>
        </Reveal>
      </section>

      {/* 앞으로 한국 국대를 어떻게? */}
      <section id="way-forward" className="scroll-mt-20 border-t border-line pt-12">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">앞으로 한국 국대를 어떻게?</h2>
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
        <Reveal delay={0.12}>
          <Link href="/methodology" className="mt-5 inline-flex text-xs font-bold text-accent transition-colors hover:text-foreground">방법론 · 출처 · 면책 →</Link>
        </Reveal>
      </section>
    </main>
  );
}
