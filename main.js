/* ============================================================
   MAIN.JS — shared across all pages
   ============================================================ */

/* --- Hamburger / mobile nav -----------------------------------
   Toggles .open on .mobile-nav and manages aria-expanded.
   Also closes on Escape key and on any link click.
---------------------------------------------------------------- */
;(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  function close() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      close();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      close();
      hamburger.focus();
    }
  });
})();

/* --- Active nav link ------------------------------------------
   Marks the link whose href matches the current page filename.
---------------------------------------------------------------- */
;(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0] || 'index.html';
    if (href === page) link.classList.add('active');
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

/* --- Contact form (front-end demo) ----------------------------
   Prevents default submit, shows a confirmation message, and
   resets the form. Wiring to a real backend is done separately
   (see comment in contact.html).
---------------------------------------------------------------- */
;(function () {
  const form         = document.getElementById('contact-form');
  const confirmation = document.getElementById('form-confirmation');
  if (!form || !confirmation) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    confirmation.classList.add('visible');
    form.reset();
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
