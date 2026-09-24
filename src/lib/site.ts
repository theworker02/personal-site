export const siteConfig = {
  name: "theworker02",
  shortName: "theworker02",
  handle: "theworker02",
  title: "theworker02 — Independent Technologist",
  description:
    "Interactive technology laboratory and research archive for theworker02 — experimental systems across software, infrastructure, AI, research, hardware, and computation.",
  statement:
    "I investigate hard technical problems and build systems around them — across software, infrastructure, AI tooling, research corpora, hardware concepts, and distributed computation. This site is a navigable record of that work: selected systems, open experiments, failed approaches, and the relationships between them.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theworker02.netlify.app",
  email: "matthewlooney5@gmail.com",
  githubUser: "theworker02",
  github: "https://github.com/theworker02",
  socials: [
    { label: "Portfolio", href: "https://peerlist.io/theworker02" },
    { label: "GitHub", href: "https://github.com/theworker02" },
    { label: "Magnexis", href: "https://github.com/Magnexis" },
    { label: "JSR", href: "https://jsr.io/@theworker02" },
    { label: "YouTube", href: "https://www.youtube.com/@theworker02gh" },
    { label: "X", href: "https://x.com/Magnexis" },
    { label: "Bluesky", href: "https://bsky.app/profile/magnexis.bsky.social" },
    { label: "DEV", href: "https://dev.to/magnexis" },
    { label: "Blog", href: "https://magnexis-blog.hashnode.dev/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/matthew-m-looney" },
    { label: "Gravatar", href: "https://gravatar.com/magnexis" },
    { label: "PyPI", href: "https://pypi.org/user/magnexis/" },
    { label: "RubyGems", href: "https://rubygems.org/profiles/magnexis" },
    { label: "Open VSX", href: "https://open-vsx.org/extension/theworker02/nex-lsp" },
    { label: "Cursor.Directory", href: "https://cursor.directory/u/theworker02" },
    { label: "GitHub Sponsors", href: "https://github.com/sponsors/theworker02" },
    { label: "thanks.dev", href: "https://thanks.dev/u/gh/theworker02" },
    { label: "Email", href: "mailto:matthewlooney5@gmail.com" },
  ],
  nav: [
    { label: "Work", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Lab", href: "/lab" },
    { label: "Writing", href: "/writing" },
  ],
  secondaryNav: [
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
    { label: "Acquire", href: "/acquire" },
  ],
} as const;

/** Editable live status — keep factual. */
export const currently = {
  researching:
    "How software can perform research rather than merely retrieve it — evidence pipelines, claim structure, and verification that survives the chat session that produced a change.",
  building:
    "Aftermath verification receipts for coding agents, and Stackglass as the observability plane that feeds agents real state, failures, contracts, and history instead of guesses.",
  exploring:
    "Distributed computation and polyglot execution through the Chimera / Parallax lineage — meshes, IR migration, and recovery control planes that treat infrastructure as evidence.",
  experimenting:
    "Hardware-aware execution, local-first repository intelligence, and tactile/desktop interfaces where provenance and safety are defaults.",
} as const;

export const contactIntents = [
  "General",
  "Engineering",
  "Research",
  "Collaboration",
  "Acquisition",
  "Employment",
] as const;
