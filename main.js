/* ============================================================
   MAIN.JS
   ============================================================ */

/* --- Hamburger / mobile menu ------------------------------------
   Toggles .open on #mobile-menu and aria-expanded on .hero-hamburger
   (the icon's bars-to-X morph is pure CSS, keyed off aria-expanded).
   Closes on Escape, on any menu link click, or the button itself.
---------------------------------------------------------------- */
;(function () {
  const button = document.querySelector('.hero-hamburger');
  const menu   = document.getElementById('mobile-menu');
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

/* --- Scroll reveal (IntersectionObserver) ---------------------
   Adds .in to .reveal / .reveal-left / .reveal-right elements
   when they enter the viewport. Siblings are staggered by 80ms.
   Skipped entirely when prefers-reduced-motion is set.
---------------------------------------------------------------- */
;(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = '.reveal, .reveal-left, .reveal-right';
  const targets   = document.querySelectorAll(selector);
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Compute stagger index among reveal siblings in the same parent
      const parent   = entry.target.parentElement;
      const siblings = parent
        ? [...parent.children].filter(el => el.matches(selector))
        : [entry.target];
      const idx = siblings.indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add('in');
      }, Math.max(0, idx) * 80);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();

/* --- Booking modal ---------------------------------------------
   Every "free assessment" CTA (marked with [data-booking-trigger])
   opens this modal. The href is left in place as a no-JS fallback
   (a plain mailto: link). Submitting builds a mailto: link from the
   form fields so the visitor's own email app sends the request
   straight to Eric; no backend required.
---------------------------------------------------------------- */
;(function () {
  const modal        = document.getElementById('booking-modal');
  const form         = document.getElementById('booking-form');
  const confirmation = document.getElementById('booking-form-confirmation');
  const triggers     = document.querySelectorAll('[data-booking-trigger]');
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

    const name           = form.querySelector('#booking-name').value.trim();
    const email          = form.querySelector('#booking-email').value.trim();
    const phone          = form.querySelector('#booking-phone').value.trim();
    const coachingOption = form.querySelector('#booking-coaching-option').value.trim();
    const goal           = form.querySelector('#booking-goal').value.trim();
    const injuries       = form.querySelector('#booking-injuries').value.trim();
    const schedule       = form.querySelector('#booking-schedule').value.trim();

    const subject = `Free assessment request — ${name}`;

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`
    ];
    if (coachingOption) lines.push(`Preferred coaching option: ${coachingOption}`);
    if (goal)           lines.push(`Primary fitness goal: ${goal}`);
    if (injuries)       lines.push(`Previous injuries or limitations: ${injuries}`);
    if (schedule)       lines.push(`Preferred training days and times: ${schedule}`);

    const body = lines.join('\n');

    const mailto = `mailto:eric@ericnievescoaching.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    confirmation.classList.add('visible');
    form.reset();
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
