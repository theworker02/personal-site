"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(7,9,13,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[var(--max-w)] items-center justify-between gap-4 px-[var(--space-page)] py-3">
          <Link href="/" className="display text-[1.05rem] font-bold text-ink no-underline">
          {siteConfig.handle}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 font-[family-name:var(--font-display)] text-[0.82rem] font-semibold no-underline transition-colors",
                  active ? "bg-signal-dim text-signal" : "text-ink-dim hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-line bg-bg-2 px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.72rem] text-ink-dim md:inline-flex"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("lab:open-command"))
            }
            aria-label="Open command palette"
          >
            Search
            <kbd className="rounded border border-line px-1 text-[0.65rem]">⌘K</kbd>
          </button>
          <Link
            href="/contact"
            className="rounded-full bg-signal px-3 py-1.5 font-[family-name:var(--font-display)] text-[0.78rem] font-bold text-[#09090b] no-underline"
          >
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line px-[var(--space-page)] py-3 lg:hidden"
          aria-label="Mobile"
        >
          <div className="grid gap-1">
            {[...siteConfig.nav, ...siteConfig.secondaryNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-ink no-underline hover:bg-bg-2"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="rounded-md px-2 py-2 text-left font-[family-name:var(--font-display)] text-sm font-semibold text-ink-dim"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("lab:open-command"))
              }
            >
              Search / Command
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
