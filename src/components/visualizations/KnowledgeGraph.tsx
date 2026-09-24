"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Node = {
  id: string;
  name: string;
  slug: string;
  domains: string[];
  languages: string[];
  status: string;
  featured: boolean;
};

type Edge = { source: string; target: string; kind: string; label?: string };

export function KnowledgeGraph({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  const [selected, setSelected] = useState<string | null>(
    nodes.find((n) => n.featured)?.id ?? nodes[0]?.id ?? null,
  );

  const layout = useMemo(() => {
    const w = 900;
    const h = 560;
    return nodes.map((node, i) => {
      const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
      const ring = node.featured ? 170 : 240;
      return {
        ...node,
        x: w / 2 + Math.cos(angle) * ring,
        y: h / 2 + Math.sin(angle) * ring * 0.72,
      };
    });
  }, [nodes]);

  const byId = useMemo(() => new Map(layout.map((n) => [n.id, n])), [layout]);
  const selectedNode = selected ? byId.get(selected) : null;
  const neighborIds = new Set(
    edges
      .filter((e) => e.source === selected || e.target === selected)
      .flatMap((e) => [e.source, e.target]),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="overflow-x-auto border border-current/15">
        <svg viewBox="0 0 900 560" className="min-h-[320px] w-full min-w-[640px]">
          {edges.map((e, i) => {
            const a = byId.get(e.source);
            const b = byId.get(e.target);
            if (!a || !b) return null;
            const hot = neighborIds.has(e.source) && neighborIds.has(e.target);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                strokeOpacity={hot ? 0.55 : 0.12}
                strokeWidth={hot ? 1.6 : 1}
              />
            );
          })}
          {layout.map((n) => {
            const active = n.id === selected;
            const near = neighborIds.has(n.id);
            return (
              <g key={n.id} className="cursor-pointer" onClick={() => setSelected(n.id)}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={active ? 7 : near ? 5 : 3.5}
                  fill="currentColor"
                  fillOpacity={active ? 1 : near ? 0.7 : 0.35}
                />
                <text
                  x={n.x + 12}
                  y={n.y + 4}
                  fill="currentColor"
                  fillOpacity={active ? 1 : 0.55}
                  fontSize="12"
                  fontFamily="Syne, sans-serif"
                  fontWeight={600}
                >
                  {n.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        {selectedNode ? (
          <>
            <h2 className="display text-3xl font-bold">{selectedNode.name}</h2>
            <p className="mono mt-3 text-[0.7rem] uppercase tracking-[0.12em] opacity-45">
              {selectedNode.domains.join(" / ")} · {selectedNode.status}
            </p>
            <Link
              href={`/projects/${selectedNode.slug}`}
              className="mt-8 inline-block font-[family-name:var(--font-display)] font-semibold no-underline"
            >
              Open project →
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
