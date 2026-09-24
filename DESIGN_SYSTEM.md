# Design system — Graphite editorial

Canonical visual system for the **theworker02** laboratory.

- Production is **deployed on Netlify**
- Site + design system are **available for acquisition, sale, and customization** — [ACQUISITION.md](./ACQUISITION.md)
- Inspiration principles (not assets): [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md)
- Agent rules: [CODEX.md](./CODEX.md)

**Implementation source of truth:** `src/app/globals.css`  
**Fonts:** `src/app/layout.tsx` (next/font)

---

## Intent

Feel like an advanced technology / research organization that resolves into one person’s body of work.

- Enormous but controlled display type
- Editorial body for long reading
- Full-bleed demos and generative fields inside the page flow
- Alternating light/dark “worlds” — not one continuous black dashboard
- Selective domain color; graphite otherwise

If a section still reads as a customized portfolio template, it fails.

---

## Worlds

| Class | Background | Foreground | Use |
| --- | --- | --- | --- |
| `world-paper` | `--paper` `#F3EFE7` | `--ink` | Default editorial, lists, writing |
| `world-ink` | `--ink` `#0A0A0A` | `--paper` | Cinematic demos, hero field, end matter |
| `world-workshop` | `#D8D4CC` | `--ink` | “Now” / lab / currently moments |
| `world-index` | `#111111` | `--paper` | Dense archive / index |

Alternate worlds while scrolling. Do not lock the entire site into a single dark shell.

### Layout helpers

| Class / token | Role |
| --- | --- |
| `.page-pad` | Horizontal page padding (`--space-page`) |
| `.page-max` | Centered max width (`--max` ≈ 92rem) |
| `.measure` | Reading measure (`--measure` ≈ 38rem) |
| `.rule` | Hairline horizontal rule |

---

## Color tokens

Defined on `:root` in `globals.css` and mirrored into Tailwind via `@theme inline`.

### Neutrals

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#f3efe7` | Warm light field |
| `--paper-deep` | `#e8e2d6` | Deeper paper / workshop cousin |
| `--ink` | `#0a0a0a` | Primary ink |
| `--ink-soft` | `#1a1a1a` | Soft ink surfaces |
| `--mute` | `#5c5a56` | Secondary text |
| `--mute-soft` | `#8a8680` | Tertiary text |
| `--hairline` | `rgba(10,10,10,0.12)` | Rules on paper |
| `--hairline-inverse` | `rgba(243,239,231,0.14)` | Rules on ink |

### Domain (selective accent only)

| Token | Value | Domain |
| --- | --- | --- |
| `--domain-research` | `#c45c3a` | Research |
| `--domain-systems` | `#3d6bb3` | Systems |
| `--domain-infra` | `#3f7a5a` | Infrastructure |
| `--domain-hardware` | `#c48a2e` | Hardware |
| `--domain-ai` | `#6b5a9a` | AI |

Color marks **context**. It does not decorate empty space. Never revive neon lime/cyan.

### Selection / focus

- Selection: ink on paper (inverted)
- Focus ring: 2px solid ink, 3px offset

---

## Typography

| Role | Family | CSS var | Weights |
| --- | --- | --- | --- |
| Display | **Syne** | `--font-display` / `--font-syne` | 600–800 |
| Editorial | **Newsreader** | `--font-editorial` / `--font-newsreader` | 400–600 (+ italic) |
| Mono | **IBM Plex Mono** | `--font-mono` / `--font-ibm-plex-mono` | 400–500 |

### Classes

| Class | Use |
| --- | --- |
| `.display` | Display family, weight 800, tight tracking |
| `.display-xl` | `clamp(2.6rem, 5.5vw, 4.75rem)` — large, not billboard-crushing |
| `.display-lg` | `clamp(2rem, 4vw, 3.4rem)` |
| `.display-md` | `clamp(1.5rem, 2.6vw, 2.25rem)` |
| `.editorial` | Long-form body |
| `.mono` | Status, indexes |
| `.eyebrow` | Uppercase mono label, wide tracking |

Default `body`: editorial family, ~1.125rem, line-height 1.6.

Product / system **names** sit as proper nouns in the hierarchy — not card titles.

---

## Motion

Easing tokens:

- `--ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-soft`: `cubic-bezier(0.16, 1, 0.3, 1)`

Primitives (`src/components/motion/`):

| Component | Role |
| --- | --- |
| `Reveal` | Enter viewport once |
| `TextReveal` | Editorial line reveal |
| `Parallax` | Soft depth |
| `Magnetic` | Pointer pull on CTAs |
| `ScrollProgress` | Chapter / page progress |
| `StickyScene` | Sticky storytelling |
| `SectionTransition` | World / section handoff |

