// ──────────────────────────────────────────────────────────────────────────
// Domain model (v2). Attributes are TACTIC-MATCHED categories (not FIFA-style
// overalls) so they feed coach matching directly. All 0–100 numbers are
// SUBJECTIVE ESTIMATES informed by public profiles (Transfermarkt / FBref /
// FotMob) + curation — not official stats. See /methodology.
// ──────────────────────────────────────────────────────────────────────────

export type Position =
  | "GK" | "RB" | "RWB" | "CB" | "LB" | "LWB"
  | "DM" | "CM" | "AM" | "RM" | "LM"
  | "RW" | "LW" | "SS" | "ST";

export type PositionGroup = "GK" | "DF" | "MF" | "FW";

/** Eight tactic-matched player categories (0–100). */
export interface Attributes {
  buildUp: number;     // 빌드업: 압박 하 전진패스·탈압박·롱패스·좌우 전환
  progression: number; // 전진성: 볼 운반·침투 패스·라인 사이 포지셔닝
  finishing: number;   // 마무리: 박스 안 결정력·오프볼 침투·슈팅 볼륨
  pressWork: number;   // 압박/활동량: 전방 압박·복귀·커버 범위
  defending: number;   // 수비 안정성: 1v1·공중볼·뒷공간 대응·위치선정
  versatility: number; // 전술 유연성: 멀티 포지션·백3/백4·인버티드
  ntFit: number;       // 국대 적합성: 대표팀 실제 역할·주변 시너지
  form: number;        // 최근 폼: 출전 시간·부상·경기 감각
}

export const ATTR_LABEL: Record<keyof Attributes, string> = {
  buildUp: "빌드업",
  progression: "전진성",
  finishing: "마무리",
  pressWork: "압박·활동량",
  defending: "수비 안정성",
  versatility: "전술 유연성",
  ntFit: "국대 적합성",
  form: "최근 폼",
};

/** Deep indicator for the emotional-core players (Son / Lee Kang-in / Kim Min-jae). */
export interface CoreProfile {
  /** Roles where this player is genuinely elite. */
  bestRoles: Position[];
  /** Tactical conditions that must hold for them to thrive (absolute). */
  conditions: { axis: keyof StyleAxes; prefer: "high" | "low"; target: number; weight: number; label: string }[];
  thrive: string; // KR — when they come alive
  die: string;    // KR — when they get killed
}

export interface Player {
  id: string;
  name: string;
  nameEn: string;
  number?: number;
  group: PositionGroup;
  primary: Position;
  eligible: Position[];
  age: number;
  club: string;
  caps?: number;
  marketValueM?: number; // €m, Transfermarkt-style
  foot: "L" | "R" | "B";
  captain?: boolean;
  attributes: Attributes;
  gkRating?: number; // GK shot-stopping (0–100)
  /** Strengths/weaknesses are curated here (not derived) for key players. */
  strengths?: string[];
  weaknesses?: string[];
  note?: string;
  core?: CoreProfile;
}

// ── Coach / tactical model ────────────────────────────────────────────────

export type CoachTier = "national" | "free" | "club" | "domestic" | "media";

/** Tactical demand axes (0–100). */
export interface StyleAxes {
  possession: number;    // 0 직선/롱볼 — 100 점유
  pressHeight: number;   // 0 로우블록 — 100 하이프레스
  tempo: number;         // 0 통제 — 100 고템포
  width: number;         // 0 좁게 — 100 측면 폭
  verticality: number;   // 0 순환 — 100 빠른 수직 침투
  buildFromBack: number; // 0 후방 우회 — 100 후방 빌드업
}

/** Intangibles that decide tournament suitability (axis 4). */
export interface Intangibles {
  complexity: number;         // 전술 복잡도 (높을수록 단기전 불리)
  planB: number;              // 플랜 B 보유
  tournamentXP: number;       // 토너먼트 경험
  defensiveStability: number; // 수비 안정 지향
  starManagement: number;     // 스타 선수 관리
}

/** Realism of actually landing the Korea job (axis 5). */
export interface Realism {
  koreaPlausibility: number; // 연봉·커리어상 한국행 가능성
  available: number;         // 계약 여부 (무직 = 높음)
  asiaNtXP: number;          // 아시아/국가대표 경험
  squadControl: number;      // 선수단 장악력
}

