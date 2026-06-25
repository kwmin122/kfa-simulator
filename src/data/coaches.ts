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

/** Baseline coach (the incumbent everything is measured against). */
export const BASELINE_COACH = hongMyungbo;

/** All coaches the engine knows about. Candidates appended in M3/M4. */
export const coaches: Coach[] = [hongMyungbo];
