import Link from "next/link";

export const metadata = {
  title: "방법론 · 데이터 출처 — 감독 시뮬레이터",
};

export default function Methodology() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20">
      <Link
        href="/"
        className="font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        ← 홈
      </Link>

      <h1 className="mt-6 text-3xl font-black tracking-tight">방법론 · 출처</h1>

      <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            이 사이트는 예측이 아니라 모델입니다
          </h2>
          <p>
            선수 능력치는 공개 레이팅(EA Sports FC 등)에 앵커링한 뒤 근거와 함께
            조정한 <span className="text-foreground">주관적 추정치</span>이며, 공식
            스탯이 아닙니다. 감독 전술 DNA는 공개 분석 기반 추정입니다. 모든 확률·
            적합도 수치는 <span className="text-foreground">&ldquo;모델 추정&rdquo;</span>
            이며, 결정론적 점수 엔진이 동일 입력에 동일 결과를 냅니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">투명성</h2>
          <p>
            각 점수는 어떤 요구(requirement)가 얼마나 매칭됐는지 분해해서
            보여줍니다. 프로필이 없는 감독은 가짜 점수를 만들지 않고 &ldquo;프로필
            필요&rdquo;로 표기합니다.
          </p>
        </section>

        <p className="font-mono text-[11px] text-muted/60">
          상세 출처 목록은 데이터 인코딩(M1·M4) 단계에서 채워집니다.
        </p>
      </div>
    </main>
  );
}
