import type {
  Coach,
  PlayerVerdict,
  Player,
  SubScores,
  WcReach,
} from "@/data/types";
import type { ReqBreakdown } from "./fit";
import type { SaCounterfactual } from "./saSolve";
import { ROUND_LABEL } from "./projection";

const SUB_LABEL: Record<keyof SubScores, string> = {
  buildUp: "후방 빌드업",
  press: "전방 압박",
  transition: "역습 전환",
  attack: "공격 생산력",
  defense: "수비 안정",
  depth: "스쿼드 뎁스",
};

/** Derived strengths/weaknesses from the radar (single source of truth). */
export function deriveStrengthsWeaknesses(sub: SubScores): {
  strengths: string[];
  weaknesses: string[];
} {
  const entries = (Object.entries(sub) as [keyof SubScores, number][]).sort(
    (a, b) => b[1] - a[1],
  );
  const strengths = entries.slice(0, 2).filter(([, v]) => v >= 55).map(([k, v]) => `${SUB_LABEL[k]} (${v})`);
  const weaknesses = entries.slice(-2).filter(([, v]) => v <= 68).map(([k, v]) => `${SUB_LABEL[k]} (${v})`);
  return {
    strengths: strengths.length ? strengths : [`${SUB_LABEL[entries[0][0]]} (${entries[0][1]})`],
    weaknesses: weaknesses.length ? weaknesses : [`${SUB_LABEL[entries.at(-1)![0]]} (${entries.at(-1)![1]})`],
  };
}

const byId = (squad: Player[], id: string) => squad.find((p) => p.id === id);

export interface NarrateInput {
  coach: Coach;
  squad: Player[];
  fit: number;
  breakdown: ReqBreakdown[];
  sub: SubScores;
  keyVerdicts: PlayerVerdict[];
  counterfactual: SaCounterfactual;
  wcReach: WcReach;
}

/** Deterministic KR narrative — no AI, pure templating from the numbers. */
export function narrate(inp: NarrateInput): string {
  const { coach, squad, fit, breakdown, sub } = inp;
  const best = [...breakdown].sort((a, b) => b.supply - a.supply)[0];
  const worst = [...breakdown].sort((a, b) => a.supply - b.supply)[0];
  const sw = deriveStrengthsWeaknesses(sub);

  const son = inp.keyVerdicts.find((v) => v.playerId === "son-heungmin");
  const lki = inp.keyVerdicts.find((v) => v.playerId === "lee-kangin");
  const lvlWord = (l?: string) =>
    l === "thrives" ? "살아납니다" : l === "sacrificed" ? "역할이 줄어듭니다" : l === "benched" ? "주전 경쟁이 빡빡해집니다" : "제 몫을 합니다";

  const fitWord = fit >= 72 ? "매우 잘 맞습니다" : fit >= 62 ? "잘 맞는 편입니다" : fit >= 52 ? "부분적으로 맞습니다" : "마찰이 적지 않습니다";

  const lines = [
    `${coach.name}의 ${coach.formation} 시스템(${coach.dna.slice(0, 2).join("·")})은 현 스쿼드와 적합도 ${fit}점으로 ${fitWord}.`,
    `가장 잘 채워지는 요구는 "${best.label}"(${best.supply}), 약한 고리는 "${worst.label}"(${worst.supply})입니다.`,
    `팀 색깔은 ${sw.strengths.join(", ")}에서 강하고 ${sw.weaknesses.join(", ")}에서 아쉽습니다.`,
    son ? `손흥민은 이 시스템에서 ${lvlWord(son.level)}${lki ? `, 이강인은 ${lvlWord(lki.level)}` : ""}.` : "",
    `남아공전 가정: ${inp.counterfactual.summary}`,
    `월드컵 예상 도달 라운드는 ${ROUND_LABEL[inp.wcReach.expected]}(가능성 밴드 ${inp.wcReach.band}, 조 통과 ${inp.wcReach.adv16}%)입니다. — 모델 추정.`,
  ];
  void byId; void squad;
  return lines.filter(Boolean).join(" ");
}
