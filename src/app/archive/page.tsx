import type { Metadata } from "next";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { ArchiveExplorer } from "@/components/lab/ArchiveExplorer";
import { projects } from "@/lib/content/projects";
import { getGithubRepos } from "@/lib/github/sync";

export const metadata: Metadata = {
  title: "Archive",
  description: "Dense index of curated systems and GitHub repositories.",
};

type Props = {
  searchParams: Promise<{ q?: string; domain?: string; language?: string }>;
};

export default async function ArchivePage({ searchParams }: Props) {
  const sp = await searchParams;
  const gh = await getGithubRepos();

  return (
    <SiteFrame world="index" footerWorld="ink">
      <p className="eyebrow opacity-50">Archive</p>
      <h1 className="display display-lg mt-4">{projects.length}+ curated · {gh.repos.length} repos</h1>
      <p className="editorial measure mt-6 text-lg opacity-55">
        Utilitarian index. Density is intentional here.
      </p>
      <div className="mt-14">
        <ArchiveExplorer
          projects={projects}
          repos={gh.repos}
          initialQuery={sp.q}
          initialDomain={sp.domain}
          initialLanguage={sp.language}
        />
      </div>
    </SiteFrame>
  );
}
