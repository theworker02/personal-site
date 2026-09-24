"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/lib/site";

const primary = [
  { label: "Work", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Lab", href: "/lab" },
  { label: "Writing", href: "/writing" },
] as const;

const secondary = [
  { label: "Archive", href: "/archive" },
  { label: "Timeline", href: "/timeline" },
  { label: "Graph", href: "/graph" },
  { label: "Acquire", href: "/acquire" },
  { label: "Contact", href: "/contact" },
  { label: "Design lab", href: "/design/hero" },
] as const;

export function EditorialNav({ inverse = false }: { inverse?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ink = inverse ? "text-[var(--paper)]" : "text-[var(--ink)]";
  const mute = inverse ? "text-[rgba(243,239,231,0.55)]" : "text-[var(--mute)]";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openSearch = () => {
    setOpen(false);
    window.dispatchEvent(new Event("lab:open-command"));
  };

  return (
    <header className={`page-pad relative z-30 ${ink}`}>
      <div className="page-max flex items-center justify-between gap-4 py-5 md:items-start md:py-8">
        <Link
          href="/"
          className={`display touch-target text-[1.05rem] font-bold no-underline ${ink}`}
        >
          {siteConfig.handle}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-[family-name:var(--font-display)] text-[0.92rem] font-semibold no-underline transition-opacity ${
                  active ? ink : mute
                } hover:opacity-100`}
                style={{ opacity: active ? 1 : 0.72 }}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className={`font-[family-name:var(--font-display)] text-[0.92rem] font-semibold ${mute}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
          >
            More
          </button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className={`touch-target justify-center font-[family-name:var(--font-display)] text-sm font-semibold ${ink}`}
            onClick={openSearch}
            aria-label="Open search"
          >
            Search
          </button>
          <button
            type="button"
            className={`touch-target justify-center font-[family-name:var(--font-display)] text-sm font-semibold ${ink}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="page-max border-t border-current/15 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4"
        >
          <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3">
            {[...primary, ...secondary].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`touch-target font-[family-name:var(--font-display)] text-lg font-semibold no-underline ${ink}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className={`touch-target justify-start text-left font-[family-name:var(--font-display)] text-lg font-semibold lg:hidden ${mute}`}
              onClick={openSearch}
            >
              Search
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
