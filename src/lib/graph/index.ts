import { graphEdgeSchema, type GraphEdge } from "@/lib/content/schemas";
import { projects } from "@/lib/content/projects";

const explicit: GraphEdge[] = [
  { source: "parallax", target: "chimera", kind: "domain", label: "computation" },
  { source: "chimera", target: "stackglass", kind: "conceptual", label: "observability needs" },
  { source: "parallax", target: "stackglass", kind: "conceptual", label: "runtime evidence" },
  { source: "stackglass", target: "aftermath", kind: "lineage", label: "verification plane" },
  { source: "cartographer", target: "arcframe", kind: "parent-child", label: "intelligence layer" },
  { source: "aftermath", target: "cartographer", kind: "conceptual", label: "agent tooling" },
  { source: "kraftverk", target: "silicera", kind: "lineage", label: "AMD systems research" },
  { source: "chimera", target: "deaddrop", kind: "conceptual", label: "intermittent nets" },
  { source: "parallax", target: "centralizer", kind: "infrastructure", label: "polyglot supervision" },
  { source: "deadwire", target: "reprise", kind: "conceptual", label: "recovery planes" },
  { source: "lattice", target: "signalkey", kind: "lineage", label: "physical interface" },
  { source: "rivet", target: "lattice", kind: "domain", label: "hardware systems" },
  { source: "patentpulse", target: "atlas-of-knowledge", kind: "domain", label: "knowledge corpora" },
  { source: "commons", target: "aftermath", kind: "conceptual", label: "agent verification" },
];

function derivedEdges(): GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (const p of projects) {
    for (const rel of p.relatedProjects) {
      if (!projects.some((x) => x.id === rel)) continue;
      edges.push({
        source: p.id,
        target: rel,
        kind: "conceptual",
        label: "related",
      });
    }
    for (const child of p.childProjects) {
      edges.push({
        source: p.id,
        target: child,
        kind: "parent-child",
        label: "parent → child",
      });
    }
  }
  return edges;
}

function dedupe(edges: GraphEdge[]): GraphEdge[] {
  const seen = new Set<string>();
  const out: GraphEdge[] = [];
  for (const e of edges) {
    const key = [e.kind, e.source, e.target, e.label ?? ""].join("|");
    const rev = [e.kind, e.target, e.source, e.label ?? ""].join("|");
    if (seen.has(key) || seen.has(rev)) continue;
    seen.add(key);
    out.push(graphEdgeSchema.parse(e));
  }
  return out;
}

export function getGraph() {
  const nodes = projects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    domains: p.domains,
    languages: p.languages,
    status: p.status,
    featured: p.featured,
  }));
  const edges = dedupe([...explicit, ...derivedEdges()]);
  return { nodes, edges };
}
