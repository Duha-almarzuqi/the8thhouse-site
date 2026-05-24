(function () {
  'use strict';

  /* ── NAV SCROLL STATE ──────────────────────────────────────── */
  var nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  if (nav) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── MOBILE DRAWER ─────────────────────────────────────────── */
  var burger = document.getElementById('navBurger');
  var drawer = document.getElementById('drawer');

  if (burger && drawer) {
    var open = false;
    var spans = burger.querySelectorAll('span');

    function setDrawer(state) {
      open = state;
      drawer.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';

      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    }

    burger.addEventListener('click', function () { setDrawer(!open); });

    drawer.querySelectorAll('.drawer__link').forEach(function (link) {
      link.addEventListener('click', function () { setDrawer(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) setDrawer(false);
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = (nav ? nav.offsetHeight : 0) + 16;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEALS ────────────────────────────────────────── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.js-reveal, .js-reveal-img').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ── COUNTER ANIMATION ─────────────────────────────────────── */
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el      = entry.target;
      var target  = parseFloat(el.getAttribute('data-to'));
      var decimal = el.getAttribute('data-decimal') || '';
      var dur     = 1800;
      var start   = performance.now();

      function step(now) {
        var t    = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target) + decimal;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target + decimal;
      }

      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.js-count').forEach(function (el) {
    countObs.observe(el);
  });

  /* ── HERO READY STATE ──────────────────────────────────────── */
  var heroEl = document.querySelector('.hero');

  function activateHero() {
    if (heroEl) heroEl.classList.add('ready');
  }

  window.addEventListener('load', activateHero);
  setTimeout(activateHero, 1200);

  /* ── IMAGE ERROR FALLBACK ──────────────────────────────────── */
  document.querySelectorAll('img[src]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.opacity = '0';
    });
  });

})();
