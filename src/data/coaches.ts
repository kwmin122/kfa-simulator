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

// ── Phase B: Korea-relevant pool (찌라시 + 분석적으로 재밌는 감독) ──────────

export const shinTaeyong: Coach = {
  id: "shin-taeyong", name: "신태용", nameEn: "Shin Tae-yong", tier: "domestic",
  status: "페르시자 자카르타 감독 (2026.6~)", rumor: "한국형 현실 후보. 2018 독일전 승리·인니 대표팀 경험으로 토너먼트 운영 비교가 재밌다.",
  nationality: "대한민국", age: 55,
  formation: "4-2-3-1", altFormations: ["3-4-3", "4-4-2"],
  axes: { possession: 52, pressHeight: 60, tempo: 66, width: 60, verticality: 70, buildFromBack: 50 },
  requirements: [
    { key: "paceWingers", weight: 0.78, label: "역습 측면" },
    { key: "mobileStriker", weight: 0.7, label: "침투형 9번" },
    { key: "boxToBoxCM", weight: 0.7, label: "활동량 중원" },
    { key: "creativeAM", weight: 0.65, label: "10번 창조" },
  ],
  intangibles: { complexity: 48, planB: 72, tournamentXP: 80, defensiveStability: 58, starManagement: 70 },
  realism: { koreaPlausibility: 70, available: 42, asiaNtXP: 92, squadControl: 72 },
  dna: ["한국형 토너먼트", "역습·세트피스", "변칙 전술"],
  blurb: "강팀 상대 변칙과 세트피스, 빠른 역습으로 한 방을 노리는 한국형 토너먼트 운영. 2018 독일전 승리와 인도네시아에서의 성과로 단기전 변별력이 강점.",
  profiled: true, sources: ["https://namu.wiki/w/신태용"],
};

export const potter: Coach = {
  id: "potter", name: "그레이엄 포터", nameEn: "Graham Potter", tier: "national",
  status: "스웨덴 대표팀 감독 (2025.10~, 2030까지 연장)", rumor: "전술가 이미지. 이강인·김민재를 살리는 유연한 포지셔널이 매력이지만 스웨덴과 계약 중.",
  nationality: "잉글랜드", age: 51,
  formation: "3-4-2-1", altFormations: ["4-2-3-1", "4-3-3"],
  axes: { possession: 64, pressHeight: 68, tempo: 58, width: 66, verticality: 56, buildFromBack: 76 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.78, label: "빌드업 CB(3백)" },
    { key: "pressResistantMF", weight: 0.8, label: "탈압박 중원" },
    { key: "overlappingFB", weight: 0.74, label: "윙백 폭" },
    { key: "creativeAM", weight: 0.7, label: "라인 사이 10번" },
    { key: "holdingDM", weight: 0.68, label: "조율 6번" },
  ],
  intangibles: { complexity: 70, planB: 72, tournamentXP: 55, defensiveStability: 64, starManagement: 72 },
  realism: { koreaPlausibility: 25, available: 20, asiaNtXP: 5, squadControl: 70 },
  dna: ["포지셔널 유연성", "3-4-2-1 가변", "약팀 극대화"],
  blurb: "백3·백4를 오가는 유연한 포지셔널로 개개인을 살리는 전술가. 이강인·김민재 활용 상상엔 좋지만, 2030까지 스웨덴과 계약돼 현실성은 낮다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Graham_Potter"],
};

export const scaloni: Coach = {
  id: "scaloni", name: "리오넬 스칼로니", nameEn: "Lionel Scaloni", tier: "national",
  status: "아르헨티나 대표팀 감독", rumor: "월드컵 우승 DNA. 토너먼트 밸런스·스타 관리의 교과서.",
  nationality: "아르헨티나", age: 48,
  formation: "4-3-3", altFormations: ["4-4-2", "4-2-3-1"],
  axes: { possession: 60, pressHeight: 62, tempo: 62, width: 62, verticality: 68, buildFromBack: 60 },
  requirements: [
    { key: "creativeAM", weight: 0.78, label: "10번 창조" },
    { key: "paceWingers", weight: 0.72, label: "스피드 측면" },
    { key: "boxToBoxCM", weight: 0.72, label: "박스투박스" },
    { key: "holdingDM", weight: 0.7, label: "균형 6번" },
    { key: "mobileStriker", weight: 0.68, label: "활동량 9번" },
  ],
  intangibles: { complexity: 50, planB: 80, tournamentXP: 95, defensiveStability: 72, starManagement: 85 },
  realism: { koreaPlausibility: 15, available: 22, asiaNtXP: 10, squadControl: 85 },
  dna: ["토너먼트 밸런스", "스타 관리", "실용 4-3-3"],
  blurb: "월드컵 우승으로 증명된 토너먼트 밸런스와 스타 관리. 경기별 적응과 플랜 B가 단기전에 최적이지만 한국행 현실성은 거의 없다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Lionel_Scaloni"],
};

