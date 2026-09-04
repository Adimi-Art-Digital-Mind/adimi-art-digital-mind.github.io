/* Scroll reveal for Adimi landing page.
   Adds a gentle fade + slide-up as elements enter the viewport.
   Respects prefers-reduced-motion and falls back gracefully. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements to animate in on scroll
  var selectors = [
    '.eyebrow', 'h2.title', '.lead', '.callout',
    '.card', '.pill', '.hero-visual', '.video-box',
    '.contact-card', '.subhead'
  ];
  var els = document.querySelectorAll(selectors.join(','));

  if (reduce || !('IntersectionObserver' in window)) {
    // No animation: show everything immediately
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  els.forEach(function (el) {
    el.classList.add('reveal');
    // Gentle cascade for cards/pills sharing a grid row
    var parent = el.parentElement;
    if (parent && (el.classList.contains('card') || el.classList.contains('pill'))) {
      var idx = Array.prototype.indexOf.call(parent.children, el) % 3;
      if (idx > 0) el.classList.add('reveal-delay-' + idx);
    }
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (el) { io.observe(el); });
})();

/* Mobile navigation toggle (independent of scroll-reveal). */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  function open() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) { close(); } else { open(); }
  });

  // Close after choosing a destination
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') close();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Reset when resizing up to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) close();
  });
})();
