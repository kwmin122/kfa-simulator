import type { Coach } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Coach profiles. Each carries: tactical axes + squad requirements (전술 수행),
// intangibles (단기전), and a `provenance` evidence layer (현직·확인일·신뢰도).
// REALISM is NOT scored — only the 4 fit axes matter; provenance is for trust.
// confidence "high" only when ≥2 solid sources (공식/주요 언론); 위키/나무 단독은 medium.
// Current jobs verified via WebSearch (2026-06). Style numbers are estimates
// from public tactical analysis. 2024 reported shortlist = confidence medium/low.
// ──────────────────────────────────────────────────────────────────────────

export const hongMyungbo: Coach = {
  id: "hong-myungbo", name: "홍명보", nameEn: "Hong Myung-bo", tier: "national",
  status: "현 대한민국 감독 (남아공전 3-4-3 가동)", nationality: "대한민국", age: 56,
  formation: "3-4-3", altFormations: ["3-4-2-1"], // 3백 고집 — 4백으로 안 바꿈
  axes: { possession: 56, pressHeight: 46, tempo: 48, width: 58, verticality: 44, buildFromBack: 54 },
  requirements: [
    { key: "creativeAM", weight: 0.7, label: "창의적 10번(이강인 의존)" },
    { key: "overlappingFB", weight: 0.6, label: "윙백 폭(3백 의존)" },
    { key: "mobileStriker", weight: 0.55, label: "활동량형 9번" },
    { key: "ballPlayingCB", weight: 0.5, label: "빌드업 CB" },
  ],
  intangibles: { complexity: 38, planB: 22, tournamentXP: 50, defensiveStability: 48, starManagement: 30 },
  provenance: { currentJob: "현 대한민국 대표팀 감독 (2024.7~)", availability: "재임 중 (남아공전 패배로 거취 압박)", sourceUrl: "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026", lastCheckedAt: "2026-06-26", confidence: "high", note: "남아공전 공식 라인업 3-4-3 (김승규; 이한범·김민재·이기혁; 설영우·황인범·백승호·이태석; 이강인·오현규·황희찬)." },
  dna: ["3백 고집", "윙백 의존", "로테이션 리스크", "개인 능력 의존"],
  blurb:
    "남아공전 기준 홍명보호는 3-4-3을 가동했고, 손흥민·이재성을 벤치에 둔 로테이션과 3백 유지가 " +
    "비판받았다. 점유는 했지만 마지막 1/3 창의성, 박스 위협, 경기 중 전술 전환이 부족했다. 개인 " +
    "공격 자원은 좋지만 3백 유지와 느린 전환 때문에 손흥민·이강인·황희찬의 장점이 한 화면에 묶이지 못한다.",
  profiled: true,
  sources: [
    "https://www.olympics.com/ko/news/football-korea-south-africa-fifa-world-cup-2026",
    "https://www.newspim.com/news/view/20260625000748",
    "https://www.fifa.com/ko/articles/what-korea-republic-learned-from-losing-to-south-africa-2026-ko",
  ],
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
  provenance: { currentJob: "무직 (전 대한민국·UAE 대표팀)", availability: "선임 가능", sourceUrl: "https://en.wikipedia.org/wiki/Paulo_Bento", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "무직 (2024.2 대한민국 경질)", availability: "선임 가능", sourceUrl: "https://en.wikipedia.org/wiki/Jürgen_Klinsmann", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "일본 대표팀 감독", availability: "일본과 계약 중", sourceUrl: "https://en.wikipedia.org/wiki/Hajime_Moriyasu", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "레드불 글로벌 축구 총괄", availability: "사실상 불가", sourceUrl: "https://en.wikipedia.org/wiki/Jürgen_Klopp", lastCheckedAt: "2026-06-26", confidence: "medium" },
  dna: ["게겐프레싱", "수직 전환", "헤비메탈"],
  blurb:
    "잃는 즉시 재탈취하는 게겐프레싱과 폭발적 전환. 손흥민·황희찬·김민재의 강점을 전면에 세우지만, " +
    "압박에 약한 창조형 10번은 희생되고, 무엇보다 한국 부임 현실성이 거의 없다.",
  profiled: true,
  sources: ["https://en.wikipedia.org/wiki/Jürgen_Klopp"],
};