export const deschamps: Coach = {
  id: "deschamps", name: "디디에 데샹", nameEn: "Didier Deschamps", tier: "national",
  status: "프랑스 대표팀 감독 (2026 이후 이임 예정)", rumor: "실리축구·스타 활용·월드컵형 감독.",
  nationality: "프랑스", age: 57,
  formation: "4-2-3-1", altFormations: ["4-3-3", "4-4-2"],
  axes: { possession: 55, pressHeight: 58, tempo: 60, width: 60, verticality: 66, buildFromBack: 56 },
  requirements: [
    { key: "paceWingers", weight: 0.75, label: "역습 측면" },
    { key: "holdingDM", weight: 0.78, label: "보호형 6번" },
    { key: "mobileStriker", weight: 0.7, label: "침투 9번" },
    { key: "aerialCB", weight: 0.68, label: "제공권 CB" },
    { key: "creativeAM", weight: 0.66, label: "스타 창조" },
  ],
  intangibles: { complexity: 45, planB: 78, tournamentXP: 95, defensiveStability: 82, starManagement: 80 },
  realism: { koreaPlausibility: 20, available: 55, asiaNtXP: 10, squadControl: 82 },
  dna: ["실리축구", "스타 활용", "월드컵 DNA"],
  blurb: "화려함보다 결과. 견고한 수비 위에 개인 능력을 푸는 월드컵형 실용주의로 단기전 안정성이 최상급이다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Didier_Deschamps"],
};

export const enrique: Coach = {
  id: "enrique", name: "루이스 엔리케", nameEn: "Luis Enrique", tier: "club",
  status: "파리 생제르맹 감독", rumor: "점유율·전방압박. 한국 미드필드가 버티는지 보기 좋다.",
  nationality: "스페인", age: 56,
  formation: "4-3-3", altFormations: ["4-2-3-1"],
  axes: { possession: 90, pressHeight: 82, tempo: 58, width: 78, verticality: 50, buildFromBack: 90 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.9, label: "후방 빌드업 CB" },
    { key: "pressResistantMF", weight: 0.9, label: "압박 견디는 중원" },
    { key: "sweeperKeeper", weight: 0.78, label: "빌드업 GK" },
    { key: "creativeAM", weight: 0.74, label: "하프스페이스 창조" },
    { key: "holdingDM", weight: 0.8, label: "조율 6번" },
  ],
  intangibles: { complexity: 75, planB: 60, tournamentXP: 80, defensiveStability: 66, starManagement: 74 },
  realism: { koreaPlausibility: 10, available: 25, asiaNtXP: 12, squadControl: 82 },
  dna: ["점유 지배", "전방 압박", "후방 빌드업"],
  blurb: "극단적 점유와 전방 압박. 발밑 좋은 후방이 전제라 빠르지만 빌드업이 정교하지 않은 현 스쿼드와는 마찰이 크다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Luis_Enrique"],
};

export const bielsa: Coach = {
  id: "bielsa", name: "마르셀로 비엘사", nameEn: "Marcelo Bielsa", tier: "national",
  status: "우루과이 대표팀 감독", rumor: "극단적 압박. 한국 선수단이 터질지 살아날지 재미가 크다.",
  nationality: "아르헨티나", age: 70,
  formation: "3-4-3", altFormations: ["4-3-3", "3-3-1-3"],
  axes: { possession: 70, pressHeight: 95, tempo: 80, width: 80, verticality: 78, buildFromBack: 72 },
  requirements: [
    { key: "highStaminaFront", weight: 0.95, label: "전방위 고강도 압박" },
    { key: "paceWingers", weight: 0.82, label: "측면 침투" },
    { key: "boxToBoxCM", weight: 0.85, label: "박스투박스 엔진" },
    { key: "overlappingFB", weight: 0.78, label: "윙백 폭발" },
    { key: "pressResistantMF", weight: 0.7, label: "탈압박" },
  ],
  intangibles: { complexity: 85, planB: 30, tournamentXP: 65, defensiveStability: 50, starManagement: 60 },
  realism: { koreaPlausibility: 15, available: 30, asiaNtXP: 5, squadControl: 70 },
  dna: ["극단적 압박", "맨마킹", "하드러닝"],
  blurb: "전원 맨마킹과 미친 활동량의 비엘사 볼. 스쿼드 체력의 한계를 시험하며, 살아나면 폭발하지만 터지면 무너지는 양날의 검.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Marcelo_Bielsa"],
};

