import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { isExternal } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative z-1 mt-16 border-t border-line bg-[#05070b]">
      <div className="mx-auto grid w-full max-w-[var(--max-w)] gap-8 px-[var(--space-page)] py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="display text-xl font-bold text-ink">{siteConfig.handle}</div>
          <p className="mt-3 max-w-xl text-[0.95rem] text-ink-dim">
            {siteConfig.statement}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {siteConfig.secondaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink-dim no-underline hover:text-signal">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
            Elsewhere
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {siteConfig.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink no-underline hover:text-signal"
                  target={isExternal(social.href) ? "_blank" : undefined}
                  rel={isExternal(social.href) ? "noopener noreferrer" : undefined}
                >
                  {social.label}
                  {isExternal(social.href) ? (
                    <span className="sr-only"> (opens in new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
