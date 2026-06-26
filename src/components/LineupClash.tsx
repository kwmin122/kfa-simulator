import type { XiSlot } from "@/data/types";
import Pitch from "./Pitch";

/** 홍명보 베스트 11 ⚔ 후보 베스트 11 — 나란히 비교 + IN/OUT 차이. */
export default function LineupClash({
  baseXi, baseFormation, xi, formation, coachName,
}: {
  baseXi: XiSlot[]; baseFormation: string; xi: XiSlot[]; formation: string; coachName: string;
}) {
  const baseIds = new Set(baseXi.map((s) => s.player.id));
  const candIds = new Set(xi.map((s) => s.player.id));
  const inP = xi.filter((s) => !baseIds.has(s.player.id)).map((s) => s.player.name);
  const outP = baseXi.filter((s) => !candIds.has(s.player.id)).map((s) => s.player.name);
  const highlight = new Set(xi.filter((s) => !baseIds.has(s.player.id)).map((s) => s.player.id));

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-4">
        <div>
          <div className="mb-2 text-center">
            <div className="text-xs font-bold text-muted">홍명보</div>
            <div className="font-mono text-[11px] text-bad">{baseFormation}</div>
          </div>
          <Pitch formation={baseFormation} xi={baseXi} compact />
        </div>
        <div className="flex items-center">
          <span className="font-display text-lg text-muted">VS</span>
        </div>
        <div>
          <div className="mb-2 text-center">
            <div className="text-xs font-bold text-foreground">{coachName}</div>
            <div className="font-mono text-[11px] text-accent">{formation}</div>
          </div>
          <Pitch formation={formation} xi={xi} highlightIds={highlight} compact />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-line bg-surface p-2.5">
          <div className="mb-1 font-bold text-good">IN ▲ 새 주전</div>
          <div className="text-muted">{inP.length ? inP.join(", ") : "변화 없음 (같은 11)"}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-2.5">
          <div className="mb-1 font-bold text-bad">OUT ▼ 빠지는 선수</div>
          <div className="text-muted">{outP.length ? outP.join(", ") : "변화 없음"}</div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-muted">초록 테두리 = 홍명보 베스트 11에 없던 새 주전</p>
    </div>
  );
}