export const hwangSunhong: Coach = {
  id: "hwang-sunhong", name: "황선홍", nameEn: "Hwang Sun-hong", tier: "domestic",
  status: "국내 지도자 (전 U-23·대전)", rumor: "국내파 현실 후보. 한국형 직선 축구 비교용.",
  nationality: "대한민국", age: 57,
  formation: "4-4-2", altFormations: ["4-2-3-1"],
  axes: { possession: 54, pressHeight: 60, tempo: 62, width: 58, verticality: 64, buildFromBack: 52 },
  requirements: [
    { key: "mobileStriker", weight: 0.72, label: "침투 9번" },
    { key: "paceWingers", weight: 0.7, label: "측면 돌파" },
    { key: "boxToBoxCM", weight: 0.66, label: "활동량 중원" },
    { key: "holdingDM", weight: 0.64, label: "보호 6번" },
  ],
  intangibles: { complexity: 42, planB: 50, tournamentXP: 62, defensiveStability: 56, starManagement: 58 },
  realism: { koreaPlausibility: 75, available: 60, asiaNtXP: 80, squadControl: 60 },
  dna: ["한국형 직선", "측면·침투", "투지"],
  blurb: "직선적이고 투지 있는 한국형 축구. 화려하진 않지만 국내 지도자로서 현실성이 높은 후보.",
  profiled: true, sources: ["https://namu.wiki/w/황선홍"],
};

export const kimPangon: Coach = {
  id: "kim-pangon", name: "김판곤", nameEn: "Kim Pan-gon", tier: "domestic",
  status: "울산 HD 감독 (전 말레이시아 대표팀)", rumor: "데이터·체계 기반. 아시아 정통 후보.",
  nationality: "대한민국", age: 57,
  formation: "4-3-3", altFormations: ["4-2-3-1", "3-4-3"],
  axes: { possession: 62, pressHeight: 66, tempo: 62, width: 64, verticality: 62, buildFromBack: 64 },
  requirements: [
    { key: "pressResistantMF", weight: 0.74, label: "탈압박 중원" },
    { key: "ballPlayingCB", weight: 0.68, label: "빌드업 CB" },
    { key: "paceWingers", weight: 0.7, label: "측면 전환" },
    { key: "boxToBoxCM", weight: 0.7, label: "박스투박스" },
    { key: "holdingDM", weight: 0.66, label: "조율 6번" },
  ],
  intangibles: { complexity: 52, planB: 62, tournamentXP: 70, defensiveStability: 60, starManagement: 70 },
  realism: { koreaPlausibility: 72, available: 45, asiaNtXP: 85, squadControl: 72 },
  dna: ["체계적 빌드업", "데이터 기반", "아시아 정통"],
  blurb: "기술위원장 출신답게 체계와 데이터로 팀을 짠다. 말레이시아 대표팀·K리그 경험으로 아시아 단기전과 현실성을 두루 갖췄다.",
  profiled: true, sources: ["https://namu.wiki/w/김판곤"],
};

export const parkHangseo: Coach = {
  id: "park-hangseo", name: "박항서", nameEn: "Park Hang-seo", tier: "domestic",
  status: "태국 깐짜나부리 + 2026 월드컵 지원단장", rumor: "베트남 영웅. 정신력·조직력·형님 리더십의 상징.",
  nationality: "대한민국", age: 67,
  formation: "3-4-3", altFormations: ["5-3-2", "4-4-2"],
  axes: { possession: 48, pressHeight: 55, tempo: 60, width: 56, verticality: 68, buildFromBack: 46 },
  requirements: [
    { key: "mobileStriker", weight: 0.7, label: "침투 9번" },
    { key: "paceWingers", weight: 0.68, label: "역습 측면" },
    { key: "holdingDM", weight: 0.7, label: "보호형 6번" },
    { key: "aerialCB", weight: 0.66, label: "제공권 수비" },
  ],
  intangibles: { complexity: 35, planB: 60, tournamentXP: 82, defensiveStability: 68, starManagement: 85 },
  realism: { koreaPlausibility: 58, available: 35, asiaNtXP: 95, squadControl: 85 },
  dna: ["정신력·조직력", "끈끈한 수비+역습", "형님 리더십"],
  blurb: "조직력과 정신력, 그리고 선수단을 하나로 묶는 형님 리더십. 베트남 신화의 단기전 결속력은 토너먼트에서 무시 못 할 무기다.",
  profiled: true, sources: ["https://namu.wiki/w/박항서"],
};

