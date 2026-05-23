/* =============================================================
   THE 8TH HOUSE — Cinematic Interactions
   ============================================================= */

(function () {
  'use strict';

  /* ── PRELOADER ────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');

  function dismissPreloader () {
    if (!preloader) return;
    preloader.classList.add('out');
    document.body.classList.remove('is-loading');
    document.querySelector('.hero')?.classList.add('ready');
  }

  // dismiss after bar animation (~2 s) or on window load, whichever is later
  let loaded = false;
  let timerDone = false;

  window.addEventListener('load', function () {
    loaded = true;
    if (timerDone) dismissPreloader();
  });

  setTimeout(function () {
    timerDone = true;
    if (loaded) dismissPreloader();
  }, 2000);

  // absolute fallback
  setTimeout(dismissPreloader, 3800);


  /* ── CUSTOM CURSOR ────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (cursor && ring && window.matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rafId;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function trackRing () {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(trackRing);
    })();

    const hovEls = document.querySelectorAll(
      'a, button, .g-cell, .svc-card, .btn'
    );

    hovEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('is-hov');
        ring.classList.add('is-hov');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-hov');
        ring.classList.remove('is-hov');
      });
    });
  }


  /* ── NAVIGATION ───────────────────────────────────────────── */
  const nav       = document.getElementById('nav');
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 72);
    }, { passive: true });
  }

  if (toggle && mobileNav) {
    let open = false;
    const spans = toggle.querySelectorAll('span');

    function setMenu (state) {
      open = state;
      mobileNav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    }

    toggle.addEventListener('click', function () { setMenu(!open); });

    mobileNav.querySelectorAll('.mobile-nav__link').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
  }


  /* ── SMOOTH ANCHOR SCROLL ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id  = a.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ── INTERSECTION OBSERVER: REVEAL ───────────────────────── */
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.js-reveal, .js-reveal-img').forEach(function (el) {
    revealObs.observe(el);
  });

  // Auto-add reveal to text-block containers not yet tagged
  [
    '.about__copy',
    '.invest__copy',
    '.owners__copy',
    '.gallery__hd',
    '.services__hd',
    '.stats__eyebrow',
  ].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.classList.contains('js-reveal')) {
        el.classList.add('js-reveal');
        revealObs.observe(el);
      }
    });
  });


  /* ── COUNTER ANIMATION ────────────────────────────────────── */
  const countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-to'), 10);
      const dur    = 1900;
      const start  = performance.now();

      function step (now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }

      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.js-count').forEach(function (el) {
    countObs.observe(el);
  });


  /* ── HERO PARALLAX ────────────────────────────────────────── */
  const heroImg  = document.querySelector('.hero__img');
  const heroEl   = document.querySelector('.hero');

  if (heroImg && heroEl) {
    window.addEventListener('scroll', function () {
      const sy = window.scrollY;
      if (sy > heroEl.offsetHeight) return;
      heroImg.style.transform = 'scale(1) translateY(' + (sy * 0.28) + 'px)';
    }, { passive: true });
  }


  /* ── GALLERY — dim siblings on hover ─────────────────────── */
  const cells = document.querySelectorAll('.g-cell');
  cells.forEach(function (cell) {
    cell.addEventListener('mouseenter', function () {
      cells.forEach(function (c) {
        if (c !== cell) c.style.opacity = '.6';
      });
    });
    cell.addEventListener('mouseleave', function () {
      cells.forEach(function (c) { c.style.opacity = ''; });
    });
  });


  /* ── IMAGE LOAD FALLBACK ──────────────────────────────────── */
  // If an image fails to load, show a graceful colour fill
  document.querySelectorAll('img[src]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.opacity = '0';
    });
  });

})();