export const mourinho: Coach = {
  id: "mourinho", name: "조제 무리뉴", nameEn: "José Mourinho", tier: "club",
  status: "레알 마드리드 감독 (2026.6 부임)", rumor: "실리·빅매치. 김민재 버프, 이강인은 애매. (재미용 가정)",
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
  provenance: { currentJob: "레알 마드리드 감독 (2026.6.11 부임, 전 벤피카·페네르바체)", availability: "레알과 계약 (사실상 불가)", sourceUrl: "https://www.realmadrid.com/en-US/news/club/latest-news/comunicado-oficial-mourinho-11-06-2026", lastCheckedAt: "2026-06-26", confidence: "high", note: "2026.6.9 벤피카 떠나 6.11 레알 마드리드 공식 부임(3년)." },
  dna: ["로우블록", "빠른 역습", "수비 조직"],
  blurb:
    "내려서서 단단히 막고 한 방으로 끝낸다. 빠른 측면 자원이 많은 현 스쿼드와 역습 궁합이 좋고 " +
    "수비 안정성·빅매치 경험이 단기전에 강하지만, 점유가 적어 이강인 활용은 애매하다.",
  profiled: true,
  sources: ["https://www.realmadrid.com/en-US/news/club/latest-news/comunicado-oficial-mourinho-11-06-2026", "https://www.espn.com/soccer/story/_/id/48814292/jose-mourinho-real-madrid-coach-alvaro-arbeloa"],
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
  provenance: { currentJob: "페르시자 자카르타 감독 (2026.6~)", availability: "클럽 계약 중", sourceUrl: "https://namu.wiki/w/신태용", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "스웨덴 대표팀 감독 (2025.10~)", availability: "2030까지 스웨덴 계약", contractUntil: "2030", sourceUrl: "https://en.wikipedia.org/wiki/Graham_Potter", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "아르헨티나 대표팀 감독", availability: "계약 중", sourceUrl: "https://en.wikipedia.org/wiki/Lionel_Scaloni", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "프랑스 대표팀 감독 (2026 이후 이임 예정)", availability: "2026 이후 가능", sourceUrl: "https://en.wikipedia.org/wiki/Didier_Deschamps", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "파리 생제르맹 감독 (UCL 우승)", availability: "클럽 계약 중 (사실상 불가)", sourceUrl: "https://en.wikipedia.org/wiki/Luis_Enrique", lastCheckedAt: "2026-06-26", confidence: "high", note: "PSG 챔피언스리그 우승. 2출처 확인." },
  dna: ["점유 지배", "전방 압박", "후방 빌드업"],
  blurb: "극단적 점유와 전방 압박. 발밑 좋은 후방이 전제라 빠르지만 빌드업이 정교하지 않은 현 스쿼드와는 마찰이 크다.",
  profiled: true, sources: ["https://www.uefa.com/uefachampionsleague/", "https://en.wikipedia.org/wiki/Luis_Enrique"],
};

