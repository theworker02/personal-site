"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

type Node = {
  project: Project;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
};

type Props = {
  projects: Project[];
};

export function ProjectConstellation({ projects }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const reduced = useRef(false);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [selectedMobile, setSelectedMobile] = useState<string | null>(
    projects[0]?.id ?? null,
  );

  const links = useMemo(() => {
    const ids = new Set(projects.map((p) => p.id));
    const pairs: Array<[string, string]> = [];
    for (const p of projects) {
      for (const rel of p.relatedProjects) {
        if (ids.has(rel)) pairs.push([p.id, rel]);
      }
    }
    return pairs;
  }, [projects]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodesRef.current = projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(width, height) * (0.28 + (i % 3) * 0.05);
        const cx = width * 0.52;
        const cy = height * 0.52;
        const x = cx + Math.cos(angle) * radius + (i % 2 ? 18 : -12);
        const y = cy + Math.sin(angle) * radius * 0.78;
        return {
          project,
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          baseY: y,
        };
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      pointer.current.active = false;
      setHovered(null);
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // ambient field
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.55,
      );
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(0.45, "rgba(255,255,255,0.02)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const byId = new Map(nodes.map((n) => [n.project.id, n]));

      // links
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const na = byId.get(a);
        const nb = byId.get(b);
        if (!na || !nb) continue;
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }

      let nearest: Node | null = null;
      let nearestDist = 28;

      for (const node of nodes) {
        if (!reduced.current) {
          const dx = node.baseX - node.x;
          const dy = node.baseY - node.y;
          node.vx += dx * 0.01;
          node.vy += dy * 0.01;

          if (pointer.current.active) {
            const px = node.x - pointer.current.x;
            const py = node.y - pointer.current.y;
            const dist = Math.hypot(px, py) || 1;
            if (dist < 140) {
              const force = (140 - dist) / 140;
              node.vx += (px / dist) * force * 0.35;
              node.vy += (py / dist) * force * 0.35;
            }
            if (dist < nearestDist) {
              nearestDist = dist;
              nearest = node;
            }
          }

          node.vx *= 0.86;
          node.vy *= 0.86;
          node.x += node.vx;
          node.y += node.vy;
        }

        const active = nearest?.project.id === node.project.id;
        ctx.beginPath();
        ctx.fillStyle = active ? "#f4f4f5" : "#71717a";
        ctx.shadowColor = active ? "rgba(244,244,245,0.35)" : "rgba(255,255,255,0.08)";
        ctx.shadowBlur = active ? 14 : 6;
        ctx.arc(node.x, node.y, active ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "600 12px Syne, sans-serif";
        ctx.fillStyle = active ? "#f4f4f5" : "rgba(161,161,170,0.95)";
        ctx.fillText(node.project.name, node.x + 10, node.y + 4);
      }

      setHovered((prev) => {
        const next = nearest?.project ?? null;
        if (prev?.id === next?.id) return prev;
        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onClick = () => {
      if (hovered) {
        window.location.href = `/projects/${hovered.slug}`;
      }
    };
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [projects, links, hovered]);

  const mobileProject =
    projects.find((p) => p.id === selectedMobile) ?? projects[0] ?? null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
      <div
        ref={wrapRef}
        className="relative hidden min-h-[420px] overflow-hidden rounded-[1.1rem] border border-line bg-[#080c14] lg:block lg:min-h-[560px]"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-crosshair"
          role="img"
          aria-label="Interactive project constellation. Hover nodes for details, click to open a project."
        />
        <div className="pointer-events-none absolute left-4 top-4 mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
          Project constellation
        </div>
      </div>

      <div className="panel flex flex-col gap-4 p-5">
        <div className="mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
          Node inspector
        </div>
        <div className="lg:hidden">
          <label className="mono text-[0.68rem] text-ink-faint" htmlFor="constellation-select">
            Select project
          </label>
          <select
            id="constellation-select"
            className="mt-2 w-full rounded-md border border-line bg-bg-2 px-3 py-2 text-ink"
            value={selectedMobile ?? ""}
            onChange={(e) => setSelectedMobile(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {(() => {
          const project = hovered ?? mobileProject;
          if (!project) {
            return (
              <p className="text-sm text-ink-faint">
                Move near a node to inspect relationships.
              </p>
            );
          }
          return (
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <h3 className="display text-2xl font-bold text-ink">{project.name}</h3>
                <p className="mt-1 mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
                  {project.domains.join(" / ")} · {project.languages.join(", ") || "—"} ·{" "}
                  {project.status}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-ink-dim">{project.description}</p>
              <Link
                href={`/projects/${project.slug}`}
                className={cn(
                  "mt-auto inline-flex w-fit rounded-full bg-signal px-4 py-2",
                  "font-[family-name:var(--font-display)] text-sm font-bold text-[#09090b] no-underline",
                )}
              >
                Enter system
              </Link>
            </div>
          );
        })()}
      </div>

      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="rounded-lg border border-line bg-bg-2 px-3 py-3 no-underline"
          >
            <div className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
              {p.name}
            </div>
            <div className="mono mt-1 text-[0.62rem] uppercase text-ink-faint">
              {p.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
