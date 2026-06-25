export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* ambient backdrop — placeholder until React Bits Ferrofluid layer (M3) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(47,91,255,0.18), transparent 70%), radial-gradient(40% 40% at 70% 80%, rgba(228,0,43,0.14), transparent 70%)",
        }}
      />

      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted">
          <span className="size-1.5 rounded-full bg-bad" />
          2026.6.25 · 대한민국 0–1 남아프리카공화국 · 조 3위 · FIFA 28위
        </span>

        <h1 className="text-balance text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          이 감독이 오면,
          <br />
          한국은 <span className="text-accent">어떤 축구</span>를 할까?
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
          현 26인 스쿼드를 고정하고, 후보 감독의 전술 DNA를 넣으면
          <br className="hidden sm:block" />
          베스트 11 · 적합도 · 핵심선수 생사 · 남아공전 반사실 · 월드컵 예상도를
          <br className="hidden sm:block" />
          <span className="text-foreground">설명 가능한 점수 엔진</span>으로
          계산합니다. 런타임 AI 없음 · 100% 무료.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            disabled
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-bold text-background opacity-50"
          >
            감독 선택하기 (준비 중)
          </button>
          <a
            href="/methodology/"
            className="flex h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            방법론 · 데이터 출처
          </a>
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-widest text-muted/60">
          M0 · static export pipeline ✓
        </p>
      </div>
    </main>
  );
}
