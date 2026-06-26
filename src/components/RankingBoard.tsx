"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CoachTier, RankingRow } from "@/data/types";
import { TIER_LABEL, ROUND_LABEL, fitTone, CONFIDENCE_META } from "@/lib/format";

const TABS: ({ key: CoachTier | "all"; label: string })[] = [
  { key: "all", label: "전체" },
  { key: "national", label: "현직 국대" },
  { key: "free", label: "무직" },
  { key: "club", label: "클럽" },
];

export default function RankingBoard({ rows }: { rows: RankingRow[] }) {
  const [tab, setTab] = useState<CoachTier | "all">("all");
  const filtered = tab === "all" ? rows : rows.filter((r) => r.tier === tab);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            style={{
              borderColor: tab === t.key ? "var(--accent)" : "var(--border)",
              color: tab === t.key ? "var(--accent)" : "var(--muted)",
              background: tab === t.key ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((r, i) => {
          const tone = fitTone(r.fitScore);
          return (
            <motion.div
              key={r.coachId}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/coach/${r.coachId}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/60"
              >
                <span className="w-6 text-center font-mono text-sm font-bold text-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground">{r.coachName}</span>
                    <span className="rounded bg-background px-1.5 py-0.5 text-[9px] text-muted">{TIER_LABEL[r.tier]}</span>
                    {r.meme && <span className="rounded bg-warn/15 px-1.5 py-0.5 text-[9px] font-bold text-warn">예능 IF</span>}
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    {r.profiled ? `예상 ${ROUND_LABEL[r.expected]}` : "프로필 필요"}
                    <span className="inline-flex items-center gap-1" title={`근거 신뢰도: ${CONFIDENCE_META[r.confidence].label}`}>
                      · <span className="size-1.5 rounded-full" style={{ background: CONFIDENCE_META[r.confidence].color }} />
                      {CONFIDENCE_META[r.confidence].label}
                    </span>
                  </span>
                </div>
                {r.profiled ? (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-background">
                      <div className="h-full rounded-full" style={{ width: `${r.fitScore}%`, background: tone }} />
                    </div>
                    <span className="w-7 text-right font-mono text-lg font-bold" style={{ color: tone }}>
                      {r.fitScore}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-muted">—</span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
