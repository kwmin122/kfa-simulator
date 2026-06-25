import type { Coach, Player, SaTagResolution } from "@/data/types";
import { saTags } from "@/data/saMatch";
import { weaknessFixAxis } from "./fit";

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

/** Absolute SA-problem solving (not vs Hong). */
export function solvesSA(coach: Coach, squad: Player[]): SaTagResolution[] {
  const { weaknessPerTag } = { weaknessPerTag: weaknessFixAxis(coach, squad).perTag };
  const map = new Map(weaknessPerTag.map((t) => [t.key, t.fix]));
  return saTags.map((tag) => {
    const m = Math.round((map.get(tag.key) ?? 0) * 100);
    return {
      key: tag.key,
      label: tag.label,
      mitigation: m,
      verdict: m >= 65 ? "solved" : m >= 45 ? "improved" : "unchanged",
      reason: tag.evidence,
    };
  });
}

export interface SaCounterfactual { summary: string; winShift: number }

/** "남아공전이 달랐을까?" — coach's absolute fix vs Hong's absolute fix. */
export function saCounterfactual(coachRes: SaTagResolution[], baselineRes: SaTagResolution[]): SaCounterfactual {
  const cMap = new Map(coachRes.map((r) => [r.key, r.mitigation]));
  const bMap = new Map(baselineRes.map((r) => [r.key, r.mitigation]));
  const diffs = [...cMap.keys()].map((k) => (cMap.get(k) ?? 0) - (bMap.get(k) ?? 0));
  const winShift = Math.round(mean(diffs));
  let summary: string;
  if (winShift >= 14) summary = "남아공전 0-1 패배를 뒤집었을 가능성이 상당히 높아집니다.";
  else if (winShift >= 6) summary = "최소한 비기거나 이길 여지가 뚜렷이 커집니다.";
  else if (winShift > -5) summary = "결과가 크게 달라지긴 어려웠을 것으로 보입니다.";
  else summary = "오히려 이 스쿼드와는 더 고전했을 수 있습니다.";
  return { summary, winShift };
}
