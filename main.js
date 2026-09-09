/* ============================================================
   MAIN.JS
   ============================================================ */

/* --- Hamburger / mobile menu -------------------------------- */
;(function () {
  const button = document.querySelector('.hero-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!button || !menu) return;

  function close() {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      close();
    } else {
      button.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      close();
      button.focus();
    }
  });
})();

/* --- Phase 2 audience + coaching-system refinement ----------- */
;(function () {
  const style = document.createElement('style');
  style.id = 'phase-2-audience-polish';
  style.textContent = `
    .btn[data-booking-trigger] {
      min-height: 56px;
      padding: 1.02rem 2.35rem;
      font-size: 0.9rem;
      letter-spacing: 0.105em;
    }
    .btn-red[data-booking-trigger] {
      box-shadow: 0 10px 30px rgba(193,39,45,.24), 0 0 0 1px rgba(255,255,255,.07);
    }
    .btn-white[data-booking-trigger] {
      box-shadow: 0 10px 28px rgba(0,0,0,.22), 0 0 0 1px rgba(255,255,255,.16);
    }
    .btn[data-booking-trigger]:hover {
      box-shadow: 0 14px 34px rgba(0,0,0,.22), 0 0 0 1px rgba(255,255,255,.12);
    }

    .fit-strip { padding-block: clamp(2.25rem, 4.5vw, 3.4rem); }
    .fit-strip-inner { display: block; }
    .fit-strip-label {
      display: block;
      margin-bottom: 1.35rem;
      font-size: clamp(1.75rem, 3.5vw, 2.5rem);
      line-height: .95;
    }
    .fit-strip-items {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: .75rem;
      width: 100%;
    }
    .fit-chip {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 82px;
      padding: 1.05rem .9rem;
      overflow: hidden;
      border-radius: 6px;
      background: rgba(10,10,11,.34);
      border: 1px solid rgba(255,255,255,.13);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 8px 22px rgba(0,0,0,.08);
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: clamp(.92rem, 1.25vw, 1.05rem);
      line-height: 1.28;
      text-transform: uppercase;
      text-align: center;
      letter-spacing: .055em;
      color: var(--ink);
      transition: transform var(--ease), background var(--ease), border-color var(--ease);
    }
    .fit-chip::before {
      position: absolute;
      top: .42rem;
      left: .58rem;
      font-family: 'Tomorrow', sans-serif;
      font-style: italic;
      font-weight: 900;
      font-size: .67rem;
      letter-spacing: .06em;
      color: rgba(255,255,255,.36);
    }
    .fit-chip:nth-child(1)::before { content: '01'; }
    .fit-chip:nth-child(2)::before { content: '02'; }
    .fit-chip:nth-child(3)::before { content: '03'; }
    .fit-chip:nth-child(4)::before { content: '04'; }
    .fit-chip:nth-child(5)::before { content: '05'; }
    .fit-chip::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: rgba(255,255,255,.18);
      transform: scaleX(.28);
      transform-origin: center;
      transition: transform var(--ease), background var(--ease);
    }
    .fit-chip:hover {
      transform: translateY(-2px);
      background: rgba(10,10,11,.44);
      border-color: rgba(255,255,255,.24);
    }
    .fit-chip:hover::after {
      transform: scaleX(.72);
      background: rgba(255,255,255,.52);
    }

    .program-scope {
      max-width: 1040px;
      margin: clamp(2.2rem, 5vw, 3.5rem) auto 0;
      padding: clamp(1.5rem, 3vw, 2rem);
      border: 1px solid var(--line);
      border-radius: 5px;
      background: linear-gradient(120deg, rgba(193,39,45,.09), transparent 35%), #101012;
    }
    .program-scope-head {
      display: grid;
      grid-template-columns: minmax(0, .85fr) minmax(300px, 1.15fr);
      gap: 1.5rem 2.5rem;
      align-items: end;
      margin-bottom: 1.6rem;
    }
    .program-scope-kicker {
      display: block;
      margin-bottom: .65rem;
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: .7rem;
      text-transform: uppercase;
      letter-spacing: .17em;
      color: var(--red-bright);
    }
    .program-scope-title {
      font-family: 'Tomorrow', sans-serif;
      font-style: italic;
      font-weight: 800;
      font-size: clamp(1.65rem, 3.2vw, 2.25rem);
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: -.02em;
    }
    .program-scope-copy {
      color: var(--body-text);
      font-size: .98rem;
      line-height: 1.7;
      max-width: 39rem;
      justify-self: end;
    }
    .program-pillars {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: .7rem;
    }
    .program-pillar {
      min-height: 128px;
      padding: 1rem;
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 4px;
      background: rgba(255,255,255,.035);
    }
    .program-pillar-num {
      display: block;
      margin-bottom: .65rem;
      font-family: 'Tomorrow', sans-serif;
      font-style: italic;
      font-weight: 900;
      font-size: 1.05rem;
      color: var(--red-bright);
    }
    .program-pillar-title {
      display: block;
      margin-bottom: .35rem;
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: .86rem;
      text-transform: uppercase;
      letter-spacing: .07em;
      color: var(--ink);
    }
    .program-pillar-copy {
      font-size: .78rem;
      line-height: 1.55;
      color: rgba(255,255,255,.58);
    }

    .process .section-headline-2 {
      font-size: clamp(2.8rem, 5.7vw, 4rem);
      margin-bottom: 1.15rem;
    }
    .process > .container > .section-intro {
      max-width: 45rem;
      font-size: clamp(1rem, 1.5vw, 1.12rem);
      line-height: 1.7;
    }
    .process .process-grid { gap: 1.15rem; }
    .process .process-card {
      padding: 0;
      min-height: 390px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: rgba(18,18,20,.37);
    }
    .process-photo {
      position: relative;
      height: 155px;
      overflow: hidden;
      background: #18181b;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .process-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(.28) contrast(1.04) brightness(.82);
      transform: scale(1.02);
    }
    .process-photo--assess img { object-position: center 48%; }
    .process-photo--plan img { object-position: center 28%; }
    .process-photo--coach img { object-position: center 24%; }
    .process-photo::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10,10,11,.02), rgba(10,10,11,.5));
      pointer-events: none;
    }
    .process-photo-label {
      position: absolute;
      z-index: 1;
      left: 1rem;
      bottom: .85rem;
      font-family: 'Oswald', sans-serif;
      font-size: .68rem;
      font-weight: 600;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(255,255,255,.85);
    }
    .process-copy {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1.35rem 1.45rem 1.5rem;
    }
    .process .process-num {
      margin-bottom: .7rem;
      font-size: 2.45rem;
      line-height: .9;
    }
    .process .process-title {
      margin-bottom: .7rem;
      font-size: 1.28rem;
      letter-spacing: .075em;
    }
    .process .process-body {
      font-size: 1rem;
      line-height: 1.66;
    }

    @media (max-width: 960px) {
      .fit-strip-items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .fit-chip:last-child { grid-column: 1 / -1; }
      .program-scope-head { grid-template-columns: 1fr; }
      .program-scope-copy { justify-self: start; }
      .program-pillars { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .btn[data-booking-trigger] {
        width: 100%;
        min-height: 58px;
        padding-inline: 1.2rem;
      }
      .fit-strip-items { grid-template-columns: 1fr; }
      .fit-chip,
      .fit-chip:last-child {
        grid-column: auto;
        width: 100%;
        min-height: 64px;
      }
      .program-pillars { grid-template-columns: 1fr; }
      .program-pillar { min-height: auto; }
      .process .process-card { min-height: auto; }
      .process-photo { height: 175px; }
    }
  `;
  document.head.appendChild(style);

  const heroIntro = document.querySelector('.hero-support .section-intro');
  if (heroIntro) {
    heroIntro.textContent = 'Personalized coaching for adults who want to rebuild strength, move with confidence, and stay capable with age. Come join the personal training studio -- either in Lake Norman or online.';
  }

  const fitLabel = document.querySelector('.fit-strip-label');
  if (fitLabel) fitLabel.textContent = 'Coaching for...';

  const fitItems = document.querySelector('.fit-strip-items');
  if (fitItems) {
    const audiences = [
      'Strength After 55',
      'Getting Back Into Exercise',
      'Balance & Stability',
      'Training Around Past Injuries',
      'Active & Performance Goals'
    ];
    fitItems.innerHTML = audiences.map(item => `<span class="fit-chip">${item}</span>`).join('');
  }

  /* The old coaching intro repeated the same positioning now covered by
     the audience strip and the whole-week coaching block, so remove it. */
  const coachingIntro = document.querySelector('.coaching-options .section-lead .section-intro');
  if (coachingIntro) coachingIntro.remove();

  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards[0]) {
    const body = serviceCards[0].querySelector('.who-card-body');
    const points = serviceCards[0].querySelector('.service-points');
    if (body) body.textContent = 'Private one-on-one coaching for adults who want to get stronger, move with more confidence, and build a routine they can keep. Sessions are scaled to your current ability, training history, and previous injuries.';
    if (points) points.innerHTML = [
      'Strength Training', 'Movement Quality', 'Balance & Confidence', 'Individual Progression'
    ].map(item => `<span class="service-point">${item}</span>`).join('');
  }
  if (serviceCards[1]) {
    const body = serviceCards[1].querySelector('.who-card-body');
    const points = serviceCards[1].querySelector('.service-points');
    if (body) body.textContent = 'A structured plan for training on your own with personalized programming, exercise demonstrations, form review, check-ins, and guidance for the habits that support your progress outside the gym.';
    if (points) points.innerHTML = [
      'Programming', 'Form Review', 'Cardio Guidance', 'Nutrition Support'
    ].map(item => `<span class="service-point">${item}</span>`).join('');
  }

  const coachingCta = document.querySelector('.coaching-options-cta');
  if (coachingCta && !document.querySelector('.program-scope')) {
    const scope = document.createElement('div');
    scope.className = 'program-scope reveal';
    scope.innerHTML = `
      <div class="program-scope-head">
        <div>
          <span class="program-scope-kicker">More than a workout plan</span>
          <h3 class="program-scope-title">Coaching for the whole week</h3>
        </div>
        <p class="program-scope-copy">Strength training is the anchor. Your coaching can also include practical nutrition consultation, home mobility work, and cardio education so the rest of your week supports the work we do in the gym.</p>
      </div>
      <div class="program-pillars" aria-label="Coaching program components">
        <div class="program-pillar">
          <span class="program-pillar-num">01</span>
          <span class="program-pillar-title">Strength</span>
          <span class="program-pillar-copy">Progressive resistance training built around your ability, goals, and experience.</span>
        </div>
        <div class="program-pillar">
          <span class="program-pillar-num">02</span>
          <span class="program-pillar-title">Home Mobility</span>
          <span class="program-pillar-copy">Simple mobility and movement work you can use between sessions at home.</span>
        </div>
        <div class="program-pillar">
          <span class="program-pillar-num">03</span>
          <span class="program-pillar-title">Cardio Education</span>
          <span class="program-pillar-copy">Learn how to use intensity, pacing, and weekly cardio to build useful fitness.</span>
        </div>
        <div class="program-pillar">
          <span class="program-pillar-num">04</span>
          <span class="program-pillar-title">Nutrition Consultation</span>
          <span class="program-pillar-copy">Practical guidance for protein, meal structure, energy intake, and sustainable habits.</span>
        </div>
      </div>
    `;
    coachingCta.before(scope);
  }

  const processIntro = document.querySelector('.process > .container > .section-intro');
  if (processIntro) {
    processIntro.textContent = 'No need to already be “in shape.” We establish your starting point, build a realistic plan, and progress it as your strength, confidence, and fitness improve.';
  }

  const processCards = document.querySelectorAll('.process .process-card');
  const processData = [
    {
      title: 'Assess',
      body: 'We learn your goals, training history, previous injuries, current routine, and movement needs so the plan starts at the right level.',
      image: 'assets/hero-photo-band-small.jpg',
      className: 'assess',
      label: 'Starting point & movement'
    },
    {
      title: 'Plan',
      body: 'Your strength work, home mobility, cardio, and nutrition priorities are organized into a realistic plan that fits your week.',
      image: 'assets/mobile-hero-photo.png',
      className: 'plan',
      label: 'Personalized programming'
    },
    {
      title: 'Coach',
      body: 'We practice, progress, and adjust. You learn what you are doing and why so you become more confident and capable over time.',
      image: 'assets/about-photo-wedge.png',
      className: 'coach',
      label: 'Hands-on guidance'
    }
  ];

  processCards.forEach((card, index) => {
    const data = processData[index];
    if (!data) return;

    const title = card.querySelector('.process-title');
    const body = card.querySelector('.process-body');
    if (title) title.textContent = data.title;
    if (body) body.textContent = data.body;

    if (!card.querySelector('.process-photo')) {
      const existingChildren = Array.from(card.children);
      const photo = document.createElement('div');
      photo.className = `process-photo process-photo--${data.className}`;
      photo.setAttribute('aria-hidden', 'true');
      photo.innerHTML = `<img src="${data.image}" alt=""><span class="process-photo-label">${data.label}</span>`;

      const copy = document.createElement('div');
      copy.className = 'process-copy';
      existingChildren.forEach(child => copy.appendChild(child));
      card.append(photo, copy);
    }
  });

  const aboutLead = document.querySelector('.about .section-lead .section-intro');
  if (aboutLead) {
    aboutLead.textContent = 'Especially focused on helping adults 55+ and people returning to exercise build the strength and physical capacity to keep doing more—not less.';
  }

  const aboutParagraphs = document.querySelectorAll('.about-body p');
  if (aboutParagraphs[0]) {
    aboutParagraphs[0].textContent = 'I’m Eric Nieves, a NASM Certified Personal Trainer. I help adults build strength, move better, and return to consistent exercise with confidence. My approach also accounts for past injuries and individual movement limitations.';
  }
  if (aboutParagraphs[1]) {
    aboutParagraphs[1].textContent = 'With a B.S. in Biology and experience in rehabilitation-focused settings, I connect movement quality with effective strength and fitness training. Coaching can extend beyond the session with home mobility work, cardio education, and practical nutrition guidance so you have a plan for the whole week—not just the hour we train.';
  }

  const socialHeading = document.getElementById('social-heading');
  if (socialHeading) socialHeading.textContent = 'A View Inside My Coaching';

  const socialIntro = document.querySelector('.social-header-copy .section-intro');
  if (socialIntro) {
    socialIntro.textContent = 'Follow me on Instagram to stay updated with training clips, coaching ideas, exercise breakdowns, and the work behind the program.';
  }

  const faqIntro = document.querySelector('.faq-intro');
  if (faqIntro) faqIntro.remove();

  const faqList = document.querySelector('.faq-list');
  if (faqList && !document.getElementById('faq-complete-program')) {
    const item = document.createElement('details');
    item.className = 'faq-item';
    item.id = 'faq-complete-program';
    item.innerHTML = `
      <summary class="faq-question">
        Is coaching only strength training?
        <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </summary>
      <p class="faq-answer">Strength training is the foundation, but coaching can also include home mobility work, cardiovascular education and programming, and practical nutrition consultation based on your goals and needs.</p>
    `;
    faqList.appendChild(item);
  }

  const ctaSub = document.querySelector('.cta-band-sub');
  if (ctaSub) {
    ctaSub.textContent = 'We’ll talk through your goals, current ability, training history, and what you want to be able to do more confidently. Then we’ll map out the right next step.';
  }
})();

