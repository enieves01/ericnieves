# RESPONSIVE.md — Source of truth for layout, breakpoints & components

This documents how `index.html` / `style.css` / `main.js` actually behave today
(commit `f29d9bd`). **Every future change should reuse the patterns below —
breakpoints, grid patterns, wedge/skew technique, component classes, tokens —
rather than introducing new ones.** If a new section needs a two-column
layout, a diagonal photo, or a button, copy the matching pattern here instead
of inventing a new one.

The site is a single page (`index.html` only — no other HTML files). Sections
top to bottom: `.hero` (black) → `.who-help` (red) → `.coaching-options`
(black) → `.process` (red) → `.about` (black) → `.cta-band` (red) →
`.site-footer` (black), plus a `#booking-modal` appended after the footer.
This black/red alternation every section is deliberate (confirmed against
the Figma reference) — keep it when inserting a new section rather than
stacking two same-color sections back to back.

---

## 1. Breakpoints

All breakpoints live in one `/* === RESPONSIVE === */` block at the bottom of
`style.css` (lines ~711–855), in this cascade order. A few section-specific
rules also live inline in their component's own block (e.g. `.mobile-menu`'s
`min-width: 971px` override, and the booking modal's own `max-width: 768px`
block at the very end of the file). Nothing outside this list changes layout.