export const bielsa: Coach = {
  id: "bielsa", name: "마르셀로 비엘사", nameEn: "Marcelo Bielsa", tier: "national",
  status: "우루과이 대표팀 감독", rumor: "극단적 압박. 한국 선수단이 터질지 살아날지 재미가 크다.",
  nationality: "아르헨티나", age: 70,
  formation: "3-4-3", altFormations: ["4-3-3"],
  axes: { possession: 70, pressHeight: 95, tempo: 80, width: 80, verticality: 78, buildFromBack: 72 },
  requirements: [
    { key: "highStaminaFront", weight: 0.95, label: "전방위 고강도 압박" },
    { key: "paceWingers", weight: 0.82, label: "측면 침투" },
    { key: "boxToBoxCM", weight: 0.85, label: "박스투박스 엔진" },
    { key: "overlappingFB", weight: 0.78, label: "윙백 폭발" },
    { key: "pressResistantMF", weight: 0.7, label: "탈압박" },
  ],
  intangibles: { complexity: 85, planB: 30, tournamentXP: 65, defensiveStability: 50, starManagement: 60 },
  provenance: { currentJob: "우루과이 대표팀 감독 (WC 2026)", availability: "우루과이와 계약 (사실상 불가)", sourceUrl: "https://www.transfermarkt.us/marcelo-bielsa/profil/trainer/2553", lastCheckedAt: "2026-06-26", confidence: "high", note: "우루과이 대표팀 (WC2026 본선). Transfermarkt+ESPN 확인." },
  dna: ["극단적 압박", "맨마킹", "하드러닝"],
  blurb: "전원 맨마킹과 미친 활동량의 비엘사 볼. 스쿼드 체력의 한계를 시험하며, 살아나면 폭발하지만 터지면 무너지는 양날의 검.",
  profiled: true, sources: ["https://www.transfermarkt.us/marcelo-bielsa/profil/trainer/2553", "https://www.espn.com/soccer/story/_/id/48929677/marcelo-bielsa-omits-luis-suarez-uruguay-world-cup-squad"],
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
  provenance: { currentJob: "국내 지도자 (전 U-23·대전)", availability: "선임 가능", sourceUrl: "https://namu.wiki/w/황선홍", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "울산 HD 감독 (전 말레이시아 대표팀)", availability: "클럽 계약 중", sourceUrl: "https://namu.wiki/w/김판곤", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "태국 깐짜나부리 감독 + 2026 WC 한국 지원단장", availability: "사실상 불가 (WC 지원단 역할)", sourceUrl: "https://namu.wiki/w/박항서", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  provenance: { currentJob: "광주 FC 감독", availability: "클럽 계약 중", sourceUrl: "https://namu.wiki/w/이정효", lastCheckedAt: "2026-06-26", confidence: "medium" },
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
  meme: true,
  provenance: { currentJob: "축구 방송인 (재미용 가상 후보)", availability: "재미용 가상", sourceUrl: "https://namu.wiki/w/감스트", lastCheckedAt: "2026-06-26", confidence: "low" },
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
  meme: true,
  provenance: { currentJob: "FM 스트리머 (재미용 가상 후보)", availability: "재미용 가상", sourceUrl: "https://namu.wiki/w/한동숙", lastCheckedAt: "2026-06-26", confidence: "low" },
  dna: ["FM 게겐프레스", "오버로드", "전술 과몰입"],
  blurb: "FM 속 게겐프레스 메타를 현실로. 정교한 전술 과몰입이 매력이지만, 어디까지나 화면 속 황태자인 재미용 가상 후보.",
  profiled: true, sources: ["https://namu.wiki/w/한동숙"],
};

// ── 2024 보도/영상 기반 후보군 (reported shortlist — 확정 사실 아님) ─────────
// 출처: 히든풋볼/축구 분석 영상 + 보도. confidence medium/low로 표기.

export const marsch: Coach = {
  id: "marsch", name: "제시 마치", nameEn: "Jesse Marsch", tier: "national",
  status: "캐나다 대표팀 감독 (보도: 2024 한국 1순위)",
  rumor: "2024년 한국 1순위였으나 세금 등 조건으로 협상 결렬→캐나다행. RB 게겐프레스, 2선 스위칭이 현 스쿼드와 딱.",
  nationality: "미국", age: 53,
  formation: "4-2-2-2", altFormations: ["4-3-3", "4-2-3-1"],
  axes: { possession: 48, pressHeight: 90, tempo: 86, width: 72, verticality: 88, buildFromBack: 50 },
  requirements: [
    { key: "highStaminaFront", weight: 0.95, label: "전방 고강도 압박" },
    { key: "boxToBoxCM", weight: 0.85, label: "기동형 중원(6번 불요)" },
    { key: "paceWingers", weight: 0.82, label: "스위칭 2선 자원" },
    { key: "mobileStriker", weight: 0.8, label: "저돌적 침투 9번" },
    { key: "pressResistantMF", weight: 0.7, label: "전방 압박 후 연결" },
  ],
  intangibles: { complexity: 58, planB: 45, tournamentXP: 50, defensiveStability: 40, starManagement: 76 },
  dna: ["RB 게겐프레스", "2선 스위칭", "하이라인", "수직 전환"],
  blurb:
    "레드불 사단의 저돌적 게겐프레스. 고정 9번·6번 없이 측면·중앙을 오가는 2선 자원으로 좁은 블록을 만들어 압박한다. " +
    "손흥민·황희찬·이강인·이재성 등 2선이 풍부하고 하이라인을 김민재가 커버하는 현 스쿼드와 궁합이 좋다. 단, 밸런스 붕괴로 역습 실점이 약점.",
  profiled: true, sources: ["https://www.espn.com/soccer/story/_/id/48885028/canada-coach-jesse-marsch-new-contract-world-cup", "https://en.wikipedia.org/wiki/Jesse_Marsch"],
  provenance: { currentJob: "캐나다 대표팀 감독 (2030까지 재계약)", availability: "사실상 불가 (캐나다 계약)", contractUntil: "2030", sourceUrl: "https://www.espn.com/soccer/story/_/id/48885028/canada-coach-jesse-marsch-new-contract-world-cup", lastCheckedAt: "2026-06-26", confidence: "medium", note: "2024 보도 기준 한국 1순위(세금협상 결렬). 현재는 캐나다 감독이며 이번 월드컵 32강 잠재 상대." },
};

export const seabra: Coach = {
  id: "seabra", name: "바스코 세아브라", nameEn: "Vasco Seabra", tier: "club",
  status: "FC 아로카 감독 (포르투갈, 보도: 2024 후보군)",
  rumor: "'포르투갈 뱅거' 학자형 데이터 감독. 보도로 거론됐으나 대표팀·메이저 무경험.",
  nationality: "포르투갈", age: 43,
  formation: "4-2-3-1", altFormations: ["4-3-3"],
  axes: { possession: 74, pressHeight: 72, tempo: 60, width: 66, verticality: 58, buildFromBack: 78 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.8, label: "후방 빌드업 CB" },
    { key: "pressResistantMF", weight: 0.82, label: "탈압박 중원" },
    { key: "creativeAM", weight: 0.72, label: "10번 창조" },
    { key: "overlappingFB", weight: 0.7, label: "전진 풀백" },
    { key: "holdingDM", weight: 0.68, label: "조율 6번" },
  ],
  intangibles: { complexity: 72, planB: 55, tournamentXP: 25, defensiveStability: 60, starManagement: 60 },
  dna: ["데이터형 포지셔널", "후방 빌드업", "분석 기반"],
  blurb: "미터 단위로 라인을 쪼개는 학자형 데이터 감독. 정교한 빌드업이 매력이지만 대표팀·토너먼트 경험이 거의 없는 게 약점.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Vasco_Seabra"],
  provenance: { currentJob: "FC 아로카(포르투갈) 감독", availability: "클럽 계약 중", sourceUrl: "https://www.playmakerstats.com/manager/vasco-seabra/15841", lastCheckedAt: "2026-06-26", confidence: "low", note: "2024 보도/영상 기반 후보군. 현직은 아로카(에스토릴 아님)." },
};

