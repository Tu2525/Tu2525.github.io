# Handoff: portfolio website

Project: SvelteKit static portfolio (adapter-static, Svelte 5, Geist fonts, coral accent), GitHub Pages at https://tu2525.github.io
Folder: `F:\Workspace\Websites\portfolio-website` | Branch: `main` | Repo: Tu2525/Tu2525.github.io

## Goal
Portfolio that pulls each project's docs and release version from its GitHub repo at build time, with a nerdy-but-tasteful design that works on phones.

## Done (all pushed; checked with `npm run check` = 0 errors, `npm run build`, and the dev preview unless noted)
- Build-time GitHub sync: `scripts/sync-github.mjs` -> `src/lib/data/github.json` (README HTML, latest release, stars, language, pushed date). Runs on `predev`/`prebuild`. Stub READMEs and private repos fall back to hand-written text in `src/lib/data/projects.ts`.
- `.github/workflows/deploy.yml`: rebuild on push plus cron every 6 hours.
- Project pages (`src/routes/projects/[slug]/+page.svelte`): README file bar, `~/projects/<slug>` path, prev/next, version badge.
- Cards (`ProjectCard.svelte`): version badge, language/stars/pushed line.
- Command palette (`CommandPalette.svelte`): Ctrl/Cmd+K or `/`; arrow keys scroll the list.
- Hero (`src/routes/+page.svelte`): blueprint grid, "recently pushed" panel, section index labels.
- Listening panel (`Listening.svelte`, in the hero panel): Last.fm now playing / last played, loads once per page view (verified live in preview).
- Mobile pass (preview at 375px, dark mode only): fixed horizontal overflow (hero, header, project pages), swipeable filter chips, row dividers, 44px touch targets, hover gated to `(hover: hover)`.
- New projects added: link-ecommerce, nutqai, skeleton-scan.

## Not done / unverified
- Never tested on a real phone, in light mode, or the palette on touch.
- Listening panel does not refresh while the page is open. A 30s poll was written then dropped as over-engineering; the commit was discarded.
- Private repos (Atlas, Healthica, ZeroClip, MuseBridge...) still show hand-written text until made public.

## Git (as of last check)
- `main` matches `origin/main`, last commit `96b2dfc`. No open PRs.
- Uncommitted, NOT from this chat's work: `.gitignore` (adds `UI_REVIEW.md`, `.taste-skill/`), `src/lib/data/github.json` (re-synced), untracked `DESIGN_CHANGES.md` (a design-review follow-up from another pass). Look before committing; none of it is mine.

## Next steps
1. (needs user) Open the live site on your phone and in light mode, report anything off.
2. Read `DESIGN_CHANGES.md`; decide which items to apply (type scale, small text, body contrast).
3. Make more private repos public, or give CI a token, so their READMEs flow in.
4. Optional: README files written locally for `F:\Workspace\Code\Flutter\linkflutterecommerceapp`, `...\BanhaHackathon`, `...\Listenlabs` are not in any remote.

## To resume
```
cd F:\Workspace\Websites\portfolio-website
npm install
npm run dev        # http://localhost:5173 (runs the GitHub sync first)
npm run check
```
- Pushing to `main` deploys to production. Ask the user first; pushes were approved one at a time.
- Rewriting pushed history (force-push) needs explicit approval.

## Do not redo
- No `Co-Authored-By` or any Claude attribution in commits or PRs (user rule; history was rewritten once to remove it).
- No fake terminal hero (design-taste skill flags it as an AI tell); the palette gives the keyboard-first feel.
- No polling for the Last.fm line (user called it over-engineering).
- The Last.fm API key and username are in `Listening.svelte`; the key is public read-only by design.
- Keep README anchor ids (replace `user-content-` prefix, do not strip) and `handleMissingId: 'ignore'` in `vite.config.ts`.
- Use `minmax(0, 1fr)` for single-column grids; plain `1fr` caused the phone overflow.
