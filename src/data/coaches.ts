import type { Coach } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Coach profiles (v2). Each carries: tactical axes + squad requirements (for
// "전술 수행"), intangibles (for "월드컵 단기전"), and realism (for "현실 리스크").
// Style/intangible numbers are estimates from public tactical analysis.
// Current jobs verified per source where possible. This is the verification
// SLICE (Phase A); the full Korea-relevant pool is added in Phase B.
// ──────────────────────────────────────────────────────────────────────────

export const hongMyungbo: Coach = {
  id: "hong-myungbo", name: "홍명보", nameEn: "Hong Myung-bo", tier: "national",
  status: "현 대한민국 감독 (2024.7~)", nationality: "대한민국", age: 56,
  formation: "4-2-3-1", altFormations: ["4-4-2"],
  axes: { possession: 55, pressHeight: 45, tempo: 50, width: 52, verticality: 48, buildFromBack: 56 },
  requirements: [
    { key: "creativeAM", weight: 0.7, label: "창의적 10번(이강인 의존)" },
    { key: "mobileStriker", weight: 0.55, label: "활동량형 9번" },
    { key: "ballPlayingCB", weight: 0.5, label: "빌드업 CB" },
    { key: "boxToBoxCM", weight: 0.5, label: "박스투박스 중원" },
  ],
  intangibles: { complexity: 36, planB: 24, tournamentXP: 50, defensiveStability: 48, starManagement: 32 },
  realism: { koreaPlausibility: 100, available: 100, asiaNtXP: 90, squadControl: 50 },
  dna: ["실리적 4-2-3-1", "개인 능력 의존", "반응형 블록", "로테이션 운영"],
  blurb:
    "안정·실리 우선의 반응형 운영. 고정된 압박 트리거와 빠른 전환 메커니즘이 없어, 막히면 대안이 " +
    "약하다. 남아공전에서는 손흥민·이재성을 벤치에 두는 로테이션과 느린 빌드업이 역효과로 지목됐다.",
  profiled: true,
  sources: ["https://namu.wiki/w/홍명보호(성인 2기)", "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026"],
};

export const bento: Coach = {
  id: "bento", name: "파울루 벤투", nameEn: "Paulo Bento", tier: "free",
  status: "무직 (전 대한민국·UAE 감독)", rumor: "한국 팬들이 가장 비교하고 싶어하는 전임자. 빌드업·황인범·손흥민 활용의 기준점.",
  nationality: "포르투갈", age: 56,
  formation: "4-2-3-1", altFormations: ["4-3-3"],
  axes: { possession: 76, pressHeight: 62, tempo: 58, width: 64, verticality: 56, buildFromBack: 80 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.8, label: "후방 빌드업 CB" },
    { key: "pressResistantMF", weight: 0.82, label: "탈압박 중원(황인범)" },
    { key: "creativeAM", weight: 0.7, label: "10번 창조" },
    { key: "holdingDM", weight: 0.68, label: "조율형 6번" },
    { key: "overlappingFB", weight: 0.66, label: "전진 풀백" },
  ],
  intangibles: { complexity: 60, planB: 50, tournamentXP: 82, defensiveStability: 62, starManagement: 80 },
  realism: { koreaPlausibility: 86, available: 72, asiaNtXP: 95, squadControl: 80 },
  dna: ["후방 빌드업", "점유 구조", "일관된 시스템"],
  blurb:
    "후방 빌드업과 점유 구조로 팀에 명확한 색을 입힌 전임자. 황인범을 중심으로 한 탈압박 빌드업이 " +
    "현 스쿼드와 잘 맞고, 카타르 월드컵 16강의 토너먼트 경험과 선수단 장악이 강점.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Paulo_Bento"],
};

export const klinsmann: Coach = {
  id: "klinsmann", name: "위르겐 클린스만", nameEn: "Jürgen Klinsmann", tier: "free",
  status: "무직 (전 대한민국 감독, 2024.2 경질)", rumor: "반면교사·밈 담당. '이 감독이면 또 어떻게 망가지나'의 표본.",
  nationality: "독일", age: 61,
  formation: "4-4-2", altFormations: ["4-2-3-1"],
  axes: { possession: 50, pressHeight: 54, tempo: 60, width: 58, verticality: 66, buildFromBack: 44 },
  requirements: [
    { key: "mobileStriker", weight: 0.55, label: "개인 능력 9번" },
    { key: "paceWingers", weight: 0.55, label: "측면 개인 돌파" },
    { key: "creativeAM", weight: 0.45, label: "스타 의존 창조" },
  ],
  intangibles: { complexity: 22, planB: 18, tournamentXP: 68, defensiveStability: 28, starManagement: 62 },
  realism: { koreaPlausibility: 28, available: 86, asiaNtXP: 72, squadControl: 38 },
  dna: ["무전술 논란", "개인 능력 의존", "자율 방임"],
  blurb:
    "뚜렷한 전술 구조 없이 개인 능력에 의탁한다는 비판을 받은 전임자. 압박 트리거·빌드업 구조가 " +
    "약해 남아공전 같은 문제를 해결하기 어렵고, 단기전 안정성도 떨어진다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Jürgen_Klinsmann"],
};

