import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { getProject, projects } from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.name, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <SiteFrame world="ink" footerWorld="paper">
      <ProjectCaseStudy project={project} />
    </SiteFrame>
  );
}