export type RequirementKey =
  | "ballPlayingCB" | "paceWingers" | "holdingDM" | "boxToBoxCM"
  | "creativeAM" | "mobileStriker" | "targetStriker" | "overlappingFB"
  | "pressResistantMF" | "highStaminaFront" | "aerialCB" | "sweeperKeeper";

export interface Requirement {
  key: RequirementKey;
  weight: number; // 0–1
  label: string;
}

export interface Coach {
  id: string;
  name: string;
  nameEn: string;
  tier: CoachTier;
  status: string;       // verified current job (KR)
  rumor?: string;       // why Korean fans talk about them (KR)
  nationality: string;
  age?: number;
  formation: string;
  altFormations?: string[];
  axes: StyleAxes;
  requirements: Requirement[];
  intangibles: Intangibles;
  realism: Realism;
  dna: string[];
  blurb: string;
  profiled: boolean;
  sources: string[];
}

// ── South Africa match diagnosis ──────────────────────────────────────────

export type SaTagKey =
  | "finalThirdCreativity" // 마지막 1/3 창의성 부족
  | "sonUsage"             // 손흥민 활용 불명확
  | "lkiIsolation"         // 이강인 고립 또는 과의존
  | "boxThreat"            // 박스 안 위협 부족
  | "slowTempo"            // 느린 템포
  | "lowFinishing";        // 높은 점유 대비 낮은 결정력

export interface SaTag {
  key: SaTagKey;
  label: string;
  evidence: string;
  /** Absolute: tactical traits that, if present, FIX this problem. */
  fixedBy: {
    axes?: Partial<Record<keyof StyleAxes, { prefer: "high" | "low"; target: number }>>;
    requirements?: RequirementKey[];
  };
}

// ── Simulation output ─────────────────────────────────────────────────────

export interface XiSlot {
  role: Position;
  player: Player;
  slotFit: number;
}

/** The five squad-fit axes (each on its own max). */
export interface FiveAxes {
  coreImpact: number;     // 0–30 핵심 선수 버프/너프
  tacticalExec: number;   // 0–25 전술 수행 가능성
  weaknessFix: number;    // 0–20 약점 보완도
  tournamentFit: number;  // 0–15 월드컵 단기전 적합도
  realism: number;        // 0–10 현실 리스크
}

export type VerdictLevel = "thrives" | "neutral" | "sacrificed" | "benched";

export interface PlayerVerdict {
  playerId: string;
  level: VerdictLevel;
  buff: number;     // signed −15..+15 (absolute role suitability vs their ceiling)
  reason: string;
  inXi: boolean;
}

export interface SaTagResolution {
  key: SaTagKey;
  label: string;
  mitigation: number; // 0–100 absolute
  verdict: "solved" | "improved" | "unchanged";
  reason: string;
}

export type WcRound = "group" | "round32" | "round16" | "quarter" | "semi" | "final";

export interface WcReach {
  probs: Record<WcRound, number>;
  expected: WcRound;
  band: "낮음" | "중간" | "높음";
  adv16: number;
}

export interface PredictedXg {
  for: number;
  against: number;
}

export interface SimulationResult {
  coachId: string;
  squadVersion: string;
  formation: string;
  xi: XiSlot[];
  fitScore: number;       // 0–100 = sum of FiveAxes
  axes: FiveAxes;
  teamStyle: TeamStyle;   // for the "어떤 축구" radar
  strengths: string[];
  weaknesses: string[];
  keyVerdicts: PlayerVerdict[];
  saResolution: SaTagResolution[];
  saCounterfactual: { summary: string; winShift: number };
  predictedXg: PredictedXg;
  wcReach: WcReach;
  explanation: string;
}

/** Team-level radar of how the side will actually play (0–100). */
export interface TeamStyle {
  buildUp: number;
  press: number;
  transition: number;
  attack: number;
  defense: number;
  control: number;
}

export interface RankingRow {
  coachId: string;
  coachName: string;
  tier: CoachTier;
  fitScore: number;
  expected: WcRound;
  realism: number;
  profiled: boolean;
}
