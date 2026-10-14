# Design changes: what to act on from UI_REVIEW.md

A second pass over `UI_REVIEW.md`, checked against the code using the same skills (`design-taste-frontend`, `apple-design`, `emil-design-eng`). Each item says what the review claimed, whether it holds up, and what to change.

Short version: the type-scale, small-text, body-contrast and platform fixes are real. The "broken images" critical is a **false positive**. The cleanup of the "AI tells" is half right: drop the decoration that carries no information (index numbers, the glowing blob), and keep the technical identity (hairlines, mono for data).

---

## Do these

### 1. Collapse the type scale to 6 tokens
**Claim:** 17 font sizes. **Verdict: agree.** The source has 13 fixed sizes plus 9 different `clamp()` headings, and several of them are only 1px apart (14/15, 17/18/19, 20/22).

Define the tokens once in `src/lib/styles/global.css` and replace every literal `font-size` with one of them:

| Token | Value | Use |
| --- | --- | --- |
| `--fs-display` | `clamp(42px, 6.5vw, 68px)` | hero h1 only |
| `--fs-title` | `clamp(28px, 4vw, 40px)` | section titles, project page h1 |
| `--fs-lead` | `clamp(18px, 2.2vw, 21px)` | ledes, pitch, card titles |
| `--fs-body` | `16px` | running copy |
| `--fs-small` | `14px` | meta, timeline place, nav, buttons |
| `--fs-micro` | `13px` | mono tags, badges, dates, kbd |

Remove the stray 34px, 24px and 22px sizes, and the separate `clamp()` in `+error.svelte`.

### 2. 13px floor for anything meant to be read
**Verdict: agree.** Every `12px` and `11px` goes up to `--fs-micro` (13px):
- `CommandPalette.svelte:170` (kbd, 11px), `:199`
- `Listening.svelte:60`
- `ProjectCard.svelte:157`, `:179`
- `+layout.svelte:237` (kbd, 11px)
- `+page.svelte:615`, `:887`
- `projects/[slug]/+page.svelte:175`, `:239`, `:274`, `:361`

Uppercase plus wide tracking at this size is a big part of why it reads as cramped. Wherever text stays uppercase, cap the tracking at `0.04em`.

### 3. Running text in full ink
**Verdict: agree.** `.pitch`, `.lede` and the timeline/project descriptions are prose, so they get `color: var(--text)`. Keep `--muted` for dates, places, captions and meta only.

### 4. Platform-aware shortcut label
**Verdict: agree.** `+layout.svelte:83` hardcodes `Ctrl K`. Render `⌘K` when `/Mac|iPhone|iPad/.test(navigator.userAgent)`, otherwise `Ctrl K`. Set it in `onMount` so the prerendered HTML stays `Ctrl K` and nothing flashes on non-Apple machines.

### 5. Remove the radial accent blob from the hero
**Verdict: agree (both reviews).** Delete the `radial-gradient(...)` layer at `+page.svelte:349`. That glow is the generated-landing-page signature, and it carries no information.

### 6. Drop the `01 /` to `04 /` section numbers
**Verdict: agree with the original review**, not with the second opinion. The skill bans section-number eyebrows outright. More to the point, the numbers carry nothing here: the sections aren't a sequence, and the nav already lists them. Spec-sheet numbering works when something refers back to it, and nothing does here.

Along with that, cut the eyebrows: there are 5 eyebrows across 5 sections, and the rule is about 1 per 3. Keep the hero eyebrow (location + availability, which is real information). Delete the four section eyebrows at `+page.svelte:152, 202, 236, 273`; the `h2` already names each section.

### 7. Stop framing the 3D work as a hobby
**Verdict: agree.** "Off the keyboard" (`+page.svelte:273`) undersells 26k+ Workshop subscribers and CAD work. Once item 6 deletes the eyebrow it's gone anyway. Make sure the `h2` and nav label say what it is, e.g. "3D modelling and CAD".

Don't move the section up the page. The audience is software hiring, so software stays first. The fix is the framing, not the position.

### 8. Mono for data only
**Verdict: partly agree.** Keep Geist Mono for dates, metrics, tech tags, paths, commit hashes and the listening panel. Change these to sans:
- the nav and the `TD` brand mark (`+layout.svelte:155`)
- the track switcher label (`TrackSwitcher.svelte:35`)
- the hero eyebrow (`.eyebrow` in `global.css:148`; the location line is a sentence, not data)

Add `font-variant-numeric: tabular-nums` wherever dates are set in sans.

### 9. Touch targets
**Verdict: agree, small.** `.find` is `min-height: 36px` (`+layout.svelte:219`). Make it 44px under `@media (pointer: coarse)`. Commit `96b2dfc` already reworked filter targets, so check the pills and the project card GitHub icon link at 375px instead of assuming they're wrong.

### 10. Specific link copy
**Verdict: agree, low.** In `ProjectCard.svelte:42`, change `Read more` to `View project`, or keep the visible label and add `aria-label="Read more about {title}"`. Screen readers currently hear "Read more" several times with nothing to tell them apart.

---

## Keep as is

### 1. 3D gallery images are not broken
**Claim:** 0 rendered images, `enhanced-img` assets 404. **Verdict: false positive.** I ran a fresh `npm run build`: all 34 `/_app/immutable/assets/*` image references in `build/index.html` resolve to files that exist. The reviewer most likely opened `build/index.html` over `file://`, where root-absolute `/_app/...` paths 404, or screenshotted before the lazy images scrolled into view. **Action:** none. Check the live GitHub Pages URL once. If it really does 404 there, the cause is the deploy, not `+page.svelte`.

### 2. Command palette entrance animation
**Claim:** add a scale/fade entrance. **Verdict: disagree.** A keyboard-triggered palette that's opened over and over should be instant (the Raycast rule in `emil-design-eng`: never animate keyboard-initiated actions). If anything, a 100ms opacity fade on `::backdrop` only.

### 3. Hairlines and 1px borders
**Verdict: keep.** They organise real content (rows, cards, the timeline), so they aren't decoration. They're part of the precision-workshop identity the second opinion describes, and that identity fits.

### 4. The blueprint grid
**Verdict: keep, quieter.** Once the blob is gone (Do these #5), the grid is a faint flat texture. That's defensible for someone who drafts CAD. Drop `opacity` from `0.7` to around `0.4`. It's your call; remove it entirely if it still reads as template.

### 5. Card lift and button press
**Verdict: keep.** `translateY(-2px)` on hover is already behind a `(hover: hover)` guard (`ProjectCard.svelte:85`), and `translateY(1px) scale(0.98)` on `.btn:active` is a fine press. Swapping them is taste, not a fix.

### 6. Reduced motion
**Verdict: keep.** `transition: none !important` under `prefers-reduced-motion` is safe and correct. The opacity-crossfade version is optional polish.

### 7. Nav underline from `scaleX(0)`
**Verdict: keep.** A scroll-spy indicator growing from the centre is fine. The "nothing scales from zero" rule is about elements appearing, not a 2px underline.

### 8. Backdrop blur on the listening panel
**Verdict: keep while the grid stays.** The panel sits over the grid, and the blur is what keeps it legible. If you remove the grid, make it an opaque `--surface`.

---

## Order

1. Type tokens + 13px floor (Do these #1, #2): the biggest visible lift, one pass through the CSS
2. Full-ink prose, remove blob, remove section numbers and eyebrows, rename 3D section (#3, #5, #6, #7)
3. Mono cleanup (#8)
4. `⌘K`, touch targets, link copy (#4, #9, #10)
5. Check the live site's gallery once
