# Design Reference — Phase 1.1

Reference principles for the **theworker02** laboratory (production **deployed on Netlify**). The resulting site is **available for acquisition, for sale, and customizable** — [ACQUISITION.md](./ACQUISITION.md).

Studied public marketing surfaces for **ElevenLabs** (live fetch, 2026) and **OpenAI** (public design language; site fetch blocked 403 — principles drawn from the publicly shipped homepage/product/research presentation pattern).

This document extracts **principles**, not assets. We will not copy logos, exact layouts, proprietary illustrations, or protected copy.

---

## ElevenLabs — what reads as “premium product org”

### Typography
- Hero lines are **short, declarative, enormous**: “Bringing technology to life.”
- Scale contrast is extreme: display owns the viewport; supporting copy is clearly subordinate.
- Product names sit as **proper nouns in the hierarchy**, not card titles.

### Composition
- **Full-bleed product demonstrations** sit inside the editorial flow (editors, agents, analytics), not as screenshots in browser chrome.
- Sections feel **individually art-directed**: Creative vs Agents vs API each have their own rhythm.
- Navigation is present but does not compete with the statement.

### Color & material
- Dark, confident field with **selective** accent — color marks product context, not empty decoration.
- Surfaces feel like **product stages**, not glass cards floating in a void.

### Motion / interaction
- Interaction demonstrates capability (play speech, simulate agents) rather than decorating with opacity fades.
- Transitions feel **calm and continuous**, closer to a product session than a marketing bounce.

### Takeaways for us
1. Embed live system demos as first-class page material.
2. Let one sentence carry the hero — then prove it visually.
3. Art-direct each major section differently.

---

## OpenAI — what reads as “research + editorial confidence”

### Typography
- Display type is **editorial**, not startup-loud.
- Warm paper / near-black contrast creates drama without neon.
- Research and product are presented with **publishing seriousness** (dates, concise claims, calm hierarchy).

### Composition
- **Alternating light and dark worlds** across the scroll — not one continuous dashboard black.
- Huge whitespace is intentional; density appears where indexes and lists need it.
- Navigation is **extremely restrained**; secondary paths retreat.

### Color
- Base is near-black / warm white / soft gray.
- Color is **contextual**, rarely decorative gradients everywhere.

### Product / research presentation
- Demos and research feel like **artifacts**, not portfolio cards.
- Claims are sparse; the layout trusts the reader.

### Takeaways for us
1. Alternate paper and ink sections for cinematic rhythm.
2. Research pages should feel like a lab notebook / journal, not SaaS tiles.
3. Prefer typography + demonstration over chrome.

---

## Linear (minor interaction reference only)

- Precision in hover/focus.
- Keyboard-forward utility (command palette stays).
- Do **not** clone Linear’s purple SaaS aesthetic.

---

## Mapping → our design system

| Reference principle | Our translation |
| --- | --- |
| Enormous editorial display | `clamp(4.5rem, 11vw, 10.5rem)`, LH ~0.88, tracking ~-0.05em |
| Alternating worlds | Section themes: `paper`, `ink`, `workshop`, `index` |
| Signature visual | **The Field** — generative computational field, mode-aware |
| Minimal chrome | Primary nav: Work, Research, Lab, Writing (+ Archive/Contact secondary) |
| No card grid | Open compositions, hairline rules, numbered entries |
| Embedded demos | Large sticky/scroll-choreographed project stages |
| Selective color | Domain tints only: research / systems / infrastructure / hardware |
| Dense archive | Utilitarian index rows, not tiles |
| Enormous footer | Final composition, not copyright strip |

---

## Explicit anti-patterns (remove / ban)

- Neon lime/cyan “dev portfolio” glow
- Glassmorphism panels everywhere
- Tiny project cards / bento grids
- Icon skill walls / tech logo walls
- Centered hero + two CTA buttons as the whole story
- Generic particle spheres / blob backgrounds
- Gradient text as identity
- 12-item primary navigation

---

## Quality bar (self-check)

A visitor should feel:

> “This looks like an advanced technology/research organization — then I realize it is one person’s body of work.”

If it still reads as a customized portfolio template, the section fails.

---

## Acquisition

This reference informs a transferable product surface. Sale / customization: [ACQUISITION.md](./ACQUISITION.md). Production host: **Netlify**.
