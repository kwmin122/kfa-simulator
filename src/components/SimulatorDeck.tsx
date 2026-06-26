"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Coach, SimulationResult } from "@/data/types";
import { fitTone, ROLEQ_META, ROUND_LABEL, TIER_LABEL } from "@/lib/format";
import Strands from "./Strands";
import WhatIfScore from "./WhatIfScore";
import BaselineDelta from "./BaselineDelta";
import Pitch from "./Pitch";
import Radar from "./Radar";
import LineupClash from "./LineupClash";
import SaTable from "./SaTable";
import WcScenario from "./WcScenario";
import EvidenceCard from "./EvidenceCard";
import CountUp from "./CountUp";

export interface DeckProps {
  sims: Record<string, SimulationResult>;
  coachMeta: Record<string, Coach>;
  order: string[]; // candidate ids, sorted by fit (desc)
  baselineId: string;
}

const CORE3 = ["son-heungmin", "lee-kangin", "kim-minjae"];
type Detail = null | "tactics" | "samatch" | "worldcup" | "evidence";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SimulatorDeck({ sims, coachMeta, order, baselineId }: DeckProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Detail>(null);

  const base = sims[baselineId];
  const above = order.filter((id) => sims[id].fitScore > base.fitScore).length;
  const pct = Math.round((above / order.length) * 100);
  const bestId = order[0];

  const choose = (id: string) => {
    setPicked(id);
    setLoading(true);
    setDetail(null);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  };
  const backToPick = () => {
    setPicked(null);
    setDetail(null);
  };

  const sim = picked ? sims[picked] : null;
  const coach = picked ? coachMeta[picked] : null;
  const view: "pick" | "result" = sim && !loading ? "result" : "pick";

  return (
    <div className="relative min-h-[88vh] overflow-hidden rounded-3xl border border-line bg-surface/40">
      {/* 시뮬레이션 로딩 */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Strands label={coach?.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메인 뷰 — 감독 고르면 결과로 한 번 슬라이드 */}
      <AnimatePresence mode="wait">
        {view === "pick" ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="p-5 sm:p-8"
          >
            <PickView sims={sims} coachMeta={coachMeta} order={order} base={base} above={above} pct={pct} bestId={bestId} onPick={choose} />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 56 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="p-5 sm:p-8"
          >
            <ResultView sim={sim!} coach={coach!} fitDelta={sim!.fitScore - base.fitScore} onBack={backToPick} onDetail={setDetail} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 상세 — "분석하기" 진입부 클릭 시 옆에서 슬라이드-인 */}
      <AnimatePresence>
        {detail && sim && coach && (
          <motion.div
            key={detail}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0 z-20 overflow-y-auto rounded-3xl bg-background"
          >
            <DetailView detail={detail} sim={sim} coach={coach} base={base} onBack={() => setDetail(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── PICK ───────────────────────── */
function PickView({
  sims, coachMeta, order, base, above, pct, bestId, onPick,
}: {
  sims: Record<string, SimulationResult>; coachMeta: Record<string, Coach>; order: string[];
  base: SimulationResult; above: number; pct: number; bestId: string; onPick: (id: string) => void;
}) {
  const best = coachMeta[bestId];
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-kr-red">
        <span className="h-px w-8 bg-kr-red" /> KFA COACH SIMULATOR
      </div>
      <h1 className="headline mt-3 text-[2.2rem] leading-[1.05] sm:text-6xl">만약, 이 감독이었다면</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        남아공전 0–1 패 이후 — 감독을 고르면 <span className="text-foreground">홍명보(3-4-3, 궁합 {base.fitScore}) 대비</span> 한국 축구가 어떻게 달라지는지
        설명 가능한 점수 엔진이 시뮬레이션합니다.
      </p>

      {/* 카타르시스 스탯 스트립 */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat label="홍명보 궁합" value={`${base.fitScore}`} tone="var(--bad)" sub="/ 100" />
        <Stat label="교체 시급도" value={`${pct}%`} tone="var(--bad)" sub={`${order.length}명 중 ${above}명 더 나음`} />
        <Stat label={`최고 · ${best.name}`} value={`+${sims[bestId].fitScore - base.fitScore}`} tone="var(--good)" sub={`궁합 ${sims[bestId].fitScore}`} />
      </div>

      <div className="mt-7 flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-foreground">감독을 고르면 시뮬레이션이 시작됩니다</h2>
        <span className="text-[11px] text-muted">궁합순 · 클릭 → 예측</span>
      </div>

      {/* 감독 그리드 = 궁합 랭킹 겸 선택기 */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {order.map((id, i) => {
          const c = coachMeta[id];
          const s = sims[id];
          const d = s.fitScore - base.fitScore;
          return (
            <button
              key={id}
              onClick={() => onPick(id)}
              className="group flex flex-col rounded-xl border border-line bg-background/40 p-3 text-left transition-colors hover:border-accent hover:bg-background"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl leading-none" style={{ color: fitTone(s.fitScore) }}>{s.fitScore}</span>
              </div>
              <div className="mt-1.5 text-sm font-bold text-foreground">
                {c.name}{c.meme && <span className="ml-1 text-[9px] text-warn">예능</span>}
              </div>
              <div className="mt-0.5 text-[10px] text-muted">{TIER_LABEL[c.tier]} · {c.dna[0]}</div>
              <div className="mt-1 text-[10px] font-bold" style={{ color: d >= 0 ? "var(--good)" : "var(--bad)" }}>
                홍명보 대비 {d >= 0 ? "+" : ""}{d}
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] text-muted">※ 능력치=EA FC 앵커 주관 추정 · 예측=모델 추정 · 비하 의도 없는 팬 시뮬레이션</p>
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone: string }) {
  return (
    <div className="rounded-xl border border-line bg-background/40 p-3">
      <div className="truncate text-[10px] text-muted">{label}</div>
      <div className="font-display text-3xl leading-tight" style={{ color: tone }}>{value}</div>
      {sub && <div className="text-[10px] text-muted">{sub}</div>}
    </div>
  );
}

/* ───────────────────────── RESULT ───────────────────────── */
function ResultView({
  sim, coach, fitDelta, onBack, onDetail,
}: {
  sim: SimulationResult; coach: Coach; fitDelta: number; onBack: () => void; onDetail: (d: Detail) => void;
}) {
  const tone = fitTone(sim.fitScore);
  const core = CORE3.map((id) => {
    const v = sim.keyVerdicts.find((x) => x.playerId === id);
    const rq = v?.roleQuality ?? "limited";
    return { id, name: id === "son-heungmin" ? "손흥민" : id === "lee-kangin" ? "이강인" : "김민재", meta: ROLEQ_META[rq] };
  });
  const entries: { key: Exclude<Detail, null>; label: string; sub: string }[] = [
    { key: "tactics", label: "전술 · 라인업", sub: "베스트11 · 팀 색깔" },
    { key: "samatch", label: "남아공전이었다면", sub: "6대 문제 해결도" },
    { key: "worldcup", label: "월드컵 예상", sub: "시나리오 · 경로" },
    { key: "evidence", label: "근거 · 출처", sub: "현직 · 신뢰도" },
  ];

  return (
    <div>
      <button onClick={onBack} className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 다른 감독 고르기</button>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
            {TIER_LABEL[coach.tier]}{coach.meme && <span className="text-warn">· 예능 IF</span>}
          </div>
          <h1 className="headline mt-1 text-4xl sm:text-5xl">{coach.name}</h1>
          <p className="mt-1 font-mono text-xs text-muted">{coach.nameEn} · {sim.formation} · {coach.status}</p>
        </div>
        <div className="text-right">
          <div className="font-display text-5xl leading-none" style={{ color: tone }}><CountUp to={sim.fitScore} /></div>
          <div className="text-[11px] text-muted">스쿼드 궁합 / 100</div>
          <div className="mt-0.5 text-xs font-bold" style={{ color: fitDelta >= 0 ? "var(--good)" : "var(--bad)" }}>
            홍명보 대비 {fitDelta >= 0 ? "+" : ""}{fitDelta}
          </div>
        </div>
      </header>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* 왼쪽: What-if + 한 줄 + 핵심3 */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface/60 p-4"><WhatIfScore whatIf={sim.whatIf} big /></div>
          <p className="text-pretty text-base font-bold leading-relaxed text-foreground">{sim.headline}</p>
          <div className="rounded-2xl border border-line bg-surface/40 p-4">
            <div className="mb-2.5 text-xs font-bold text-foreground">손흥민 · 이강인 · 김민재는 사는가</div>
            <div className="grid grid-cols-3 gap-2">
              {core.map((c) => (
                <div key={c.id} className="rounded-lg bg-background/50 p-2 text-center">
                  <div className="text-sm font-bold text-foreground">{c.name}</div>
                  <div className="mt-0.5 text-lg" style={{ color: c.meta.color }}>{c.meta.arrow}</div>
                  <div className="text-[10px] font-semibold" style={{ color: c.meta.color }}>{c.meta.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 홍명보 대비 변화 막대 */}
        <div className="rounded-2xl border border-line bg-surface/40 p-4">
          <div className="mb-2.5 text-xs font-bold text-foreground">홍명보 대비, 무엇이 달라지나</div>
          <BaselineDelta deltas={sim.baselineDelta} />
        </div>
      </div>

      {/* 분석하기 진입부 — 클릭 시 옆에서 슬라이드-인 */}
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {entries.map((e) => (
          <button
            key={e.key}
            onClick={() => onDetail(e.key)}
            className="group flex flex-col rounded-xl border border-line bg-background/40 p-3 text-left transition-colors hover:border-accent hover:bg-background"
          >
            <span className="text-sm font-bold text-foreground">{e.label}</span>
            <span className="mt-0.5 text-[10px] text-muted">{e.sub}</span>
            <span className="mt-2 text-xs text-accent transition-transform group-hover:translate-x-0.5">열기 →</span>
          </button>
        ))}
      </div>

      <Link href={`/coach/${coach.id}`} className="mt-5 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-bold text-background transition-opacity hover:opacity-90">
        {coach.name} 전체 리포트 →
      </Link>
    </div>
  );
}

/* ───────────────────────── DETAIL (slide-in) ───────────────────────── */
function DetailView({
  detail, sim, coach, base, onBack,
}: {
  detail: Exclude<Detail, null>; sim: SimulationResult; coach: Coach; base: SimulationResult; onBack: () => void;
}) {
  const tone = fitTone(sim.fitScore);
  const titles: Record<Exclude<Detail, null>, string> = {
    tactics: "전술 · 라인업", samatch: "남아공전이었다면", worldcup: "월드컵 예상", evidence: "근거 · 출처",
  };
  return (
    <div className="mx-auto max-w-3xl p-5 sm:p-8">
      <button onClick={onBack} className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 결과로</button>
      <div className="mt-3 flex items-baseline gap-3">
        <h2 className="headline text-2xl sm:text-3xl">{titles[detail]}</h2>
        <span className="text-sm text-muted">{coach.name} · {sim.formation}</span>
      </div>

      <div className="mt-6">
        {detail === "tactics" && (
          <div className="space-y-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-xs text-muted">예상 베스트 11 · {sim.formation}</div>
                <Pitch formation={sim.formation} xi={sim.xi} />
              </div>
              <div>
                <div className="mb-1 text-xs text-muted">팀 색깔 (점선 = 홍명보)</div>
                <Radar style={sim.teamStyle} baseline={base.teamStyle} color={tone} />
              </div>
            </div>
            <LineupClash baseXi={base.xi} baseFormation={base.formation} xi={sim.xi} formation={sim.formation} coachName={coach.name} />
          </div>
        )}
        {detail === "samatch" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface/60 p-5"><WhatIfScore whatIf={sim.whatIf} big /></div>
            <SaTable resolution={sim.saResolution} counterfactual={sim.saCounterfactual} />
          </div>
        )}
        {detail === "worldcup" && (
          <div className="space-y-4">
            <WcScenario scenarios={sim.wcScenarios} />
            <p className="rounded-xl border border-line bg-surface/50 p-4 text-sm leading-relaxed text-foreground">{sim.wcNarrative}</p>
            <div className="flex gap-6 text-sm">
              <span className="text-muted">예상 득점 xG <span className="font-mono font-bold text-good">{sim.predictedXg.for}</span></span>
              <span className="text-muted">예상 실점 xG <span className="font-mono font-bold text-bad">{sim.predictedXg.against}</span></span>
              <span className="text-muted">평균 시나리오 <span className="font-bold text-foreground">{ROUND_LABEL[sim.wcScenarios.average]}</span></span>
            </div>
          </div>
        )}
        {detail === "evidence" && <EvidenceCard coach={coach} />}
      </div>
    </div>
  );
}