export const casas: Coach = {
  id: "casas", name: "헤수스 카사스", nameEn: "Jesús Casas", tier: "club",
  status: "라이언 시티 세일러스 감독 (싱가포르, 보도: 2024 후보군)",
  rumor: "전 바르사 스카우트·엔리케 사단. 아시안컵 인상적이었으나 같은 AFC 이라크와 계약.",
  nationality: "스페인", age: 51,
  formation: "4-3-3", altFormations: ["4-2-3-1"],
  axes: { possession: 76, pressHeight: 70, tempo: 58, width: 66, verticality: 58, buildFromBack: 78 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.78, label: "빌드업 CB" },
    { key: "pressResistantMF", weight: 0.8, label: "탈압박 중원" },
    { key: "creativeAM", weight: 0.7, label: "10번 창조" },
    { key: "paceWingers", weight: 0.66, label: "측면 전환" },
    { key: "holdingDM", weight: 0.68, label: "조율 6번" },
  ],
  intangibles: { complexity: 64, planB: 62, tournamentXP: 70, defensiveStability: 64, starManagement: 65 },
  dna: ["스페인식 점유", "빌드업", "조직"],
  blurb: "바르사 스카우트·스페인 대표팀 코치 출신의 점유 지향 감독. 아시안컵에서 이라크로 인상적 결과를 냈지만 AFC 동일 권역이라 영입 난도가 높다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Jes%C3%BAs_Casas"],
  provenance: { currentJob: "라이언 시티 세일러스(싱가포르) 감독 (~2027/28)", availability: "클럽 계약 중", contractUntil: "2028", sourceUrl: "https://www.lioncitysailorsfc.sg/lion-city-sailors-appoint-jesus-casas-as-head-coach/", lastCheckedAt: "2026-06-26", confidence: "medium", note: "2024 보도 기준 한국 후보군 거론. 현직은 라이언 시티 세일러스(이라크 아님)." },
};

export const gunes: Coach = {
  id: "gunes", name: "셰놀 귀네슈", nameEn: "Şenol Güneş", tier: "free",
  status: "트라브존스포르 풋볼 디렉터 (보도: 2024 후보군)",
  rumor: "2002 월드컵 3위(튀르키예)의 노장. 미팅했으나 뚜렷한 전술 모델 어필은 약했다는 평.",
  nationality: "튀르키예", age: 73,
  formation: "4-2-3-1", altFormations: ["4-4-2"],
  axes: { possession: 56, pressHeight: 52, tempo: 58, width: 58, verticality: 62, buildFromBack: 56 },
  requirements: [
    { key: "mobileStriker", weight: 0.7, label: "침투 9번" },
    { key: "holdingDM", weight: 0.72, label: "보호 6번" },
    { key: "aerialCB", weight: 0.68, label: "제공권 CB" },
    { key: "paceWingers", weight: 0.66, label: "측면 자원" },
    { key: "creativeAM", weight: 0.64, label: "창조 자원" },
  ],
  intangibles: { complexity: 42, planB: 60, tournamentXP: 80, defensiveStability: 66, starManagement: 70 },
  dna: ["노장 경험", "안정 지향", "토너먼트 관록"],
  blurb: "2002 월드컵 3위의 관록. 큰 경험치는 분명하지만 고령에 뚜렷한 전술 모델 제시가 약했다는 평가가 있다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/%C5%9Eenol_G%C3%BCne%C5%9F"],
  provenance: { currentJob: "트라브존스포르 풋볼 디렉터 (전 튀르키예 대표팀)", availability: "디렉터직 — 감독 부임은 별개", sourceUrl: "https://en.wikipedia.org/wiki/%C5%9Eenol_G%C3%BCne%C5%9F", lastCheckedAt: "2026-06-26", confidence: "low", note: "2024 보도/영상 기반 후보군. 현재 무직 아님(클럽 디렉터)." },
};

