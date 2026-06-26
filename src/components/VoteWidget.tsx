"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CompareItem } from "./CompareHero";
import WhatIfScore from "./WhatIfScore";
import { fitTone } from "@/lib/format";

interface Vote { change: boolean; anger: number; pick: string }
const KEY = "kfa-vote-v1";
const ANGER = ["", "😐 그냥 그럼", "😒 답답", "😠 화남", "🤬 분노", "🌋 폭발"];

/** 감독 교체 찬반 투표 + 픽한 감독 분석 표시 (MVP: localStorage, 전국 집계는 Fan Pulse DB 연결 후). */
export default function VoteWidget({ coaches, baselineFit, simUrgency }: { coaches: CompareItem[]; baselineFit: number; simUrgency: number }) {
  const [vote, setVote] = useState<Vote | null>(null);
  const [change, setChange] = useState<boolean | null>(null);
  const [anger, setAnger] = useState(4);
  const [pick, setPick] = useState("");

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setVote(JSON.parse(raw)); } catch {}
  }, []);

  const submit = () => {
    if (change === null) return;
    const v: Vote = { change, anger, pick };
    localStorage.setItem(KEY, JSON.stringify(v));
    setVote(v);
  };
  const reset = () => { localStorage.removeItem(KEY); setVote(null); setChange(null); setPick(""); };

  if (vote) {
    const picked = coaches.find((c) => c.id === vote.pick);
    return (
      <div className="rounded-2xl border border-line bg-surface/70 p-5">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">투표 완료 — 고마워요</div>
          <p className="mt-2 text-base font-bold text-foreground">
            <span style={{ color: vote.change ? "var(--bad)" : "var(--muted)" }}>{vote.change ? "당장 교체" : "지켜보자"}</span>
            {" · "}분노 <span className="text-bad">{vote.anger}/5</span>
          </p>
          <div className="mt-1 text-[11px] text-muted">시뮬 교체 시급도 {simUrgency}% · 전국 집계는 Fan Pulse 정식 오픈 후</div>
        </div>

        {picked ? (
          <div className="mt-4 border-t border-line pt-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[11px] text-muted">당신의 픽 — 이 감독이라면</div>
                <div className="text-lg font-black text-foreground">{picked.name}{picked.meme && <span className="ml-1 text-[10px] text-warn">예능</span>}</div>
                <div className="font-mono text-[11px] text-muted">{picked.formation}</div>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl" style={{ color: fitTone(picked.fitScore) }}>{picked.fitScore}</span>
                <span className="ml-1 text-xs font-bold" style={{ color: picked.fitScore - baselineFit >= 0 ? "var(--good)" : "var(--bad)" }}>
                  {picked.fitScore - baselineFit >= 0 ? "+" : ""}{picked.fitScore - baselineFit}
                </span>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-line bg-background/40 py-2.5"><WhatIfScore whatIf={picked.whatIf} /></div>
            <p className="mt-3 text-sm font-bold leading-relaxed text-foreground">{picked.headline}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{picked.wcNarrative}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {picked.deltas.slice(0, 4).map((d) => {
                const bad = (!d.good && d.delta > 0) || (d.good && d.delta < 0);
                return <span key={d.label} className="rounded-md border border-line bg-surface px-2 py-1 text-[11px]"><span className="text-muted">{d.label} </span><span className="font-mono font-bold" style={{ color: d.delta === 0 ? "var(--muted)" : bad ? "var(--bad)" : "var(--good)" }}>{d.delta > 0 ? "+" : ""}{d.delta}</span></span>;
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              {picked.core.map((c) => <span key={c.name}><span className="font-bold text-foreground">{c.name}</span> <span style={{ color: c.color }}>{c.level}</span></span>)}
            </div>
            <Link href={`/coach/${picked.id}`} className="mt-4 inline-flex h-9 items-center rounded-full bg-foreground px-4 text-xs font-bold text-background">{picked.name} 전체 리포트 →</Link>
          </div>
        ) : (
          <p className="mt-4 border-t border-line pt-4 text-center text-xs text-muted">대체 감독을 고르면 여기에 그 감독의 분석이 표시됩니다.</p>
        )}

        <button onClick={reset} className="mt-4 block w-full text-center text-xs text-muted underline-offset-2 hover:text-foreground hover:underline">다시 투표</button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-5">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-bad">전국 팬 투표 · 당신의 한 표</div>
      <h3 className="mt-2 text-lg font-bold text-foreground">홍명보 감독, 교체해야 하나?</h3>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[{ v: true, label: "당장 교체", c: "var(--bad)" }, { v: false, label: "지켜보자", c: "var(--muted)" }].map((o) => (
          <button key={String(o.v)} onClick={() => setChange(o.v)} className="rounded-xl border-2 py-3 text-sm font-bold transition-colors"
            style={{ borderColor: change === o.v ? o.c : "var(--line)", color: change === o.v ? o.c : "var(--muted)", background: change === o.v ? `color-mix(in srgb, ${o.c} 10%, transparent)` : "transparent" }}>
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-muted"><span>분노 레벨</span><span>{ANGER[anger]}</span></div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setAnger(n)} className="h-9 flex-1 rounded-lg border text-sm font-bold transition-colors"
              style={{ borderColor: n <= anger ? "var(--bad)" : "var(--line)", background: n <= anger ? "color-mix(in srgb, var(--bad) 14%, transparent)" : "transparent", color: n <= anger ? "var(--bad)" : "var(--muted)" }}>{n}</button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-xs text-muted">대신 어느 감독? (선택 — 픽하면 분석이 떠요)</div>
        <select value={pick} onChange={(e) => setPick(e.target.value)} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground">
          <option value="">— 감독 선택 —</option>
          {coaches.map((c) => <option key={c.id} value={c.id}>{c.name}{c.meme ? " (예능)" : ""}</option>)}
        </select>
      </div>

      <button onClick={submit} disabled={change === null} className="mt-4 h-11 w-full rounded-full bg-bad text-sm font-bold text-white transition-opacity disabled:opacity-40">한 표 던지기</button>
      <p className="mt-2 text-center text-[10px] text-muted">로그인 없음 · 개인정보 저장 안 함 · 지금은 내 브라우저에만 저장(전국 집계는 곧)</p>
    </div>
  );
}
