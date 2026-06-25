import type { Player } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Korea Republic — FIFA World Cup 2026 final 26-man squad (Hong Myung-bo).
// Roster cross-checked from public reporting (worldcuppass.com squad page +
// FIFA squad summary). Attribute numbers (0–100) are SUBJECTIVE ESTIMATES
// anchored to EA Sports FC overalls + scouting profile — not official stats.
// Position roles reflect tactical use, not just the source's coarse grouping.
// Ages as of June 2026 (approx, from birth year). See /methodology.
// ──────────────────────────────────────────────────────────────────────────

/** Bump when the roster or ratings change, so cached simulations are versioned. */
export const SQUAD_VERSION = "2026-WC-26man.v1";

export const SQUAD_SOURCES = [
  "https://worldcuppass.com/south-korea-world-cup-squad-2026/",
  "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/korea-republic-world-cup-squad-hong-myungbo",
];

export const squad: Player[] = [
  // ── Goalkeepers ─────────────────────────────────────────────────────────
  {
    id: "jo-hyeonwoo", name: "조현우", nameEn: "Jo Hyeon-woo", group: "GK",
    primary: "GK", eligible: ["GK"], age: 34, club: "울산 HD", caps: 70, foot: "R",
    gkRating: 80, fcAnchor: 79,
    attributes: { pace: 55, stamina: 60, pressing: 40, buildUp: 62, creativity: 40, dribbling: 40, finishing: 20, aerial: 70, tackling: 30, positioning: 82, leadership: 72 },
    note: "반응 좋은 No.1, 발밑은 평범",
  },
  {
    id: "kim-seunggyu", name: "김승규", nameEn: "Kim Seung-gyu", group: "GK",
    primary: "GK", eligible: ["GK"], age: 35, club: "FC 도쿄", caps: 90, foot: "R",
    gkRating: 77, fcAnchor: 76,
    attributes: { pace: 50, stamina: 58, pressing: 38, buildUp: 60, creativity: 38, dribbling: 38, finishing: 20, aerial: 72, tackling: 30, positioning: 80, leadership: 74 },
    note: "경험 풍부한 백업",
  },
  {
    id: "song-bumkeun", name: "송범근", nameEn: "Song Bum-keun", group: "GK",
    primary: "GK", eligible: ["GK"], age: 28, club: "전북 현대", caps: 5, foot: "R",
    gkRating: 75, fcAnchor: 74,
    attributes: { pace: 56, stamina: 60, pressing: 42, buildUp: 66, creativity: 42, dribbling: 44, finishing: 20, aerial: 74, tackling: 30, positioning: 76, leadership: 60 },
    note: "장신, 빌드업 가능형",
  },

  // ── Defenders ───────────────────────────────────────────────────────────
  {
    id: "kim-minjae", name: "김민재", nameEn: "Kim Min-jae", group: "DF",
    primary: "CB", eligible: ["CB"], age: 29, club: "바이에른 뮌헨", caps: 75, foot: "R",
    fcAnchor: 87,
    attributes: { pace: 82, stamina: 80, pressing: 72, buildUp: 78, creativity: 55, dribbling: 60, finishing: 40, aerial: 88, tackling: 87, positioning: 84, leadership: 78 },
    note: "월드클래스 CB, 커버·대인 모두 상위",
  },
  {
    id: "cho-yumin", name: "조유민", nameEn: "Cho Yu-min", group: "DF",
    primary: "CB", eligible: ["CB"], age: 29, club: "샤르자", caps: 18, foot: "R",
    fcAnchor: 72,
    attributes: { pace: 72, stamina: 74, pressing: 64, buildUp: 64, creativity: 42, dribbling: 48, finishing: 35, aerial: 80, tackling: 76, positioning: 72, leadership: 66 },
    note: "공중볼 강점, 빌드업은 보통",
  },
  {
    id: "kim-taehyeon", name: "김태현", nameEn: "Kim Tae-hyeon", group: "DF",
    primary: "CB", eligible: ["CB", "RB"], age: 24, club: "카시마 앤틀러스", caps: 8, foot: "R",
    fcAnchor: 71,
    attributes: { pace: 76, stamina: 78, pressing: 68, buildUp: 68, creativity: 46, dribbling: 54, finishing: 32, aerial: 74, tackling: 72, positioning: 70, leadership: 54 },
    note: "스피드 있는 멀티 수비수",
  },
  {
    id: "lee-hanbeom", name: "이한범", nameEn: "Lee Han-beom", group: "DF",
    primary: "CB", eligible: ["CB", "DM"], age: 27, club: "미트윌란", caps: 6, foot: "R",
    fcAnchor: 72,
    attributes: { pace: 73, stamina: 76, pressing: 66, buildUp: 72, creativity: 50, dribbling: 56, finishing: 30, aerial: 76, tackling: 73, positioning: 72, leadership: 58 },
    note: "빌드업 가능한 볼플레잉 CB",
  },
  {
    id: "lee-taeseok", name: "이태석", nameEn: "Lee Tae-seok", group: "DF",
    primary: "LB", eligible: ["LB", "LWB", "CB"], age: 23, club: "오스트리아 빈", caps: 4, foot: "L",
    fcAnchor: 70,
    attributes: { pace: 78, stamina: 82, pressing: 70, buildUp: 70, creativity: 56, dribbling: 62, finishing: 36, aerial: 58, tackling: 66, positioning: 66, leadership: 50 },
    note: "왼발 풀백, 오버랩 활발",
  },
  {
    id: "park-jinseob", name: "박진섭", nameEn: "Park Jin-seob", group: "DF",
    primary: "LB", eligible: ["LB", "LWB", "CB"], age: 30, club: "저장 FC", caps: 12, foot: "L",
    fcAnchor: 70,
    attributes: { pace: 72, stamina: 80, pressing: 68, buildUp: 66, creativity: 48, dribbling: 54, finishing: 34, aerial: 66, tackling: 72, positioning: 70, leadership: 60 },
    note: "성실한 좌우 겸용 수비수",
  },
  {
    id: "kim-moonhwan", name: "김문환", nameEn: "Kim Moon-hwan", group: "DF",
    primary: "RB", eligible: ["RB", "RWB"], age: 30, club: "대전 하나 시티즌", caps: 30, foot: "R",
    fcAnchor: 71,
    attributes: { pace: 84, stamina: 84, pressing: 72, buildUp: 62, creativity: 54, dribbling: 64, finishing: 36, aerial: 56, tackling: 68, positioning: 66, leadership: 60 },
    note: "빠른 오른쪽 풀백, 전진 활발",
  },
  {
    id: "seol-youngwoo", name: "설영우", nameEn: "Seol Young-woo", group: "DF",
    primary: "RB", eligible: ["RB", "RWB", "LB", "CB"], age: 27, club: "츠르베나 즈베즈다", caps: 20, foot: "R",
    fcAnchor: 74,
    attributes: { pace: 82, stamina: 86, pressing: 74, buildUp: 72, creativity: 62, dribbling: 70, finishing: 40, aerial: 56, tackling: 68, positioning: 70, leadership: 58 },
    note: "양쪽 풀백 모두 소화, 전진·연결 우수",
  },

  // ── Midfielders ─────────────────────────────────────────────────────────
  {
    id: "hwang-inbeom", name: "황인범", nameEn: "Hwang In-beom", group: "MF",
    primary: "DM", eligible: ["DM", "CM"], age: 29, club: "페예노르트", caps: 65, foot: "R",
    fcAnchor: 78,
    attributes: { pace: 66, stamina: 84, pressing: 76, buildUp: 84, creativity: 78, dribbling: 70, finishing: 50, aerial: 52, tackling: 70, positioning: 78, leadership: 74 },
    note: "탈압박·전진패스 핵심, 템포 조율",
  },
  {
    id: "paik-seungho", name: "백승호", nameEn: "Paik Seung-ho", group: "MF",
    primary: "DM", eligible: ["DM", "CM"], age: 28, club: "버밍엄 시티", caps: 35, foot: "R",
    fcAnchor: 75,
    attributes: { pace: 64, stamina: 82, pressing: 74, buildUp: 80, creativity: 66, dribbling: 66, finishing: 52, aerial: 60, tackling: 74, positioning: 74, leadership: 66 },
    note: "박스투박스, 중거리·전개 균형",
  },
  {
    id: "jens-castrop", name: "옌스 카스트로프", nameEn: "Jens Castrop", group: "MF",
    primary: "DM", eligible: ["DM", "CM"], age: 22, club: "보루시아 MG", caps: 4, foot: "R",
    fcAnchor: 73,
    attributes: { pace: 70, stamina: 88, pressing: 86, buildUp: 74, creativity: 64, dribbling: 66, finishing: 46, aerial: 56, tackling: 76, positioning: 72, leadership: 50 },
    note: "독일 출신 귀화, 압박·활동량 폭발",
  },
  {
    id: "kim-jingyu", name: "김진규", nameEn: "Kim Jin-gyu", group: "MF",
    primary: "DM", eligible: ["DM", "CB"], age: 28, club: "전북 현대", caps: 18, foot: "R",
    fcAnchor: 71,
    attributes: { pace: 62, stamina: 82, pressing: 76, buildUp: 70, creativity: 52, dribbling: 56, finishing: 40, aerial: 62, tackling: 78, positioning: 74, leadership: 60 },
    note: "수비형 미드필더, 차단·활동량",
  },
  {
    id: "lee-jaesung", name: "이재성", nameEn: "Lee Jae-sung", group: "MF",
    primary: "AM", eligible: ["AM", "CM", "LM"], age: 33, club: "마인츠 05", caps: 80, foot: "R",
    fcAnchor: 77,
    attributes: { pace: 66, stamina: 86, pressing: 80, buildUp: 78, creativity: 80, dribbling: 70, finishing: 64, aerial: 56, tackling: 64, positioning: 82, leadership: 78 },
    note: "공수 연결·압박 가담, 부주장급 리더",
  },
  {
    id: "lee-donggyeong", name: "이동경", nameEn: "Lee Dong-gyeong", group: "MF",
    primary: "CM", eligible: ["CM", "AM", "LM"], age: 28, club: "울산 HD", caps: 22, foot: "R",
    fcAnchor: 73,
    attributes: { pace: 68, stamina: 80, pressing: 70, buildUp: 76, creativity: 78, dribbling: 74, finishing: 62, aerial: 48, tackling: 56, positioning: 72, leadership: 58 },
    note: "왼발 창의성·세트피스",
  },
  {
    id: "lee-kangin", name: "이강인", nameEn: "Lee Kang-in", group: "MF",
    primary: "AM", eligible: ["AM", "CM", "RW", "RM"], age: 25, club: "파리 생제르맹", caps: 40, foot: "R",
    fcAnchor: 82,
    attributes: { pace: 70, stamina: 70, pressing: 58, buildUp: 82, creativity: 88, dribbling: 86, finishing: 70, aerial: 42, tackling: 46, positioning: 74, leadership: 64 },
    note: "탈압박·키패스 최고, 압박 가담은 약점",
  },
  {
    id: "bae-junho", name: "배준호", nameEn: "Bae Jun-ho", group: "MF",
    primary: "AM", eligible: ["AM", "RW", "LW"], age: 22, club: "스토크 시티", caps: 12, foot: "R",
    fcAnchor: 73,
    attributes: { pace: 80, stamina: 76, pressing: 68, buildUp: 70, creativity: 76, dribbling: 82, finishing: 60, aerial: 44, tackling: 48, positioning: 66, leadership: 48 },
    note: "드리블 돌파형 영건",
  },
  {
    id: "eom-jiseong", name: "엄지성", nameEn: "Eom Ji-sung", group: "MF",
    primary: "RW", eligible: ["RW", "LW", "RM"], age: 23, club: "스완지 시티", caps: 8, foot: "L",
    fcAnchor: 72,
    attributes: { pace: 84, stamina: 78, pressing: 72, buildUp: 64, creativity: 68, dribbling: 80, finishing: 58, aerial: 42, tackling: 46, positioning: 64, leadership: 46 },
    note: "측면 폭발력·침투",
  },
  {
    id: "yang-hyunjun", name: "양현준", nameEn: "Yang Hyun-jun", group: "MF",
    primary: "LW", eligible: ["LW", "RW"], age: 23, club: "셀틱", caps: 14, foot: "R",
    fcAnchor: 73,
    attributes: { pace: 88, stamina: 80, pressing: 74, buildUp: 60, creativity: 64, dribbling: 80, finishing: 58, aerial: 44, tackling: 48, positioning: 64, leadership: 46 },
    note: "스피드 직선 윙어, 역습 무기",
  },

  // ── Forwards ────────────────────────────────────────────────────────────
  {
    id: "son-heungmin", name: "손흥민", nameEn: "Son Heung-min", group: "FW",
    primary: "LW", eligible: ["LW", "ST", "SS", "RW"], age: 33, club: "LAFC", caps: 144, foot: "B",
    captain: true, fcAnchor: 86,
    attributes: { pace: 84, stamina: 80, pressing: 70, buildUp: 74, creativity: 82, dribbling: 84, finishing: 88, aerial: 56, tackling: 44, positioning: 86, leadership: 90 },
    note: "주장·에이스, 양발 마무리·전환 결정력",
  },
  {
    id: "hwang-heechan", name: "황희찬", nameEn: "Hwang Hee-chan", group: "FW",
    primary: "LW", eligible: ["LW", "ST", "RW", "SS"], age: 30, club: "울버햄튼", caps: 60, foot: "R",
    fcAnchor: 77,
    attributes: { pace: 88, stamina: 84, pressing: 84, buildUp: 62, creativity: 64, dribbling: 76, finishing: 72, aerial: 56, tackling: 50, positioning: 74, leadership: 64 },
    note: "전방압박·런인비하인드, 역습 첨병",
  },
  {
    id: "oh-hyeongyu", name: "오현규", nameEn: "Oh Hyeon-gyu", group: "FW",
    primary: "ST", eligible: ["ST"], age: 24, club: "베식타시", caps: 22, foot: "R",
    fcAnchor: 74,
    attributes: { pace: 82, stamina: 82, pressing: 80, buildUp: 56, creativity: 54, dribbling: 64, finishing: 74, aerial: 66, tackling: 40, positioning: 78, leadership: 52 },
    note: "활동량·침투형 9번",
  },
  {
    id: "cho-guesung", name: "조규성", nameEn: "Cho Gue-sung", group: "FW",
    primary: "ST", eligible: ["ST"], age: 27, club: "미트윌란", caps: 30, foot: "R",
    fcAnchor: 75,
    attributes: { pace: 72, stamina: 76, pressing: 70, buildUp: 58, creativity: 52, dribbling: 58, finishing: 74, aerial: 84, tackling: 38, positioning: 78, leadership: 58 },
    note: "장신 타깃맨, 공중·연계",
  },
  {
    id: "lee-kihyuk", name: "이기혁", nameEn: "Lee Ki-hyuk", group: "FW",
    primary: "RW", eligible: ["RW", "LW", "AM"], age: 21, club: "강원 FC", caps: 3, foot: "R",
    fcAnchor: 69,
    attributes: { pace: 83, stamina: 78, pressing: 72, buildUp: 60, creativity: 64, dribbling: 78, finishing: 56, aerial: 46, tackling: 44, positioning: 62, leadership: 42 },
    note: "K리그 돌파형 영건, 슈퍼서브",
  },
];