export const lage: Coach = {
  id: "lage", name: "브루누 라즈", nameEn: "Bruno Lage", tier: "free",
  status: "무직 (전 벤피카, 2025 종료 · 보도: 2024 +2 후보군)",
  rumor: "황희찬과 울버햄튼 인연. 연봉이 높고 유럽 잔류 가능성이 커 현실성은 낮은 편이라는 평.",
  nationality: "포르투갈", age: 50,
  formation: "4-3-3", altFormations: ["4-2-3-1"],
  axes: { possession: 66, pressHeight: 68, tempo: 66, width: 66, verticality: 66, buildFromBack: 66 },
  requirements: [
    { key: "pressResistantMF", weight: 0.76, label: "탈압박 중원" },
    { key: "paceWingers", weight: 0.72, label: "측면 침투" },
    { key: "ballPlayingCB", weight: 0.7, label: "빌드업 CB" },
    { key: "boxToBoxCM", weight: 0.7, label: "박스투박스" },
    { key: "mobileStriker", weight: 0.68, label: "침투 9번" },
  ],
  intangibles: { complexity: 58, planB: 60, tournamentXP: 40, defensiveStability: 60, starManagement: 66 },
  dna: ["균형형 4-3-3", "전환", "클럽 검증"],
  blurb: "벤피카·울버햄튼을 거친 균형형 감독. 황희찬과의 인연이 있지만 대표팀 경험이 없고 영입 비용이 변수.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Bruno_Lage"],
  provenance: { currentJob: "무직 — 마지막 벤피카(2024~2025), 이후 무리뉴가 후임", availability: "선임 가능 (연봉 변수)", sourceUrl: "https://en.wikipedia.org/wiki/Bruno_Lage", lastCheckedAt: "2026-06-26", confidence: "low", note: "2024 보도 +2 후보군. 현재 무직." },
};

export const monk: Coach = {
  id: "monk", name: "게리 몽크", nameEn: "Garry Monk", tier: "free",
  status: "무직 (보도: 2024 +2 후보군)",
  rumor: "기성용과 스완지 인연. 최근 커리어 하락세로 가능성은 낮다는 평.",
  nationality: "잉글랜드", age: 47,
  formation: "4-2-3-1", altFormations: ["4-4-2"],
  axes: { possession: 58, pressHeight: 60, tempo: 60, width: 60, verticality: 60, buildFromBack: 58 },
  requirements: [
    { key: "boxToBoxCM", weight: 0.68, label: "활동량 중원" },
    { key: "paceWingers", weight: 0.66, label: "측면 자원" },
    { key: "mobileStriker", weight: 0.64, label: "침투 9번" },
    { key: "holdingDM", weight: 0.64, label: "보호 6번" },
  ],
  intangibles: { complexity: 45, planB: 45, tournamentXP: 25, defensiveStability: 52, starManagement: 55 },
  dna: ["영국식 균형", "조직", "하락세"],
  blurb: "스완지 시절 인상적이었으나 이후 커리어가 하락세. 대표팀 레벨로는 부족하다는 평가가 많은 +2 후보.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Garry_Monk"],
  provenance: { currentJob: "무직 — 마지막 케임브리지 Utd, 2025.2 퇴임", availability: "선임 가능", sourceUrl: "https://en.wikipedia.org/wiki/Garry_Monk", lastCheckedAt: "2026-06-26", confidence: "low", note: "2024 보도 +2 후보군. 현재 무직(전 케임브리지)." },
};

// ── Phase B 추가 (현직 WebSearch 검증, 2026-06) ──────────────────────────
export const mancini: Coach = {
  id: "mancini", name: "로베르토 만치니", nameEn: "Roberto Mancini", tier: "club",
  status: "알 사드 감독 (카타르, 2025.11~)", rumor: "유로 2020 우승. 국가대표·아시아 경험으로 연결 가능.",
  nationality: "이탈리아", age: 61,
  formation: "4-2-3-1", altFormations: ["4-3-3"],
  axes: { possession: 68, pressHeight: 64, tempo: 58, width: 64, verticality: 58, buildFromBack: 68 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.74, label: "빌드업 CB" },
    { key: "pressResistantMF", weight: 0.76, label: "탈압박 중원" },
    { key: "creativeAM", weight: 0.72, label: "10번 창조" },
    { key: "holdingDM", weight: 0.7, label: "조율 6번" },
    { key: "paceWingers", weight: 0.66, label: "측면 전환" },
  ],
  intangibles: { complexity: 58, planB: 64, tournamentXP: 82, defensiveStability: 66, starManagement: 72 },
  dna: ["이탈리아식 균형", "점유+조직", "토너먼트 관록"],
  blurb: "유로 2020 우승의 이탈리아식 균형. 점유와 조직으로 안정감을 더하지만, 폭발적 전환보다는 통제를 택한다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Roberto_Mancini"],
  provenance: { currentJob: "알 사드(카타르) 감독", availability: "클럽 계약 중", sourceUrl: "https://en.wikipedia.org/wiki/Roberto_Mancini", lastCheckedAt: "2026-06-26", confidence: "medium", note: "2025.11 알 사드 2년 계약." },
};

