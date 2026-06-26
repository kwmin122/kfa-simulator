import Link from "next/link";

export const metadata = { title: "방법론 · 데이터 출처 — 만약, 이 감독이었다면" };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-6">
      <h2 className="mb-2 text-base font-bold text-foreground">{title}</h2>
      <div className="space-y-2 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}

export default function Methodology() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <Link href="/" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← 홈</Link>
      <h1 className="headline mt-5 text-4xl">방법론 · 출처</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        한국 축구 황금세대가 아까운 팬이 만든 <span className="text-foreground">재미용 예측 시뮬레이션</span>입니다.
        예측이 아니라 모델이고, 모든 수치는 결정론 점수 엔진이 동일 입력에 동일 결과로 냅니다.
      </p>

      <Block title="궁합 점수 = 4축 100점 (현실성 제외)">
        <p>
          메인 점수는 <span className="text-foreground">&ldquo;감독이 좋은가&rdquo;가 아니라 현 26인이 그 축구를 실제로 수행할 수 있나&rdquo;</span>를 봅니다.
          네 축의 합이 100점입니다:
        </p>
        <ul className="ml-4 list-disc">
          <li><span className="text-foreground">핵심 선수 활용 33</span> — 손흥민·이강인·김민재 등이 살아나는가</li>
          <li><span className="text-foreground">전술 수행 28</span> — 감독의 요구를 스쿼드가 채울 수 있는가</li>
          <li><span className="text-foreground">남아공 약점 보완 22</span> — 마지막 1/3 창의성·박스 위협 등을 해결하는가</li>
          <li><span className="text-foreground">단기전 적합 17</span> — 토너먼트 경험·플랜 B·안정성</li>
        </ul>
        <p>
          <span className="text-foreground">현실성(부임 가능성)은 점수에 넣지 않습니다.</span> 펩·클롭처럼 현실성이 낮아도 궁합은 높을 수 있고,
          그건 점수가 아니라 &lsquo;근거&rsquo;에서 따로 표시합니다.
        </p>
      </Block>

      <Block title="결과는 '홍명보 대비 변화'가 핵심">
        <p>
          기준선은 남아공전에서 실제로 가동한 <span className="text-foreground">홍명보 3-4-3</span>입니다. 후보 감독을 고르면 전방 압박·전환·공격 위협도 같은
          팀 스타일이 홍명보 대비 얼마나 달라지는지(+/−)를 먼저 보여줍니다. 점수보다 <span className="text-foreground">&ldquo;어떤 축구가 되는가&rdquo;</span>가 본체입니다.
        </p>
        <p>
          공격성은 <span className="text-foreground">공격 위협도(지공 + 전환 + 압박)</span>로 묶어 봅니다. &lsquo;지공 생산&rsquo;만 보면 개인 자원이 비슷해 직관과 어긋날 수 있어서입니다.
        </p>
      </Block>

      <Block title="월드컵은 단정이 아니라 시나리오">
        <p>
          &ldquo;몇 강&rdquo;을 하나로 단정하지 않고 <span className="text-foreground">최악 · 평균 · 최고</span> 시나리오 범위로 보여줍니다. 모두 모델 추정입니다.
        </p>
      </Block>

      <Block title="데이터 신뢰도 (근거 레이어)">
        <p>
          감독마다 현직·확인일·출처·<span className="text-foreground">신뢰도(confidence)</span>를 함께 표시합니다.
          위키/나무위키 단독 출처는 &lsquo;근거 충실(high)&rsquo;로 표기하지 않습니다. 공식·주요 언론 등 2개 이상일 때만 high입니다.
        </p>
        <p>
          2024년 <span className="text-foreground">보도/영상 기반 후보군</span>(제시 마치 등)은 확정 사실이 아니라 &lsquo;보도 기반&rsquo;으로 medium/low로 표시합니다.
          방송·FM(예능 IF) 후보는 재미용으로 명확히 구분합니다.
        </p>
        <p>
          선수 능력치는 8개 전술 카테고리(빌드업·전진성·마무리·압박활동량·수비안정성·전술유연성·국대적합성·최근폼)로,
          공개 프로필(Transfermarkt·FBref·FotMob) + 큐레이션 기반의 <span className="text-foreground">주관적 추정치</span>입니다. 공식 스탯이 아닙니다.
        </p>
      </Block>

      <Block title="면책">
        <p>
          특정 감독·선수를 폄하할 의도가 없습니다. 모든 수치는 재미를 위한 모델 추정이며 실제 경기 결과·선수 평가와 다를 수 있습니다.
          한국 축구를 응원하는 마음으로 만들었습니다. 🇰🇷
        </p>
      </Block>
    </main>
  );
}