export const moriyasu: Coach = {
  id: "moriyasu", name: "모리야스 하지메", nameEn: "Hajime Moriyasu", tier: "national",
  status: "일본 대표팀 감독", rumor: "일본이 잘 나가니 무조건 넣는다. '일본식 관리형 축구를 한국에 넣으면?' 훅.",
  nationality: "일본", age: 57,
  formation: "4-2-3-1", altFormations: ["3-4-2-1", "4-3-3"],
  axes: { possession: 64, pressHeight: 70, tempo: 66, width: 66, verticality: 66, buildFromBack: 66 },
  requirements: [
    { key: "pressResistantMF", weight: 0.78, label: "탈압박 중원" },
    { key: "paceWingers", weight: 0.72, label: "측면 전환" },
    { key: "highStaminaFront", weight: 0.74, label: "전방 압박" },
    { key: "ballPlayingCB", weight: 0.68, label: "빌드업 CB(3백 겸용)" },
    { key: "boxToBoxCM", weight: 0.7, label: "박스투박스" },
  ],
  intangibles: { complexity: 56, planB: 76, tournamentXP: 86, defensiveStability: 70, starManagement: 78 },
  realism: { koreaPlausibility: 30, available: 45, asiaNtXP: 95, squadControl: 80 },
  dna: ["유연한 3/4백", "관리형 압박+전환", "토너먼트 실용"],
  blurb:
    "백3·백4를 오가는 유연함과 강한 토너먼트 결과(독일·스페인 격파, 16강 2회). 관리형 안정성과 " +
    "플랜 B가 단기전에 최적이지만, 한일 관계상 한국 부임 현실성은 낮다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Hajime_Moriyasu"],
};

export const klopp: Coach = {
  id: "klopp", name: "위르겐 클롭", nameEn: "Jürgen Klopp", tier: "free",
  status: "레드불 글로벌 축구 총괄 (전 리버풀)", rumor: "이름값·게겐프레싱. 손흥민·황희찬 버프 상상.",
  nationality: "독일", age: 58,
  formation: "4-3-3", altFormations: ["4-2-3-1"],
  axes: { possession: 55, pressHeight: 92, tempo: 85, width: 70, verticality: 82, buildFromBack: 60 },
  requirements: [
    { key: "highStaminaFront", weight: 0.95, label: "전방 고강도 압박" },
    { key: "paceWingers", weight: 0.85, label: "배후 침투 윙어" },
    { key: "boxToBoxCM", weight: 0.8, label: "박스투박스 엔진" },
    { key: "holdingDM", weight: 0.72, label: "단단한 앵커" },
    { key: "mobileStriker", weight: 0.75, label: "압박 가담 9번" },
  ],
  intangibles: { complexity: 70, planB: 60, tournamentXP: 55, defensiveStability: 60, starManagement: 82 },
  realism: { koreaPlausibility: 8, available: 35, asiaNtXP: 5, squadControl: 88 },
  dna: ["게겐프레싱", "수직 전환", "헤비메탈"],
  blurb:
    "잃는 즉시 재탈취하는 게겐프레싱과 폭발적 전환. 손흥민·황희찬·김민재의 강점을 전면에 세우지만, " +
    "압박에 약한 창조형 10번은 희생되고, 무엇보다 한국 부임 현실성이 거의 없다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Jürgen_Klopp"],
};

export const mourinho: Coach = {
  id: "mourinho", name: "조제 무리뉴", nameEn: "José Mourinho", tier: "free",
  status: "무직 (전 첼시·레알·로마·페네르바체)", rumor: "실리·빅매치. 김민재 버프, 이강인은 애매.",
  nationality: "포르투갈", age: 63,
  formation: "4-2-3-1", altFormations: ["4-3-3", "5-3-2"],
  axes: { possession: 32, pressHeight: 34, tempo: 60, width: 54, verticality: 80, buildFromBack: 36 },
  requirements: [
    { key: "paceWingers", weight: 0.9, label: "역습 스피드 윙어" },
    { key: "holdingDM", weight: 0.85, label: "보호형 더블 피벗" },
    { key: "aerialCB", weight: 0.78, label: "제공권 CB" },
    { key: "mobileStriker", weight: 0.68, label: "전방 침투 9번" },
    { key: "targetStriker", weight: 0.6, label: "연계 타깃맨" },
  ],
  intangibles: { complexity: 54, planB: 70, tournamentXP: 78, defensiveStability: 88, starManagement: 64 },
  realism: { koreaPlausibility: 22, available: 60, asiaNtXP: 30, squadControl: 78 },
  dna: ["로우블록", "빠른 역습", "수비 조직"],
  blurb:
    "내려서서 단단히 막고 한 방으로 끝낸다. 빠른 측면 자원이 많은 현 스쿼드와 역습 궁합이 좋고 " +
    "수비 안정성·빅매치 경험이 단기전에 강하지만, 점유가 적어 이강인 활용은 애매하다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/José_Mourinho"],
};

export const BASELINE_COACH = hongMyungbo;

export const coaches: Coach[] = [
  hongMyungbo,
  bento,
  moriyasu,
  mourinho,
  klopp,
  klinsmann,
];

export const candidateCoaches: Coach[] = coaches.filter((c) => c.id !== BASELINE_COACH.id);