export const low: Coach = {
  id: "low", name: "요아힘 뢰브", nameEn: "Joachim Löw", tier: "free",
  status: "무직 (전 독일 대표팀, 2021 사임)", rumor: "2014 월드컵 우승. 독일식 점유·전환의 상징, 이름값.",
  nationality: "독일", age: 66,
  formation: "4-2-3-1", altFormations: ["3-4-3", "4-3-3"],
  axes: { possession: 70, pressHeight: 68, tempo: 62, width: 66, verticality: 60, buildFromBack: 74 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.78, label: "후방 빌드업 CB" },
    { key: "pressResistantMF", weight: 0.8, label: "탈압박 중원" },
    { key: "creativeAM", weight: 0.7, label: "10번 창조" },
    { key: "overlappingFB", weight: 0.7, label: "전진 풀백" },
    { key: "holdingDM", weight: 0.68, label: "조율 6번" },
  ],
  intangibles: { complexity: 64, planB: 60, tournamentXP: 88, defensiveStability: 62, starManagement: 70 },
  dna: ["독일식 점유+전환", "후방 빌드업", "월드컵 DNA"],
  blurb: "2014 월드컵 우승의 독일식 점유와 전환. 후방 빌드업으로 구조를 세우지만 2021년 이후 현장을 떠나 있다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Joachim_L%C3%B6w"],
  provenance: { currentJob: "무직 (전 독일 대표팀, 2021 사임)", availability: "선임 가능", sourceUrl: "https://en.wikipedia.org/wiki/Joachim_L%C3%B6w", lastCheckedAt: "2026-06-26", confidence: "medium" },
};

export const renard: Coach = {
  id: "renard", name: "에르베 르나르", nameEn: "Hervé Renard", tier: "national",
  status: "튀니지 대표팀 감독 (2026.6.16 부임)", rumor: "사우디로 아르헨티나를 잡은 동기부여의 대가. 아시아·아프리카 대표팀 전문.",
  nationality: "프랑스", age: 57,
  formation: "4-4-2", altFormations: ["3-5-2", "4-2-3-1"],
  axes: { possession: 50, pressHeight: 64, tempo: 64, width: 64, verticality: 70, buildFromBack: 50 },
  requirements: [
    { key: "paceWingers", weight: 0.76, label: "직선 역습 측면" },
    { key: "mobileStriker", weight: 0.72, label: "침투 9번" },
    { key: "holdingDM", weight: 0.72, label: "보호 6번" },
    { key: "highStaminaFront", weight: 0.72, label: "활동량 전방" },
    { key: "aerialCB", weight: 0.66, label: "제공권 CB" },
  ],
  intangibles: { complexity: 44, planB: 64, tournamentXP: 80, defensiveStability: 64, starManagement: 78 },
  dna: ["강도·동기부여", "직선 역습", "대표팀 전문"],
  blurb: "2022 사우디로 아르헨티나를 잡은 동기부여의 대가. 강도와 직선 역습으로 한 방을 만들지만 점유 지배력은 낮다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Herv%C3%A9_Renard", "https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/herv%C3%A9-renard-appointed-tunisia-head-coach-during-fifa-world-cup-2026-2026-06-16"],
  provenance: { currentJob: "튀니지 대표팀 감독 (2026.6.16 부임)", availability: "튀니지와 계약", sourceUrl: "https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/herv%C3%A9-renard-appointed-tunisia-head-coach-during-fifa-world-cup-2026-2026-06-16", lastCheckedAt: "2026-06-26", confidence: "high", note: "사우디 경질(2026.4) 후 튀니지 부임. 2출처 확인." },
};

