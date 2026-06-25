# KFA 감독 시뮬레이터 — "만약 이 감독이었다면?"

> 한국 축구를 사랑하는 한 사람으로서 만들었습니다.
>
> 우리에게 분명 **황금세대**가 있었습니다. 손흥민, 김민재, 이강인… 이렇게 좋은
> 선수들이 한 시대에 모인 게 너무 아까워서, *"만약 저 감독이 우리 대표팀을
> 맡았다면 어떤 축구를 하고, 어디까지 갈 수 있었을까?"* 를 **재미로 돌려보는
> 예측 시뮬레이션** 사이트입니다.
>
> 누구를 비하하려는 의도는 전혀 없습니다. 그냥 팬의 마음으로 돌려보는
> **팬 분석용 시뮬레이션**입니다. 모든 수치는 정답이 아니라 *모델의 추정*이에요.

남아공전(2026.6.25, 0-1 패) 이후, 현 26인 스쿼드를 고정해두고 후보 감독의 전술
DNA를 넣으면 — 베스트 11, 적합도, 핵심선수의 생사, 남아공전 반사실, 월드컵
예상도까지 **설명 가능한 점수 엔진**이 계산합니다.

## 무엇을 보여주나

각 감독에 대해:

1. **어떤 축구를 하게 되는가** — 포메이션 + 스타일 6축
2. **손흥민 / 이강인 / 김민재가 사는가 죽는가** — 수혜·중립·희생 판정 + 이유
3. **남아공전 문제를 해결하는가** — 진단 태그별 ✅ / △ / ❌
4. **"남아공전이 달랐을까?"** — 결과 시프트 추정 (경기 단위 반사실)
5. **월드컵 몇 강까지?** — 도달 라운드 밴드 + 확률 (토너먼트 반사실)
6. **궁합 랭킹** — 현 스쿼드와의 적합도 순위 (3층: 현직 국대 / 무직 / 클럽)
7. **현 감독(홍명보)과 비교**
8. **예상 xG** — 중립 경기 기준 모델 추정 득실
9. **"앞으로 한국 국대를 어떻게?"** — 종합 제언

## 어떻게 동작하나 (정직하게)

- **런타임 AI 없음 · 서버 없음 · 100% 정적 · 완전 무료.** Next.js를 정적
  사이트로 빌드(`output: export`)하고, 미리 인코딩한 데이터를 **결정론적 점수
  엔진**이 클라이언트에서 계산합니다. 동일 입력 → 동일 결과.
- **선수 능력치(0–100)는 공개 레이팅(EA Sports FC 등)에 앵커링한 뒤 스카우팅
  프로필로 조정한 주관적 추정치**입니다. 공식 스탯이 아닙니다.
- **감독 전술 DNA**는 공개 전술 분석 기반 추정입니다.
- 모든 확률·적합도는 **"모델 추정"**으로 표기하고, 어떤 요구(requirement)가
  얼마나 매칭됐는지 **분해해서** 보여줍니다 (오라클 아닌 탐색 가능한 모델).
- 프로필이 없는 감독은 **가짜 점수를 만들지 않고 "프로필 필요"로 표기**합니다.

## 데이터 모델

DB 서버는 없고, 타입이 명확한 정적 컬렉션 + 엔진이 만드는 계산 결과로 구성됩니다
(`src/data/types.ts` 가 단일 진실원).

### `players` — `src/data/squad.ts`
| 필드 | 설명 |
| --- | --- |
| `id`, `name`, `nameEn`, `number` | 식별 |
| `group`, `primary`, `eligible[]` | 포지션 그룹 / 주 포지션 / 소화 가능 역할 (`preferred_roles`) |
| `age`, `club`, `caps`, `foot`, `captain` | 신상 |
| `attributes` | `pace · stamina · pressing · buildUp(passing) · creativity · dribbling · finishing · aerial · tackling(defending) · positioning · leadership` (0–100) |
| `gkRating`, `fcAnchor`, `note` | GK 전용 평점 / 앵커한 EA FC 오버롤 / 스카우팅 한줄 |

> `strengths` / `weaknesses` 는 **저장하지 않고 `attributes`에서 파생**합니다
> (상·하위 능력치 → 강점·약점). 단일 진실원 유지 + 일관성 보장.
> `transition`은 선수 raw 값이 아니라 엔진의 sub-score로 계산합니다
> (pace·stamina·verticality 조합).

### `coaches` — `src/data/coaches.ts`
| 필드 | 설명 |
| --- | --- |
| `id`, `name`, `tier`, `status`, `nationality` | 식별 (`tier` = national/free/club) |
| `formation`, `altFormations[]` | 포메이션 |
| `axes` | 스타일 6축: `possession · pressHeight(pressing_level) · tempo · width(attacking_width) · verticality(transition_speed) · buildFromBack(build_up_style)` |
| `requirements[]` | 가중 요구 역할 (`required_roles`), 각 `{key, weight, label}` |
| `dna[]`, `blurb`, `profiled`, `sources[]` | 전술 태그 / 소개 / 프로필 보유 여부 / 출처 |

### `simulations` (계산 결과) — `SimulationResult`
엔진이 `(coach × squad)`에서 결정론적으로 생성: `coachId`, `squadVersion`,
`formation`, `xi[]`, `fitScore`, `subScores`, `strengths/weaknesses`,
`keyVerdicts[]`, `saResolution[]`, `saCounterfactual`, `predictedXg`,
`wcReach`, `explanation`. (당신이 제안한 `fit_score · predicted_xg ·
explanation` 스키마를 그대로 담되, 설명 가능하도록 확장.)

## 기술 스택

Next.js 16 (App Router, 정적 export) · TypeScript · Tailwind v4 · React Bits
(어워드급 인터랙션, MIT) · 배포: Vercel 무료(정적).

## 개발

```bash
npm run dev     # 개발 서버
npm run build   # 정적 export → out/
npm test        # 엔진 유닛 테스트 (결정론·범위·랭킹 검증)
```

## 면책

이 사이트의 모든 수치는 **재미를 위한 모델 추정**이며 실제 경기 결과·선수 평가와
다를 수 있습니다. 특정 감독·선수를 폄하할 의도가 없습니다. 한국 축구를 응원하는
마음으로 만들었습니다. 🇰🇷
