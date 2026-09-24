import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { writingSchema, type WritingMeta } from "@/lib/content/schemas";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export type WritingEntry = WritingMeta & { body: string };

export const writingEntries: WritingMeta[] = [
  {
    slug: "evidence-over-vibes",
    title: "Evidence over vibes",
    summary:
      "Coding agents are fluent. Verification has to be boring, independent, and durable — or the fluency wins.",
    published: "2026-09-10",
    readingMinutes: 6,
    tags: ["agents", "verification"],
    relatedProjects: ["aftermath", "stackglass"],
  },
  {
    slug: "local-first-tools",
    title: "Local-first tools for people who live in repos",
    summary:
      "Remote indexes are convenient until the work is private or too sharp to upload. Orientation should stay on the machine.",
    published: "2026-09-02",
    readingMinutes: 5,
    tags: ["local-first", "tooling"],
    relatedProjects: ["cartographer", "arcframe"],
  },
  {
    slug: "building-systems-worth-acquiring",
    title: "Building systems worth acquiring",
    summary:
      "Open experiments, proprietary planes, and a public trail of real code — shipping machinery, not slideware.",
    published: "2026-08-22",
    readingMinutes: 7,
    tags: ["systems", "strategy"],
    relatedProjects: ["chimera", "deadwire"],
  },
].map((w) => writingSchema.parse(w));

export async function getWriting(slug: string): Promise<WritingEntry | null> {
  const meta = writingEntries.find((w) => w.slug === slug);
  if (!meta) return null;
  try {
    const raw = await fs.readFile(path.join(WRITING_DIR, `${slug}.mdx`), "utf8");
    const { content } = matter(raw);
    return { ...meta, body: content };
  } catch {
    return { ...meta, body: meta.summary };
  }
}

export async function getAllWriting(): Promise<WritingEntry[]> {
  const entries = await Promise.all(writingEntries.map((w) => getWriting(w.slug)));
  return entries.filter(Boolean) as WritingEntry[];
}
