import type { Metadata } from "next";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { Timeline } from "@/components/lab/Timeline";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <SiteFrame world="paper">
      <p className="eyebrow text-[var(--mute)]">Timeline</p>
      <h1 className="display display-lg mt-4">When systems emerged</h1>
      <div className="mt-14">
        <Timeline projects={projects} />
      </div>
    </SiteFrame>
  );
}
