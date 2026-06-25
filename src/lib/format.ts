import type { CoachTier, SubScores, VerdictLevel, WcRound } from "@/data/types";

export const ROUND_LABEL: Record<WcRound, string> = {
  group: "조별 탈락",
  round32: "32강",
  round16: "16강",
  quarter: "8강",
  semi: "4강",
  final: "결승",
};

export const TIER_LABEL: Record<CoachTier, string> = {
  national: "현직 국가대표 감독",
  free: "무직 (FA)",
  club: "주요 클럽 감독",
};

export const SUB_LABEL: Record<keyof SubScores, string> = {
  buildUp: "빌드업",
  press: "압박",
  transition: "전환",
  attack: "공격",
  defense: "수비",
  depth: "뎁스",
};

export const VERDICT_META: Record<
  VerdictLevel,
  { label: string; color: string; arrow: string }
> = {
  thrives: { label: "살아난다", color: "var(--good)", arrow: "▲" },
  neutral: { label: "유지", color: "var(--muted)", arrow: "▬" },
  sacrificed: { label: "역할 축소", color: "var(--warn)", arrow: "▽" },
  benched: { label: "주전 경쟁", color: "var(--bad)", arrow: "▼" },
};

export function fitTone(fit: number): string {
  if (fit >= 80) return "var(--good)";
  if (fit >= 68) return "var(--accent)";
  if (fit >= 56) return "var(--warn)";
  return "var(--bad)";
}

export const VERDICT_BADGE: Record<string, { label: string; color: string }> = {
  solved: { label: "✅ 해결", color: "var(--good)" },
  improved: { label: "△ 개선", color: "var(--warn)" },
  unchanged: { label: "❌ 그대로", color: "var(--bad)" },
};
