"use client";

import { useEffect, useRef } from "react";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/motion/scroll";

export type FieldMode =
  | "abstract"
  | "research"
  | "systems"
  | "infrastructure"
  | "hardware"
  | "ai";

type Props = {
  mode?: FieldMode;
  className?: string;
  inverse?: boolean;
  intensity?: number;
};

/**
 * THE FIELD — signature generative motif.
 * Pauses when offscreen / hidden tab. Caps DPR. Throttles pointer.
 */
export function TheField({
  mode = "abstract",
  className = "",
  inverse = false,
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const mobile = isCoarsePointer() || window.innerWidth < 768;
    let raf = 0;
    let running = false;
    let visible = true;
    let pageVisible = document.visibilityState === "visible";
    let w = 0;
    let h = 0;
    let t = 0;
    let lastPointer = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let rect = wrap.getBoundingClientRect();

    const modeParams = {
      abstract: { bands: mobile ? 8 : 12, swirl: 0.5, tension: 0.9 },
      research: { bands: mobile ? 9 : 14, swirl: 0.22, tension: 1.25 },
      systems: { bands: mobile ? 7 : 10, swirl: 0.7, tension: 0.7 },
      infrastructure: { bands: mobile ? 6 : 9, swirl: 0.12, tension: 1.45 },
      hardware: { bands: mobile ? 6 : 8, swirl: 0.3, tension: 1.05 },
      ai: { bands: mobile ? 8 : 12, swirl: 0.9, tension: 0.85 },
    }[mode];

    const stroke = inverse ? "rgba(243,239,231," : "rgba(10,10,10,";
    const accent =
      mode === "research"
        ? "rgba(196,92,58,"
        : mode === "systems"
          ? "rgba(61,107,179,"
          : mode === "infrastructure"
            ? "rgba(63,122,90,"
            : mode === "hardware"
              ? "rgba(196,138,46,"
              : mode === "ai"
                ? "rgba(107,90,154,"
                : stroke;

    const resize = () => {
      rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running && !reduced) drawFrame();
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointer < 32) return;
      lastPointer = now;
      pointer.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.ty = (e.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const drawFrame = () => {
      if (w < 2 || h < 2) return;
      t += reduced ? 0 : 0.0038 * intensity;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * pointer.x,
        h * pointer.y,
        8,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7,
      );
      g.addColorStop(0, `${accent}${0.06 * intensity})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const bands = modeParams.bands;
      const step = mobile ? 6 : 4;
      for (let i = 0; i < bands; i++) {
        const p = i / Math.max(bands - 1, 1);
        ctx.beginPath();
        const baseY = h * (0.14 + p * 0.72);
        const amp = h * (0.03 + (1 - Math.abs(p - 0.5) * 2) * 0.045) * modeParams.swirl;
        const freq = 1.15 + modeParams.tension * 0.7 + p * 0.5;
        const phase = t * (0.65 + p * 0.45) + i * 0.32;

        for (let x = 0; x <= w; x += step) {
          const nx = x / w;
          const influence =
            Math.exp(-((nx - pointer.x) ** 2 + (baseY / h - pointer.y) ** 2) * 8) * 30;
          const y =
            baseY +
            Math.sin(nx * Math.PI * freq + phase) * amp +
            Math.sin(nx * Math.PI * 3.2 - phase * 1.2) * amp * 0.3 +
            (pointer.y - 0.5) * 20 +
            influence * (pointer.y > baseY / h ? -1 : 1) * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.1 + p * 0.16;
        ctx.strokeStyle = i % 4 === 0 ? `${accent}${alpha + 0.1})` : `${stroke}${alpha})`;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.65;
        ctx.stroke();
      }
    };

    const loop = () => {
      if (!running) return;
      drawFrame();
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = visible && pageVisible && !reduced;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    resize();
    if (reduced) drawFrame();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.05;
        sync();
      },
      { threshold: [0, 0.05, 0.2] },
    );
    io.observe(wrap);

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!mobile) wrap.addEventListener("pointermove", onMove, { passive: true });

    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [mode, inverse, intensity]);

  return (
    <div ref={wrapRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
    </div>
  );
}
