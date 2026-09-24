"use client";

import { useEffect, useRef } from "react";

/** Demos update the DOM directly — no React scroll/state thrash. Pause when offscreen. */

export function ChimeraDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = [
      { x: 18, y: 30 },
      { x: 50, y: 18 },
      { x: 78, y: 34 },
      { x: 30, y: 68 },
      { x: 62, y: 72 },
    ];
    let i = 0;
    let timer = 0;
    let visible = false;

    const paint = () => {
      const n = nodes[i % nodes.length];
      const ring = activeRef.current;
      if (ring) {
        ring.setAttribute("cx", String(n.x));
        ring.setAttribute("cy", String(n.y));
      }
      if (labelRef.current) labelRef.current.textContent = `peer ${ (i % nodes.length) + 1 }`;
      i += 1;
    };

    const sync = () => {
      if (visible && !timer) {
        paint();
        timer = window.setInterval(paint, 900);
      } else if (!visible && timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, []);

  const nodes = [
    { x: 18, y: 30 },
    { x: 50, y: 18 },
    { x: 78, y: 34 },
    { x: 30, y: 68 },
    { x: 62, y: 72 },
  ];

  return (
    <div ref={rootRef}>
      <div className="mono mb-4 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Workload distribution · <span ref={labelRef}>peer 1</span>
      </div>
      <svg viewBox="0 0 100 100" className="h-52 w-full" role="img" aria-label="Chimera mesh">
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.4"
            />
          )),
        )}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="2.2" fill="currentColor" fillOpacity="0.4" />
        ))}
        <circle
          ref={activeRef}
          cx={nodes[0].x}
          cy={nodes[0].y}
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

export function ParallaxDemo() {
  const langs = ["Python", "Rust", "Go", "JS", "Ruby"];
  return (
    <div>
      <div className="mono mb-5 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Polyglot → shared execution
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2">
          {langs.map((lang) => (
            <div
              key={lang}
              className="border border-current/20 px-3 py-2 font-[family-name:var(--font-mono)] text-sm"
            >
              {lang}
            </div>
          ))}
        </div>
        <div className="px-2 opacity-50" aria-hidden>
          →
        </div>
        <div className="space-y-3">
          <div className="border border-current/35 px-4 py-8 text-center font-[family-name:var(--font-display)] text-xl font-bold">
            PARALLAX
          </div>
          <div className="border border-current/15 px-3 py-3 text-center text-sm opacity-60">
            Unified execution / migration IR
          </div>
        </div>
      </div>
    </div>
  );
}

export function KraftverkDemo() {
  const bars = [42, 63, 28, 81, 55, 70, 48, 88, 36, 60];
  return (
    <div>
      <div className="mono mb-4 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Schematic telemetry — not published benchmarks
      </div>
      <div className="flex h-36 items-end gap-2" aria-hidden>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-current opacity-40" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function OmniresearchDemo({ stage = 7 }: { stage?: number }) {
  const steps = [
    "QUESTION",
    "RESEARCH PLAN",
    "SOURCES",
    "EVIDENCE",
    "CLAIMS",
    "SUPPORT / CONFLICT",
    "VERIFICATION",
    "ANSWER",
  ];
  return (
    <div>
      <div className="mono mb-4 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Research loop
      </div>
      <ol className="space-y-2">
        {steps.map((label, i) => (
          <li
            key={label}
            className={`border px-3 py-2 font-[family-name:var(--font-mono)] text-xs tracking-wide ${
              i <= stage ? "border-current opacity-100" : "border-current/15 opacity-35"
            }`}
          >
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StackglassDemo() {
  const signals = [
    { label: "tests", state: "observed" },
    { label: "contracts", state: "observed" },
    { label: "failures", state: "observed" },
    { label: "docs drift", state: "flagged" },
  ];
  return (
    <div>
      <div className="mono mb-4 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Evidence plane
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {signals.map((s) => (
          <div key={s.label} className="border border-current/15 px-3 py-3">
            <div className="font-[family-name:var(--font-display)] text-sm font-semibold">
              {s.label}
            </div>
            <div className="mono mt-1 text-[0.65rem] uppercase opacity-50">{s.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MeshDemo() {
  return (
    <div>
      <div className="mono mb-4 text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
        Interop mesh
      </div>
      <svg viewBox="0 0 320 140" className="w-full" role="img" aria-label="Interop mesh">
        {["A", "B", "C", "D"].map((label, i) => {
          const x = 40 + i * 80;
          return (
            <g key={label}>
              <line x1={x} y1={30} x2={160} y2={100} stroke="currentColor" strokeOpacity="0.25" />
              <rect
                x={x - 22}
                y={12}
                width="44"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
              />
              <text x={x} y={28} textAnchor="middle" fill="currentColor" fontSize="11">
                {label}
              </text>
            </g>
          );
        })}
        <rect x={120} y={88} width="80" height="32" fill="none" stroke="currentColor" strokeOpacity="0.7" />
        <text x={160} y={108} textAnchor="middle" fill="currentColor" fontSize="11">
          runtime
        </text>
      </svg>
    </div>
  );
}
