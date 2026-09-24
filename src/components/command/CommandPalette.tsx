"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchHit } from "@/lib/search";

type Props = { items: SearchHit[] };

export function CommandPalette({ items }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 18);
    return items
      .filter((item) =>
        [item.title, item.summary, item.meta ?? "", item.kind].join(" ").toLowerCase().includes(q),
      )
      .slice(0, 24);
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
      if (event.key === "Escape") close();
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("lab:open-command", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("lab:open-command", onCustom);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const run = (item: SearchHit) => {
    close();
    if (item.href.startsWith("http")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.href);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-start sm:px-4 sm:pb-4 sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="flex max-h-[min(88dvh,36rem)] w-full max-w-2xl flex-col overflow-hidden border border-black/15 bg-[var(--paper)] text-[var(--ink)] shadow-2xl sm:max-h-[min(70vh,36rem)]">
        <div className="border-b border-black/10 px-4 py-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search theworker02's work..."
            enterKeyHint="search"
            autoCapitalize="off"
            autoCorrect="off"
            className="w-full bg-transparent font-[family-name:var(--font-display)] text-base outline-none sm:text-lg"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter" && filtered[active]) {
                e.preventDefault();
                run(filtered[active]);
              }
            }}
          />
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2">
          {filtered.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={`flex min-h-[var(--touch)] w-full flex-col justify-center gap-0.5 px-4 py-3 text-left sm:py-2.5 ${
                  index === active ? "bg-black/5" : ""
                }`}
                onMouseEnter={() => setActive(index)}
                onClick={() => run(item)}
              >
                <span className="font-[family-name:var(--font-display)] text-sm font-semibold">
                  {item.title}
                </span>
                <span className="line-clamp-2 text-xs text-[var(--mute)]">
                  {item.kind} — {item.summary}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