Rules ([PERFORMANCE.md](./PERFORMANCE.md)):

- No React scroll-position state
- Pause generative canvas offscreen / hidden tab
- Honor `prefers-reduced-motion`
- Motion demonstrates capability or hierarchy — not noise

---

## Signature visuals

### The Field

`src/components/visual/TheField.tsx`

Modes: `abstract | research | systems | infrastructure | hardware | ai`

Pointer influence is slow and calm. **Never** a particle sphere or blob wallpaper.

### Marks & ribbon

- `src/components/visual/Marks.tsx` — orbits, nodes, grids, waves, brackets
- `src/components/visual/SignalRibbon.tsx` — section rhythm

Use as punctuation between acts, not chrome decoration.

### Project demos

`src/components/projects/ProjectDemos.tsx` — lazy-load on homepage; keep SVG/Canvas 2D (no Three.js on routes that do not need it).

---

## Chrome & navigation

- Primary: Work, Research, Lab, Writing
- Secondary behind **More** (Archive, Contact, Acquire, …)
- Command palette: `Ctrl/Cmd+K`
- Footer: large editorial composition (`EditorialFooter`) + socials from `siteConfig.socials`

Minimal chrome. Navigation must not compete with the statement.

---

## Composition rules

1. **One job per section** — one headline, one supporting sentence, one primary visual idea.
2. **Full-bleed demos** live in the flow — not screenshots in fake browser chrome.
3. **No default cards** — if removing border/shadow/radius does not hurt understanding, remove them (`.no-card`).
4. **Brand first** on promotional surfaces — `theworker02` is a hero-level signal.
5. **Alternate worlds** — paper ↔ ink ↔ workshop as chapters, not one mood forever.
6. **Mobile first in layout** — stack before grid; sticky scroll scenes and parallax are desktop-only.

---

## Mobile

Target phones as a first-class surface (production on **Netlify** must feel solid on 375–430px widths).

| Rule | Detail |
| --- | --- |
| Viewport | `width=device-width`, `viewport-fit=cover` in `src/app/layout.tsx` |
| Type | Smaller fluid display clamps under 768px; `overflow-wrap: anywhere` |
| Safe area | `.page-pad` and overlays respect `env(safe-area-inset-*)` |
| Touch | `.touch-target` ≈ 44px min; Field mode buttons use `onClick` |
| Nav | Mobile Menu + Search; body scroll locked while open |
| Sticky scenes | Disabled below `lg` / reduced motion — static stacked stages instead |
| Parallax / Magnetic | Off on coarse pointer or narrow viewports |
| Field | Fewer bands, lower DPR, no pointer tracking on coarse |
| Command palette | Bottom sheet on small screens; `100dvh` aware |
| Forms | Inputs ≥ 16px to avoid iOS zoom |

Helpers: `isNarrowViewport`, `isCoarsePointer`, `shouldEnableStickyScenes` in `src/lib/motion/scroll.ts`.

---

## Anti-patterns

Do **not** ship:

- Glassmorphism panels / multi-layer soft shadows
- Neon accents, glow stacks, purple-on-white gradients
- Bento grids / tiny project cards / icon skill walls
- Centered hero + two CTA buttons as the whole story
- Generic particle spheres / blob backgrounds
- Gradient text as identity
- Dense 12-item primary navigation
- Portfolio “About / Skills / Projects” template structure

---

## Design lab routes

Validate language here before propagating to production routes:

| Route | Purpose |
| --- | --- |
| `/design/hero` | Hero composition |
| `/design/project` | Project / case study layout |
| `/design/research` | Research notebook voice |
| `/design/archive` | Dense index |
| `/design/motion` | Motion primitives |

Layout: `src/app/design/layout.tsx`

---

## File map

| Concern | Location |
| --- | --- |
| Tokens + utility classes | `src/app/globals.css` |
| Font loading | `src/app/layout.tsx` |
| Site chrome | `src/components/shell/*` |
| Field / marks | `src/components/visual/*` |
| Motion | `src/components/motion/*`, `src/lib/motion/*` |
| Identity copy / socials | `src/lib/site.ts` |

---

## Customization (acquisition)

On sale or transfer, primary customization surfaces:

1. Worlds + color tokens (`globals.css`)
2. Typography families (`layout.tsx`)
3. Marks / Field modes
4. Nav labels and footer socials (`site.ts`)

Hosting remains **Netlify** unless the buyer specifies otherwise. See [ACQUISITION.md](./ACQUISITION.md).
