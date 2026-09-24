import { labEntrySchema, type LabEntry } from "@/lib/content/schemas";

const raw: LabEntry[] = [
  {
    id: "omniresearch-sketch",
    title: "Omniresearch sketch",
    summary:
      "Exploratory design for a universal research loop: question → plan → sources → evidence → claims → verification → answer.",
    category: "research-questions",
    status: "active",
    learned:
      "The valuable part is explicit conflict/support edges between claims — not another chatbot wrapper.",
    relatedProjects: ["aftermath", "stackglass", "patentpulse", "atlas-of-knowledge"],
    startedAt: "2026-09",
  },
  {
    id: "virion-concept",
    title: "Virion concept",
    summary:
      "Early naming/concept slot for a tightly scoped infectious-debug metaphor in systems tracing — not a shipped product.",
    category: "prototypes",
    status: "paused",
    learned: "Metaphor-first naming without a runtime surface stalls; prefer concrete CLIs.",
    relatedProjects: ["stackglass", "wiretap"],
    startedAt: "2026-08",
  },
  {
    id: "kestrel-probe",
    title: "Kestrel probe",
    summary:
      "Investigation into a fast edge/observation agent pattern. Absorbed partly into Stackglass/Aftermath thinking.",
    category: "investigations",
    status: "absorbed",
    learned: "Observation without verification receipts recreates the agent confidence problem.",
    relatedProjects: ["stackglass", "aftermath"],
    startedAt: "2026-08",
  },
  {
    id: "brokerless-job-fairness",
    title: "Brokerless job fairness failure",
    summary:
      "Attempted simple fair-share scheduling on Chimera peers without incentives — collapsed under selfish claiming.",
    category: "failed-approaches",
    status: "failed",
    learned:
      "Without incentives or attested capacity, gossip meshes invite free-riding. Trust is not optional glue.",
    relatedProjects: ["chimera"],
    startedAt: "2026-08",
  },
  {
    id: "signal-cube",
    title: "Signal Cube hardware concept",
    summary:
      "Mirror-scale physical module direction under Lattice — sensing, local decision, visible state.",
    category: "hardware",
    status: "open",
    relatedProjects: ["lattice", "signalkey"],
    startedAt: "2026-09",
  },
  {
    id: "polyglot-ir-roundtrip",
    title: "Polyglot IR round-trip benchmarks",
    summary:
      "Benchmark scaffolding for Parallax capture/restore loops across languages — incomplete suite.",
    category: "benchmarks",
    status: "active",
    learned: "Publish methods before numbers; incomplete suites must not become homepage metrics.",
    relatedProjects: ["parallax", "centralizer"],
    startedAt: "2026-08",
  },
];

export const labEntries: LabEntry[] = raw.map((e) => labEntrySchema.parse(e));
