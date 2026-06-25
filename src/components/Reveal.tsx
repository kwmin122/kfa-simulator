"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Animate on mount instead of on scroll (use for above-the-fold content). */
  immediate?: boolean;
}

/** Fade/slide in. `immediate` plays on mount (robust for hero); otherwise on
 *  scroll into view. Respects reduced-motion via framer-motion. */
export default function Reveal({ children, delay = 0, y = 18, className, immediate }: Props) {
  const anim = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate ? { animate: anim } : { whileInView: anim, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
