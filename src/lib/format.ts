import type { CoachTier, FiveAxes, TeamStyle, VerdictLevel, WcRound } from "@/data/types";

export const ROUND_LABEL: Record<WcRound, string> = {
  group: "조별 탈락",
  round32: "32강",
  round16: "16강",
  quarter: "8강",
  semi: "4강",
  final: "결승",
};

export const TIER_LABEL: Record<CoachTier, string> = {
  national: "현직 국가대표",
  free: "무직 (FA)",
  club: "클럽 감독",
  domestic: "국내/아시아",
  media: "방송·FM",
};

export const STYLE_LABEL: Record<keyof TeamStyle, string> = {
  buildUp: "빌드업",
  press: "압박",
  transition: "전환",
  attack: "공격",
  defense: "수비",
  control: "장악",
};

export const AXIS_LABEL: Record<keyof FiveAxes, string> = {
  coreImpact: "핵심 선수",
  tacticalExec: "전술 수행",
  weaknessFix: "약점 보완",
  tournamentFit: "단기전",
  realism: "현실성",
};
export const AXIS_MAX: Record<keyof FiveAxes, number> = {
  coreImpact: 30, tacticalExec: 25, weaknessFix: 20, tournamentFit: 15, realism: 10,
};

export const VERDICT_META: Record<VerdictLevel, { label: string; color: string; arrow: string }> = {
  thrives: { label: "살아난다", color: "var(--good)", arrow: "▲" },
  neutral: { label: "유지", color: "var(--muted)", arrow: "▬" },
  sacrificed: { label: "역할 축소", color: "var(--warn)", arrow: "▽" },
  benched: { label: "벤치 경쟁", color: "var(--bad)", arrow: "▼" },
};

export function fitTone(fit: number): string {
  if (fit >= 76) return "var(--good)";
  if (fit >= 64) return "var(--accent)";
  if (fit >= 54) return "var(--warn)";
  return "var(--bad)";
}

export const VERDICT_BADGE: Record<string, { label: string; color: string }> = {
  solved: { label: "✅ 해결", color: "var(--good)" },
  improved: { label: "△ 개선", color: "var(--warn)" },
  unchanged: { label: "❌ 그대로", color: "var(--bad)" },
};
