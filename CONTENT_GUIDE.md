# Content guide

Content for the **theworker02** laboratory site. Production is **deployed on Netlify**. The site itself is **available for acquisition, for sale, and customizable** — see [ACQUISITION.md](./ACQUISITION.md).

## Rules

1. **Do not invent** users, revenue, benchmarks, citations, partnerships, or star-inflation.
2. Prefer precise technical language over marketing adjectives.
3. Mark unfinished work with honest statuses (`experimental`, `research`, `ACTIVE`, `INCONCLUSIVE`, etc.).
4. Proprietary / acquisition-oriented systems may be listed; keep detailed sales language on `/acquire` and in [ACQUISITION.md](./ACQUISITION.md).
5. Failed lab work is welcome when `learned` is real.
6. When content mentions hosting, state that production runs on **Netlify**.

## Adding a project

1. Append to `src/lib/content/projects.ts` matching `projectSchema`.
2. Set `featured` / `constellation` thoughtfully — not everything belongs on the homepage field.
3. Add graph relationships via `relatedProjects` and optional edges in `src/lib/graph/index.ts`.
4. Choose `presentation` only when a demo exists (`chimera`, `parallax`, …).

## Adding research

Edit `src/lib/content/research.ts`. Always include question, status, limitations when results are early.

## Adding writing

1. Add metadata to `writingEntries` in `src/lib/content/writing.ts`.
2. Add `content/writing/<slug>.mdx`.

## Currently strip

Update `currently` in `src/lib/site.ts` when focus changes.

## Acquisition-facing content

- Mark projects with `acquisition.available` when they are open for discussion.
- Site-level sale / customization: [ACQUISITION.md](./ACQUISITION.md).
- Do not invent valuations or buyer interest.
