import Link from "next/link";
import { notFound } from "next/navigation";
import { squad } from "@/data/squad";
import { buildXI, fiveAxisFit } from "@/engine";
import { allCoaches, getCoach, getSim, baselineCoach, baselineSim } from "@/lib/sims";
import { TIER_LABEL, fitTone, ROUND_LABEL } from "@/lib/format";
import type { StyleAxes } from "@/data/types";
import Pitch from "@/components/Pitch";
import Radar from "@/components/Radar";
import FiveAxes from "@/components/FiveAxes";
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

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface/80 p-5 ${className}`}>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-accent">{title}</h2>
      {children}
    </div>
  );
}

export default async function CoachPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coach = getCoach(id);
  const sim = getSim(id);
  if (!coach || !sim) notFound();

  const isBaseline = coach.id === baselineCoach.id;
  const xi = buildXI(coach, squad);
  const fit = fiveAxisFit(coach, squad, new Set(xi.xi.map((s) => s.player.id)));
  const tone = fitTone(sim.fitScore);
  const fitDelta = sim.fitScore - baselineSim.fitScore;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8">
      <Link href="/" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 전체 감독</Link>

      {/* Header */}
      <Reveal immediate>
        <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-surface/80">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{TIER_LABEL[coach.tier]}</span>
              <h1 className="headline mt-1 text-5xl">{coach.name}</h1>
              <p className="mt-1 font-mono text-sm text-muted">{coach.nameEn} · {coach.formation} · {coach.status}</p>
              {coach.rumor && <p className="mt-2 max-w-lg text-xs italic text-muted">&ldquo;{coach.rumor}&rdquo;</p>}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {coach.dna.map((d) => <span key={d} className="rounded-full border border-line bg-background/60 px-2.5 py-1 text-xs">{d}</span>)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-7xl" style={{ color: tone }}><CountUp to={sim.fitScore} /></div>
              <div className="text-[11px] text-muted">스쿼드 적합도 / 100</div>
              {!isBaseline && <div className="mt-1 text-xs font-bold" style={{ color: fitDelta >= 0 ? "var(--good)" : "var(--bad)" }}>홍명보 대비 {fitDelta >= 0 ? "+" : ""}{fitDelta}</div>}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal immediate delay={0.05}>
        <p className="mt-5 rounded-2xl border border-line bg-surface/50 p-5 leading-relaxed">{sim.explanation}</p>
      </Reveal>

      {/* 5-axis + pitch */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card title="적합도 5축 분해 (왜 이 점수인가)">
            <FiveAxes axes={sim.axes} />
            <p className="mt-4 text-[11px] text-muted">핵심 선수 30 · 전술 수행 25 · 약점 보완 20 · 단기전 15 · 현실성 10 — 모델 추정</p>
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card title={`예상 베스트 11 · ${sim.formation}`}>
            <Pitch formation={sim.formation} xi={sim.xi} />
          </Card>
        </Reveal>
      </div>

      {/* style + xG, radar + exec */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card title="어떤 축구를 하나 (스타일)">
            <div className="space-y-3">
              {AXES.map((a) => (
                <div key={a.key}>
                  <div className="mb-1 flex justify-between text-[11px] text-muted"><span>{a.lo}</span><span>{a.hi}</span></div>
                  <div className="relative h-2 rounded-full bg-background">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-kr-blue/40" style={{ width: `${coach.axes[a.key]}%` }} />
                    <div className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent" style={{ left: `${coach.axes[a.key]}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line bg-background/40 p-3 text-center">
                <div className="font-display text-2xl text-good">{sim.predictedXg.for}</div>
                <div className="text-[11px] text-muted">예상 득점 xG</div>
              </div>
              <div className="rounded-xl border border-line bg-background/40 p-3 text-center">
                <div className="font-display text-2xl text-bad">{sim.predictedXg.against}</div>
                <div className="text-[11px] text-muted">예상 실점 xG</div>
              </div>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card title="팀 색깔 (홍명보와 비교)">
            <div className="flex justify-center"><Radar style={sim.teamStyle} baseline={isBaseline ? undefined : baselineSim.teamStyle} color={tone} /></div>
            <div className="mt-3 border-t border-line pt-3">
              <div className="mb-2 text-[11px] font-bold text-muted">전술 수행 — 요구 충족</div>
              <div className="space-y-1.5">
                {fit.breakdown.map((r) => (
                  <div key={r.key} className="flex items-center gap-2 text-xs">
                    <span className="w-28 shrink-0 truncate text-foreground">{r.label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background"><div className="h-full rounded-full" style={{ width: `${r.supply}%`, background: fitTone(r.supply) }} /></div>
                    <span className="w-6 text-right font-mono text-muted">{r.supply}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Key players */}
      <Reveal>
        <div className="mt-5"><Card title="손흥민 · 이강인 · 김민재는 사는가 죽는가"><KeyPlayers verdicts={sim.keyVerdicts} /></Card></div>
      </Reveal>

      {/* SA + WC */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal><Card title="남아공전 반사실"><SaPanel resolution={sim.saResolution} counterfactual={sim.saCounterfactual} /></Card></Reveal>
        <Reveal delay={0.05}>
          <Card title="월드컵 예상도 — 몇 강까지?">
            <WcReachBar reach={sim.wcReach} />
            <div className="mt-4 rounded-xl border border-line bg-background/40 p-3 text-sm">
              <span className="text-muted">홍명보 예상: </span><span className="font-bold">{ROUND_LABEL[baselineSim.wcReach.expected]}</span>
              <span className="text-muted"> → {coach.name}: </span><span className="font-bold" style={{ color: tone }}>{ROUND_LABEL[sim.wcReach.expected]}</span>
            </div>
          </Card>
        </Reveal>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        출처: {coach.sources.map((s, i) => <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">[{i + 1}]</a>)} · 능력치·전술은 주관 추정, 수치는 모델 추정입니다.
      </p>
    </main>
  );
}
