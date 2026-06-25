import type { XiSlot } from "@/data/types";
import { formationSlots } from "@/engine";

const GROUP_COLOR: Record<string, string> = {
  GK: "var(--warn)",
  DF: "var(--kr-blue)",
  MF: "var(--accent)",
  FW: "var(--kr-red)",
};

/** Vertical pitch with the XI placed by formation. Attack points upward. */
export default function Pitch({ formation, xi }: { formation: string; xi: XiSlot[] }) {
  const slots = formationSlots(formation);
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl border border-border">
      {/* turf */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a2a1c 0%, #0c3322 50%, #0a2a1c 100%)",
        }}
      />
      {/* markings */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 150" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5">
        <rect x="3" y="3" width="94" height="144" />
        <line x1="3" y1="75" x2="97" y2="75" />
        <circle cx="50" cy="75" r="11" />
        <rect x="28" y="3" width="44" height="20" />
        <rect x="28" y="127" width="44" height="20" />
        <rect x="40" y="3" width="20" height="8" />
        <rect x="40" y="139" width="20" height="8" />
      </svg>

      {xi.map((s, i) => {
        const slot = slots[i] ?? { x: 50, y: 50 };
        const left = `${slot.x}%`;
        const top = `${100 - slot.y}%`; // invert: y=100 (opp) → top
        const color = GROUP_COLOR[s.player.group] ?? "var(--accent)";
        const last = s.player.name.length > 3 ? s.player.name.slice(-3) : s.player.name;
        return (
          <div
            key={s.player.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left, top }}
          >
            <div
              className="grid size-8 place-items-center rounded-full border text-[10px] font-bold text-background shadow-lg"
              style={{ background: color, borderColor: "rgba(255,255,255,0.5)" }}
              title={`${s.player.name} · 적합도 ${s.slotFit}`}
            >
              {s.player.captain ? "C" : s.role}
            </div>
            <span className="mt-0.5 whitespace-nowrap rounded bg-black/55 px-1 text-[9px] font-medium text-white">
              {last}
            </span>
          </div>
        );
      })}
    </div>
  );
}
