import Link from "next/link";
import CircularGallery from "@/components/CircularGallery";
import RankingBoard from "@/components/RankingBoard";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { squad } from "@/data/squad";
import { requirementSupply } from "@/engine";
import { allCandidates, candidatesByFit, getSim, ranking, baselineSim } from "@/lib/sims";
import { fitTone, ROUND_LABEL } from "@/lib/format";

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
    { key: "paceWingers", label: "스피드 윙어" },
  ] as const
).map((r) => ({ ...r, supply: Math.round(requirementSupply(r.key, squad)) })).sort((a, b) => a.supply - b.supply);

const top3 = candidatesByFit.slice(0, 3);

export default function Home() {
  const best = top3[0];
  const bestSim = getSim(best.id)!;

  return (
    <main className="mx-auto w-full max-w-6xl px-5">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pb-8 pt-16 sm:pt-24">
        <Reveal immediate>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-kr-red">
            <span className="h-px w-8 bg-kr-red" /> KFA COACH SIMULATOR
          </div>
        </Reveal>
        <Reveal immediate delay={0.06}>
          <h1 className="headline mt-4 text-6xl text-foreground sm:text-8xl">
            만약,<br />이 감독이었다면
          </h1>
        </Reveal>
        <Reveal immediate delay={0.12}>
          <p className="mt-6 max-w-2xl leading-7 text-muted">
            한국 축구 <span className="text-foreground">황금세대</span>가 너무 아까워서 만든 팬 시뮬레이션.
            현 26인 스쿼드는 그대로 두고, 후보 감독의 전술 DNA를 넣으면 — 누가 살아나고 누가 죽는지,
            남아공전을 해결할지, 월드컵 몇 강까지 갈지를 <span className="text-foreground">설명 가능한 5축 점수 엔진</span>이 돌려봅니다.
          </p>
        </Reveal>

        {/* current state strip */}
        <Reveal immediate delay={0.18}>
          <div className="mt-9 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center gap-4 rounded-xl border border-bad/40 bg-bad/5 px-5 py-3">
              <span className="font-display text-3xl text-bad">NOW</span>
              <div>
                <div className="text-sm font-bold">홍명보호 · 남아공전 0–1 패</div>
                <div className="text-xs text-muted">적합도 {baselineSim.fitScore} · 예상 <span className="text-bad">{ROUND_LABEL[baselineSim.wcReach.expected]}</span> · FIFA 28위</div>
              </div>
            </div>
            {[
              { label: "후보 감독", value: allCandidates.length, suffix: "명" },
              { label: "분석 선수", value: squad.length, suffix: "명" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-surface/60 px-5 py-3">
                <div className="font-display text-3xl text-accent"><CountUp to={s.value} suffix={s.suffix} /></div>
                <div className="text-[11px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Circular gallery ─────────────────────────────────── */}
      <section className="py-12">
        <Reveal>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" /> PICK A MANAGER
          </div>
          <p className="mb-8 text-sm text-muted">좌우로 휙 넘기거나 카드를 눌러보세요. 가운데 감독을 누르면 정밀 분석으로 이동합니다.</p>
        </Reveal>
        <CircularGallery items={galleryItems} />
      </section>

      {/* ── Ranking ──────────────────────────────────────────── */}
      <section id="ranking" className="scroll-mt-20 py-12">
        <Reveal>
          <h2 className="headline text-4xl">스쿼드 궁합 랭킹</h2>
          <p className="mt-2 text-sm text-muted">&ldquo;감독이 좋은가&rdquo;가 아니라 <span className="text-foreground">현 26인이 그 축구를 실제로 수행할 수 있나</span> — 5축 100점 만점.</p>
        </Reveal>
        <div className="mt-6"><RankingBoard rows={ranking} /></div>
      </section>

      {/* ── Way forward ──────────────────────────────────────── */}
      <section id="way-forward" className="scroll-mt-20 py-12">
        <Reveal>
          <h2 className="headline text-4xl">앞으로 한국 국대를 어떻게?</h2>
          <p className="mt-2 text-sm text-muted">랭킹·적합도·문제 해결을 묶은 종합 제언 — 모델 추정</p>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-bold text-foreground">최적 궁합 Top 3</h3>
              <div className="mt-3 space-y-2.5">
                {top3.map((c, i) => {
                  const sim = getSim(c.id)!;
                  return (
                    <Link key={c.id} href={`/coach/${c.id}`} className="flex items-center gap-3 rounded-xl bg-background/50 p-2.5 transition-colors hover:bg-background">
                      <span className="font-display text-2xl" style={{ color: fitTone(sim.fitScore) }}>{i + 1}</span>
                      <div className="flex-1">
                        <div className="font-bold">{c.name}</div>
                        <div className="text-[11px] text-muted">{c.dna.slice(0, 2).join("·")} · 예상 {ROUND_LABEL[sim.wcReach.expected]}</div>
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
                결론: 현 스쿼드는 <span className="text-foreground">{bestSim.teamStyle.transition >= 70 ? "빠른 전환·측면 스피드" : "측면 자원"}</span>이 강점이라
                <span className="text-foreground"> {best.name} 류의 {best.dna[0]}</span> 색채와 가장 잘 맞습니다.
                다만 <span className="text-foreground">{STRUCTURAL[0].label}</span>의 빈자리는 전술로 가리기 어려워, 장기적으로는 해당 포지션 육성이 핵심입니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
