import { researchSchema, type Research } from "@/lib/content/schemas";

const raw: Research[] = [
  {
    id: "distributed-execution",
    slug: "distributed-execution-without-a-broker",
    title: "Distributed execution without a central broker",
    question:
      "Can a peer mesh with gossip membership, sandboxed execution, and content-addressed artifacts provide useful distributed compute without a trusted scheduler?",
    hypothesis:
      "If membership and artifact identity are decentralized, useful workloads can still complete under intermittent connectivity — at the cost of harder trust and incentive problems.",
    methodology:
      "Prototype mesh (Chimera): gossip discovery, QUIC transport, Wasm job bounds, content-addressed results. Observe membership churn and job completion qualitatively on small peer sets.",
    datasets: [],
    experiments: [
      "Local multi-peer smoke meshes",
      "Wasm sandbox boundary checks for untrusted jobs",
      "Content-addressed artifact round-trips",
    ],
    results:
      "Early prototypes demonstrate the architectural loop. Systematic large-scale benchmarks are not published here — treat findings as exploratory, not validated production claims.",
    limitations:
      "Small peer counts, incomplete incentive/trust model, no independent third-party evaluation yet.",
    artifacts: ["https://github.com/theworker02/chimera"],
    citations: [],
    relatedRepositories: ["chimera", "parallax", "deaddrop"],
    status: "ACTIVE",
    startedAt: "2026-08",
    updatedAt: "2026-09",
    summary:
      "Investigating broker-free distributed compute through a concrete Rust mesh rather than abstract decentralization claims.",
  },
  {
    id: "agent-verification",
    slug: "verification-receipts-for-coding-agents",
    title: "Verification receipts for coding agents",
    question:
      "Does an independent, execution-backed verification plane reduce unjustified confidence in agent-authored changes compared to narrative self-reports?",
    hypothesis:
      "Durable receipts from builds, tests, lints, and API-drift checks create a review surface that resists fluent but unverified patches.",
    methodology:
      "Build Aftermath as an independent examiner. Pair with Stackglass evidence collection. Evaluate qualitatively on real repositories during agent workflows.",
    datasets: [],
    experiments: [
      "Receipt generation across typical TypeScript repos",
      "Cursor plugin integration paths",
      "Comparison of agent self-summary vs receipt contents (manual review)",
    ],
    results:
      "Tooling exists and is usable. Controlled user studies and quantified defect-catch rates are not claimed on this site.",
    limitations:
      "No formal study population; results are engineering observations.",
    artifacts: [
      "https://github.com/theworker02/aftermath",
      "https://github.com/theworker02/stackglass",
    ],
    citations: [],
    relatedRepositories: ["aftermath", "stackglass", "cartographer", "arcframe"],
    status: "ACTIVE",
    startedAt: "2026-08",
    updatedAt: "2026-09",
    summary:
      "Engineering research into making agent work auditable through independent verification receipts.",
  },
  {
    id: "hardware-native-perf",
    slug: "hardware-native-performance-evidence",
    title: "Hardware-native performance evidence on AMD Zen",
    question:
      "Can an evidence-driven performance loop specialized to AMD Zen produce more trustworthy optimization decisions than generic benchmark folklore?",
    hypothesis:
      "Tight coupling between telemetry, microarchitecture awareness, and reproducible benchmarks reduces false performance wins.",
    methodology:
      "Kraftverk + Silicera research software: collect telemetry and specialization experiments on AMD targets. Publish methods in-repo; withhold unverified headline numbers from this site.",
    datasets: [],
    experiments: ["Telemetry collection prototypes", "Specialization experiment scaffolding"],
    results:
      "Infrastructure for measurement exists. Numerically impressive claims are intentionally omitted until reproducible suites are ready to cite.",
    limitations:
      "AMD-exclusive direction; incomplete public benchmark corpus.",
    artifacts: [
      "https://github.com/theworker02/kraftverk",
      "https://github.com/theworker02/silicera",
    ],
    citations: [],
    relatedRepositories: ["kraftverk", "silicera"],
    status: "ACTIVE",
    startedAt: "2026-08",
    updatedAt: "2026-09",
    summary:
      "Systems research into evidence-backed performance work on AMD Zen — methods before marketing numbers.",
  },
  {
    id: "patent-corpus",
    slug: "local-uspto-corpus-pipeline",
    title: "Local USPTO corpus pipelines for search and training prep",
    question:
      "Can weekly USPTO XML dumps be stream-parsed into locally owned SQLite/JSONL artifacts suitable for search and downstream ML prep without loading archives into memory?",
    hypothesis:
      "Streaming normalization enables a personally owned patent corpus at multi-terabyte scale with inspectable provenance.",
    methodology:
      "PatentPulse downloads official dumps, stream-parses, writes normalized outputs. Scale claims follow repository documentation only.",
    datasets: ["USPTO weekly grant and application XML dumps (official)"],
    experiments: ["Stream parse durability", "SQLite/JSONL export shapes"],
    results:
      "Pipeline approach is implemented in-repo. Treat corpus size and training outcomes as repository-documented facts, not site marketing.",
    limitations:
      "Requires large local storage; legal/use constraints remain the operator's responsibility.",
    artifacts: ["https://github.com/theworker02/patentpulse"],
    citations: [],
    relatedRepositories: ["patentpulse", "atlas-of-knowledge"],
    status: "ACTIVE",
    startedAt: "2026-09",
    updatedAt: "2026-09",
    summary:
      "Building a locally owned patent corpus pipeline with streaming parsers and normalized exports.",
  },
];

export const researchEntries: Research[] = raw.map((r) => researchSchema.parse(r));

export function getResearch(slug: string) {
  return researchEntries.find((r) => r.slug === slug);
}
