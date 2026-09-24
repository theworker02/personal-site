import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function EditorialFooter({ world = "ink" }: { world?: "ink" | "paper" }) {
  const cls = world === "ink" ? "world-ink" : "world-paper";
  return (
    <footer className={`${cls} page-pad`}>
      <div className="page-max py-24 md:py-32">
        <p className="eyebrow opacity-50">Contact</p>
        <h2 className="display display-lg mt-6 max-w-4xl">
          Let&apos;s build
          <br />
          something difficult.
        </h2>
        <p className="editorial measure mt-8 text-lg leading-relaxed opacity-70">
          Whether the next step is a research collaboration, an engineering deep-dive, or a
          conversation about technology acquisition, start with intent. The systems and
          investigations on this site are the brief — contact is for what you want to do with them.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-display)] text-base font-semibold sm:mt-10 sm:gap-x-8 sm:gap-y-3 sm:text-lg">
          <Link href="/contact" className="touch-target no-underline underline-offset-4 hover:underline">
            Get in touch →
          </Link>
          <Link href="/acquire" className="touch-target no-underline opacity-60 hover:opacity-100">
            Acquisition
          </Link>
          <Link href="/research" className="touch-target no-underline opacity-60 hover:opacity-100">
            Research
          </Link>
        </div>

        <hr className="rule mt-20" />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="display text-xl font-bold">{siteConfig.handle}</div>
            <p className="mt-2 text-sm opacity-55">Independent technologist · United States</p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-[family-name:var(--font-display)] text-sm font-semibold sm:gap-x-6 sm:gap-y-2">
            {siteConfig.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="touch-target no-underline opacity-70 hover:opacity-100"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {s.label}
                  {s.href.startsWith("http") ? " ↗" : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
