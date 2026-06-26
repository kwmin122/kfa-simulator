import type { Player } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Korea Republic — FIFA World Cup 2026 final 26 (Hong Myung-bo).
// Roster from public reporting. Attributes are TACTIC-MATCHED (0–100) curated
// estimates informed by Transfermarkt/FBref/FotMob profiles + 국대 역할. Not
// official stats. Every player carries strengths/weaknesses + confidence +
// sourceNote (근거). 핵심 6명은 hand-curation. See /methodology.
// ──────────────────────────────────────────────────────────────────────────

export const SQUAD_VERSION = "2026-WC-26man.v3";

export const SQUAD_SOURCES = [
  "https://worldcuppass.com/south-korea-world-cup-squad-2026/",
  "https://www.transfermarkt.com/sudkorea/startseite/verein/3446",
  "https://fbref.com/en/country/KOR/South-Korea-Football",
];

const SRC_TM = "Transfermarkt 프로필 + 24/25 폼 기반 추정";
const SRC_KR = "K리그/대표팀 역할 + 보도 기반 추정";

export const squad: Player[] = [
  // ── Goalkeepers ─────────────────────────────────────────────────────────
  {
    id: "jo-hyeonwoo", name: "조현우", nameEn: "Jo Hyeon-woo", group: "GK",
    primary: "GK", eligible: ["GK"], age: 34, club: "울산 HD", caps: 70, foot: "R",
    marketValueM: 2, gkRating: 82, confidence: "medium", sourceNote: SRC_KR,
    attributes: { buildUp: 58, progression: 30, finishing: 10, pressWork: 35, defending: 83, versatility: 40, ntFit: 84, form: 82 },
    strengths: ["반응속도·선방", "1대1 대응", "대표팀 No.1 경험"],
    weaknesses: ["발밑 분배 평범", "빌드업 가담 제한"],
    note: "반응·선방 좋은 No.1, 발밑 분배는 평범",
  },
  {
    id: "kim-seunggyu", name: "김승규", nameEn: "Kim Seung-gyu", group: "GK",
    primary: "GK", eligible: ["GK"], age: 35, club: "FC 도쿄", caps: 90, foot: "R",
    marketValueM: 1, gkRating: 77, confidence: "medium", sourceNote: SRC_TM,
    attributes: { buildUp: 56, progression: 28, finishing: 10, pressWork: 34, defending: 78, versatility: 38, ntFit: 74, form: 62 },
    strengths: ["경험·안정감", "공중볼 처리"],
    weaknesses: ["나이로 인한 폼 하락", "민첩성 저하"],
    note: "경험 풍부한 베테랑 백업",
  },
  {
    id: "song-bumkeun", name: "송범근", nameEn: "Song Bum-keun", group: "GK",
    primary: "GK", eligible: ["GK"], age: 28, club: "전북 현대", caps: 5, foot: "R",
    marketValueM: 2, gkRating: 76, confidence: "medium", sourceNote: SRC_KR,
    attributes: { buildUp: 66, progression: 32, finishing: 10, pressWork: 38, defending: 76, versatility: 42, ntFit: 60, form: 66 },
    strengths: ["장신·공중 지배", "발밑 분배(스위퍼형)"],
    weaknesses: ["대표팀 경험 부족", "민첩성 보통"],
    note: "장신·발밑 가능형, 빌드업 GK 잠재",
  },

  // ── Centre-backs ────────────────────────────────────────────────────────
  {
    id: "kim-minjae", name: "김민재", nameEn: "Kim Min-jae", group: "DF",
    primary: "CB", eligible: ["CB"], age: 29, club: "바이에른 뮌헨", caps: 75, foot: "R",
    marketValueM: 40, confidence: "medium", sourceNote: "EPL/분데스 + UCL 출전 기반 큐레이션",
    attributes: { buildUp: 76, progression: 58, finishing: 30, pressWork: 74, defending: 90, versatility: 58, ntFit: 86, form: 80 },
    strengths: ["회복 속도로 하이라인 커버", "대인·공중 지배력", "전진 패스 가능"],
    weaknesses: ["과부하 빌드업 시 실책 리스크", "가끔 무리한 태클"],
    note: "월드클래스 CB, 수비의 척추",
    core: {
      bestRoles: ["CB"],
      conditions: [
        { axis: "pressHeight", prefer: "high", target: 68, weight: 0.7, label: "높은 라인 커버 가능" },
        { axis: "buildFromBack", prefer: "low", target: 78, weight: 0.6, label: "빌드업 부담 과하지 않게" },
      ],
      thrive: "회복 속도가 좋아 높은 수비 라인을 커버하는 시스템에서 가치가 극대화됩니다.",
      die: "후방 빌드업의 모든 책임을 떠안으면 실책 리스크가 커집니다.",
    },
  },
  {
    id: "cho-yumin", name: "조유민", nameEn: "Cho Yu-min", group: "DF",
    primary: "CB", eligible: ["CB"], age: 29, club: "샤르자", caps: 18, foot: "R",
    marketValueM: 3, confidence: "medium", sourceNote: SRC_TM,
    attributes: { buildUp: 60, progression: 40, finishing: 32, pressWork: 62, defending: 80, versatility: 46, ntFit: 66, form: 70 },
    strengths: ["공중볼·몸싸움", "투지"],
    weaknesses: ["빌드업 정교함 부족", "스피드 보통"],
    note: "공중볼·몸싸움 강점, 빌드업은 보통",
  },
  {
    id: "kim-taehyeon", name: "김태현", nameEn: "Kim Tae-hyeon", group: "DF",
    primary: "CB", eligible: ["CB", "RB"], age: 24, club: "카시마 앤틀러스", caps: 8, foot: "R",
    marketValueM: 4, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 64, progression: 50, finishing: 30, pressWork: 66, defending: 72, versatility: 72, ntFit: 60, form: 68 },
    strengths: ["스피드", "멀티 포지션(CB/RB)"],
    weaknesses: ["대표팀 경험 적음", "공중볼 약함"],
    note: "스피드·멀티 활용 가능한 젊은 수비수",
  },
  {
    id: "lee-hanbeom", name: "이한범", nameEn: "Lee Han-beom", group: "DF",
    primary: "CB", eligible: ["CB", "DM"], age: 27, club: "미트윌란", caps: 6, foot: "R",
    marketValueM: 5, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 73, progression: 56, finishing: 28, pressWork: 64, defending: 74, versatility: 68, ntFit: 62, form: 70 },
    strengths: ["전진 패스(볼플레잉)", "6번 겸업"],
    weaknesses: ["속도 보통", "대인 강도 발전 중"],
    note: "볼플레잉 CB, 빌드업 시스템에 적합",
  },
  // ── Full-backs / wing-backs ───────────────────────────────────────────────
  {
    id: "seol-youngwoo", name: "설영우", nameEn: "Seol Young-woo", group: "DF",
    primary: "RB", eligible: ["RB", "RWB", "LB", "LWB", "CB"], age: 27, club: "츠르베나 즈베즈다", caps: 20, foot: "R",
    marketValueM: 7, confidence: "medium", sourceNote: "레드스타 클럽폼은 우수(FotMob 7.58)이나 26 WC 부진(남아공전 6.9) 반영",
    attributes: { buildUp: 68, progression: 66, finishing: 36, pressWork: 74, defending: 66, versatility: 86, ntFit: 70, form: 64 },
    strengths: ["양쪽 풀백·윙백 소화(멀티)", "패스·키패스(클럽 91% 패스성공)"],
    weaknesses: ["드리블 돌파 거의 없음", "월드컵 폼 부진·기복"],
    note: "클럽선 우수하나 26 월드컵 경기력 부진, 드리블보다 패스형",
  },
  {
    id: "kim-moonhwan", name: "김문환", nameEn: "Kim Moon-hwan", group: "DF",
    primary: "RB", eligible: ["RB", "RWB"], age: 30, club: "대전 하나 시티즌", caps: 30, foot: "R",
    marketValueM: 2, confidence: "medium", sourceNote: SRC_KR,
    attributes: { buildUp: 56, progression: 66, finishing: 34, pressWork: 74, defending: 64, versatility: 58, ntFit: 64, form: 66 },
    strengths: ["활동량·전진", "오버랩"],
    weaknesses: ["수비 위치선정 기복", "빌드업 제한"],
    note: "활동량·전진 좋은 오른쪽 풀백",
  },
  {
    id: "lee-taeseok", name: "이태석", nameEn: "Lee Tae-seok", group: "DF",
    primary: "LB", eligible: ["LB", "LWB", "CB"], age: 23, club: "오스트리아 빈", caps: 4, foot: "L",
    marketValueM: 3, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 68, progression: 72, finishing: 34, pressWork: 72, defending: 62, versatility: 64, ntFit: 58, form: 68 },
    strengths: ["왼발 크로스·오버랩", "전진 가담"],
    weaknesses: ["수비 1대1 발전 중", "경험 적음"],
    note: "왼발 풀백, 오버랩·크로스 활발",
  },
  {
    id: "park-jinseob", name: "박진섭", nameEn: "Park Jin-seob", group: "DF",
    primary: "LB", eligible: ["LB", "LWB", "CB"], age: 30, club: "저장 FC", caps: 12, foot: "L",
    marketValueM: 2, confidence: "low", sourceNote: SRC_KR,
    attributes: { buildUp: 64, progression: 58, finishing: 32, pressWork: 70, defending: 70, versatility: 64, ntFit: 60, form: 62 },
    strengths: ["성실함·좌우 겸용", "수비 안정"],
    weaknesses: ["공격 임팩트 적음", "스피드 보통"],
    note: "성실한 좌우 겸용 수비 자원",
  },

  // ── Defensive / central midfield ──────────────────────────────────────────
  {
    id: "hwang-inbeom", name: "황인범", nameEn: "Hwang In-beom", group: "MF",
    primary: "DM", eligible: ["DM", "CM"], age: 29, club: "페예노르트", caps: 65, foot: "R",
    marketValueM: 12, confidence: "medium", sourceNote: "에레디비시 + 대표팀 핵심 역할 큐레이션",
    attributes: { buildUp: 86, progression: 78, finishing: 50, pressWork: 78, defending: 66, versatility: 68, ntFit: 84, form: 80 },
    strengths: ["탈압박·전진 패스 허브", "템포 조율", "중거리"],
    weaknesses: ["고강도 압박 노출 시 부담", "순수 파괴자 역할엔 비효율"],
    note: "중원의 메트로놈, 빌드업 핵심",
    core: {
      bestRoles: ["DM", "CM"],
      conditions: [
        { axis: "buildFromBack", prefer: "high", target: 60, weight: 0.8, label: "빌드업 중심 역할" },
        { axis: "pressHeight", prefer: "low", target: 80, weight: 0.5, label: "과한 압박 노출 보호" },
      ],
      thrive: "빌드업 중심으로 보호받으면 경기 템포를 지배합니다.",
      die: "단순 수비형 파괴자로만 쓰이면 최대 강점이 사라집니다.",
    },
  },
  {
    id: "paik-seungho", name: "백승호", nameEn: "Paik Seung-ho", group: "MF",
    primary: "DM", eligible: ["DM", "CM"], age: 28, club: "버밍엄 시티", caps: 35, foot: "R",
    marketValueM: 5, confidence: "medium", sourceNote: SRC_TM,
    attributes: { buildUp: 78, progression: 66, finishing: 52, pressWork: 76, defending: 72, versatility: 66, ntFit: 70, form: 70 },
    strengths: ["박스투박스 활동량", "중거리·전개"],
    weaknesses: ["탈압박 침착성 기복", "스피드 보통"],
    note: "박스투박스, 전개·중거리 균형",
  },
  {
    id: "jens-castrop", name: "옌스 카스트로프", nameEn: "Jens Castrop", group: "MF",
    primary: "DM", eligible: ["DM", "CM", "RB", "LB", "RWB"], age: 22, club: "보루시아 묀헨글라드바흐", caps: 4, foot: "R",
    marketValueM: 8, confidence: "medium", sourceNote: "분데스리가(묀헨글라드바흐) + 독일 연령별 대표 경력 기반 추정",
    attributes: { buildUp: 73, progression: 70, finishing: 50, pressWork: 90, defending: 75, versatility: 78, ntFit: 66, form: 82 },
    strengths: ["폭발적 압박·활동량(스쿼드 최고)", "볼 탈취·전진 운반", "풀백까지 소화하는 멀티"],
    weaknesses: ["대표팀 호흡 적응 중", "탈압박 침착성 발전 중"],
    note: "독일 출생 귀화 박스투박스, 게겐프레스 시스템의 엔진",
  },
  {
    id: "kim-jingyu", name: "김진규", nameEn: "Kim Jin-gyu", group: "MF",
    primary: "DM", eligible: ["DM", "CB"], age: 28, club: "전북 현대", caps: 18, foot: "R",
    marketValueM: 3, confidence: "medium", sourceNote: SRC_KR,
    attributes: { buildUp: 68, progression: 54, finishing: 40, pressWork: 78, defending: 76, versatility: 62, ntFit: 60, form: 66 },
    strengths: ["차단·활동량", "수비형 안정"],
    weaknesses: ["전진 패스 제한", "창의성 낮음"],
    note: "차단·활동량형 수비형 미드필더",
  },
  {
    id: "lee-jaesung", name: "이재성", nameEn: "Lee Jae-sung", group: "MF",
    primary: "AM", eligible: ["AM", "CM", "LM"], age: 33, club: "마인츠 05", caps: 80, foot: "R",
    marketValueM: 6, confidence: "medium", sourceNote: "분데스 + 대표팀 부주장 역할 큐레이션",
    attributes: { buildUp: 78, progression: 80, finishing: 64, pressWork: 82, defending: 60, versatility: 74, ntFit: 84, form: 80 },
    strengths: ["공수 연결", "압박 가담·박스 침투", "리더십"],
    weaknesses: ["나이로 인한 풀시즌 부하", "순수 점유 역할엔 비효율"],
    note: "부주장급 리더, 공수 전환의 윤활유",
    core: {
      bestRoles: ["AM", "CM"],
      conditions: [
        { axis: "pressHeight", prefer: "high", target: 60, weight: 0.7, label: "압박 가담 역할" },
        { axis: "verticality", prefer: "high", target: 58, weight: 0.5, label: "박스 침투 허용" },
      ],
      thrive: "공수 연결과 압박 가담 역할에서 영향력이 극대화됩니다.",
      die: "순수 수비형 또는 순수 점유 역할로 묶이면 색이 옅어집니다.",
    },
  },
  {
    id: "lee-donggyeong", name: "이동경", nameEn: "Lee Dong-gyeong", group: "MF",
    primary: "CM", eligible: ["CM", "AM", "LM"], age: 28, club: "울산 HD", caps: 22, foot: "R",
    marketValueM: 4, confidence: "medium", sourceNote: SRC_KR,
    attributes: { buildUp: 76, progression: 76, finishing: 62, pressWork: 70, defending: 54, versatility: 66, ntFit: 66, form: 70 },
    strengths: ["왼발 창의성", "세트피스", "중거리"],
    weaknesses: ["수비 가담 약함", "피지컬 보통"],
    note: "왼발 창의성·세트피스",
  },

  // ── Attacking midfield / wingers ──────────────────────────────────────────
  {
    id: "lee-kangin", name: "이강인", nameEn: "Lee Kang-in", group: "MF",
    primary: "AM", eligible: ["AM", "CM", "RW", "RM"], age: 25, club: "파리 생제르맹", caps: 40, foot: "R",
    marketValueM: 40, confidence: "medium", sourceNote: "리그앙/UCL + 대표팀 역할 큐레이션",
    attributes: { buildUp: 82, progression: 88, finishing: 68, pressWork: 56, defending: 44, versatility: 64, ntFit: 78, form: 82 },
    strengths: ["탈압박·키패스 최고 수준", "라인 사이 침투 패스", "세트피스"],
    weaknesses: ["압박 가담·수비 기여 약점", "고강도·고템포 시 노출"],
    note: "창조의 핵, 볼 터치가 보장돼야 산다",
    core: {
      bestRoles: ["AM", "RW"],
      conditions: [
        { axis: "possession", prefer: "high", target: 70, weight: 0.9, label: "점유로 볼 터치 보장" },
        { axis: "pressHeight", prefer: "low", target: 78, weight: 0.6, label: "수비 부담 과하지 않게" },
      ],
      thrive: "하프스페이스·10번에서 볼 터치가 보장되고 점유율이 높을 때 살아납니다.",
      die: "고강도 압박과 빠른 템포로 수비 부담이 커지면 주전 경쟁에서 밀립니다.",
    },
  },
  {
    id: "bae-junho", name: "배준호", nameEn: "Bae Jun-ho", group: "MF",
    primary: "AM", eligible: ["AM", "RW", "LW"], age: 22, club: "스토크 시티", caps: 12, foot: "R",
    marketValueM: 9, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 70, progression: 82, finishing: 60, pressWork: 68, defending: 46, versatility: 72, ntFit: 64, form: 74 },
    strengths: ["드리블 돌파", "라인 사이 침투"],
    weaknesses: ["마무리 기복", "수비 가담 약함"],
    note: "드리블 돌파형 영건",
  },
  {
    id: "eom-jiseong", name: "엄지성", nameEn: "Eom Ji-sung", group: "MF",
    primary: "RW", eligible: ["RW", "LW", "RM"], age: 23, club: "스완지 시티", caps: 8, foot: "L",
    marketValueM: 6, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 62, progression: 80, finishing: 58, pressWork: 72, defending: 46, versatility: 66, ntFit: 60, form: 70 },
    strengths: ["측면 폭발력·침투", "1대1 돌파"],
    weaknesses: ["결정력 기복", "수비 가담 약함"],
    note: "측면 폭발력·침투",
  },
  {
    id: "yang-hyunjun", name: "양현준", nameEn: "Yang Hyun-jun", group: "MF",
    primary: "LW", eligible: ["LW", "RW"], age: 23, club: "셀틱", caps: 14, foot: "R",
    marketValueM: 6, confidence: "low", sourceNote: SRC_TM,
    attributes: { buildUp: 60, progression: 82, finishing: 58, pressWork: 74, defending: 46, versatility: 62, ntFit: 62, form: 72 },
    strengths: ["스피드 직선 침투", "역습 무기"],
    weaknesses: ["판단·연계 기복", "마무리 보통"],
    note: "스피드 직선 윙어, 역습 무기",
  },

  // ── Forwards ──────────────────────────────────────────────────────────────
  {
    id: "son-heungmin", name: "손흥민", nameEn: "Son Heung-min", group: "FW",
    primary: "LW", eligible: ["LW", "ST", "SS", "RW"], age: 33, club: "LAFC", caps: 144, foot: "B", captain: true,
    marketValueM: 10, confidence: "medium", sourceNote: "EPL/MLS 통산 + 대표팀 에이스 역할 큐레이션",
    attributes: { buildUp: 72, progression: 84, finishing: 88, pressWork: 70, defending: 44, versatility: 78, ntFit: 90, form: 82 },
    strengths: ["양발 마무리·결정력", "역습·전환 파괴력", "주장 리더십"],
    weaknesses: ["좁은 공간 고립 시 효율 저하", "나이로 인한 풀시즌 부하"],
    note: "주장·에이스, 공간이 곧 생명",
    core: {
      bestRoles: ["LW", "ST", "SS"],
      conditions: [
        { axis: "verticality", prefer: "high", target: 64, weight: 0.9, label: "역습·전환 공간" },
        { axis: "tempo", prefer: "high", target: 58, weight: 0.5, label: "빠른 전개" },
      ],
      thrive: "역습·전환 공간이 열리고 중앙/세컨드 스트라이커로 자유를 받을 때 폭발합니다.",
      die: "왼쪽에 고립돼 내려서서 빌드업만 강요받으면 효율이 급감합니다.",
    },
  },
  {
    id: "hwang-heechan", name: "황희찬", nameEn: "Hwang Hee-chan", group: "FW",
    primary: "LW", eligible: ["LW", "ST", "RW", "SS"], age: 30, club: "울버햄튼", caps: 60, foot: "R",
    marketValueM: 14, confidence: "medium", sourceNote: "EPL + 대표팀 역할 큐레이션",
    attributes: { buildUp: 62, progression: 80, finishing: 72, pressWork: 86, defending: 50, versatility: 74, ntFit: 78, form: 70 },
    strengths: ["전방 압박·배후 침투", "직선 돌파", "스피드"],
    weaknesses: ["좁은 공간 연계 기복", "마무리 침착성 편차"],
    note: "역습 첨병, 압박 시스템의 무기",
    core: {
      bestRoles: ["LW", "ST"],
      conditions: [
        { axis: "pressHeight", prefer: "high", target: 66, weight: 0.7, label: "전방 압박 역할" },
        { axis: "verticality", prefer: "high", target: 64, weight: 0.6, label: "배후 침투 허용" },
      ],
      thrive: "전방 압박과 직선 침투 역할이 명확할 때 강력한 무기가 됩니다.",
      die: "점유 속 좁은 공간 연계만 요구받으면 비효율적입니다.",
    },
  },
  {
    id: "oh-hyeongyu", name: "오현규", nameEn: "Oh Hyeon-gyu", group: "FW",
    primary: "ST", eligible: ["ST"], age: 24, club: "베식타시", caps: 22, foot: "R",
    marketValueM: 10, confidence: "medium", sourceNote: SRC_TM,
    attributes: { buildUp: 56, progression: 72, finishing: 76, pressWork: 82, defending: 40, versatility: 50, ntFit: 70, form: 74 },
    strengths: ["활동량·배후 침투", "전방 압박"],
    weaknesses: ["등지는 연계 약함", "제공권 보통"],
    note: "활동량·배후 침투형 9번",
  },
  {
    id: "cho-guesung", name: "조규성", nameEn: "Cho Gue-sung", group: "FW",
    primary: "ST", eligible: ["ST"], age: 27, club: "미트윌란", caps: 30, foot: "R",
    marketValueM: 8, confidence: "medium", sourceNote: SRC_TM,
    attributes: { buildUp: 58, progression: 56, finishing: 76, pressWork: 70, defending: 60, versatility: 50, ntFit: 70, form: 66 },
    strengths: ["장신 타깃·제공권", "포스트 연계", "박스 결정력"],
    weaknesses: ["스피드·기동성 부족", "발밑 보통"],
    note: "장신 타깃맨, 제공권·연계",
  },
  {
    id: "lee-kihyuk", name: "이기혁", nameEn: "Lee Ki-hyuk", group: "FW",
    primary: "RW", eligible: ["RW", "LW", "AM"], age: 21, club: "강원 FC", caps: 3, foot: "R",
    marketValueM: 2, confidence: "low", sourceNote: SRC_KR,
    attributes: { buildUp: 60, progression: 78, finishing: 56, pressWork: 72, defending: 44, versatility: 64, ntFit: 56, form: 68 },
    strengths: ["돌파·기동성", "슈퍼서브 임팩트"],
    weaknesses: ["대표팀 경험 적음", "마무리 미완성"],
    note: "K리그 돌파형 영건, 슈퍼서브",
  },
];

/** The emotional + tactical core the service revolves around. */
export const KEY_PLAYER_IDS = [
  "son-heungmin", "lee-kangin", "kim-minjae",
  "hwang-inbeom", "hwang-heechan", "lee-jaesung",
];
