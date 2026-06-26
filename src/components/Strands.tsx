"use client";

import { useEffect, useRef } from "react";

/** "시뮬레이션 중" 로딩 연출 — reactbits Strands 느낌을 OGL 없이 커스텀 캔버스로 포팅.
 *  흐르는 곡선 가닥들이 브랜드 컬러로 드리프트. prefers-reduced-motion이면 정지. */
export default function Strands({ label }: { label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["229,62,62", "99,179,237", "245,158,11"]; // red · blue · amber
    const N = 28;
    let raf = 0;
    let t = reduce ? 1.2 : 0;

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < N; i++) {
        const p = i / (N - 1);
        const x0 = p * w;
        ctx.beginPath();
        for (let y = 0; y <= h; y += 7) {
          const yy = y / h;
          const sway =
            Math.sin(yy * 3.0 + t * 0.9 + i * 0.55) * 42 * (0.35 + yy * 0.85) +
            Math.sin(yy * 7.0 + t * 1.7 + i) * 11;
          const x = x0 + sway;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.08 + 0.18 * Math.abs(Math.sin(t * 0.6 + i * 0.8));
        ctx.strokeStyle = `rgba(${colors[i % 3]},${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
      if (!reduce) t += 0.016;
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-background/90 backdrop-blur-[2px]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="relative text-center">
        <div className="mx-auto mb-4 h-px w-16 animate-pulse bg-kr-red" />
        <div className="font-display text-2xl text-foreground sm:text-3xl">시뮬레이션 중입니다…</div>
        {label && <div className="mt-2 text-sm text-muted">{label} · 현 26인 스쿼드 궁합 분석</div>}
        <div className="mt-5 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 animate-bounce rounded-full bg-kr-red" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
