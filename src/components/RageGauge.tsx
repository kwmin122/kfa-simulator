import Link from "next/link";

/** "감독 교체 시급도" — 시뮬레이션 기준 정직한 수치(가짜 투표 아님) + Fan Pulse 티저. */
export default function RageGauge({
  baselineFit, aboveCount, total, bestName, bestFit,
}: {
  baselineFit: number; aboveCount: number; total: number; bestName: string; bestFit: number;
}) {
  const pct = Math.round((aboveCount / total) * 100);
  const gap = bestFit - baselineFit;

  return (
    <div className="overflow-hidden rounded-2xl border border-bad/30 bg-bad/[0.04]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-bad">
            <span className="size-1.5 animate-pulse rounded-full bg-bad" /> 감독 교체 시급도
          </div>
          <p className="mt-2 text-lg font-bold leading-snug text-foreground">
            후보 {total}명 중 <span className="text-good">{aboveCount}명</span>이 홍명보보다 높은 궁합.
            <br className="hidden sm:block" /> 최고 <span className="text-foreground">{bestName} {bestFit}</span> — 홍명보(<span className="text-bad">{baselineFit}</span>)보다 <span className="text-good">+{gap}</span>.
          </p>
        </div>
        <div className="shrink-0 text-center">
          <div className="font-display text-5xl text-bad">{pct}%</div>
          <div className="text-[11px] text-muted">업그레이드 가능 비율</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-bad/20 bg-bad/[0.03] px-5 py-2.5 text-xs">
        <span className="text-muted">※ 시뮬레이션 궁합 기준 (모델 추정)</span>
        <Link href="/#ranking" className="font-bold text-bad transition-colors hover:text-foreground">전국 팬 투표 — 곧 오픈 →</Link>
      </div>
    </div>
  );
}