export const choiKanghee: Coach = {
  id: "choi-kanghee", name: "최강희", nameEn: "Choi Kang-hee", tier: "domestic",
  status: "무직 (전 산둥 타이산, 중국 대표팀 후보 거론)", rumor: "전북 왕조의 카리스마. 선수단 장악·실리의 한국형 노장.",
  nationality: "대한민국", age: 67,
  formation: "4-4-2", altFormations: ["3-4-3", "4-2-3-1"],
  axes: { possession: 54, pressHeight: 56, tempo: 58, width: 58, verticality: 64, buildFromBack: 52 },
  requirements: [
    { key: "mobileStriker", weight: 0.7, label: "침투 9번" },
    { key: "holdingDM", weight: 0.7, label: "보호 6번" },
    { key: "paceWingers", weight: 0.68, label: "측면 자원" },
    { key: "aerialCB", weight: 0.66, label: "제공권 CB" },
    { key: "boxToBoxCM", weight: 0.66, label: "활동량 중원" },
  ],
  intangibles: { complexity: 40, planB: 56, tournamentXP: 72, defensiveStability: 62, starManagement: 76 },
  dna: ["전북 왕조 리더십", "실리", "선수단 장악"],
  blurb: "전북 왕조를 세운 카리스마와 선수단 장악력. 실리적이고 단단하지만 전술 트렌드와는 거리가 있다.",
  profiled: true, sources: ["https://namu.wiki/w/최강희(축구인)"],
  provenance: { currentJob: "무직 (전 산둥 타이산)", availability: "선임 가능 (중국 대표팀 후보 거론)", sourceUrl: "https://namu.wiki/w/최강희(축구인)", lastCheckedAt: "2026-06-26", confidence: "medium" },
};

export const kimKidong: Coach = {
  id: "kim-kidong", name: "김기동", nameEn: "Kim Ki-dong", tier: "domestic",
  status: "FC 서울 감독", rumor: "포항·서울을 끌어올린 공격적 K리그 색.",
  nationality: "대한민국", age: 54,
  formation: "4-2-3-1", altFormations: ["4-4-2", "4-3-3"],
  axes: { possession: 60, pressHeight: 64, tempo: 64, width: 64, verticality: 64, buildFromBack: 60 },
  requirements: [
    { key: "pressResistantMF", weight: 0.72, label: "탈압박 중원" },
    { key: "paceWingers", weight: 0.72, label: "측면 침투" },
    { key: "boxToBoxCM", weight: 0.72, label: "박스투박스" },
    { key: "mobileStriker", weight: 0.68, label: "침투 9번" },
    { key: "creativeAM", weight: 0.66, label: "창조 자원" },
  ],
  intangibles: { complexity: 52, planB: 58, tournamentXP: 60, defensiveStability: 58, starManagement: 68 },
  dna: ["공격적 K리그", "측면 활용", "동기부여"],
  blurb: "포항·서울을 끌어올린 공격적이고 측면을 살리는 K리그 색. 다만 대표팀·메이저 경험은 아직 부족하다.",
  profiled: true, sources: ["https://namu.wiki/w/김기동(축구인)"],
  provenance: { currentJob: "FC 서울 감독", availability: "클럽 계약 중", sourceUrl: "https://namu.wiki/w/김기동(축구인)", lastCheckedAt: "2026-06-26", confidence: "medium", note: "현직 클럽 확인 권장." },
};

export const zaccheroni: Coach = {
  id: "zaccheroni", name: "알베르토 자케로니", nameEn: "Alberto Zaccheroni", tier: "free",
  status: "무직 (전 일본·UAE 대표팀)", rumor: "3-4-3의 원조. 일본 아시안컵 우승의 노장.",
  nationality: "이탈리아", age: 73,
  formation: "3-4-3", altFormations: ["4-2-3-1"],
  axes: { possession: 62, pressHeight: 58, tempo: 58, width: 66, verticality: 58, buildFromBack: 62 },
  requirements: [
    { key: "ballPlayingCB", weight: 0.72, label: "빌드업 CB(3백)" },
    { key: "overlappingFB", weight: 0.72, label: "윙백 폭" },
    { key: "creativeAM", weight: 0.7, label: "10번 창조" },
    { key: "holdingDM", weight: 0.68, label: "조율 6번" },
    { key: "paceWingers", weight: 0.66, label: "측면 자원" },
  ],
  intangibles: { complexity: 56, planB: 56, tournamentXP: 74, defensiveStability: 60, starManagement: 66 },
  dna: ["3-4-3 원조", "측면 폭", "노장 경험"],
  blurb: "3-4-3의 원조이자 일본 아시안컵 우승의 노장. 측면 폭과 윙백을 살리지만 최근 현장과는 거리가 있다.",
  profiled: true, sources: ["https://en.wikipedia.org/wiki/Alberto_Zaccheroni"],
  provenance: { currentJob: "무직 (전 일본·UAE 대표팀)", availability: "선임 가능 (사실상 은퇴 추정)", sourceUrl: "https://en.wikipedia.org/wiki/Alberto_Zaccheroni", lastCheckedAt: "2026-06-26", confidence: "low" },
};

