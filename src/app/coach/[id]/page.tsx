import Link from "next/link";
import { notFound } from "next/navigation";
import { squad } from "@/data/squad";
import { computeFit } from "@/engine";
import { allCoaches, getCoach, getSim, baselineCoach, baselineSim } from "@/lib/sims";
import { TIER_LABEL, fitTone } from "@/lib/format";
import type { StyleAxes } from "@/data/types";
import Pitch from "@/components/Pitch";
import LineupClash from "@/components/LineupClash";
import WhatIfScore from "@/components/WhatIfScore";
import Radar from "@/components/Radar";
import FiveAxes from "@/components/FiveAxes";
import SurvivalTable from "@/components/SurvivalTable";
import SaTable from "@/components/SaTable";
import WcScenario from "@/components/WcScenario";
import BaselineDelta from "@/components/BaselineDelta";
import EvidenceCard, { ConfidenceBadge } from "@/components/EvidenceCard";
import CountUp from "@/components/CountUp";

export function generateStaticParams() {
  return allCoaches.map((c) => ({ id: c.id }));
}

const AXES: { key: keyof StyleAxes; lo: string; hi: string }[] = [
  { key: "possession", lo: "직선", hi: "점유" },
  { key: "pressHeight", lo: "로우블록", hi: "하이프레스" },
  { key: "verticality", lo: "순환", hi: "수직" },
  { key: "buildFromBack", lo: "롱볼", hi: "후방빌드업" },
];

function Section({ n, title, sub, children }: { n: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-7">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent">{n}</span>
        <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
        {sub && <span className="text-xs text-muted">{sub}</span>}
      </div>
      {children}
    </section>
  );
}

export default async function CoachPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coach = getCoach(id);
  const sim = getSim(id);
  if (!coach || !sim) notFound();

  const isBaseline = coach.id === baselineCoach.id;
  const fit = computeFit(coach, squad, new Set(sim.xi.map((s) => s.player.id)));
  const tone = fitTone(sim.fitScore);
  const fitDelta = sim.fitScore - baselineSim.fitScore;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-8">
      <Link href="/" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 전체 감독</Link>

      {/* Header */}
      <header className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
            {TIER_LABEL[coach.tier]}
            {coach.meme && <span className="text-warn">· 예능 IF</span>}
          </div>
          <h1 className="headline mt-1 text-5xl sm:text-6xl">{coach.name}</h1>
          <p className="mt-1 font-mono text-sm text-muted">{coach.nameEn} · {sim.formation} · {coach.status}</p>
        </div>
        <div className="text-right">
          <div className="font-display text-6xl leading-none" style={{ color: tone }}><CountUp to={sim.fitScore} /></div>
          <div className="text-[11px] text-muted">스쿼드 궁합 / 100</div>
          {!isBaseline && (
            <div className="mt-1 text-xs font-bold" style={{ color: fitDelta >= 0 ? "var(--good)" : "var(--bad)" }}>
              홍명보 대비 {fitDelta >= 0 ? "+" : ""}{fitDelta}
            </div>
          )}
        </div>
      </header>

      {/* ① 한 줄 결론 */}
      <p className="mt-6 text-pretty text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
        {sim.headline}
      </p>
      {coach.rumor && <p className="mt-2 text-sm italic text-muted">&ldquo;{coach.rumor}&rdquo;</p>}

      {/* ② 홍명보 대비 변화 */}
      <Section n="01" title="홍명보 대비, 무엇이 달라지나" sub="팀 스타일 변화">
        {isBaseline ? (
          <p className="text-sm leading-relaxed text-muted">현재 기준선이라 변화량은 0입니다. 다른 감독을 고르면 이 자리에 홍명보(3-4-3) 대비 변화가 표시됩니다.</p>
        ) : (
          <BaselineDelta deltas={sim.baselineDelta} />
        )}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AXES.map((a) => (
            <div key={a.key}>
              <div className="mb-1 flex justify-between text-[10px] text-muted"><span>{a.lo}</span><span>{a.hi}</span></div>
              <div className="relative h-1.5 rounded-full bg-background">
                <div className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${coach.axes[a.key]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ③ 핵심 선수 생존표 */}
      <Section n="02" title="손흥민·이강인·김민재는 사는가 죽는가" sub="핵심 선수 생존">
        <SurvivalTable verdicts={sim.keyVerdicts} />
      </Section>

      {/* ④ 남아공전 해결 + What-if 스코어 */}
      <Section n="03" title="남아공전 문제를 해결하는가" sub="6대 문제 진단">
        <div className="mb-5 rounded-2xl border border-line bg-surface/60 p-5">
          <WhatIfScore whatIf={sim.whatIf} isBaseline={isBaseline} big />
        </div>
        <SaTable resolution={sim.saResolution} counterfactual={sim.saCounterfactual} />
      </Section>

      {/* ⑤ 월드컵 시나리오 */}
      <Section n="04" title="월드컵, 어디까지 가나" sub="시나리오">
        <WcScenario scenarios={sim.wcScenarios} />
        <div className="mt-3 flex gap-6 text-sm">
          <span className="text-muted">예상 득점 xG <span className="font-mono font-bold text-good">{sim.predictedXg.for}</span></span>
          <span className="text-muted">예상 실점 xG <span className="font-mono font-bold text-bad">{sim.predictedXg.against}</span></span>
        </div>
      </Section>

      {/* ⑥ 근거 */}
      <Section n="05" title="근거 · 출처" sub="현직·신뢰도">
        <EvidenceCard coach={coach} />
      </Section>

      {/* 라인업 대결 */}
      {!isBaseline && (
        <Section n="06" title="라인업 대결 — 홍명보 vs 후보" sub="베스트 11 비교">
          <LineupClash baseXi={baselineSim.xi} baseFormation={baselineSim.formation} xi={sim.xi} formation={sim.formation} coachName={coach.name} />
        </Section>
      )}

      {/* 보조: XI · 색깔 · 분해 */}
      <Section n={isBaseline ? "06" : "07"} title="상세 — 베스트 11 · 팀 색깔 · 궁합 분해" sub="참고">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs text-muted">예상 베스트 11 · {sim.formation}</div>
            <Pitch formation={sim.formation} xi={sim.xi} />
          </div>
          <div className="space-y-5">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-muted">
                <span>팀 색깔 (점선=홍명보)</span><ConfidenceBadge confidence={coach.provenance.confidence} />
              </div>
              <Radar style={sim.teamStyle} baseline={isBaseline ? undefined : baselineSim.teamStyle} color={tone} />
            </div>
            <div>
              <div className="mb-2 text-xs text-muted">궁합 4축 (핵심33·전술28·약점22·단기17 = 100, 현실성 제외)</div>
              <FiveAxes axes={fit.axes} />
            </div>
          </div>
        </div>
      </Section>

      <p className="mt-6 text-center text-[11px] text-muted">{sim.explanation}</p>
    </main>
  );
}
