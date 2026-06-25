"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TIER_LABEL, fitTone } from "@/lib/format";
import type { CoachTier } from "@/data/types";

export interface GalleryItem {
  id: string;
  name: string;
  tier: CoachTier;
  formation: string;
  fit: number;
  dna: string[];
}

/** A 3D circular gallery of coaches. Side cards rotate the ring; the front
 *  card navigates to that coach's analysis. (React Bits style.) */
export default function CircularGallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const n = items.length;

  const go = (dir: number) => setIndex((i) => (i + dir + n) % n);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-[300px] w-full max-w-4xl"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((it, i) => {
            let offset = i - index;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const isFront = offset === 0;
            const abs = Math.abs(offset);
            const tone = fitTone(it.fit);
            return (
              <motion.button
                key={it.id}
                onClick={() => (isFront ? router.push(`/coach/${it.id}`) : setIndex(i))}
                className="absolute left-1/2 top-1/2 h-[230px] w-[200px] rounded-2xl border text-left"
                animate={{
                  x: offset * 160 - 100,
                  y: -115,
                  rotateY: offset * -34,
                  z: -abs * 130,
                  scale: 1 - abs * 0.11,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                  filter: isFront ? "blur(0px)" : `blur(${abs * 0.7}px)`,
                }}
                transition={{ type: "spring", stiffness: 110, damping: 20 }}
                style={{
                  transformStyle: "preserve-3d",
                  borderColor: isFront ? tone : "var(--border)",
                  background: isFront
                    ? "linear-gradient(160deg, var(--surface-2), var(--surface))"
                    : "var(--surface)",
                  boxShadow: isFront ? `0 0 44px -10px ${tone}` : "none",
                  pointerEvents: abs > 2 ? "none" : "auto",
                  cursor: "pointer",
                  zIndex: 10 - abs,
                }}
              >
                <div className="flex h-full flex-col p-4">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                    {TIER_LABEL[it.tier]}
                  </span>
                  <span className="mt-1 text-xl font-black leading-tight text-foreground">
                    {it.name}
                  </span>
                  <span className="font-mono text-xs text-muted">{it.formation}</span>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {it.dna.slice(0, 2).map((d) => (
                      <span key={d} className="rounded-full bg-background/60 px-2 py-0.5 text-[10px] text-muted">
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end justify-between">
                      <span className="text-[10px] text-muted">스쿼드 적합도</span>
                      <span className="font-mono text-2xl font-bold" style={{ color: tone }}>
                        {it.fit}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/70">
                      <div className="h-full rounded-full" style={{ width: `${it.fit}%`, background: tone }} />
                    </div>
                    {isFront && (
                      <span className="mt-3 block text-center text-[11px] font-bold" style={{ color: tone }}>
                        분석 보기 →
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="이전 감독"
          className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.id}
              aria-label={it.name}
              onClick={() => setIndex(i)}
              className="size-2 rounded-full transition-all"
              style={{ background: i === index ? "var(--accent)" : "var(--border)", transform: i === index ? "scale(1.4)" : "scale(1)" }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="다음 감독"
          className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          →
        </button>
      </div>
    </div>
  );
}