export const leeJunghyo: Coach = {
  id: "lee-junghyo", name: "이정효", nameEn: "Lee Jung-hyo", tier: "domestic",
  status: "광주 FC 감독", rumor: "K리그 돌풍. 공격적 압박이 분석적으로 가장 흥미로운 국내 감독.",
  nationality: "대한민국", age: 50,
  formation: "4-3-3", altFormations: ["3-4-3", "4-2-3-1"],
  axes: { possession: 66, pressHeight: 82, tempo: 72, width: 70, verticality: 70, buildFromBack: 66 },
  requirements: [
    { key: "highStaminaFront", weight: 0.82, label: "전방 고강도 압박" },
    { key: "pressResistantMF", weight: 0.76, label: "탈압박 중원" },
    { key: "paceWingers", weight: 0.74, label: "측면 침투" },
    { key: "overlappingFB", weight: 0.72, label: "전진 풀백" },
    { key: "boxToBoxCM", weight: 0.74, label: "박스투박스" },
  ],
  intangibles: { complexity: 60, planB: 58, tournamentXP: 45, defensiveStability: 58, starManagement: 66 },
  realism: { koreaPlausibility: 68, available: 40, asiaNtXP: 55, squadControl: 72 },
  dna: ["공격적 압박", "K리그 돌풍", "전방위 강도"],
  blurb: "광주를 돌풍으로 이끈 공격적 압박과 전방위 강도. 국내 감독 중 전술적으로 가장 현대적이라는 평가를 받는 다크호스.",
  profiled: true, sources: ["https://namu.wiki/w/이정효"],
};

export const gamst: Coach = {
  id: "gamst", name: "감스트", nameEn: "Gamst", tier: "media",
  status: "축구 방송인 (재미용 가상 후보)", rumor: "방송계의 감독. '닥공'과 열정의 아이콘.",
  nationality: "대한민국", age: 33,
  formation: "4-2-3-1", altFormations: ["4-3-3"],
  axes: { possession: 40, pressHeight: 75, tempo: 88, width: 72, verticality: 90, buildFromBack: 34 },
  requirements: [
    { key: "paceWingers", weight: 0.8, label: "닥공 측면" },
    { key: "mobileStriker", weight: 0.75, label: "돌격 9번" },
    { key: "highStaminaFront", weight: 0.8, label: "전방 에너지" },
  ],
  intangibles: { complexity: 20, planB: 30, tournamentXP: 10, defensiveStability: 25, starManagement: 55 },
  realism: { koreaPlausibility: 5, available: 90, asiaNtXP: 10, squadControl: 45 },
  dna: ["닥치고 공격", "열정 과부하", "분위기 메이커"],
  blurb: "전술? 일단 닥치고 공격이다. 수비 밸런스는 실종되지만 폭발적 화력과 분위기만큼은 보장하는 재미용 가상 후보.",
  profiled: true, sources: ["https://namu.wiki/w/감스트"],
};

export const handongsuk: Coach = {
  id: "handongsuk", name: "한동숙", nameEn: "Handongsuk", tier: "media",
  status: "FM 스트리머 (재미용 가상 후보)", rumor: "FM계의 황태자. 게겐프레스 메타의 화신.",
  nationality: "대한민국", age: 38,
  formation: "4-3-3", altFormations: ["4-2-3-1"],
  axes: { possession: 72, pressHeight: 85, tempo: 75, width: 72, verticality: 70, buildFromBack: 78 },
  requirements: [
    { key: "pressResistantMF", weight: 0.85, label: "FM 메타 중원" },
    { key: "ballPlayingCB", weight: 0.8, label: "빌드업 CB" },
    { key: "highStaminaFront", weight: 0.8, label: "게겐프레스 전방" },
    { key: "overlappingFB", weight: 0.74, label: "공격 풀백" },
    { key: "creativeAM", weight: 0.72, label: "엔간체 10번" },
  ],
  intangibles: { complexity: 82, planB: 75, tournamentXP: 15, defensiveStability: 55, starManagement: 60 },
  realism: { koreaPlausibility: 4, available: 90, asiaNtXP: 5, squadControl: 45 },
  dna: ["FM 게겐프레스", "오버로드", "전술 과몰입"],
  blurb: "FM 속 게겐프레스 메타를 현실로. 정교한 전술 과몰입이 매력이지만, 어디까지나 화면 속 황태자인 재미용 가상 후보.",
  profiled: true, sources: ["https://namu.wiki/w/한동숙"],
};

export const BASELINE_COACH = hongMyungbo;

export const coaches: Coach[] = [
  hongMyungbo, bento, klinsmann, moriyasu, klopp, mourinho,
  shinTaeyong, potter, scaloni, deschamps, enrique, bielsa,
  hwangSunhong, kimPangon, parkHangseo, leeJunghyo,
  gamst, handongsuk,
];

export const candidateCoaches: Coach[] = coaches.filter((c) => c.id !== BASELINE_COACH.id);
