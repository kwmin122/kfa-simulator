// Broadcast "arena" backdrop: aurora beams + a perspective pitch grid receding
// to the horizon. Pure CSS (GPU-cheap, no WebGL risk), sits behind content,
// low-contrast so text stays legible. Disabled under prefers-reduced-motion.

export default function ArenaBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* subtle ambient tint (no neon hero glow) */}
      <div className="absolute inset-0 opacity-[0.22]">
        <div
          className="absolute -left-1/4 top-[-25%] h-[60%] w-[70%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(47,107,255,0.4), transparent)" }}
        />
        <div
          className="absolute right-[-15%] top-[5%] h-[50%] w-[50%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(25,227,177,0.22), transparent)" }}
        />
      </div>

      {/* faint pitch grid at the base */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh]" style={{ perspective: "520px", maskImage: "linear-gradient(to top, black 25%, transparent)" }}>
        <div
          className="chalk-grid absolute inset-0 opacity-40"
          style={{ transform: "rotateX(76deg)", transformOrigin: "bottom center" }}
        />
      </div>

      {/* vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(125% 90% at 50% 0%, transparent 25%, rgba(8,10,16,0.85) 100%)" }}
      />
    </div>
  );
}
