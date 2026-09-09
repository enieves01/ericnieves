/* ============================================================
   MAIN.JS — site interactions only
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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      close();
      button.focus();
    }
  });
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
        ? [...parent.children].filter(element => element.matches(selector))
        : [entry.target];
      const index = siblings.indexOf(entry.target);

      setTimeout(() => entry.target.classList.add('in'), Math.max(0, index) * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(element => observer.observe(element));
})();

/* --- Assessment request modal + Netlify Forms -------------- */
;(function () {
  const modal = document.getElementById('booking-modal');
  const form = document.getElementById('booking-form');
  const triggers = document.querySelectorAll('[data-booking-trigger]');
  if (!modal || !form || !triggers.length) return;

  const heading = document.getElementById('booking-modal-heading');
  const intro = modal.querySelector('.booking-modal-email');
  const closers = modal.querySelectorAll('[data-booking-close]');
  let lastFocused = null;

  if (heading) heading.textContent = 'Request a free assessment';
  if (intro) {
    intro.textContent = 'Tell me a little about where you’re starting and what you’d like to improve. I’ll follow up to schedule your free assessment and figure out the right next step.';
  }

  form.setAttribute('name', 'assessment-request');
  form.setAttribute('method', 'POST');
  form.setAttribute('data-netlify', 'true');
  form.setAttribute('netlify-honeypot', 'bot-field');
  form.setAttribute('aria-label', 'Request a free assessment');

  form.innerHTML = `
    <input type="hidden" name="form-name" value="assessment-request">
    <input type="hidden" name="subject" value="New free assessment request from Eric Nieves Coaching">
    <p class="sr-only">
      <label>Don’t fill this out if you’re human: <input name="bot-field"></label>
    </p>

    <div class="form-group">
      <label class="form-label" for="booking-name">Name <span aria-hidden="true">*</span></label>
      <input class="form-input" type="text" id="booking-name" name="name" autocomplete="name" placeholder="Your name" required>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label" for="booking-email">Email</label>
        <input class="form-input" type="email" id="booking-email" name="email" autocomplete="email" placeholder="you@email.com">
      </div>
      <div class="form-group">
        <label class="form-label" for="booking-phone">Phone</label>
        <input class="form-input" type="tel" id="booking-phone" name="phone" autocomplete="tel" placeholder="(555) 555-5555">
      </div>
    </div>

    <p class="booking-contact-note" id="booking-contact-note">Please provide an email address or phone number so I can follow up.</p>

    <div class="form-group">
      <label class="form-label" for="booking-coaching-option">Interested in <span aria-hidden="true">*</span></label>
      <select class="form-input form-select" id="booking-coaching-option" name="coaching_option" required>
        <option value="" selected disabled>Select an option</option>
        <option value="In-Person">In-person coaching</option>
        <option value="Online">Online coaching</option>
        <option value="Not sure">Not sure yet</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="booking-goals">What are you hoping to work on? <span aria-hidden="true">*</span></label>
      <textarea class="form-input" id="booking-goals" name="goals" rows="4" placeholder="A sentence or two is plenty." required></textarea>
    </div>

    <div class="form-submit-row">
      <button type="submit" class="btn btn-red btn-skew" id="booking-submit">
        <span class="btn-label">Request free assessment <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      </button>
    </div>

    <div id="booking-form-confirmation" class="form-confirmation" role="status" aria-live="polite"></div>
  `;

  const confirmation = document.getElementById('booking-form-confirmation');
  const emailField = document.getElementById('booking-email');
  const phoneField = document.getElementById('booking-phone');
  const submitButton = document.getElementById('booking-submit');

  function validateContact() {
    const hasContact = emailField.value.trim() || phoneField.value.trim();
    const message = hasContact ? '' : 'Please enter an email address or phone number.';
    emailField.setCustomValidity(message);
    phoneField.setCustomValidity(message);
    return Boolean(hasContact);
  }

  [emailField, phoneField].forEach(field => {
    field.addEventListener('input', () => {
      emailField.setCustomValidity('');
      phoneField.setCustomValidity('');
    });
  });

  function open(event) {
    event.preventDefault();
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    confirmation.classList.remove('visible');
    confirmation.textContent = '';

    const firstField = form.querySelector('input:not([type="hidden"])');
    if (firstField) firstField.focus();
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(trigger => trigger.addEventListener('click', open));
  closers.forEach(element => element.addEventListener('click', close));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) close();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    validateContact();
    if (!form.reportValidity()) return;

    const originalLabel = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="btn-label">Sending…</span>';
    confirmation.classList.remove('visible');
    confirmation.textContent = '';

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      form.reset();
      confirmation.textContent = 'Thanks — your request was sent. I’ll be in touch to schedule your free assessment.';
      confirmation.classList.add('visible');
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error(error);
      confirmation.innerHTML = 'Something went wrong while sending your request. Please email <a href="mailto:eric@ericnievescoaching.com">eric@ericnievescoaching.com</a> directly.';
      confirmation.classList.add('visible');
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalLabel;
    }
  });
})();
