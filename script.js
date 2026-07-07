// ---------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------
// Parallax scrolling
// Elements with [data-speed] shift vertically at a fraction
// of scroll speed, creating layered depth. Runs on rAF for
// smooth performance and is skipped for reduced-motion users.
// ---------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const parallaxEls = Array.from(document.querySelectorAll('[data-speed]'));

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.2;
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollY;

      // Only animate elements near the viewport for performance
      if (rect.top < viewportH * 1.5 && rect.bottom > -viewportH * 0.5) {
        const offset = (scrollY - elTop) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateParallax();
}

// ---------------------------------------------------------
// Contact form
// Note: this form posts via a mailto: action, which opens the
// visitor's email client rather than submitting silently. For
// a fully in-page submission, connect this form to a backend
// or a service like Formspree and change the <form action>.
// ---------------------------------------------------------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm && formNote) {
  contactForm.addEventListener('submit', () => {
    formNote.textContent = 'Opening your email client to send this request…';
  });
}
