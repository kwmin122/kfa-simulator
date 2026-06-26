import type { SaTag } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// South Africa match diagnosis — 2026.6.25, 대한민국 0-1 남아프리카공화국.
// The 6 problems are defined per the service's framing. Each declares, in
// ABSOLUTE terms, the tactical traits that FIX it (not "vs Hong"). So the
// weakness-fix axis measures whether a coach's system genuinely solves the
// problem — and Hong, whose system produced these problems, scores low.
// ──────────────────────────────────────────────────────────────────────────

export const SA_MATCH = {
  date: "2026-06-25",
  opponent: "남아프리카공화국",
  score: { kr: 0, opp: 1 },
  context:
    "월드컵 조별리그. 손흥민·이재성을 벤치에 두고 로테이션 가동, 다수 점유에도 무득점 0-1 패. " +
    "조 3위 추락, FIFA 랭킹 25→28위. 32강 진출마저 불투명해진 위기.",
  sources: [
    "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026",
    "https://www.newspim.com/news/view/20260625000807",
    "https://www.wikitree.co.kr/articles/1143121",
  ],
};

/** 남아공전 실제 선발 라인업 (3-4-3). 홍명보 baseline은 bestXI가 아니라 이 고정 XI를
 *  쓴다 — 손흥민·이재성을 벤치에 둔 '선택 실패'가 분석에 그대로 드러나야 하기 때문.
 *  순서는 formationSlots("3-4-3")와 일치: GK,CB,CB,CB,RWB,CM,CM,LWB,RW,ST,LW. */
export const HONG_SA_FORMATION = "3-4-3";
export const HONG_SA_XI: string[] = [
  "kim-seunggyu",
  "lee-hanbeom", "kim-minjae", "lee-kihyuk",
  "seol-youngwoo", "hwang-inbeom", "paik-seungho", "lee-taeseok",
  "lee-kangin", "oh-hyeongyu", "hwang-heechan",
];
/** 홍명보가 벤치에 둔 핵심 자원 (선택 실패로 분석에 명시). */
export const HONG_BENCHED = ["son-heungmin", "lee-jaesung"];

export const saTags: SaTag[] = [
  {
    key: "finalThirdCreativity",
    label: "마지막 1/3 창의성 부족",
    evidence: "점유는 했지만 박스 근처에서 키패스·침투가 막혔다.",
    fixedBy: {
      axes: { possession: { prefer: "high", target: 70 }, verticality: { prefer: "high", target: 66 } },
      requirements: ["creativeAM", "pressResistantMF"],
    },
  },
  {
    key: "sonUsage",
    label: "손흥민 활용 불명확",
    evidence: "에이스를 벤치에 두거나 왼쪽에 고립시켜 영향력을 죽였다.",
    fixedBy: {
      axes: { verticality: { prefer: "high", target: 66 }, tempo: { prefer: "high", target: 60 } },
      requirements: ["paceWingers"],
    },
  },
  {
    key: "lkiIsolation",
    label: "이강인 고립 또는 과의존",
    evidence: "창조를 한 명에게만 의존하거나, 볼 터치를 보장하지 못했다.",
    fixedBy: {
      axes: { possession: { prefer: "high", target: 72 }, buildFromBack: { prefer: "high", target: 70 } },
      requirements: ["pressResistantMF", "creativeAM"],
    },
  },
  {
    key: "boxThreat",
    label: "박스 안 위협 부족",
    evidence: "크로스·침투·세컨볼 모두 상대 박스 안에서 위협을 만들지 못했다.",
    fixedBy: {
      axes: { verticality: { prefer: "high", target: 68 }, width: { prefer: "high", target: 64 } },
      requirements: ["mobileStriker", "targetStriker", "overlappingFB"],
    },
  },
  {
    key: "slowTempo",
    label: "느린 템포",
    evidence: "전개가 느려 상대가 수비를 정비할 시간을 줬다.",
    fixedBy: {
      axes: { tempo: { prefer: "high", target: 66 }, verticality: { prefer: "high", target: 64 } },
      requirements: ["pressResistantMF"],
    },
  },
  {
    key: "lowFinishing",
    label: "높은 점유 대비 낮은 결정력",
    evidence: "기회의 질이 낮고 마무리가 무뎌 0득점에 그쳤다.",
    fixedBy: {
      axes: { verticality: { prefer: "high", target: 66 } },
      requirements: ["mobileStriker", "paceWingers"],
    },
  },
];
