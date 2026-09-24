import Link from "next/link";

const pages = [
  { href: "/design/hero", label: "Hero" },
  { href: "/design/project", label: "Project" },
  { href: "/design/research", label: "Research" },
  { href: "/design/archive", label: "Archive" },
  { href: "/design/motion", label: "Motion" },
] as const;

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-black/10 bg-[var(--paper)]">
        <div className="page-pad page-max flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--mute)]">
            Design lab · Phase 1.1
          </div>
          <nav className="flex flex-wrap gap-4">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="font-[family-name:var(--font-display)] text-sm font-semibold no-underline"
              >
                {p.label}
              </Link>
            ))}
            <Link href="/" className="text-sm opacity-50 no-underline">
              ← Site
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