/* --- Scroll reveal ------------------------------------------ */
;(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = '.reveal, .reveal-left, .reveal-right';
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const parent = entry.target.parentElement;
      const siblings = parent
        ? [...parent.children].filter(el => el.matches(selector))
        : [entry.target];
      const idx = siblings.indexOf(entry.target);

      setTimeout(() => entry.target.classList.add('in'), Math.max(0, idx) * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();

/* --- Booking modal ----------------------------------------- */
;(function () {
  const modal = document.getElementById('booking-modal');
  const form = document.getElementById('booking-form');
  const confirmation = document.getElementById('booking-form-confirmation');
  const triggers = document.querySelectorAll('[data-booking-trigger]');
  if (!modal || !form || !triggers.length) return;

  const closers = modal.querySelectorAll('[data-booking-close]');
  let lastFocused = null;

  function open(e) {
    e.preventDefault();
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstField = form.querySelector('input, textarea');
    if (firstField) firstField.focus();
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(trigger => trigger.addEventListener('click', open));
  closers.forEach(el => el.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.querySelector('#booking-name').value.trim();
    const email = form.querySelector('#booking-email').value.trim();
    const phone = form.querySelector('#booking-phone').value.trim();
    const coachingOption = form.querySelector('#booking-coaching-option').value.trim();
    const goal = form.querySelector('#booking-goal').value.trim();
    const injuries = form.querySelector('#booking-injuries').value.trim();
    const schedule = form.querySelector('#booking-schedule').value.trim();

    const subject = `Free assessment request — ${name}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`
    ];
    if (coachingOption) lines.push(`Preferred coaching option: ${coachingOption}`);
    if (goal) lines.push(`Primary fitness goal: ${goal}`);
    if (injuries) lines.push(`Previous injuries or limitations: ${injuries}`);
    if (schedule) lines.push(`Preferred training days and times: ${schedule}`);

    const mailto = `mailto:eric@ericnievescoaching.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = mailto;
    confirmation.classList.add('visible');
    form.reset();
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();