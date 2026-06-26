import type { Coach, FitAxes, PlayerVerdict, TeamStyle, WcReach } from "@/data/types";
import { ROUND_LABEL } from "./projection";

const STYLE_LABEL: Record<keyof TeamStyle, string> = {
  buildUp: "후방 빌드업", press: "전방 압박", transition: "역습 전환",
  attack: "지공 생산", defense: "수비 안정", control: "경기 장악",
};

const AXIS_LABEL: Record<keyof FitAxes, string> = {
  coreImpact: "핵심 선수 활용", tacticalExec: "전술 수행", weaknessFix: "약점 보완",
  tournamentFit: "단기전 적합",
};
const AXIS_MAX: Record<keyof FitAxes, number> = {
  coreImpact: 33, tacticalExec: 28, weaknessFix: 22, tournamentFit: 17,
};

export function deriveStrengthsWeaknesses(style: TeamStyle): { strengths: string[]; weaknesses: string[] } {
  const entries = (Object.entries(style) as [keyof TeamStyle, number][]).sort((a, b) => b[1] - a[1]);
  const strengths = entries.slice(0, 2).map(([k, v]) => `${STYLE_LABEL[k]} (${v})`);
  const weaknesses = entries.slice(-2).map(([k, v]) => `${STYLE_LABEL[k]} (${v})`);
  return { strengths, weaknesses };
}

/** 풍부한 월드컵 경로 예측 — 감독 정체성(dna)·고유 약점·시나리오 밴드를 결합. 템플릿
 *  아님: dna와 risk가 감독마다 달라 서사가 서로 다르게 읽힌다. */
export function wcNarrative(coach: Coach, fit: number, style: TeamStyle, scenarios: { best: WcReach["expected"]; average: WcReach["expected"] }, isBaseline: boolean): string {
  if (isBaseline) {
    return "현 흐름이면 남아공전 0-1 패의 후유증 속에 조별리그 통과 자체가 불투명하다. 손흥민·이재성을 벤치에 두는 로테이션과 3백 고집, 느린 전환이 반복되면 멕시코·체코를 상대로도 주도권을 내주고 32강 진출마저 위태롭다.";
  }
  const R = ROUND_LABEL;
  const dna = coach.dna.slice(0, 2).join("·");
  const fitVerb = fit >= 78 ? "압도하며 주도권을 노린다" : fit >= 68 ? "대등하게 맞선다" : fit >= 58 ? "끈질기게 버틴다" : "고전이 예상된다";

  // 감독별 고유 약점(실제 수치 기반)
  const i = coach.intangibles;
  const risk = style.defense < 62 || i.defensiveStability < 45
    ? "수비 밸런스가 흔들려 역습 한 방에 실점하는 게 변수다"
    : i.complexity >= 72
      ? "복잡한 전술을 짧은 대표팀 소집 기간에 이식하는 속도가 관건이다"
      : i.tournamentXP < 50
        ? "토너먼트 경험 부족이 큰 경기 한 순간에 드러날 수 있다"
        : style.attack < 60
          ? "적은 기회를 살리는 결정력이 따라줘야 한다"
          : i.starManagement < 55
            ? "스타 선수단을 하나로 묶는 관리가 관건이다"
            : "큰 경기 집중력 유지가 마지막 관문이다";

  const avg = scenarios.average;
  let knock: string;
  if (avg === "final" || avg === "semi") knock = `16강·8강은 현실적이고 최상의 흐름이면 ${R[scenarios.best]}까지 노려볼 수 있다`;
  else if (avg === "quarter") knock = `32강을 넘어 16강은 무난하고 8강도 충분히 도전, 대진이 풀리면 ${R[scenarios.best]}까지 바라본다`;
  else if (avg === "round16") knock = `32강을 통과해 16강에서 강호와 정면승부하는 그림이며 최상이면 ${R[scenarios.best]}도 가능하다`;
  else if (avg === "round32") knock = `조별리그 통과 후 32강이 현실적 목표이고 그 이상은 대진·컨디션 변수가 크다`;
  else knock = `조별리그 통과 자체가 빠듯해 자칫 ${R.group} 위험이 있다`;

  return `${dna} 기반으로 조별리그에서 멕시코·체코를 ${fitVerb}. 남아공전 같은 소모전을 줄여 체력을 아끼고 로테이션을 관리하면, ${knock}. 단, ${risk}.`;
}

export interface NarrateInput {
  coach: Coach; fit: number; axes: FitAxes; style: TeamStyle;
  keyVerdicts: PlayerVerdict[]; counterfactual: { summary: string }; wcReach: WcReach;
  isBaseline?: boolean;
}

export function narrate(inp: NarrateInput): string {
  const { coach, fit, axes } = inp;
  const axisEntries = (Object.entries(axes) as [keyof FitAxes, number][]);
  const bestAxis = [...axisEntries].sort((a, b) => b[1] / AXIS_MAX[b[0]] - a[1] / AXIS_MAX[a[0]])[0];
  const worstAxis = [...axisEntries].sort((a, b) => a[1] / AXIS_MAX[a[0]] - b[1] / AXIS_MAX[b[0]])[0];
  const sw = deriveStrengthsWeaknesses(inp.style);

  const son = inp.keyVerdicts.find((v) => v.playerId === "son-heungmin");
  const lki = inp.keyVerdicts.find((v) => v.playerId === "lee-kangin");
  const word = (v?: PlayerVerdict) => v?.level === "thrives" ? "살아납니다" : v?.level === "sacrificed" ? "역할이 줄어듭니다" : v?.level === "benched" ? "주전 경쟁이 빡빡해집니다" : "제 몫을 합니다";

  const fitWord = fit >= 80 ? "매우 잘 맞습니다" : fit >= 68 ? "잘 맞는 편입니다" : fit >= 58 ? "부분적으로 맞습니다" : "마찰이 큽니다";

  // For the failing baseline, don't read high raw style values as praise.
  const colorLine = inp.isBaseline
    ? `개별 공격 자원은 좋지만(지공 생산성 ${inp.style.attack}) 3백 유지와 느린 전환 때문에 그 장점이 구조로 연결되지 못합니다.`
    : `4개 축 중 "${AXIS_LABEL[bestAxis[0]]}"가 강하고("${AXIS_LABEL[worstAxis[0]]}"가 약점), 팀 색깔은 ${sw.strengths.join("·")}에서 두드러집니다.`;

  return [
    `${coach.name}의 ${coach.formation}(${coach.dna.slice(0, 2).join("·")})은 현 스쿼드와 적합도 ${fit}점으로 ${fitWord}.`,
    colorLine,
    son ? `손흥민은 ${word(son)}${lki ? `, 이강인은 ${word(lki)}` : ""}.` : "",
    `남아공전 가정: ${inp.counterfactual.summary}`,
    `월드컵 예상 도달은 ${ROUND_LABEL[inp.wcReach.expected]}(밴드 ${inp.wcReach.band}, 조 통과 ${inp.wcReach.adv16}%) — 모델 추정.`,
  ].filter(Boolean).join(" ");
}
