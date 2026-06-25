import type { Coach } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Coach tactical profiles. Style axes (0–100) and requirements are estimates
// from public tactical analysis. `profiled: true` means a full vector exists;
// unprofiled coaches (added via M4 crawl) render as "프로필 필요".
// Hong Myung-bo is the BASELINE every candidate is compared against.
// ──────────────────────────────────────────────────────────────────────────

export const hongMyungbo: Coach = {
  id: "hong-myungbo",
  name: "홍명보",
  nameEn: "Hong Myung-bo",
  tier: "national",
  status: "현 대한민국 감독 (2024.7~)",
  nationality: "대한민국",
  age: 56,
  formation: "4-2-3-1",
  altFormations: ["4-4-2"],
  axes: {
    possession: 55,
    pressHeight: 45,
    tempo: 50,
    width: 52,
    verticality: 48,
    buildFromBack: 56,
  },
  requirements: [
    { key: "creativeAM", weight: 0.8, label: "창의적 10번(이강인 의존)" },
    { key: "mobileStriker", weight: 0.6, label: "활동량형 9번" },
    { key: "ballPlayingCB", weight: 0.6, label: "빌드업 가능 CB" },
    { key: "boxToBoxCM", weight: 0.55, label: "박스투박스 중원" },
    { key: "pressResistantMF", weight: 0.5, label: "탈압박 미드필더" },
  ],
  dna: ["실리적 4-2-3-1", "개인 능력 의존", "반응형 수비 블록", "로테이션 운영"],
  blurb:
    "안정과 실리를 우선하는 반응형 운영. 손흥민·이강인 등 개인 능력에 공격을 의탁하지만, " +
    "고정된 전방 압박 트리거와 빠른 전환 메커니즘이 부족해 막히면 대안이 약하다는 평가. " +
    "남아공전에서는 로테이션과 느린 빌드업이 역효과로 지목됐다.",
  profiled: true,
  sources: [
    "https://namu.wiki/w/홍명보호(성인 2기)",
    "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026",
  ],
};

// ── Candidate coaches (마키 후보군, 스타일 공간을 의도적으로 분산) ──────────
// 현재 소속/상황은 M4 크롤에서 정밀 검증 — 여기선 전술 정체성(안정적·문서화됨)이
// 핵심이라 status는 보수적으로 표기. 4명은 엔진 변별력 검증용 + M3/M4 재사용.

export const klopp: Coach = {
  id: "klopp",
  name: "위르겐 클롭",
  nameEn: "Jürgen Klopp",
  tier: "free",
  status: "전 리버풀 (게겐프레싱 원조)",
  nationality: "독일",
  age: 58,
  formation: "4-3-3",
  altFormations: ["4-2-3-1"],
  axes: { possession: 55, pressHeight: 92, tempo: 85, width: 70, verticality: 82, buildFromBack: 60 },
  requirements: [
    { key: "highStaminaFront", weight: 0.95, label: "전방 고강도 압박 3톱" },
    { key: "paceWingers", weight: 0.85, label: "배후 침투 스피드 윙어" },
    { key: "boxToBoxCM", weight: 0.8, label: "박스투박스 중원 엔진" },
    { key: "holdingDM", weight: 0.72, label: "단단한 6번(앵커)" },
    { key: "mobileStriker", weight: 0.75, label: "압박 가담 9번" },
    { key: "pressResistantMF", weight: 0.68, label: "탈압박 미드필더" },
    { key: "overlappingFB", weight: 0.7, label: "공격 가담 풀백" },
  ],
  dna: ["게겐프레싱", "수직 전환", "하드러닝", "헤비메탈 풋볼"],
  blurb:
    "볼을 잃는 즉시 5초 내 재탈취하는 게겐프레싱과 폭발적 수직 전환. 전방 3명의 " +
    "압박 강도와 활동량이 생명선이라, 압박에 가담하지 않는 창조형 10번은 희생될 수 있다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Jürgen_Klopp"],
};

