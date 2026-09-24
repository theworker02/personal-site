import { z } from "zod";

export const projectStatusSchema = z.enum([
  "active",
  "experimental",
  "research",
  "paused",
  "archived",
  "proprietary",
]);

export const researchStatusSchema = z.enum([
  "ACTIVE",
  "VALIDATED",
  "INCONCLUSIVE",
  "PAUSED",
  "ARCHIVED",
]);

export const labCategorySchema = z.enum([
  "experiments",
  "prototypes",
  "benchmarks",
  "hardware",
  "research-questions",
  "failed-approaches",
  "investigations",
]);

export const domainSchema = z.enum([
  "infrastructure",
  "research",
  "ai",
  "systems",
  "hardware",
  "science",
  "networking",
  "developer-tools",
]);

export const acquisitionSchema = z.object({
  available: z.boolean(),
  types: z
    .array(
      z.enum([
        "complete-portfolio",
        "individual-technology",
        "ip-transfer",
        "source-code",
        "licensing",
        "strategic-collaboration",
      ]),
    )
    .optional(),
  notes: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  domains: z.array(domainSchema).min(1),
  technologies: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  status: projectStatusSchema,
  repository: z.string().url().optional(),
  demo: z.string().url().optional(),
  startedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  relatedProjects: z.array(z.string()).default([]),
  parentProjects: z.array(z.string()).default([]),
  childProjects: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  constellation: z.boolean().default(false),
  presentation: z
    .enum([
      "default",
      "chimera",
      "parallax",
      "kraftverk",
      "omniresearch",
      "stackglass",
      "mesh",
    ])
    .default("default"),
  whyExists: z.string().optional(),
  problem: z.string().optional(),
  approach: z.string().optional(),
  architecture: z.array(z.string()).optional(),
  technicalDecisions: z.array(z.string()).optional(),
  researchNotes: z.string().optional(),
  currentStatusNarrative: z.string().optional(),
  excludedFromArchive: z.boolean().default(false),
  acquisition: acquisitionSchema.optional(),
  overrideGithub: z
    .object({
      description: z.string().optional(),
      topics: z.array(z.string()).optional(),
      language: z.string().optional(),
    })
    .optional(),
});

export const researchSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  question: z.string(),
  hypothesis: z.string().optional(),
  methodology: z.string().optional(),
  datasets: z.array(z.string()).default([]),
  experiments: z.array(z.string()).default([]),
  results: z.string().optional(),
  limitations: z.string().optional(),
  artifacts: z.array(z.string()).default([]),
  citations: z.array(z.string()).default([]),
  relatedRepositories: z.array(z.string()).default([]),
  status: researchStatusSchema,
  startedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  summary: z.string(),
});

export const writingSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  published: z.string(),
  readingMinutes: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
});

export const labEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: labCategorySchema,
  status: z.enum(["active", "paused", "failed", "absorbed", "open"]),
  learned: z.string().optional(),
  relatedProjects: z.array(z.string()).default([]),
  startedAt: z.string().optional(),
});

export const graphEdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  kind: z.enum([
    "technology",
    "domain",
    "language",
    "conceptual",
    "infrastructure",
    "chronology",
    "parent-child",
    "lineage",
  ]),
  label: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type Research = z.infer<typeof researchSchema>;
export type WritingMeta = z.infer<typeof writingSchema>;
export type LabEntry = z.infer<typeof labEntrySchema>;
export type GraphEdge = z.infer<typeof graphEdgeSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type Domain = z.infer<typeof domainSchema>;
