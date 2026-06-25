"use client";

// Ferrofluid-inspired ambient background (React Bits style). Uses an SVG goo
// filter to merge drifting blobs into a living liquid-metal field. GPU-cheap,
// no WebGL context risk, and fully disabled under prefers-reduced-motion.
// Sits BEHIND content; kept low-contrast so text stays readable (no overlap).

const BLOBS = [
  { cx: 22, cy: 30, r: 17, dur: 19, fill: "var(--kr-blue)", delay: 0 },
  { cx: 74, cy: 24, r: 13, dur: 23, fill: "var(--accent)", delay: -4 },
  { cx: 60, cy: 72, r: 20, dur: 27, fill: "var(--kr-red)", delay: -9 },
  { cx: 34, cy: 80, r: 12, dur: 21, fill: "var(--kr-blue)", delay: -6 },
  { cx: 88, cy: 60, r: 10, dur: 25, fill: "var(--accent)", delay: -12 },
];

export default function FerrofluidBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.38]">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              />
            </filter>
          </defs>
          <g filter="url(#goo)">
            {BLOBS.map((b, i) => (
              <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} className="ferro-blob" style={{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
            ))}
          </g>
        </svg>
      </div>
      {/* vignette to keep foreground legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 35%, rgba(6,8,15,0.65) 100%)",
        }}
      />
    </div>
  );
}
