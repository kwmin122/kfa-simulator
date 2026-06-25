import Link from "next/link";
import { notFound } from "next/navigation";
import { squad } from "@/data/squad";
import { fitScore } from "@/engine";
import { allCoaches, getCoach, getSim, baselineCoach, baselineSim } from "@/lib/sims";
import { TIER_LABEL, fitTone, ROUND_LABEL, SUB_LABEL } from "@/lib/format";
import type { StyleAxes } from "@/data/types";
import Pitch from "@/components/Pitch";
import Radar from "@/components/Radar";
import KeyPlayers from "@/components/KeyPlayers";
import SaPanel from "@/components/SaPanel";
import WcReachBar from "@/components/WcReachBar";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export function generateStaticParams() {
  return allCoaches.map((c) => ({ id: c.id }));
}

const AXES: { key: keyof StyleAxes; lo: string; hi: string }[] = [
  { key: "possession", lo: "직선", hi: "점유" },
  { key: "pressHeight", lo: "로우블록", hi: "하이프레스" },
  { key: "tempo", lo: "느림", hi: "빠름" },
  { key: "width", lo: "좁게", hi: "넓게" },
  { key: "verticality", lo: "순환", hi: "수직" },
  { key: "buildFromBack", lo: "롱볼", hi: "후방빌드업" },
];

const Card = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-border bg-surface/80 p-5 ${className}`}>
    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">{title}</h2>
    {children}
  </div>
);

export default async function CoachPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coach = getCoach(id);
  const sim = getSim(id);
  if (!coach || !sim) notFound();

  const isBaseline = coach.id === baselineCoach.id;
  const fit = fitScore(coach, squad);
  const tone = fitTone(sim.fitScore);
  const fitDelta = sim.fitScore - baselineSim.fitScore;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8">
      <Link href="/" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 전체 감독</Link>

      {/* Header */}
      <Reveal immediate>
        <div className="mt-4 flex flex-col gap-5 rounded-3xl border border-border bg-surface/80 p-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <span className="text-xs font-medium text-muted">{TIER_LABEL[coach.tier]} · {coach.status}</span>
            <h1 className="mt-1 text-4xl font-black tracking-tight">{coach.name}</h1>
            <p className="font-mono text-sm text-muted">{coach.nameEn} · {coach.formation}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {coach.dna.map((d) => (
                <span key={d} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground">{d}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="font-mono text-6xl font-black" style={{ color: tone }}>
                <CountUp to={sim.fitScore} />
              </div>
              <div className="text-[11px] text-muted">스쿼드 적합도</div>
              {!isBaseline && (
                <div className="mt-1 text-xs font-bold" style={{ color: fitDelta >= 0 ? "var(--good)" : "var(--bad)" }}>
                  홍명보 대비 {fitDelta >= 0 ? "+" : ""}{fitDelta}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Narrative */}
      <Reveal immediate delay={0.05}>
        <p className="mt-5 rounded-2xl border border-border bg-surface/50 p-5 leading-relaxed text-foreground">
          {sim.explanation}
        </p>
      </Reveal>

      {/* Pitch + identity */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card title={`예상 베스트 11 · ${sim.formation}`}>
            <Pitch formation={sim.formation} xi={sim.xi} />
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card title="어떤 축구를 하나 (스타일)">
            <div className="space-y-3">
              {AXES.map((a) => (
                <div key={a.key}>
                  <div className="mb-1 flex justify-between text-[11px] text-muted">
                    <span>{a.lo}</span>
                    <span>{a.hi}</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-background">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-kr-blue/40" style={{ width: `${coach.axes[a.key]}%` }} />
                    <div className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent" style={{ left: `${coach.axes[a.key]}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-background/40 p-3 text-center">
                <div className="font-mono text-2xl font-bold text-good">{sim.predictedXg.for}</div>
                <div className="text-[11px] text-muted">예상 득점 xG</div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-3 text-center">
                <div className="font-mono text-2xl font-bold text-bad">{sim.predictedXg.against}</div>
                <div className="text-[11px] text-muted">예상 실점 xG</div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Radar + requirement breakdown */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card title="팀 색깔 (홍명보와 비교)">
            <div className="flex justify-center">
              <Radar sub={sim.subScores} baseline={isBaseline ? undefined : baselineSim.subScores} color={tone} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
              {(Object.keys(SUB_LABEL) as (keyof typeof SUB_LABEL)[]).map((k) => (
                <div key={k} className="rounded-lg bg-background/40 py-1.5">
                  <div className="font-mono text-base font-bold text-foreground">{sim.subScores[k]}</div>
                  <div className="text-muted">{SUB_LABEL[k]}</div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card title="왜 이 점수인가 (요구 매칭 분해)">
            <div className="space-y-2.5">
              {fit.breakdown.map((r) => (
                <div key={r.key}>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">{r.label}</span>
                    <span className="font-mono text-muted">충족 {r.supply} · 비중 {Math.round(r.weight * 100)}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-background">
                    <div className="h-full rounded-full" style={{ width: `${r.supply}%`, background: fitTone(r.supply) }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-muted">
              적합도 = 요구별 충족도의 가중 평균 × 스타일 보정({Math.round(fit.styleMult * 100)}%). 스타일이 스쿼드와 어긋나면 보정이 깎입니다.
            </p>
          </Card>
        </Reveal>
      </div>

      {/* Key players */}
      <Reveal>
        <div className="mt-5">
          <Card title="손흥민 · 이강인 · 김민재는 사는가 죽는가">
            <KeyPlayers verdicts={sim.keyVerdicts} />
          </Card>
        </div>
      </Reveal>

      {/* SA + WC */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card title="남아공전 반사실">
            <SaPanel resolution={sim.saResolution} counterfactual={sim.saCounterfactual} />
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card title="월드컵 예상도 — 몇 강까지?">
            <WcReachBar reach={sim.wcReach} />
            <div className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-sm">
              <span className="text-muted">홍명보 예상: </span>
              <span className="font-bold">{ROUND_LABEL[baselineSim.wcReach.expected]}</span>
              <span className="text-muted"> → {coach.name}: </span>
              <span className="font-bold" style={{ color: tone }}>{ROUND_LABEL[sim.wcReach.expected]}</span>
            </div>
          </Card>
        </Reveal>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        출처: {coach.sources.map((s, i) => (
          <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">[{i + 1}]</a>
        ))} · 능력치·전술은 주관 추정, 수치는 모델 추정입니다.
      </p>
    </main>
  );
}
