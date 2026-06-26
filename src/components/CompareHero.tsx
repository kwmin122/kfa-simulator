"use client";

import { useState } from "react";
import Link from "next/link";
import { fitTone } from "@/lib/format";
import WhatIfScore from "@/components/WhatIfScore";

export interface CompareItem {
  id: string;
  name: string;
  tier: string;
  meme: boolean;
  fitScore: number;
  formation: string;
  headline: string;
  whatIf: { kr: number; opp: number };
  deltas: { label: string; delta: number; good: boolean }[];
  core: { name: string; level: string; color: string }[];
}
export interface Baseline {
  name: string;
  formation: string;
  fitScore: number;
}

function DeltaChip({ label, delta, good }: { label: string; delta: number; good: boolean }) {
  const bad = (!good && delta > 0) || (good && delta < 0);
  const color = delta === 0 ? "var(--muted)" : bad ? "var(--bad)" : "var(--good)";
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-xs">
      <span className="text-muted">{label}</span>
      <span className="font-mono font-bold" style={{ color }}>{delta > 0 ? "+" : ""}{delta}</span>
    </span>
  );
}

/** Comparison-first hero: pick a coach → instant 홍명보 vs selected. */
export default function CompareHero({ items, baseline }: { items: CompareItem[]; baseline: Baseline }) {
  const [id, setId] = useState(items[0]?.id);
  const sel = items.find((i) => i.id === id) ?? items[0];
  const tone = fitTone(sel.fitScore);
  const fitDelta = sel.fitScore - baseline.fitScore;

  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
      {/* coach picker */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setId(it.id)}
            className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderColor: it.id === id ? "var(--accent)" : "var(--line)",
              color: it.id === id ? "var(--accent)" : "var(--muted)",
              background: it.id === id ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
            }}
          >
            {it.name}{it.meme ? " ·예능" : ""}
          </button>
        ))}
      </div>

      {/* vs header */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-right">
          <div className="text-xs text-muted">현재 기준선</div>
          <div className="text-lg font-bold text-foreground">{baseline.name}</div>
          <div className="font-mono text-xs text-muted">{baseline.formation}</div>
          <div className="font-display text-3xl text-bad">{baseline.fitScore}</div>
        </div>
        <div className="font-display text-xl text-muted">VS</div>
        <div>
          <div className="text-xs text-muted">{sel.meme ? "예능 IF" : "후보 감독"}</div>
          <div className="text-lg font-bold text-foreground">{sel.name}</div>
          <div className="font-mono text-xs text-muted">{sel.formation}</div>
          <div className="font-display text-3xl" style={{ color: tone }}>
            {sel.fitScore}
            <span className="ml-1 align-middle text-xs font-bold" style={{ color: fitDelta >= 0 ? "var(--good)" : "var(--bad)" }}>
              {fitDelta >= 0 ? "+" : ""}{fitDelta}
            </span>
          </div>
        </div>
      </div>

      {/* what-if score — 카타르시스 */}
      <div className="mt-5 rounded-xl border border-line bg-background/40 py-3">
        <WhatIfScore whatIf={sel.whatIf} />
      </div>

      {/* headline */}
      <p className="mt-4 text-pretty text-base font-bold leading-relaxed text-foreground">{sel.headline}</p>

      {/* deltas */}
      <div className="mt-4 flex flex-wrap gap-2">
        {sel.deltas.map((d) => <DeltaChip key={d.label} {...d} />)}
      </div>

      {/* core players */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-4">
        {sel.core.map((c) => (
          <span key={c.name} className="text-xs">
            <span className="font-bold text-foreground">{c.name}</span>{" "}
            <span style={{ color: c.color }}>{c.level}</span>
          </span>
        ))}
      </div>

      <Link
        href={`/coach/${sel.id}`}
        className="mt-5 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-bold text-background transition-opacity hover:opacity-90"
      >
        {sel.name} 전체 리포트 →
      </Link>
    </div>
  );
}
