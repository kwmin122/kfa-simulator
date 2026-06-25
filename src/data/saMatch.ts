import type { SaTag } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// South Africa match diagnosis — 2026.6.25, 대한민국 0-1 남아프리카공화국.
// Tags are derived from public match reporting (not opta event data). Each tag
// declares which tactical traits MITIGATE it, so the engine can score whether a
// candidate coach's system would have addressed the problem (반사실 #7).
// ──────────────────────────────────────────────────────────────────────────

export const SA_MATCH = {
  date: "2026-06-25",
  opponent: "남아프리카공화국",
  score: { kr: 0, opp: 1 },
  context:
    "월드컵 조별리그. 손흥민·이재성을 벤치에 두고 오현규·황희찬 선발 로테이션. 전반 열세 후 " +
    "후반 시작 대거 교체에도 반등하지 못하고 0-1 패. 조 3위 추락, FIFA 랭킹 25→28위.",
  sources: [
    "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026",
    "https://www.newspim.com/news/view/20260625000807",
    "https://www.wikitree.co.kr/articles/1143121",
  ],
};

export const saTags: SaTag[] = [
  {
    key: "bluntAttack",
    label: "무딘 공격 / 결정력 부재",
    evidence: "다수 점유에도 유효슈팅·골 생산 실패, 0-1 무득점 패.",
    mitigatedBy: {
      axes: { verticality: 70, tempo: 65 },
      requirements: ["mobileStriker", "paceWingers", "creativeAM"],
    },
  },
  {
    key: "noPenetration",
    label: "침투 부재 / 배후 공략 실패",
    evidence: "측면·배후 침투가 적어 상대 블록을 흔들지 못함.",
    mitigatedBy: {
      axes: { width: 65, verticality: 72 },
      requirements: ["paceWingers", "overlappingFB", "mobileStriker"],
    },
  },
  {
    key: "slowBuildUp",
    label: "느린 빌드업 / 전개 정체",
    evidence: "후방-중원 전개가 느려 상대 정비 시간을 허용.",
    mitigatedBy: {
      axes: { tempo: 68, buildFromBack: 70 },
      requirements: ["ballPlayingCB", "pressResistantMF", "boxToBoxCM"],
    },
  },
  {
    key: "rotationMisfire",
    label: "로테이션 실패 / 베스트 전력 미가동",
    evidence: "손흥민·이재성 벤치 선발이 경기력 저하로 직결됐다는 비판.",
    mitigatedBy: {
      // mitigated by systems that maximize the best XI's stars (leadership/creativity-led)
      requirements: ["creativeAM"],
    },
  },
  {
    key: "lowPressTrigger",
    label: "압박 트리거 부재 / 수동적 수비",
    evidence: "고정된 전방 압박 신호 없이 물러서며 주도권 상실.",
    mitigatedBy: {
      axes: { pressHeight: 70 },
      requirements: ["highStaminaFront", "holdingDM"],
    },
  },
  {
    key: "lateGameFade",
    label: "교체·후반 운영 실패",
    evidence: "후반 대거 교체에도 흐름을 바꾸지 못함.",
    mitigatedBy: {
      axes: { pressHeight: 62 },
      requirements: ["highStaminaFront"],
    },
  },
];
