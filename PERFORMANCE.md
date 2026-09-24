# Performance Audit — Phase 1.2

Findings from code inspection + known runtime behavior before motion expansion.
Targets: 60 FPS scroll, minimal main-thread work, no React scroll-position state.

Applies to the **theworker02** laboratory site **deployed on Netlify**. The project is **available for acquisition, sale, and customization** ([ACQUISITION.md](./ACQUISITION.md)); performance constraints travel with the codebase.

## Confirmed jank sources

### 1. Multiple continuous Canvas RAF loops (HIGH)
`TheField` runs `requestAnimationFrame` forever while mounted.
Homepage mounts **two** Fields (hero + research). Both paint every frame even when offscreen.

**Fix:** IntersectionObserver + `document.visibilityState` to pause; DPR cap 1.5; fewer bands on mobile.

### 2. React state inside animation loops (HIGH)
- `ProjectConstellation` calls `setHovered` inside RAF → re-render risk every frame.
- `ChimeraDemo` / `OmniresearchDemo` use `setInterval` → `setState` ~1Hz (cheaper but still React churn).
- `design/project` uses `scroll` → `setProgress` → React render on every scroll event.

**Fix:** Motion values / refs / DOM updates; never `setState` for continuous scroll.

### 3. Pointer handlers measuring layout (MEDIUM)
`TheField` and constellation call `getBoundingClientRect()` on every `pointermove`.

**Fix:** cache rect on resize; throttle pointer to ~30–60Hz; relative coords from cached rect.

### 4. Whole homepage is a client boundary (MEDIUM)
`page.tsx` is `"use client"`, so all demos hydrate and can animate immediately.

**Fix:** keep shell chapters as client islands; lazy-init demos when near viewport.

### 5. backdrop-filter (LOW–MEDIUM)
Design lab sticky header uses `backdrop-blur` — compositing cost on scroll.

**Fix:** remove blur from sticky chrome or limit to design routes only.

### 6. Unused constellation on main path (LOW if unused)
`ProjectConstellation` still exists with heavy RAF + React hover. Ensure it is not mounted on homepage.

## Non-issues / keep
- Native scroll (do not hijack).
- CSS static worlds (`world-paper` / `world-ink`) are cheap.
- Marks SVGs are static — fine.
- Command palette is gated behind interaction.

## Budget
- Cap canvas DPR at 1.5
- At most **one** active Field RAF at a time when possible; pause others
- Motion via `motion/react` values only
- Prefer `transform` / `opacity` / clip reveals

## Fixes applied (Phase 1.2)

- `TheField`: pause offscreen + hidden tab; DPR ≤ 1.5 (1.25 mobile); fewer bands on coarse pointers; throttled pointer; cached rect
- Homepage demos: `dynamic()` lazy load; Chimera DOM updates without React interval state when offscreen paused
- Removed scroll → `setState` on design/project (Motion `useScroll` / `useTransform` instead)
- Removed sticky `backdrop-blur` from design chrome / progress chip
- Central motion system under `lib/motion` + `components/motion`
- Homepage restructured as numbered acts with IntersectionObserver chapter progress (not scrollY state)
- Sticky Omniresearch storytelling via Motion values only

## Remaining watchlist

- Profile in Chrome Performance while fast-scrolling homepage
- Confirm only one Field RAF active when research Field is offscreen
- ProjectConstellation still exists unused — do not remount without the same pause/throttle pattern

## Deployment note

Validate scroll/FPS on the **Netlify** production URL after deploy, not only `localhost`. Acquisition buyers inherit these constraints unless they commission performance remediations.

### Mobile checklist

- No multi-hundred-vh sticky traps below `lg`
- Parallax / magnetic off on coarse or narrow viewports
- `TheField` paused offscreen; reduced bands + DPR on mobile
- Horizontal overflow clipped; safe-area insets honored

