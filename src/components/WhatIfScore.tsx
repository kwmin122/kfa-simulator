import type { SimulationResult } from "@/data/types";

/** "남아공전이 이 감독이었다면" 가상 스코어 — 카타르시스 펀치. */
export default function WhatIfScore({ whatIf, isBaseline, big = false }: { whatIf: SimulationResult["whatIf"]; isBaseline?: boolean; big?: boolean }) {
  const { kr, opp } = whatIf;
  const res = kr > opp ? "승" : kr === opp ? "무" : "패";
  const tone = res === "승" ? "var(--good)" : res === "무" ? "var(--warn)" : "var(--bad)";

  return (
    <div className="text-center">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
        {isBaseline ? "남아공전 — 실제 결과" : "남아공전이 이 감독이었다면"}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-3">
        <span className="text-xs text-muted">대한민국</span>
        <span className={`font-display ${big ? "text-6xl" : "text-4xl"} leading-none`} style={{ color: tone }}>
          {kr}<span className="mx-1 text-muted">–</span>{opp}
        </span>
        <span className="text-xs text-muted">남아공</span>
        <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${tone} 16%, transparent)`, color: tone }}>{res}</span>
      </div>
      {!isBaseline && (
        <div className="mt-1.5 text-[11px] text-muted">
          실제 <span className="text-bad line-through">0–1 패</span> → 이 감독이면 <span style={{ color: tone }}>{kr}–{opp} {res}</span> · 모델 추정
        </div>
      )}
    </div>
  );
}
