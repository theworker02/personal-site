import type { Metadata } from "next";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { KnowledgeGraph } from "@/components/visualizations/KnowledgeGraph";
import { getGraph } from "@/lib/graph";

export const metadata: Metadata = { title: "Graph" };

export default function GraphPage() {
  const graph = getGraph();
  return (
    <SiteFrame world="ink" footerWorld="paper">
      <p className="eyebrow opacity-50">Knowledge graph</p>
      <h1 className="display display-lg mt-4">Relationships</h1>
      <div className="mt-12">
        <KnowledgeGraph nodes={graph.nodes} edges={graph.edges} />
      </div>
    </SiteFrame>
  );
}
