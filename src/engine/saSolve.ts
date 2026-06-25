import type { Coach, Player, SaTag, SaTagResolution, StyleAxes } from "@/data/types";
import { saTags } from "@/data/saMatch";
import { requirementSupply } from "./fit";
import { FOCUS_PLAYER_IDS } from "./verdicts";

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

/** How much a coach's system + this squad mitigate one SA problem (0–100). */
function mitigation(tag: SaTag, coach: Coach, squad: Player[], xiIds: Set<string>): number {
  // rotationMisfire is decision-driven: did the system actually field the stars?
  if (tag.key === "rotationMisfire") {
    const fielded = FOCUS_PLAYER_IDS.filter((id) => xiIds.has(id)).length;
    return clamp((fielded / FOCUS_PLAYER_IDS.length) * 100);
  }

  const parts: number[] = [];
  if (tag.mitigatedBy.axes) {
    const axisScores = Object.entries(tag.mitigatedBy.axes).map(([k, target]) => {
      const v = coach.axes[k as keyof StyleAxes];
      return clamp((v / (target as number)) * 100);
    });
    parts.push(mean(axisScores) * 0.6);
  }
  if (tag.mitigatedBy.requirements?.length) {
    const reqScores = tag.mitigatedBy.requirements.map((r) => requirementSupply(r, squad));
    const w = tag.mitigatedBy.axes ? 0.4 : 1;
    parts.push(mean(reqScores) * w);
  }
  // if only one component existed, rescale to 0–100
  const total = parts.reduce((a, b) => a + b, 0);
  const denom = (tag.mitigatedBy.axes ? 0.6 : 0) + (tag.mitigatedBy.requirements?.length ? (tag.mitigatedBy.axes ? 0.4 : 1) : 0);
  return clamp(denom ? total / denom : 0);
}

function verdictOf(m: number): SaTagResolution["verdict"] {
  return m >= 70 ? "solved" : m >= 50 ? "improved" : "unchanged";
}

export function solvesSA(coach: Coach, squad: Player[], xiIds: Set<string>): SaTagResolution[] {
  return saTags.map((tag) => {
    const m = Math.round(mitigation(tag, coach, squad, xiIds));
    return {
      key: tag.key,
      label: tag.label,
      mitigation: m,
      verdict: verdictOf(m),
      reason: tag.evidence,
    };
  });
}

/** Discrimination-bearing tags used for the match counterfactual. */
const KEY_TAGS = ["bluntAttack", "noPenetration", "slowBuildUp", "lowPressTrigger"] as const;

export interface SaCounterfactual {
  summary: string;
  winShift: number; // −100..100 vs the actual 0-1 loss under Hong
}

/** "남아공전이 달랐을까?" — coach vs baseline mitigation of the key problems. */
export function saCounterfactual(
  coachRes: SaTagResolution[],
  baselineRes: SaTagResolution[],
): SaCounterfactual {
  const cMap = new Map(coachRes.map((r) => [r.key, r.mitigation]));
  const bMap = new Map(baselineRes.map((r) => [r.key, r.mitigation]));
  const diffs = KEY_TAGS.map((k) => (cMap.get(k) ?? 0) - (bMap.get(k) ?? 0));
  const winShift = Math.round(mean(diffs));

  let summary: string;
  if (winShift >= 14) summary = "남아공전 0-1 패배를 뒤집었을 가능성이 상당히 높아집니다.";
  else if (winShift >= 6) summary = "최소한 비기거나 이길 여지가 뚜렷이 커집니다.";
  else if (winShift > -5) summary = "결과가 크게 달라지긴 어려웠을 것으로 보입니다.";
  else summary = "오히려 이 스쿼드와는 더 고전했을 수 있습니다.";

  return { summary, winShift };
}
