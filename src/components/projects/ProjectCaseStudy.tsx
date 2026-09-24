import Link from "next/link";
import type { Project } from "@/lib/content/schemas";
import { getRelatedProjects } from "@/lib/content/projects";
import {
  ChimeraDemo,
  KraftverkDemo,
  MeshDemo,
  OmniresearchDemo,
  ParallaxDemo,
  StackglassDemo,
} from "@/components/projects/ProjectDemos";

function DemoFor({ project }: { project: Project }) {
  switch (project.presentation) {
    case "chimera":
      return <ChimeraDemo />;
    case "parallax":
      return <ParallaxDemo />;
    case "kraftverk":
      return <KraftverkDemo />;
    case "omniresearch":
      return <OmniresearchDemo />;
    case "stackglass":
      return <StackglassDemo />;
    case "mesh":
      return <MeshDemo />;
    default:
      return null;
  }
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const related = getRelatedProjects(project);
  const sections = [
    { id: "overview", title: "Overview", body: project.longDescription ?? project.description },
    { id: "why", title: "Why it exists", body: project.whyExists },
    { id: "problem", title: "Problem", body: project.problem },
    { id: "approach", title: "Approach", body: project.approach },
    { id: "architecture", title: "Architecture", list: project.architecture },
    { id: "decisions", title: "Technical decisions", list: project.technicalDecisions },
    { id: "status", title: "Current status", body: project.currentStatusNarrative },
  ].filter((s) => s.body || (s.list && s.list.length));

  return (
    <article>
      <p className="eyebrow opacity-50">Project</p>
      <h1 className="display display-lg mt-4">{project.name}</h1>
      <p className="editorial mt-6 max-w-2xl text-xl opacity-65">{project.description}</p>
      <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.12em] opacity-45">
        {project.status} · {project.domains.join(" / ")} · {project.languages.join(", ")}
      </p>
      <div className="mt-6 flex flex-wrap gap-6 font-[family-name:var(--font-display)] font-semibold">
        {project.repository ? (
          <a href={project.repository} target="_blank" rel="noopener noreferrer" className="no-underline">
            Repository ↗
          </a>
        ) : null}
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="no-underline opacity-60">
            Live surface ↗
          </a>
        ) : null}
      </div>

      <div className="mt-14 border border-current/15 p-4 md:p-8">
        <DemoFor project={project} />
      </div>

      <div className="editorial measure mt-16 space-y-12 text-lg opacity-75">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="display text-2xl font-bold opacity-100">{section.title}</h2>
            {section.body ? <p className="mt-4">{section.body}</p> : null}
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {related.length ? (
        <section className="mt-20 border-t border-current/15 pt-10">
          <h2 className="display text-2xl font-bold">Related</h2>
          <div className="mt-6 space-y-4">
            {related.map((r) => (
              <Link key={r.id} href={`/projects/${r.slug}`} className="block no-underline">
                <span className="display text-xl font-bold">{r.name}</span>
                <span className="mt-1 block text-sm opacity-55">{r.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
