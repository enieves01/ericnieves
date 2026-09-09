# Eric Nieves Coaching — Website

Marketing site for Eric Nieves, personal trainer in the Lake Norman area of Charlotte, NC. Single-page static HTML/CSS/JS — no build step, no framework. Deploys to Vercel or Netlify as-is.

---

## Positioning

Primary audience: adults 55+ and people returning to structured exercise after time away, while keeping the offer broad enough for general strength, fitness, and performance goals.

The coaching offer is intentionally broader than a workout program. Strength training is the anchor, with support that may also include home mobility work, cardio education/programming, and practical nutrition consultation.

---

## File structure

```
eric-nieves-coaching/
├── assets/                 ← Logo & photo files
├── index.html              ← Homepage
├── assessment.html         ← Assessment information page
├── links.html              ← Link-in-bio page
├── style.css               ← Shared styles + CSS variables
├── main.js                 ← Navigation, homepage refinements, scroll reveal, booking modal
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

## Homepage redesign branch notes

The `homepage-simplification` branch contains the current redesign work. It includes:

- Concise homepage messaging and fewer redundant sections
- Stronger 55+ / returning-to-exercise positioning without excluding broader audiences
- Larger assessment CTAs
- Two primary coaching offers: in-person and online
- A four-pillar coaching-system block: Strength, Home Mobility, Cardio Education, Nutrition Consultation
- A visual Assess → Plan → Coach process with temporary existing site imagery ready to be replaced by purpose-shot photos
- Headshot-ready About section
- Hidden testimonials/results shell for future approved client proof
- Instagram-ready social section for a future feed integration

Once the design is approved, the temporary redesign CSS/DOM refinements should be consolidated out of `index.html` / `main.js` into the shared stylesheet and semantic page markup.

---

## Adding/replacing photo assets

Current redesign uses existing images as placeholders in several places. Future photo priorities:

1. Professional gym headshot for About
2. Assessment / movement-screen photo
3. Programming / plan-building photo
4. Coaching / exercise-instruction photo
5. Client/training photos for testimonials and results

Keep filenames stable where possible or update references in `index.html` / `main.js`.

---

## Booking / contact flow

Every assessment CTA (`[data-booking-trigger]`) opens a modal (`#booking-modal` in `index.html`, logic in `main.js`) instead of navigating away. The current implementation builds a `mailto:` link from the form fields and opens the visitor's own email app addressed to `eric@ericnievescoaching.com`.

This is a lead-request flow, not live calendar scheduling and not a server-side form submission.

---

## Deploying

### Vercel
```bash
npx vercel
```
Select "no framework" when prompted.

### Netlify
```bash
npx netlify-cli deploy --prod --dir .
```

---

## Brand & design notes

- **Colors:** CSS variables in `:root` inside `style.css`; primary accent is red.
- **Fonts:** Google Fonts — Tomorrow (display/headlines), Saira Condensed (secondary display), Oswald (labels/nav), Inter (body).
- **Scroll animations:** `IntersectionObserver` adds `.in` to reveal elements and respects `prefers-reduced-motion`.
- **Mobile:** responsive layouts collapse service/process/social grids and expand primary assessment CTAs for easier tapping.
