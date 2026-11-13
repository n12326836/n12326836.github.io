/* Joy Sun portfolio: small, progressive enhancements only.
   The page is complete without this file. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav hairline once the page scrolls
  var nav = document.querySelector('.site-nav');
  function onScrollNav() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  document.documentElement.classList.add('js');

  // Reveal sections as they enter the viewport
  var revealed = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealed.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  }

  // Process steps light up one by one as the section scrolls through
  var steps = document.querySelector('.steps');
  var stepItems = steps ? steps.querySelectorAll('.step') : [];
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    if (steps) {
      var r = steps.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
      steps.style.setProperty('--p', p.toFixed(3));
      stepItems.forEach(function (s, i) { s.classList.toggle('lit', p >= i / (stepItems.length - 1) - 0.001); });
    }
  }
  if (reduce) {
    if (steps) { steps.style.setProperty('--p', 1); stepItems.forEach(function (s) { s.classList.add('lit'); }); }
  } else {
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
