# Eric Nieves Coaching — Website

Marketing site for Eric Nieves, personal trainer in the Lake Norman area of Charlotte, NC. Single-page static HTML/CSS/JS — no build step, no framework. Deploys to Vercel or Netlify as-is.

---

## File structure

```
eric-nieves-coaching/
├── assets/                 ← Drop logo & photo files here (see below)
├── index.html              ← The entire site (one page)
├── style.css               ← All styles + CSS variables
├── main.js                 ← Scroll reveal, booking modal
└── README.md
```

---

## Preview locally

Open `index.html` in a browser directly, or use any static file server:

```bash
# Python (built-in)
python3 -m http.server 3000

# Node (if you have npx)
npx serve .

# VS Code: install the "Live Server" extension, right-click index.html → Open with Live Server
```

---

## Adding logo & photo assets

Drop the following files into `assets/`. The HTML already references these exact paths:

| File | Where it's used |
|---|---|
| `assets/logo-header.png` | Nav, inside the hero |
| `assets/logo-stacked.png` | Footer |
| `assets/logo-circle.png` | Spare (not currently placed) |
| `assets/portrait-hero.jpg` | Hero section on the home page |
| `assets/portrait-about.jpg` | About section on the home page |

Each `<img>` has an `onerror` fallback that shows a text version of the logo if the image file is missing, so the site is fully functional before assets are added.

---

## Booking / contact flow

Every "free assessment" CTA (`[data-booking-trigger]`) opens a modal (`#booking-modal` in `index.html`, logic in `main.js`) instead of navigating anywhere — a centered overlay above 768px, full-screen below it. Name, phone, email, and message go into a `mailto:` link built at submit time, which hands off to the visitor's own email app addressed to `eric@ericnievescoaching.com`. No backend, form service, or account signup required.

Each trigger keeps its `href` as a plain `mailto:` link too, so the CTA still works if JavaScript fails to load.

To point submissions somewhere else, change the address in the `mailto:` template literal inside the booking-modal `submit` handler in `main.js`.

---

## Deploying

### Vercel
```bash
npx vercel
```
Select "no framework" when prompted. Vercel serves static HTML/CSS/JS with no configuration needed.

### Netlify
Drag and drop the project folder onto [app.netlify.com](https://app.netlify.com), or:
```bash
npx netlify-cli deploy --prod --dir .
```

No `vercel.json` or `netlify.toml` is required for a plain static site.

---

## Brand & design notes

- **Colors:** defined as CSS variables in `:root` inside `style.css`. Change `--red` / `--red-bright` to tweak the crimson accent globally.
- **Fonts:** loaded from Google Fonts — Tomorrow (display/headlines), Saira Condensed (secondary display), Oswald (labels/nav), Inter (body).
- **Scroll animations:** `IntersectionObserver` adds `.in` to `.reveal` / `.reveal-left` / `.reveal-right` elements. Automatically disabled when `prefers-reduced-motion` is set.
- **Mobile breakpoints:** the hero's side photo reflows into a full-width band and the nav centers below `≤970px`; portrait images hide and two-column layouts collapse at `≤960px`; the booking modal goes full-screen at `≤768px`.