export const guardiola: Coach = {
  id: "guardiola",
  name: "펩 과르디올라",
  nameEn: "Pep Guardiola",
  tier: "club",
  status: "맨체스터 시티 (포지셔널 플레이)",
  nationality: "스페인",
  age: 55,
  formation: "4-3-3",
  altFormations: ["3-2-4-1", "4-2-3-1"],
  axes: { possession: 95, pressHeight: 78, tempo: 52, width: 80, verticality: 42, buildFromBack: 95 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.95, label: "후방 빌드업 CB" },
    { key: "pressResistantMF", weight: 0.92, label: "압박 견디는 중원" },
    { key: "sweeperKeeper", weight: 0.8, label: "빌드업 가담 GK" },
    { key: "creativeAM", weight: 0.78, label: "하프스페이스 창조형" },
    { key: "holdingDM", weight: 0.78, label: "조율형 6번" },
    { key: "overlappingFB", weight: 0.72, label: "인버티드/오버랩 풀백" },
  ],
  dna: ["포지셔널 플레이", "점유 지배", "하프스페이스", "후방 빌드업"],
  blurb:
    "극단적 점유와 후방 빌드업으로 경기를 지배. 발밑 좋은 CB와 탈압박 미드필더가 " +
    "전제 조건이라, 빠르지만 빌드업이 정교하지 않은 스쿼드에선 마찰이 생긴다. 이강인은 산다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Pep_Guardiola"],
};

export const mourinho: Coach = {
  id: "mourinho",
  name: "조제 무리뉴",
  nameEn: "José Mourinho",
  tier: "club",
  status: "실리적 로우블록·역습 (전 첼시/레알/로마)",
  nationality: "포르투갈",
  age: 63,
  formation: "4-2-3-1",
  altFormations: ["4-3-3", "5-3-2"],
  axes: { possession: 32, pressHeight: 34, tempo: 60, width: 54, verticality: 80, buildFromBack: 36 },
  requirements: [
    { key: "paceWingers", weight: 0.9, label: "역습 스피드 윙어" },
    { key: "holdingDM", weight: 0.85, label: "보호형 더블 피벗" },
    { key: "aerialCB", weight: 0.78, label: "제공권 CB" },
    { key: "mobileStriker", weight: 0.68, label: "전방 침투 9번" },
    { key: "targetStriker", weight: 0.6, label: "연계 타깃맨" },
    { key: "overlappingFB", weight: 0.48, label: "선택적 공격 풀백" },
  ],
  dna: ["로우블록", "빠른 역습", "실리 축구", "수비 조직"],
  blurb:
    "내려서서 단단히 막고 한 방 역습으로 끝낸다. 스피드 윙어와 보호형 더블 피벗, " +
    "제공권 CB가 핵심. 빠른 측면 자원이 많은 이 스쿼드와 궁합이 좋은 편. 손흥민은 산다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/José_Mourinho"],
};

export const xabiAlonso: Coach = {
  id: "xabi-alonso",
  name: "사비 알론소",
  nameEn: "Xabi Alonso",
  tier: "club",
  status: "현대적 균형·수직성 (전 레버쿠젠)",
  nationality: "스페인",
  age: 44,
  formation: "3-4-3",
  altFormations: ["3-4-2-1", "4-2-3-1"],
  axes: { possession: 70, pressHeight: 70, tempo: 64, width: 68, verticality: 66, buildFromBack: 74 },
  requirements: [
    { key: "pressResistantMF", weight: 0.82, label: "탈압박 더블 피벗" },
    { key: "ballPlayingCB", weight: 0.76, label: "전진 패스 CB(3백)" },
    { key: "overlappingFB", weight: 0.74, label: "윙백 폭 제공" },
    { key: "creativeAM", weight: 0.72, label: "라인 사이 창조형" },
    { key: "paceWingers", weight: 0.68, label: "전환 측면 자원" },
    { key: "boxToBoxCM", weight: 0.66, label: "전후방 연결 8번" },
  ],
  dna: ["3-4-3 유연성", "빌드업+수직성 균형", "윙백 활용", "전방 압박"],
  blurb:
    "후방 빌드업과 빠른 수직 전환을 균형 있게 결합한 현대적 모델. 윙백과 탈압박 " +
    "더블 피벗을 활용해 측면 폭과 중앙 침투를 동시에 노린다. 전체적으로 무난한 적합도.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Xabi_Alonso"],
};

/** Baseline coach (the incumbent everything is measured against). */
export const BASELINE_COACH = hongMyungbo;

/** All coaches the engine knows about. More appended in M4 crawl. */
export const coaches: Coach[] = [
  hongMyungbo,
  klopp,
  guardiola,
  mourinho,
  xabiAlonso,
];

/** Candidates only (excludes the incumbent baseline). */
export const candidateCoaches: Coach[] = coaches.filter(
  (c) => c.id !== BASELINE_COACH.id,
);
