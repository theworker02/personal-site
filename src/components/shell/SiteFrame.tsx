import { EditorialNav } from "@/components/shell/EditorialNav";
import { EditorialFooter } from "@/components/shell/EditorialFooter";

/** Shared chrome for non-home routes during Phase 1.1 visual migration. */
export function SiteFrame({
  children,
  world = "paper",
  footerWorld = "ink",
}: {
  children: React.ReactNode;
  world?: "paper" | "ink" | "workshop" | "index";
  footerWorld?: "paper" | "ink";
}) {
  const worldClass =
    world === "ink"
      ? "world-ink"
      : world === "workshop"
        ? "world-workshop"
        : world === "index"
          ? "world-index"
          : "world-paper";

  return (
    <div className={`min-h-screen ${worldClass}`}>
      <EditorialNav inverse={world === "ink" || world === "index"} />
      <div className="page-pad page-max py-16 md:py-24">{children}</div>
      <EditorialFooter world={footerWorld} />
    </div>
  );
}
