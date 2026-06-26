import type { Position } from "@/data/types";

// Formation → ordered list of 11 position roles. Display coordinates (x,y) on a
// 0–100 pitch (y: 0 = own GK line, 100 = opponent line) for the pitch viz.

export interface SlotSpec {
  role: Position;
  x: number;
  y: number;
}

export type FormationName =
  | "4-3-3"
  | "4-2-3-1"
  | "4-2-2-2"
  | "4-2-4"
  | "4-4-2"
  | "3-4-3"
  | "3-4-2-1"
  | "3-2-4-1"
  | "5-3-2";

const F: Record<FormationName, SlotSpec[]> = {
  "4-3-3": [
    { role: "GK", x: 50, y: 6 },
    { role: "RB", x: 82, y: 24 },
    { role: "CB", x: 62, y: 18 },
    { role: "CB", x: 38, y: 18 },
    { role: "LB", x: 18, y: 24 },
    { role: "DM", x: 50, y: 38 },
    { role: "CM", x: 68, y: 50 },
    { role: "CM", x: 32, y: 50 },
    { role: "RW", x: 82, y: 76 },
    { role: "ST", x: 50, y: 84 },
    { role: "LW", x: 18, y: 76 },
  ],
  "4-2-3-1": [
    { role: "GK", x: 50, y: 6 },
    { role: "RB", x: 82, y: 24 },
    { role: "CB", x: 62, y: 18 },
    { role: "CB", x: 38, y: 18 },
    { role: "LB", x: 18, y: 24 },
    { role: "DM", x: 62, y: 40 },
    { role: "CM", x: 38, y: 40 },
    { role: "RW", x: 82, y: 64 },
    { role: "AM", x: 50, y: 62 },
    { role: "LW", x: 18, y: 64 },
    { role: "ST", x: 50, y: 84 },
  ],
  "4-2-2-2": [
    { role: "GK", x: 50, y: 6 },
    { role: "RB", x: 82, y: 24 },
    { role: "CB", x: 62, y: 18 },
    { role: "CB", x: 38, y: 18 },
    { role: "LB", x: 18, y: 24 },
    { role: "DM", x: 62, y: 40 },
    { role: "CM", x: 38, y: 40 },
    { role: "AM", x: 72, y: 64 },
    { role: "AM", x: 28, y: 64 },
    { role: "ST", x: 60, y: 84 },
    { role: "ST", x: 40, y: 84 },
  ],
  "4-2-4": [
    { role: "GK", x: 50, y: 6 },
    { role: "RB", x: 84, y: 24 },
    { role: "CB", x: 62, y: 18 },
    { role: "CB", x: 38, y: 18 },
    { role: "LB", x: 16, y: 24 },
    { role: "DM", x: 60, y: 44 },
    { role: "CM", x: 40, y: 44 },
    { role: "RW", x: 88, y: 74 },
    { role: "ST", x: 62, y: 84 },
    { role: "ST", x: 38, y: 84 },
    { role: "LW", x: 12, y: 74 },
  ],
  "4-4-2": [
    { role: "GK", x: 50, y: 6 },
    { role: "RB", x: 82, y: 24 },
    { role: "CB", x: 62, y: 18 },
    { role: "CB", x: 38, y: 18 },
    { role: "LB", x: 18, y: 24 },
    { role: "RM", x: 82, y: 54 },
    { role: "CM", x: 60, y: 48 },
    { role: "CM", x: 40, y: 48 },
    { role: "LM", x: 18, y: 54 },
    { role: "ST", x: 60, y: 82 },
    { role: "ST", x: 40, y: 82 },
  ],
  "3-4-3": [
    { role: "GK", x: 50, y: 6 },
    { role: "CB", x: 68, y: 18 },
    { role: "CB", x: 50, y: 16 },
    { role: "CB", x: 32, y: 18 },
    { role: "RWB", x: 88, y: 46 },
    { role: "CM", x: 60, y: 44 },
    { role: "CM", x: 40, y: 44 },
    { role: "LWB", x: 12, y: 46 },
    { role: "RW", x: 78, y: 78 },
    { role: "ST", x: 50, y: 84 },
    { role: "LW", x: 22, y: 78 },
  ],
  "3-4-2-1": [
    { role: "GK", x: 50, y: 6 },
    { role: "CB", x: 68, y: 18 },
    { role: "CB", x: 50, y: 16 },
    { role: "CB", x: 32, y: 18 },
    { role: "RWB", x: 88, y: 46 },
    { role: "CM", x: 60, y: 42 },
    { role: "CM", x: 40, y: 42 },
    { role: "LWB", x: 12, y: 46 },
    { role: "AM", x: 64, y: 68 },
    { role: "AM", x: 36, y: 68 },
    { role: "ST", x: 50, y: 84 },
  ],
  "3-2-4-1": [
    { role: "GK", x: 50, y: 6 },
    { role: "CB", x: 68, y: 18 },
    { role: "CB", x: 50, y: 16 },
    { role: "CB", x: 32, y: 18 },
    { role: "DM", x: 62, y: 38 },
    { role: "DM", x: 38, y: 38 },
    { role: "RW", x: 86, y: 64 },
    { role: "AM", x: 62, y: 62 },
    { role: "AM", x: 38, y: 62 },
    { role: "LW", x: 14, y: 64 },
    { role: "ST", x: 50, y: 84 },
  ],
  "5-3-2": [
    { role: "GK", x: 50, y: 6 },
    { role: "RWB", x: 88, y: 34 },
    { role: "CB", x: 68, y: 16 },
    { role: "CB", x: 50, y: 14 },
    { role: "CB", x: 32, y: 16 },
    { role: "LWB", x: 12, y: 34 },
    { role: "CM", x: 64, y: 50 },
    { role: "DM", x: 50, y: 44 },
    { role: "CM", x: 36, y: 50 },
    { role: "ST", x: 60, y: 82 },
    { role: "ST", x: 40, y: 82 },
  ],
};

export function formationSlots(name: string): SlotSpec[] {
  const f = F[name as FormationName];
  if (!f) return F["4-2-3-1"]; // safe default
  return f;
}

export const ALL_FORMATIONS = Object.keys(F) as FormationName[];