| Breakpoint | Type | What changes |
|---|---|---|
| `min-width: 971px` | desktop floor | Forces `.mobile-menu.open { display: none }` — the full-screen mobile nav overlay can never show above 970px even if `.open` is set. |
| `min-width: 1601px` | largest | `.hero` height becomes `calc(100svh - 90px)` (leaves a peek of Process visible on load). `.hero-logo img` → 56px. `.cta-band-headline--split` forced `white-space: nowrap` (keeps "Your first session / is on me." at 2 lines). |
| `max-width: 1600px` | midsize/laptop (Figma "midsize", authored 1444px) | Same `.hero` peek height + 56px logo as above. `.hero-inner-2` left padding narrows (`clamp(2rem, 29vw, 22rem)`). `.hero-headline-2` shrinks (`clamp(2.5rem, 8.2vw, 7.5rem)`). `.hero-photo-wedge` switches from a viewport-% inset box to a **height-pinned, aspect-ratio-derived** box (`top:0; bottom:0; left:-13.07%; aspect-ratio:2597/2901`) — see §3. `.cta-band-headline--split` shrinks and stays `nowrap`. |
| `max-width: 1200px` | nav collision point | `.hero-nav` switches from a single right-aligned row to a column (logo on top via `order:-1`, links row centered below) — this is where the nav links would otherwise start overlapping the diagonal photo edge. |
| `max-width: 970px` | **smallest — Figma "small" frame** (authored 971px) | Hero fully restructures: `.hero-nav` back to a row (logo left, hamburger right); `.hero-nav-links` hidden, `.hero-hamburger` shown; `.hero-photo-wedge` hidden, `.hero-photo-band` (plain diagonal-top band) shown; `.hero` flex direction becomes `column` so the band stacks under the text instead of beside it; `.hero-inner-2` side padding shrinks; `.hero-headline-2` shrinks further; `.hero-support` drops its width cap/right margin (full width) and `.hero-ctas` centers instead of right-aligning. |
| `max-width: 960px` | tablet/grid collapse | `.process-grid` 3 cols → 1 col (also used by Coaching Options). `.who-grid` (Who I Help, 4 items) → 2 cols. `.two-col` (About) 2 cols → 1 col. `.about-photo-wrap` (diagonal wedge photo) hidden; `.about-photo-band` (mobile band) shown, reordered to `order:-1` (above the text). `.footer-grid` 3 cols → 2 cols. |
| `max-width: 768px` | mobile | `.footer-grid` → 1 col. `.form-row` (booking modal Email/Phone pair) → 1 col. `.who-grid` (Who I Help) → 1 col. Booking modal switches from a centered overlay panel to a full-screen sheet (`.booking-modal` padding removed; `.booking-modal-panel` becomes `width:100%; height:100%`, no border, entry animation disabled — `overflow-y:auto` carries over from the base rule, so the now-7-field form still scrolls correctly inside it even with `justify-content:center` centering the panel's flex column). |
| `max-width: 480px` | phone | `.hero-ctas` stacks vertically and buttons go full-width (`.btn { width:100% }`). `.about-photo-band` capped at `max-width:280px` and centered (down from 320px at the 960px tier). |

**Rule of thumb for new sections:** collapse any 2-or-3-column grid to 1
column at **960px**, not a new number. Use **768px** for form-field pairs and
anything full-screen-on-mobile. Use **480px** for final phone-only spacing
tweaks (never for structural collapse — that's already done by 960px).
Nav/hero-specific structural changes are pinned to **970px** and **1200px**
because they're keyed to the hero photo's geometry, not general content width
— don't reuse those two for ordinary content sections.

---

## 2. Grid / flex patterns for two-column (and multi-column) sections

### `.two-col` — the canonical text+photo two-column pattern (About section)
```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}
/* → max-width: 960px */
.two-col { grid-template-columns: 1fr; }
```
Reuse this verbatim for any new even-split text/image section. Pair it with
the mobile-reflow pattern in §3 (`*-photo-wrap` hidden + `*-photo-band` shown
at 960px, `order:-1`) if the second column is a photo.

Note: About's `<h2>` is NOT inside `.two-col` — it's a full-width sibling
above it (`#about-heading`, own size/spacing override, see §5). Only the
bio text + credentials sit in the left `.two-col` column now (the old
stats row — 12+/400+/1:1 — was removed entirely, CSS and markup both).
The FAQ accordion (`.faq`, see §4) is also a full-width sibling, placed
directly after `.two-col` closes — still "under Credentials" in visual
order, just not squeezed into the half-width text column.

### `.process-grid` — 3-up card grid
```css
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
/* → max-width: 960px */
.process-grid { grid-template-columns: 1fr; }
```
Goes straight from 3 columns to 1 — deliberately, per the comment in
`style.css`, to avoid orphaning a third card alone on a row at an
intermediate 2-column step. Reuse this jump (no 2-column middle tier) for any
3-card/3-stat row.

### `.footer-grid` — footer columns
```css
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; }
.footer-grid--simple { grid-template-columns: 1.5fr 1fr; } /* current modifier in use */
/* → max-width: 960px */ .footer-grid { grid-template-columns: 1fr 1fr; }
/* → max-width: 768px */ .footer-grid { grid-template-columns: 1fr; }
```
The base 3-column definition still exists for a possible future "Explore"
column; the site currently uses the `--simple` 2-column modifier since nav is
anchor-based. Add new modifiers the same way (`.footer-grid--yourvariant`)
rather than overriding `.footer-grid` directly.

### `.form-row` — paired form fields (booking modal)
```css
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
/* → max-width: 768px */
.form-row { grid-template-columns: 1fr; }
```

### `.hero-support` / `.hero-ctas` — hero's support copy + CTA column
Per the Figma reference, the hero's paragraph + CTA row is NOT full-width —
it's a width-capped column flush to the hero's right edge, with two
equal-width buttons (not auto-width/right-justified). `.hero-support` wraps
`.section-intro` (the paragraph) + `.hero-ctas` (the button row):
```css
.hero-support { display: flex; flex-direction: column; gap: 1.5rem; max-width: 43.5rem; margin-left: auto; }
/* → max-width: 970px: max-width: none; margin-left: 0; (full width, matches the centered small-frame hero) */

.hero-ctas { display: flex; flex-wrap: wrap; gap: 1rem; }
.hero-ctas .btn { flex: 1 1 0; }  /* equal-width buttons, not content-sized */
/* → max-width: 970px: justify-content: center; gap: 1.45rem; */
/* → max-width: 480px: flex-direction: column; align-items: stretch; .btn { width:100% } */
```
The hero headline's lines are all flush-left (`.ln`) — there is no stagger/
offset modifier on any line; don't reintroduce one on a new multi-line
headline.

---

## 3. Diagonal wedge & skew effects

There are **two distinct diagonal techniques** on the site — don't conflate
them.

### A. Pre-clipped wedge PNGs (hero + about photos)
The diagonal edge is baked into the **image asset itself** (exported from
Figma with alpha transparency outside the wedge shape) — not a live
`clip-path` on the `<img>`. The CSS just positions a box and lets the PNG's
own transparent edge do the diagonal.

**Hero** (`.hero-photo-wedge`, wraps `assets/hero-photo-wedge.png`):
```css
.hero-photo-wedge {
  position: absolute;
  inset: -10% 50.27% -14.7% -17.88%;   /* base/desktop: viewport-% box */
  z-index: 0;
}
.hero-photo-wedge img { position:absolute; inset:0; width:100%; height:100%; object-fit: contain; }
```
At `max-width: 1600px` the box switches strategy — from a fixed viewport-%
inset to a **height-pinned box whose width is derived from the image's own
aspect ratio**:
```css
.hero-photo-wedge {
  top: 0; right: auto; bottom: 0; left: -13.07%;
  aspect-ratio: 2597 / 2901;   /* the source PNG's exact ratio */
}
```
This avoids the box drifting out of ratio with the image as the window
narrows without getting shorter — that mismatch would force `object-fit`
to either crop into the diagonal (`cover`) or fall short of the section's
full height (`contain`). **Always use `object-fit: contain` with these
wedge images**, never `cover` — `cover` will slice into the pre-baked
diagonal edge.

At `max-width: 970px` the wedge is hidden entirely (`display:none`) and
replaced by `.hero-photo-band` (see B below).

**About** (`.about-photo-wrap` / `.about-photo`, wraps
`assets/about-photo-wedge.png`) uses the same contain-fit technique, scoped
to its own box via `aspect-ratio: 598 / 668` instead of viewport insets,
since it sits inside `.two-col` rather than being absolutely positioned
across the whole section. Hidden at `max-width: 960px` in favor of
`.about-photo-band`.

**To add a new wedge photo section:** export a pre-clipped PNG from Figma
(transparent outside the diagonal), give its wrapper the image's exact
`aspect-ratio`, and use `object-fit: contain`. Do not try to fake this with
`clip-path` on a live photo — that's the *other* technique (B).

### B. Live `clip-path` diagonal bands (mobile reflow only)
Used only for the small-breakpoint "band" replacements, where a plain
rectangular photo gets one diagonal edge cut live in CSS:
```css
/* .hero-photo-band — shown ≤970px */
.hero-photo-band {
  aspect-ratio: 971 / 502;
  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%); /* diagonal top edge, right corner higher */
  /* img inside uses object-fit: cover (safe here — clip-path is live, not baked into the asset) */
}
```
`.about-photo-band` (shown ≤960px) is the equivalent for the About section
but currently ships **without** a clip-path — it's a plain rectangular band
capped at `max-width: 320px` (280px at ≤480px) using `object-fit: contain`.
If a future mobile band needs the diagonal treatment, copy the
`hero-photo-band` polygon, not `about-photo-band`.

### C. Skew (buttons, hamburger, eyebrow rule)
This is a **transform-based** shear, distinct from both wedge techniques
above — used for anything that needs rounded corners (which `clip-path`
can't do).
```css
.btn-skew {
  clip-path: none;
  border-radius: 6px;
  transform: skewX(-10deg);
}
.btn-skew .btn-label { transform: skewX(10deg); }  /* counter-shear so the label stays upright */
```
`.hero-hamburger` uses the identical `skewX(-10deg)` / counter-shear-icon
pattern. **Every button and button-like control on the site uses
`.btn-skew`** — the older pure-`clip-path` parallelogram cut (`.btn` alone,
without `.btn-skew`, `clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px)
100%, 0% 100%)`) is legacy/still defined but not applied anywhere in current
markup. Use `.btn-skew` for any new CTA, not the bare clip-path version.

The `.rule` eyebrow dashes use the same `skewX(-18deg)` idea on two tiny
`::before`/`::after` bars.

### D. Diagonal pinstripe textures
Decorative overlay only (not structural), used on `.hero` (`.pinstripe`) and
`.cta-band` (`.cta-band-texture`):
```css
background-image: repeating-linear-gradient(
  -65deg, transparent, transparent 8px,
  rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px  /* white version, on dark hero */
  /* cta-band-texture uses rgba(0,0,0,0.07) instead, since it sits on the red band */
);
```
Absolutely positioned, `inset:0`, `pointer-events:none`, `z-index` kept low
so it sits behind content. Reuse this exact gradient (just swap the rgba) for
any new full-bleed dark or red section that wants the same textured feel.

---

## 4. Reusable component classes

| Class | Purpose / modifiers |
|---|---|
| `.btn` + `.btn-skew` | Base button. Color modifiers: `.btn-red` (fills `--red-bright`), `.btn-white` (ink fill, black text), `.btn-ghost` (flat `--chip-dark` fill, inset `--line` border, fills red border on hover). Always pair `.btn` with `.btn-skew` and wrap the visible text in `<span class="btn-label">` (see §3C). |
| `.eyebrow` + `.rule` | Small red uppercase label with two skewed dashes before it (`<p class="eyebrow"><span class="rule"></span>Label</p>`). Used in the booking modal ("Free assessment") and the About section's "Credentials" label; also has an unused `.cta-band-eyebrow` variant defined in CSS but not currently placed in markup. |
| `.display-alt` | Typography helper, not a component — italic/bold/uppercase "Tomorrow" display font treatment. Applied to every headline (`h1`, `h2`, footer col title, modal heading). |
| `.section-intro` | Standardized intro paragraph directly under a section `h2` (`--body-text` color). Used in Hero, Who I Help, Process, and Coaching Options. |
| `.process-card` | Card treatment for **red** sections (`rgba(18,18,20,0.33)` translucent, `--radius-lg`) — `.process-num` (big number, Process only) + `.process-title` + `.process-body`. Reused as-is by Who I Help (no numbers, same title/body classes) since it also sits on a red section. |
| `.who-card` | Card treatment for **black** sections (flat `--card-dark`, no border, `--radius-lg`) — `.who-card-title` + `.who-card-body`. Currently only consumed by Coaching Options. |
| `.credential-list` / `.credential-chip` | Flat `--chip-dark` tag list (no border), used for the About section's Credentials row. |
| `.faq` / `.faq-item` / `.faq-question` / `.faq-answer` | FAQ accordion, in the About section below `.two-col`. Native `<details>`/`<summary>` (no JS) — `.faq-item` is the `<details>`, `.faq-question` the `<summary>` (with a `.faq-icon` chevron that rotates via `.faq-item[open] .faq-icon`), `.faq-answer` a plain `<p>`. Items use the same flat `--card-dark`/`--radius-lg` treatment as `.who-card`, since it's also a card-on-black context. |
| `.cta-band` | Full-bleed red (`--red-bright`) band component: `.cta-band-texture` (pinstripe, §3D) + `.cta-band-inner` (centered content) + `.cta-band-headline` (or the bigger `--split` modifier used on the home page, with a `.muted-black` inline span for two-tone text) + optional `.cta-band-sub` paragraph. |
| `.hero-support` | Width-capped (`max-width:43.5rem`), right-flush column wrapping the hero's `.section-intro` paragraph + `.hero-ctas` button row. See §3. |
| `.footer-contact-item` | Icon + text row (SVG icon, `flex-shrink:0`) used for each contact line in the footer. |
| `.form-group` / `.form-label` / `.form-input` / `.form-textarea` / `.form-select` | Booking modal form field pattern — label above input, dark panel background, red focus border. `.form-select` layers onto `.form-input` (same class list, e.g. `class="form-input form-select"`) to add a custom chevron and `appearance:none` on `<select>` elements. |
| `.reveal` / `.reveal-left` / `.reveal-right` | Scroll-in animation classes (see §6) — apply to any element that should fade/slide in on scroll; not tied to a specific section. |

---

## 5. Design tokens (CSS variables) and fonts

Defined once in `:root` at the top of `style.css`. Standardized against the
Figma reference (file `cv9z4lsqrBcssGJaxeEIEm`, node `26:129`) — that file
formally registers exactly three fill styles (`#C1272D`, `#333339`, and a
black resolving to `#000000`), and consistently uses one rgba value for
every body paragraph on the page. **Every red surface — section
backgrounds, `.btn-red`, `.cta-band` — uses the single bright red
`--red-bright`.** The older, darker `--red` is kept only for the
booking-modal's decorative two-tone gradient bar (not part of the Figma
page design) — don't reach for it for a new flat fill.

```css
--black:      #0a0a0b;   /* page background */
--panel:      #121214;   /* modal panel background */
--panel-2:    #17171a;   /* form input background */
--ink:        #f4f4f5;   /* primary text / white-on-dark, card/section titles */
--muted:      #9a9a9f;   /* form labels only — NOT body copy, see --body-text */
--line:       #262629;   /* hairline borders (form inputs, modal panel, focus rings) */
--red:        #9e1b22;   /* deep red — booking-modal gradient bar only, see note above */
--red-bright: #c1272d;   /* THE red — every section bg, .btn-red, .cta-band, links/eyebrow/accent text */
--steel:      #7c8089;   /* tertiary/label text (stat labels, footer sub, icon color) */

--body-text:  rgba(255, 255, 255, 0.75);  /* standardized paragraph color — every body
                                              paragraph on the page: hero/section intros,
                                              card bodies, About bio, footer copy */
--card-dark:  #222226;   /* flat card fill for content cards on BLACK sections (.who-card) */
--chip-dark:  #333339;   /* flat fill for small chips/ghost buttons (.credential-chip, .btn-ghost) */

--max-w:     1200px;                         /* .container max width */
--gutter:    clamp(1.25rem, 5vw, 2.5rem);    /* .container side padding, also reused directly in hero nav */
--radius:    2px;                            /* small UI elements: form inputs, .credential-chip */
--radius-lg: 4px;                            /* content cards: .process-card, .who-card */
--ease:      0.22s ease;                     /* standard transition timing, reused everywhere */
```

**Two card treatments, chosen by what's behind them, not by content type:**
- Cards on a **red** section (`.process`, `.who-help`) → `.process-card`
  (`rgba(18,18,20,0.33)` translucent, `--radius-lg`). Who I Help reuses this
  exact class/markup pattern (`.process-card`/`.process-title`/`.process-body`)
  — it is not a visually distinct section, just a different `.process-grid`
  wrapper (`.who-grid`, for its 4-item 2x2 tablet fold).
- Cards on a **black** section (`.coaching-options`) → `.who-card`
  (flat `--card-dark`, no border, `--radius-lg`). Despite the name, `.who-card`
  is no longer used by Who I Help — it's Coaching Options' card class now.

**Section header rhythm** (from the Figma autolayout, not eyeballed): standard
section headings (`.section-headline-2` — Who I Help, Process, Coaching
Options) cap at **44px** with a flat **24px** gap down to their `.section-intro`
paragraph, then a flat **48px** gap from that paragraph down to the card grid
(`margin-top: 3rem` on `.process-grid`/`.who-grid` — NOT on `.section-intro`
itself, since that class is also used by Hero, which needs a different,
24px gap down to `.hero-ctas` via `.hero-support`'s own `gap`). About's
`<h2>` is the one exception — Figma gives it a bigger, standalone treatment
(`#about-heading` override: 56px desktop cap, 48px gap to the row below),
which is also *why* it no longer wraps: it was moved to sit full-width above
`.two-col` instead of being squeezed into the half-width text column.

**Fonts** (loaded both via `<link>` in `index.html` `<head>` and `@import` in
`style.css` — redundant but both present):
- **Tomorrow** (italic, weights 600/800/900) — display/headlines via `.display-alt` (h1/h2, modal heading, `.footer-col-title`), plus `.hero-nav-links a` and `.mobile-menu a`.
- **Saira Condensed** (italic 800) — logo text fallback only (`.logo-text`, `.footer-logo-text`).
- **Oswald** (500/600) — small uppercase labels: `.eyebrow`, `.btn`, `.process-title`/`.who-card-title`, `.credential-chip`, `.form-label`, `.footer-logo-text .sub`.
- **Inter** (400/500/600) — body default and everything that doesn't override it: form inputs/textarea, `.about-body p`, `.process-body`, `.who-card-body`, `.footer-blurb`, `.footer-contact-item`, `.section-intro`.

---

## 6. JS behaviors (`main.js`) — three independent IIFEs, no shared state

### Mobile menu / hamburger
- Trigger: `.hero-hamburger` button click, toggles `aria-expanded` + `.open` on `#mobile-menu`.
- Also closes on: clicking any link inside `#mobile-menu`, pressing `Escape` (and returns focus to the button), or the button again.
- While open: `document.body.style.overflow = 'hidden'` (prevents background scroll).
- Purely presentational split from CSS: the bars→X icon morph is driven entirely by the `[aria-expanded="true"]` CSS selector (§ style.css lines ~305–313), not a JS-added class.
- Only relevant/visible ≤970px (`.hero-hamburger` is `display:none` above that, and `.mobile-menu.open` is force-hidden ≥971px regardless of state — see §1 table).

### Scroll reveal
- `IntersectionObserver`, threshold `0.1`, applied to every `.reveal` / `.reveal-left` / `.reveal-right` element on the page.
- On intersect: computes the element's index among its `.reveal*` siblings within the same parent and staggers the `.in` class add by `index * 80ms`.
- Each element is `unobserve`d after first reveal (fires once, doesn't re-hide on scroll-out).
- Entire behavior is skipped (script returns early) if `prefers-reduced-motion: reduce` — matching the CSS's own reduced-motion override that shows everything at full opacity with no transition.

### Booking modal
- Trigger: any element with `[data-booking-trigger]` (the hero, Coaching Options, and CTA band "assessment" buttons — 3 total; the modal's own submit button is inside the modal, not a trigger). All three share the exact same visible label, "Schedule my free assessment" — keep them in sync if the label ever changes; nothing derives one from another.
- `open()`: `preventDefault()`s the link's native `mailto:` navigation, stores `document.activeElement` to restore focus later, adds `.open` + `aria-hidden="false"`, locks body scroll, focuses the form's first field.
- Close via: overlay click, the × button (`[data-booking-close]`), or `Escape`. Restores focus to whatever triggered the open.
- Fields: Name / Email / Phone (all `required`), then Preferred coaching option (`<select class="form-input form-select">` — In-Person / Online / Hybrid), Primary fitness goal, Previous injuries or limitations (optional), Preferred training days and times (optional). The three required fields are always in the mailto body; the four non-required fields (coaching option through schedule) are appended only if filled in — each `if (value) lines.push(...)` in the submit handler, so an empty optional field is silently omitted rather than showing an empty line.
- Submit: `reportValidity()` gate first (native HTML5 validation on the three required fields) → builds a `Subject: Free assessment request — {name}` + plaintext labeled body from whichever fields are filled → sets `window.location.href` to a `mailto:eric@ericnievescoaching.com` link (this is the entire "backend" — no server, no form service) → shows `#booking-form-confirmation`, resets the form, scrolls the confirmation into view.
- No-JS fallback: every trigger keeps a real `mailto:` `href` so the CTA still works if the script fails to load (see README §"Booking / contact flow"). On top of that, `.booking-modal-email` is a persistent, always-visible (not conditional on submit) selectable email line right under the modal heading — a fallback for visitors whose device has no mail client at all, not just no-JS.
- To repoint where submissions go, the address is hardcoded in several places: the `mailto:` template literal in the submit handler, each trigger's static `href`, the footer's `mailto:` link, and `.booking-modal-email`'s `href`/text. The confirmation message itself no longer contains the email (see below) — it's a pure status message now.
