import type { Coach, FiveAxes, PlayerVerdict, TeamStyle, WcReach } from "@/data/types";
import { ROUND_LABEL } from "./projection";

const STYLE_LABEL: Record<keyof TeamStyle, string> = {
  buildUp: "후방 빌드업", press: "전방 압박", transition: "역습 전환",
  attack: "공격 생산력", defense: "수비 안정", control: "경기 장악",
};

const AXIS_LABEL: Record<keyof FiveAxes, string> = {
  coreImpact: "핵심 선수 활용", tacticalExec: "전술 수행", weaknessFix: "약점 보완",
  tournamentFit: "단기전 적합", realism: "현실성",
};
const AXIS_MAX: Record<keyof FiveAxes, number> = {
  coreImpact: 30, tacticalExec: 25, weaknessFix: 20, tournamentFit: 15, realism: 10,
};

export function deriveStrengthsWeaknesses(style: TeamStyle): { strengths: string[]; weaknesses: string[] } {
  const entries = (Object.entries(style) as [keyof TeamStyle, number][]).sort((a, b) => b[1] - a[1]);
  const strengths = entries.slice(0, 2).map(([k, v]) => `${STYLE_LABEL[k]} (${v})`);
  const weaknesses = entries.slice(-2).map(([k, v]) => `${STYLE_LABEL[k]} (${v})`);
  return { strengths, weaknesses };
}

export interface NarrateInput {
  coach: Coach; fit: number; axes: FiveAxes; style: TeamStyle;
  keyVerdicts: PlayerVerdict[]; counterfactual: { summary: string }; wcReach: WcReach;
}

export function narrate(inp: NarrateInput): string {
  const { coach, fit, axes } = inp;
  const axisEntries = (Object.entries(axes) as [keyof FiveAxes, number][]);
  const bestAxis = [...axisEntries].sort((a, b) => b[1] / AXIS_MAX[b[0]] - a[1] / AXIS_MAX[a[0]])[0];
  const worstAxis = [...axisEntries].sort((a, b) => a[1] / AXIS_MAX[a[0]] - b[1] / AXIS_MAX[b[0]])[0];
  const sw = deriveStrengthsWeaknesses(inp.style);

  const son = inp.keyVerdicts.find((v) => v.playerId === "son-heungmin");
  const lki = inp.keyVerdicts.find((v) => v.playerId === "lee-kangin");
  const word = (v?: PlayerVerdict) => v?.level === "thrives" ? "살아납니다" : v?.level === "sacrificed" ? "역할이 줄어듭니다" : v?.level === "benched" ? "주전 경쟁이 빡빡해집니다" : "제 몫을 합니다";

  const fitWord = fit >= 74 ? "매우 잘 맞습니다" : fit >= 64 ? "잘 맞는 편입니다" : fit >= 54 ? "부분적으로 맞습니다" : "마찰이 큽니다";

  return [
    `${coach.name}의 ${coach.formation}(${coach.dna.slice(0, 2).join("·")})은 현 스쿼드와 적합도 ${fit}점으로 ${fitWord}.`,
    `5개 축 중 "${AXIS_LABEL[bestAxis[0]]}"가 강하고("${AXIS_LABEL[worstAxis[0]]}"가 약점), 팀 색깔은 ${sw.strengths.join("·")}에서 두드러집니다.`,
    son ? `손흥민은 ${word(son)}${lki ? `, 이강인은 ${word(lki)}` : ""}.` : "",
    `남아공전 가정: ${inp.counterfactual.summary}`,
    `월드컵 예상 도달은 ${ROUND_LABEL[inp.wcReach.expected]}(밴드 ${inp.wcReach.band}, 조 통과 ${inp.wcReach.adv16}%) — 모델 추정.`,
  ].filter(Boolean).join(" ");
}
