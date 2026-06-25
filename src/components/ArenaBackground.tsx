// Broadcast "arena" backdrop: aurora beams + a perspective pitch grid receding
// to the horizon. Pure CSS (GPU-cheap, no WebGL risk), sits behind content,
// low-contrast so text stays legible. Disabled under prefers-reduced-motion.

export default function ArenaBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* aurora beams */}
      <div className="absolute inset-0 opacity-70">
        <div
          className="arena-beam absolute -left-1/4 top-[-20%] h-[70%] w-[80%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(47,107,255,0.5), transparent)" }}
        />
        <div
          className="arena-beam absolute right-[-15%] top-[-10%] h-[60%] w-[60%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(25,227,177,0.32), transparent)", animationDelay: "-6s" }}
        />
        <div
          className="arena-beam absolute left-[20%] top-[10%] h-[55%] w-[55%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(228,0,43,0.28), transparent)", animationDelay: "-11s" }}
        />
      </div>

      {/* perspective pitch grid at the base */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh]" style={{ perspective: "520px", maskImage: "linear-gradient(to top, black 35%, transparent)" }}>
        <div
          className="chalk-grid absolute inset-0"
          style={{ transform: "rotateX(74deg)", transformOrigin: "bottom center" }}
        />
      </div>

      {/* vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(125% 90% at 50% 0%, transparent 30%, rgba(8,10,16,0.75) 100%)" }}
      />
    </div>
  );
}
