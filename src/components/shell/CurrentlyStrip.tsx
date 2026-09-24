import { currently } from "@/lib/site";

export function CurrentlyStrip() {
  const items = [
    { label: "Researching", value: currently.researching },
    { label: "Building", value: currently.building },
    { label: "Exploring", value: currently.exploring },
    { label: "Experimenting", value: currently.experimenting },
  ];

  return (
    <section
      aria-label="Currently"
      className="border-y border-line bg-[rgba(12,16,23,0.7)]"
    >
      <div className="mx-auto grid w-full max-w-[var(--max-w)] gap-4 px-[var(--space-page)] py-4 md:grid-cols-[auto_1fr] md:items-start">
        <div className="mono pt-1 text-[0.68rem] uppercase tracking-[0.14em] text-signal">
          Currently
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="min-w-0">
              <div className="mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-faint">
                {item.label}
              </div>
              <p className="mt-1 text-sm leading-snug text-ink-dim">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