// 감독별 고유 한줄 정체성(리서치 기반). 헤드라인이 똑같아 보이지 않도록 — 각자
// 시그니처 전술을 먼저 말하고, 긍정 우선·리스크는 caveat. 엔진이 뒤에 궁합·델타를 붙임.
export const COACH_HOOKS: Record<string, string> = {
  marsch: "전방 4명이 끊임없이 자리를 바꾸는 게겐프레스로 손흥민·황희찬이 폭발하지만, 뒷공간을 내주는 도박이 따릅니다",
  bento: "황인범을 축으로 한 후방 빌드업으로 팀에 다시 구조를 입히는 전임자의 색입니다",
  klinsmann: "뚜렷한 전술 구조 없이 스타 개인 능력에 맡기는 자율 방임 — 남아공전 문제는 그대로 남을 위험이 큽니다",
  moriyasu: "백3·백4를 오가는 일본식 관리형 축구로 안정과 전환을 동시에 잡습니다",
  klopp: "잃자마자 5초 안에 되빼앗는 헤비메탈 게겐프레스 — 손흥민·황희찬·김민재가 전면에 섭니다",
  mourinho: "내려서서 잠그고 빠른 측면 역습 한 방으로 끝내는 실리 축구 — 김민재가 살고 이강인은 애매해집니다",
  "shin-taeyong": "강팀을 잡는 변칙과 세트피스, 한국형 토너먼트의 한 방을 노립니다",
  potter: "백3·백4를 오가는 유연한 포지셔널로 이강인·김민재의 장점을 살리는 전술가입니다",
  scaloni: "월드컵 우승 DNA의 토너먼트 밸런스 — 스타를 살리고 경기마다 형태를 바꿉니다",
  deschamps: "화려함보다 결과, 단단한 수비 위에 개인 능력을 푸는 월드컵형 실리입니다",
  enrique: "극단적 점유로 경기를 지배하지만, 발밑이 정교하지 않은 후방과 마찰이 큰 모델입니다",
  bielsa: "전원 맨마킹과 미친 활동량으로 압박을 극단까지 끌어올리지만, 체력과 뒷공간이 시험대입니다",
  "hwang-sunhong": "직선적이고 투지 있는 한국형 축구 — 화려함보다 단단함을 택합니다",
  "kim-pangon": "데이터와 체계로 짜는 아시아 정통의 안정적 빌드업입니다",
  "park-hangseo": "조직력과 정신력으로 팀을 하나로 묶는 형님 리더십, 끈끈한 수비+역습입니다",
  "lee-junghyo": "광주를 돌풍으로 이끈 공격적 전방위 압박 — 국내에서 가장 현대적인 전술입니다",
  gamst: "닥치고 공격으로 화력은 폭발하지만 수비 밸런스가 실종되는, 재미용 가정입니다",
  handongsuk: "FM 속 게겐프레스 메타를 현실로 옮긴 전술 과몰입 — 재미용 가정입니다",
  seabra: "미터 단위로 라인을 쪼개는 학자형 데이터 빌드업, 다만 대표팀 경험은 미지수입니다",
  casas: "스페인식 점유 구조와 아시안컵에서 증명된 조직력입니다",
  gunes: "2002 월드컵 3위의 관록 — 다만 뚜렷한 전술 모델은 물음표입니다",
  lage: "전환과 측면을 살리는 균형형, 황희찬과의 인연이 있습니다",
  monk: "영국식 균형의 무난함 — 다만 대표팀 레벨엔 의문이 따릅니다",
  mancini: "유로 우승의 이탈리아식 균형 — 점유와 조직으로 안정감을 더합니다",
  low: "2014 월드컵 우승의 독일식 점유+전환으로 후방부터 구조를 세웁니다",
  renard: "사우디로 아르헨티나를 잡은 동기부여의 대가 — 강도와 직선 역습으로 한 방을 만듭니다",
  "choi-kanghee": "전북 왕조를 세운 카리스마와 선수단 장악 — 실리적이고 단단한 한국형입니다",
  "kim-kidong": "포항·서울을 끌어올린 공격적 K리그 색으로 측면과 전환을 살립니다",
  zaccheroni: "3-4-3의 원조 — 측면 폭과 윙백 활용으로 공간을 넓힙니다",
};

export const BASELINE_COACH = hongMyungbo;

export const coaches: Coach[] = [
  hongMyungbo,
  marsch, bento, klinsmann, moriyasu, klopp, mourinho,
  shinTaeyong, potter, scaloni, deschamps, enrique, bielsa,
  hwangSunhong, kimPangon, parkHangseo, leeJunghyo,
  seabra, casas, gunes, lage, monk,
  mancini, low, renard, choiKanghee, kimKidong, zaccheroni,
  gamst, handongsuk,
];

export const candidateCoaches: Coach[] = coaches.filter((c) => c.id !== BASELINE_COACH.id);
