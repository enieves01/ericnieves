# Eric Nieves Coaching — Website

Marketing site for Eric Nieves, personal trainer in the Lake Norman area of Charlotte, NC. Static HTML/CSS/JS — no build step, no framework. Deploys to Vercel or Netlify as-is.

---

## File structure

```
eric-nieves-coaching/
├── assets/                 ← Drop logo & photo files here (see below)
├── index.html              ← Home page
├── schedule.html           ← Book a session
├── contact.html            ← Contact form
├── style.css               ← All styles + CSS variables (shared)
├── main.js                 ← Hamburger nav, scroll reveal, contact form (shared)
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
| `assets/logo-header.png` | Sticky header on every page |
| `assets/logo-stacked.png` | Footer on every page |
| `assets/logo-circle.png` | Spare (not currently placed) |
| `assets/portrait-hero.jpg` | Hero section on the home page |
| `assets/portrait-about.jpg` | About section on the home page |

Each `<img>` has an `onerror` fallback that shows a text version of the logo if the image file is missing, so the site is fully functional before assets are added.

---

## Wiring up the contact form

The form in `contact.html` is currently front-end only — it shows a confirmation message but doesn't send data anywhere. The full TODO comment is in `contact.html` above the `<form>` tag. Short version:

**Formspree (easiest):**
1. Create a form at [formspree.io](https://formspree.io) (free tier available).
2. Replace `action="#"` on the form with your Formspree endpoint.
3. Change `method` to `POST`.
4. Remove or update the `e.preventDefault()` in `main.js`.

**Netlify Forms (if hosting on Netlify):**
1. Add `netlify` attribute to the `<form>` tag.
2. Add `<input type="hidden" name="form-name" value="contact">`.
3. Netlify picks it up automatically on deploy — no backend code needed.

---

## Adding the Square booking calendar

The booking box in `schedule.html` holds a placeholder until Square Appointments is connected. The full comment block with both embed formats is inside `schedule.html` — search for `TODO: SQUARE APPOINTMENTS EMBED`.

**If you're on a paid Square Appointments plan**, paste the widget script or iframe where indicated.

**If you're on the free plan**, update the `href` on the "Open booking page" button to your Square-hosted booking URL:
```
https://book.squareup.com/appointments/YOUR_BOOKING_LINK/location/YOUR_LOCATION_ID/services
```
Find this URL in Square Dashboard → Appointments → Online Booking → Booking Website.

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
- **Fonts:** loaded from Google Fonts — Saira Condensed (display), Oswald (labels/nav), Inter (body).
- **Scroll animations:** `IntersectionObserver` adds `.in` to `.reveal` / `.reveal-left` / `.reveal-right` elements. Automatically disabled when `prefers-reduced-motion` is set.
- **Mobile breakpoints:** hamburger nav activates at `≤768px`; portrait images hide at `≤768px`; two-column layouts collapse at `≤960px`.
