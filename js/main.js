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

  /* ── LEAD MODAL ────────────────────────────────────────────── */
  var lm        = document.getElementById('leadModal');
  var lmOpen    = document.getElementById('openLead');
  var lmClose   = document.getElementById('lmClose');
  var lmOverlay = document.getElementById('lmOverlay');

  var contactInput = document.getElementById('lm-contact');
  var contactLabel = document.getElementById('lm-contact-label');

  var contactHints = {
    'واتساب': { label: 'رقم الواتساب', placeholder: '05xxxxxxxx' },
    'مكالمة': { label: 'رقم الجوال',   placeholder: '05xxxxxxxx' },
    'إيميل':  { label: 'البريد الإلكتروني', placeholder: 'example@email.com' }
  };

  function openModal() {
    if (!lm) return;
    lm.classList.add('open');
    lm.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { lm.querySelector('.lm__close').focus(); }, 50);
  }

  function closeModal() {
    if (!lm) return;
    lm.classList.remove('open');
    lm.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lmOpen) lmOpen.focus();
  }

  if (lmOpen)    lmOpen.addEventListener('click', openModal);
  if (lmClose)   lmClose.addEventListener('click', closeModal);
  if (lmOverlay) lmOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lm && lm.classList.contains('open')) closeModal();
  });

  /* ── NEIGHBOURHOOD SEARCHABLE DROPDOWN ────────────────────── */
  var nbhdWidget  = document.getElementById('nbhdWidget');
  var nbhdTrigger = document.getElementById('nbhdTrigger');
  var nbhdPanel   = document.getElementById('nbhdPanel');
  var nbhdSearch  = document.getElementById('nbhdSearch');
  var nbhdDisplay = document.getElementById('nbhdDisplay');
  var nbhdValInp  = document.getElementById('nbhd-val') || document.getElementById('lm-nbhd-val');
  var nbhdOpts    = nbhdPanel ? Array.from(nbhdPanel.querySelectorAll('.nbhd__opt')) : [];
  var nbhdEmpty   = nbhdPanel ? nbhdPanel.querySelector('.nbhd__empty') : null;

  function nbhdOpen() {
    if (!nbhdWidget) return;
    nbhdWidget.setAttribute('aria-expanded', 'true');
    setTimeout(function () { if (nbhdSearch) nbhdSearch.focus(); }, 30);
  }

  function nbhdClose() {
    if (!nbhdWidget) return;
    nbhdWidget.setAttribute('aria-expanded', 'false');
    if (nbhdSearch) nbhdSearch.value = '';
    nbhdFilter('');
  }

  function nbhdToggle() {
    nbhdWidget.getAttribute('aria-expanded') === 'true' ? nbhdClose() : nbhdOpen();
  }

  function nbhdFilter(q) {
    var query = q.trim();
    var anyVisible = false;
    nbhdOpts.forEach(function (opt) {
      var match = !query || opt.textContent.includes(query);
      opt.hidden = !match;
      if (match) anyVisible = true;
    });
    /* hide group headers with no visible children */
    var groups = nbhdPanel.querySelectorAll('.nbhd__group');
    groups.forEach(function (grp) {
      var next = grp.nextElementSibling;
      var hasVisible = false;
      while (next && !next.classList.contains('nbhd__group')) {
        if (!next.hidden && next.classList.contains('nbhd__opt')) hasVisible = true;
        next = next.nextElementSibling;
      }
      grp.hidden = !hasVisible;
    });
    if (nbhdEmpty) nbhdEmpty.hidden = anyVisible;
  }

  function nbhdSelect(val) {
    if (nbhdDisplay) {
      nbhdDisplay.textContent = val;
      nbhdDisplay.classList.add('selected');
    }
    if (nbhdValInp) nbhdValInp.value = val;
    nbhdOpts.forEach(function (o) { o.classList.toggle('chosen', o.textContent === val); });
    nbhdClose();
    if (nbhdTrigger) nbhdTrigger.focus();
  }

  if (nbhdTrigger) {
    nbhdTrigger.addEventListener('click', nbhdToggle);
    nbhdTrigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nbhdToggle(); }
    });
  }

  if (nbhdSearch) {
    nbhdSearch.addEventListener('input', function () { nbhdFilter(this.value); });
    nbhdSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') nbhdClose();
    });
  }

  nbhdOpts.forEach(function (opt) {
    opt.addEventListener('click', function () { nbhdSelect(opt.textContent.trim()); });
    opt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nbhdSelect(opt.textContent.trim()); }
    });
  });

  document.addEventListener('click', function (e) {
    if (nbhdWidget && !nbhdWidget.contains(e.target)) nbhdClose();
  });

  /* ── GOOGLE FORMS — fetch no-cors submit ────────────────────── */
  var lmForm   = document.querySelector('.lm__form');
  var lmSubmit = lmForm ? lmForm.querySelector('.lm__submit') : null;
  var lmBox    = document.querySelector('.lm__box');

  function showSuccess() {
    if (!lmBox) return;
    lmBox.innerHTML =
      '<div class="lm__done">' +
        '<div class="lm__done-icon">✓</div>' +
        '<h3 class="lm__done-title">تم استلام طلبك</h3>' +
        '<p class="lm__done-sub">سنتواصل معك بأقرب وقت</p>' +
        '<button class="lm__submit" style="margin-top:1.5rem" ' +
          'onclick="document.getElementById(\'leadModal\').classList.remove(\'open\')' +
          ';document.body.style.overflow=\'\'">إغلاق</button>' +
      '</div>';
  }

  if (lmForm) {
    lmForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* validate neighbourhood */
      if (nbhdValInp && !nbhdValInp.value) {
        if (nbhdTrigger) {
          nbhdTrigger.style.borderColor = '#c0392b';
          nbhdOpen();
          setTimeout(function () { nbhdTrigger.style.borderColor = ''; }, 2000);
        }
        return;
      }

      if (lmSubmit) { lmSubmit.disabled = true; lmSubmit.textContent = 'جاري الإرسال...'; }

      var body = new URLSearchParams(new FormData(lmForm)).toString();

      fetch(lmForm.action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
        .then(function () { showSuccess(); })
        .catch(function () { showSuccess(); });
    });
  }

  /* update contact field label/placeholder based on method */
  document.querySelectorAll('input[name="entry.25795692"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var hint = contactHints[this.value];
      if (!hint || !contactLabel || !contactInput) return;
      contactLabel.textContent  = hint.label;
      contactInput.placeholder  = hint.placeholder;
      contactInput.type = this.value === 'إيميل' ? 'email' : 'tel';
    });
  });

})();
