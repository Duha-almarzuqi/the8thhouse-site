(function () {
  'use strict';

  /* ── CUSTOM CURSOR ─────────────────────────────────────────── */
  var dot  = document.createElement('div'); dot.className  = 'cur-dot';
  var ring = document.createElement('div'); ring.className = 'cur-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx = -100, my = -100, rx = -100, ry = -100, curMoved = false;

  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; curMoved = true; });

  (function loop() {
    if (curMoved || Math.abs(rx - mx) > 0.05 || Math.abs(ry - my) > 0.05) {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      curMoved = false;
    }
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { dot.style.opacity = '.9'; ring.style.opacity = '1'; });

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
  var lm          = document.getElementById('leadModal');
  var lmOpen      = document.getElementById('openLead');
  var lmClose     = document.getElementById('lmClose');
  var lmOverlay   = document.getElementById('lmOverlay');
  var lmBox       = document.querySelector('.lm__box');
  var lmHead      = document.querySelector('.lm__head');
  var lmForm      = document.querySelector('.lm__form');
  var lmSubmit    = lmForm ? lmForm.querySelector('.lm__submit[type="submit"]') : null;
  var lmNext      = document.getElementById('lmNext');
  var lmBack      = document.getElementById('lmBack');
  var lmDone      = document.getElementById('lmDone');
  var lmDoneClose = document.getElementById('lmDoneClose');
  var lmStatus    = document.getElementById('lmStatus');
  var lmStepCount = document.getElementById('lmStepCount');
  var lmProgress  = document.querySelector('.lm__progress-track');
  var lmProgressBar = document.getElementById('lmProgressBar');
  var lmSteps     = lmForm ? Array.from(lmForm.querySelectorAll('.lm__step')) : [];
  var lmStepLabels = lmForm ? Array.from(lmForm.querySelectorAll('[data-step-label]')) : [];

  var contactInput = document.getElementById('lm-contact');
  var contactLabel = document.getElementById('lm-contact-label');

  var lmCurrentStep = 1;
  var lmLastFocused = null;
  var lmIsSubmitting = false;

  function lmIsEnglish() {
    return document.documentElement.lang === 'en';
  }

  function lmCopy(ar, en) {
    return lmIsEnglish() ? en : ar;
  }

  function getContactHint(value) {
    var hints = {
      ar: {
        'واتساب': { label: 'رقم الواتساب', placeholder: '05xxxxxxxx', type: 'tel' },
        'مكالمة': { label: 'رقم الجوال', placeholder: '05xxxxxxxx', type: 'tel' },
        'إيميل':  { label: 'البريد الإلكتروني', placeholder: 'example@email.com', type: 'email' }
      },
      en: {
        'واتساب': { label: 'WhatsApp Number', placeholder: '05xxxxxxxx', type: 'tel' },
        'مكالمة': { label: 'Phone Number', placeholder: '05xxxxxxxx', type: 'tel' },
        'إيميل':  { label: 'Email Address', placeholder: 'example@email.com', type: 'email' }
      }
    };
    return hints[lmIsEnglish() ? 'en' : 'ar'][value] || hints.ar['واتساب'];
  }

  function applyContactHint(value) {
    var hint = getContactHint(value);
    if (!contactLabel || !contactInput) return;
    contactLabel.textContent = hint.label;
    contactInput.placeholder = hint.placeholder;
    contactInput.type = hint.type;
    contactInput.inputMode = hint.type === 'email' ? 'email' : 'tel';
    contactInput.autocomplete = hint.type === 'email' ? 'email' : 'tel';
    contactInput.setCustomValidity('');
    contactInput.removeAttribute('aria-invalid');
  }

  function setLeadStatus(message, type) {
    if (!lmStatus) return;
    lmStatus.textContent = message || '';
    lmStatus.classList.toggle('lm__status--error', type === 'error');
  }

  function clearLeadStatus() {
    setLeadStatus('', '');
  }

  function setLeadStep(step, moveFocus) {
    lmCurrentStep = step === 2 ? 2 : 1;

    lmSteps.forEach(function (el) {
      el.hidden = Number(el.getAttribute('data-step')) !== lmCurrentStep;
    });

    lmStepLabels.forEach(function (el) {
      el.hidden = Number(el.getAttribute('data-step-label')) !== lmCurrentStep;
    });

    if (lmStepCount) lmStepCount.textContent = lmCurrentStep + ' / 2';
    if (lmProgress) lmProgress.setAttribute('aria-valuenow', String(lmCurrentStep));
    if (lmProgressBar) lmProgressBar.style.width = lmCurrentStep === 1 ? '50%' : '100%';

    clearLeadStatus();

    if (lmBox) lmBox.scrollTo({ top: 0, behavior: 'smooth' });

    if (moveFocus) {
      var activeStep = lmSteps.find(function (el) {
        return Number(el.getAttribute('data-step')) === lmCurrentStep;
      });
      var firstField = activeStep && activeStep.querySelector(
        'select, input:not([type="hidden"]):not([type="radio"]), button'
      );
      if (firstField) setTimeout(function () { firstField.focus(); }, 60);
    }
  }

  function getModalFocusable() {
    if (!lm) return [];
    return Array.from(lm.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return !el.hidden && el.offsetParent !== null;
    });
  }

  function openModal() {
    if (!lm) return;
    lmLastFocused = document.activeElement;
    lm.classList.add('open');
    lm.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      if (lmClose) lmClose.focus();
    }, 50);
  }

  function closeModal() {
    if (!lm) return;
    lm.classList.remove('open');
    lm.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    var restoreTarget = lmLastFocused && typeof lmLastFocused.focus === 'function'
      ? lmLastFocused
      : lmOpen;
    if (restoreTarget) restoreTarget.focus();
  }

  if (lmOpen)    lmOpen.addEventListener('click', openModal);
  if (lmClose)   lmClose.addEventListener('click', closeModal);
  if (lmOverlay) lmOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (!lm || !lm.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      var focusable = getModalFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
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
    if (!nbhdWidget) return;
    nbhdWidget.getAttribute('aria-expanded') === 'true' ? nbhdClose() : nbhdOpen();
  }

  function nbhdFilter(q) {
    if (!nbhdPanel) return;
    var query = q.trim().toLowerCase();
    var anyVisible = false;

    nbhdOpts.forEach(function (opt) {
      var ar = opt.getAttribute('data-ar') || opt.textContent.trim();
      var visibleText = opt.textContent.trim();
      var match = !query || ar.toLowerCase().includes(query) || visibleText.toLowerCase().includes(query);
      opt.hidden = !match;
      if (match) anyVisible = true;
    });

    nbhdPanel.querySelectorAll('.nbhd__group').forEach(function (grp) {
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

  function nbhdSelect(opt) {
    if (!opt) return;
    var arValue = opt.getAttribute('data-ar') || opt.textContent.trim();

    if (nbhdDisplay) {
      nbhdDisplay.textContent = opt.textContent.trim();
      nbhdDisplay.classList.add('selected');
    }

    if (nbhdValInp) nbhdValInp.value = arValue;

    nbhdOpts.forEach(function (item) {
      var itemAr = item.getAttribute('data-ar') || item.textContent.trim();
      item.classList.toggle('chosen', itemAr === arValue);
      item.setAttribute('aria-selected', String(itemAr === arValue));
    });

    if (nbhdWidget) nbhdWidget.removeAttribute('aria-invalid');
    nbhdClose();
    clearLeadStatus();
    if (nbhdTrigger) nbhdTrigger.focus();
  }

  if (nbhdTrigger) {
    nbhdTrigger.addEventListener('click', nbhdToggle);
    nbhdTrigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nbhdToggle();
      }
    });
  }

  if (nbhdSearch) {
    nbhdSearch.addEventListener('input', function () { nbhdFilter(this.value); });
    nbhdSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nbhdClose();
        if (nbhdTrigger) nbhdTrigger.focus();
      }
    });
  }

  nbhdOpts.forEach(function (opt) {
    opt.addEventListener('click', function () { nbhdSelect(opt); });
    opt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nbhdSelect(opt);
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (nbhdWidget && !nbhdWidget.contains(e.target)) nbhdClose();
  });

  /* ── FORM VALIDATION + TWO-STEP EXPERIENCE ─────────────────── */
  function toWesternDigits(s) {
    return s
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); });
  }

  ['lm-count', 'lm-rooms'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      var value = toWesternDigits(this.value).replace(/[^0-9]/g, '');
      if (value !== this.value) this.value = value;
      this.setCustomValidity('');
      this.removeAttribute('aria-invalid');
      clearLeadStatus();
    });
  });

  if (contactInput) {
    contactInput.addEventListener('input', function () {
      var position = this.selectionStart;
      var value = toWesternDigits(this.value);
      if (value !== this.value) {
        this.value = value;
        try { this.setSelectionRange(position, position); } catch (e) {}
      }
      this.setCustomValidity('');
      this.removeAttribute('aria-invalid');
      clearLeadStatus();
    });
  }

  function markInvalid(el, message) {
    if (!el) return;
    if (typeof el.setCustomValidity === 'function') el.setCustomValidity(message || '');
    el.setAttribute('aria-invalid', 'true');
  }

  function clearInvalid(el) {
    if (!el) return;
    if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
    el.removeAttribute('aria-invalid');
  }

  function focusInvalid(el) {
    if (!el) return;
    if (el === nbhdWidget) {
      nbhdOpen();
      return;
    }
    if (typeof el.reportValidity === 'function') {
      try { el.reportValidity(); } catch (e) {}
    }
    if (typeof el.focus === 'function') el.focus();
  }

  function validatePropertyStep(focusError) {
    var valid = true;
    var firstInvalid = null;
    var furnishing = lmForm ? lmForm.querySelector('input[name="entry.1461119662"]:checked') : null;
    var furnishingGroup = lmForm ? lmForm.querySelector('.lm__fieldset') : null;
    var furnishingInputs = lmForm ? lmForm.querySelectorAll('input[name="entry.1461119662"]') : [];

    if (furnishingGroup) furnishingGroup.removeAttribute('aria-invalid');
    if (!furnishing) {
      valid = false;
      if (furnishingGroup) furnishingGroup.setAttribute('aria-invalid', 'true');
      firstInvalid = furnishingInputs[0] || furnishingGroup;
    }

    ['lm-ptype', 'lm-count', 'lm-rooms'].forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      clearInvalid(field);

      if ((id === 'lm-count' || id === 'lm-rooms') && field.value &&
          !/^[1-9][0-9]*$/.test(field.value)) {
        markInvalid(field, lmCopy('أدخل رقمًا صحيحًا أكبر من صفر.', 'Enter a valid number greater than zero.'));
      }

      if (!field.checkValidity()) {
        valid = false;
        markInvalid(field, field.validationMessage);
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (nbhdWidget) nbhdWidget.removeAttribute('aria-invalid');
    if (nbhdValInp && !nbhdValInp.value) {
      valid = false;
      if (nbhdWidget) nbhdWidget.setAttribute('aria-invalid', 'true');
      if (!firstInvalid) firstInvalid = nbhdWidget;
    }

    if (!valid) {
      setLeadStatus(
        lmCopy('أكمل الحقول المطلوبة قبل المتابعة.', 'Complete the required fields before continuing.'),
        'error'
      );
      if (focusError) focusInvalid(firstInvalid);
    }

    return valid;
  }

  function validateContactStep(focusError) {
    var valid = true;
    var firstInvalid = null;
    var nameField = document.getElementById('lm-name');
    var consent = document.getElementById('lm-consent');
    var method = lmForm ? lmForm.querySelector('input[name="entry.25795692"]:checked') : null;

    [nameField, contactInput, consent].forEach(clearInvalid);

    if (nameField && !nameField.checkValidity()) {
      valid = false;
      markInvalid(nameField, nameField.validationMessage);
      firstInvalid = nameField;
    }

    if (contactInput) {
      var contactValue = contactInput.value.trim();
      var methodValue = method ? method.value : 'واتساب';

      if (methodValue === 'إيميل') {
        contactInput.type = 'email';
        if (!contactInput.checkValidity()) {
          valid = false;
          markInvalid(
            contactInput,
            lmCopy('أدخل بريدًا إلكترونيًا صحيحًا.', 'Enter a valid email address.')
          );
          if (!firstInvalid) firstInvalid = contactInput;
        }
      } else {
        contactInput.type = 'tel';
        var digits = contactValue.replace(/\D/g, '');
        if (digits.length < 9 || digits.length > 15) {
          valid = false;
          markInvalid(
            contactInput,
            lmCopy('أدخل رقم تواصل صحيحًا.', 'Enter a valid contact number.')
          );
          if (!firstInvalid) firstInvalid = contactInput;
        }
      }
    }

    if (consent && !consent.checked) {
      valid = false;
      markInvalid(
        consent,
        lmCopy('يلزم قبول سياسة الخصوصية لإرسال الطلب.', 'Accept the Privacy Policy to send the request.')
      );
      var consentLabel = consent.closest('.lm__consent');
      if (consentLabel) consentLabel.classList.add('lm__consent--err');
      if (!firstInvalid) firstInvalid = consent;
    }

    if (!valid) {
      setLeadStatus(
        lmCopy('أكمل الحقول المطلوبة قبل إرسال الطلب.', 'Complete the required fields before sending.'),
        'error'
      );
      if (focusError) focusInvalid(firstInvalid);
    }

    return valid;
  }

  if (lmNext) {
    lmNext.addEventListener('click', function () {
      if (validatePropertyStep(true)) setLeadStep(2, true);
    });
  }

  if (lmBack) {
    lmBack.addEventListener('click', function () {
      setLeadStep(1, true);
    });
  }

  if (lmForm) {
    lmForm.addEventListener('input', function (e) {
      clearInvalid(e.target);
      var consentLabel = e.target.closest && e.target.closest('.lm__consent');
      if (consentLabel) consentLabel.classList.remove('lm__consent--err');
    });

    lmForm.addEventListener('change', function (e) {
      clearInvalid(e.target);
      var fieldset = e.target.closest && e.target.closest('.lm__fieldset');
      if (fieldset) fieldset.removeAttribute('aria-invalid');
      clearLeadStatus();
    });
  }

  /* ── GOOGLE FORMS SUBMIT + MEASUREMENT EVENT ───────────────── */
  var lmHoneypot = document.getElementById('lm-website');
  var lmConsent  = document.getElementById('lm-consent');
  var lmLastSubmittedAttribution = null;
  var lmAttributionStorageKey = 'the8house:lead-attribution';
  var lmAttributionKeys = [
    'gclid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];
  var lmTrackingInputs = {
    gclid: document.getElementById('lm-track-gclid'),
    utm_source: document.getElementById('lm-track-utm-source'),
    utm_medium: document.getElementById('lm-track-utm-medium'),
    utm_campaign: document.getElementById('lm-track-utm-campaign'),
    utm_content: document.getElementById('lm-track-utm-content'),
    utm_term: document.getElementById('lm-track-utm-term'),
    page_language: document.getElementById('lm-track-page-language'),
    landing_page: document.getElementById('lm-track-landing-page')
  };

  function getLeadAttribution() {
    var params = new URLSearchParams(window.location.search);
    var hasCurrentAttribution = lmAttributionKeys.some(function (key) {
      return Boolean(params.get(key));
    });
    var attribution = {};

    if (!hasCurrentAttribution) {
      try {
        attribution = JSON.parse(window.sessionStorage.getItem(lmAttributionStorageKey) || '{}');
      } catch (e) {
        attribution = {};
      }
    }

    if (hasCurrentAttribution) {
      lmAttributionKeys.forEach(function (key) {
        attribution[key] = params.get(key) || '';
      });
      attribution.landing_page = window.location.href.split('#')[0];
    } else if (!attribution.landing_page) {
      attribution.landing_page = window.location.href.split('#')[0];
    }

    attribution.page_language = document.documentElement.lang || 'ar';

    try {
      window.sessionStorage.setItem(lmAttributionStorageKey, JSON.stringify(attribution));
    } catch (e) {}

    return attribution;
  }

  function syncLeadAttributionFields() {
    var attribution = getLeadAttribution();

    Object.keys(lmTrackingInputs).forEach(function (key) {
      if (lmTrackingInputs[key]) {
        lmTrackingInputs[key].value = attribution[key] || '';
      }
    });

    return attribution;
  }

  function setSubmitting(state) {
    lmIsSubmitting = state;
    if (!lmSubmit) return;
    lmSubmit.disabled = state;
    var label = lmSubmit.querySelector('[data-i18n="lm_submit"]');
    if (label) {
      label.textContent = state
        ? lmCopy('جاري الإرسال…', 'Sending…')
        : lmCopy('إرسال الطلب', 'Submit Request');
    }
  }

  function emitLeadSuccess() {
    var attribution = lmLastSubmittedAttribution || syncLeadAttributionFields();
    var eventData = {
      event: 'generate_lead',
      form_name: 'property_registration',
      lead_type: 'property_owner',
      utm_source: attribution.utm_source || '',
      utm_medium: attribution.utm_medium || '',
      utm_campaign: attribution.utm_campaign || '',
      utm_content: attribution.utm_content || '',
      utm_term: attribution.utm_term || '',
      page_language: attribution.page_language || ''
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);

    try {
      window.dispatchEvent(new CustomEvent('the8house:lead-success', {
        detail: eventData
      }));
    } catch (e) {}
  }

  function showSuccess(shouldMeasure) {
    setSubmitting(false);
    clearLeadStatus();

    if (lmHead) lmHead.hidden = true;
    if (lmForm) lmForm.hidden = true;
    if (lmDone) {
      lmDone.hidden = false;
      lmDone.focus();
    }

    if (shouldMeasure) emitLeadSuccess();
  }

  function showSubmitError() {
    setSubmitting(false);
    setLeadStatus(
      lmCopy(
        'تعذر إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى.',
        'We could not send your request. Check your connection and try again.'
      ),
      'error'
    );
    if (lmStatus) lmStatus.focus();
  }

  function resetLeadForm() {
    if (!lmForm) return;
    lmForm.reset();
    setSubmitting(false);

    if (nbhdValInp) nbhdValInp.value = '';
    if (nbhdDisplay) {
      nbhdDisplay.textContent = lmCopy('اختر الحي', 'Choose neighbourhood');
      nbhdDisplay.classList.remove('selected');
    }
    nbhdOpts.forEach(function (opt) {
      opt.classList.remove('chosen');
      opt.setAttribute('aria-selected', 'false');
    });

    if (nbhdWidget) {
      nbhdWidget.removeAttribute('aria-invalid');
      nbhdWidget.setAttribute('aria-expanded', 'false');
    }

    lmForm.querySelectorAll('[aria-invalid="true"]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
    lmForm.querySelectorAll('.lm__consent--err').forEach(function (el) {
      el.classList.remove('lm__consent--err');
    });

    if (lmHead) lmHead.hidden = false;
    lmForm.hidden = false;
    if (lmDone) lmDone.hidden = true;

    applyContactHint('واتساب');
    setLeadStep(1, false);
  }

  if (lmDoneClose) {
    lmDoneClose.addEventListener('click', function () {
      closeModal();
      setTimeout(resetLeadForm, 350);
    });
  }

  if (lmForm) {
    lmForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (lmIsSubmitting) return;

      if (lmCurrentStep !== 2) {
        if (validatePropertyStep(true)) setLeadStep(2, true);
        return;
      }

      if (!validatePropertyStep(false)) {
        setLeadStep(1, false);
        setTimeout(function () { validatePropertyStep(true); }, 0);
        return;
      }

      if (!validateContactStep(true)) return;

      if (lmHoneypot && lmHoneypot.value.trim() !== '') {
        showSuccess(false);
        return;
      }

      setSubmitting(true);
      setLeadStatus(lmCopy('جاري إرسال طلبك…', 'Sending your request…'), '');

      lmLastSubmittedAttribution = syncLeadAttributionFields();
      var body = new URLSearchParams(new FormData(lmForm)).toString();

      fetch(lmForm.action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
        .then(function () {
          showSuccess(true);
        })
        .catch(function () {
          showSubmitError();
        });
    });
  }

  syncLeadAttributionFields();

  document.querySelectorAll('input[name="entry.25795692"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      applyContactHint(this.value);
      clearLeadStatus();
    });
  });

  window.addEventListener('the8house:language-change', function () {
    var selectedMethod = lmForm
      ? lmForm.querySelector('input[name="entry.25795692"]:checked')
      : null;
    applyContactHint(selectedMethod ? selectedMethod.value : 'واتساب');

    if (nbhdValInp && nbhdValInp.value && nbhdDisplay) {
      var selectedOpt = nbhdOpts.find(function (opt) {
        return (opt.getAttribute('data-ar') || opt.textContent.trim()) === nbhdValInp.value;
      });
      if (selectedOpt) nbhdDisplay.textContent = selectedOpt.textContent.trim();
    }

    clearLeadStatus();
  });

  setLeadStep(1, false);
  applyContactHint('واتساب');

  /* ── BELT SWIPE + TAP TO HIGHLIGHT ───────────────────────────── */
  (function () {
    document.querySelectorAll('.belt').forEach(function (belt) {
      var track = belt.querySelector('.belt__track');
      if (!track) return;

      var dragging  = false;
      var moved     = false;
      var startX    = 0;
      var startTx   = 0;
      var curTx     = 0;
      var isFwd     = track.classList.contains('belt__track--fwd');
      var dur       = isFwd ? 110 : 130;

      function getCurrentTx() {
        /* pause first so getComputedStyle returns the frozen position */
        track.style.animationPlayState = 'paused';
        var t = window.getComputedStyle(track).transform;
        var m = t && t !== 'none' ? t.match(/matrix\(([^)]+)\)/) : null;
        return m ? parseFloat(m[1].split(',')[4]) : 0;
      }

      function resumeAt(px) {
        var halfW = track.scrollWidth / 2;
        var pos   = ((px % halfW) + halfW) % halfW - halfW; /* clamp to [-halfW, 0] */
        var delay = isFwd ? (pos / halfW) * dur : -dur - (pos / halfW) * dur;
        track.style.animationDelay     = delay + 's';
        track.style.animationPlayState = '';
        track.style.transform          = '';
      }

      function onStart(x) {
        startTx  = getCurrentTx();
        curTx    = startTx;
        startX   = x;
        dragging = true;
        moved    = false;
        track.style.transform = 'translateX(' + startTx + 'px)';
      }

      function onMove(x) {
        if (!dragging) return;
        var dx = x - startX;
        if (Math.abs(dx) > 4) moved = true;
        curTx = startTx + dx;
        track.style.transform = 'translateX(' + curTx + 'px)';
      }

      function onEnd() {
        if (!dragging) return;
        dragging = false;
        resumeAt(curTx);
      }

      belt.addEventListener('touchstart', function (e) {
        onStart(e.touches[0].clientX);
      }, { passive: true });

      belt.addEventListener('touchmove', function (e) {
        if (dragging) { e.preventDefault(); onMove(e.touches[0].clientX); }
      }, { passive: false });

      window.addEventListener('touchend', onEnd);

      /* hover pause (desktop) */
      belt.addEventListener('mouseenter', function () {
        track.style.animationPlayState = 'paused';
      });
      belt.addEventListener('mouseleave', function () {
        track.style.animationPlayState = '';
      });
    });

    /* tap to highlight */
    document.querySelectorAll('.belt').forEach(function (belt) {
      belt.addEventListener('click', function (e) {
        var card = e.target.closest('.quote');
        if (!card) return;
        var isActive = card.classList.contains('active');
        document.querySelectorAll('.quote.active').forEach(function (c) {
          c.classList.remove('active');
        });
        if (!isActive) card.classList.add('active');
      });
    });
  })();

  /* ── PROPERTY REEL DRAG ────────────────────────────────────── */
  (function () {
    var reel  = document.querySelector('.property__reel');
    var track = reel && reel.querySelector('.property__reel-track');
    if (!reel || !track) return;

    var dragging = false, startX = 0, startTx = 0;

    function getTrackX() {
      var m = new DOMMatrix(getComputedStyle(track).transform);
      return m.m41;
    }

    function halfWidth() {
      return track.scrollWidth / 2;
    }

    function onStart(x) {
      dragging = true;
      startX   = x;
      startTx  = getTrackX();
      track.classList.add('property__reel-track--dragging');
      reel.classList.add('property__reel--grabbing');
    }

    function onMove(x) {
      if (!dragging) return;
      var dx  = x - startX;
      var raw = startTx + dx;
      var hw  = halfWidth();
      /* keep in [-hw, 0] */
      raw = ((raw % hw) + hw) % hw - hw;
      track.style.transform = 'translateX(' + raw + 'px)';
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      reel.classList.remove('property__reel--grabbing');
      var cur = getTrackX();
      var hw  = halfWidth();
      var pos = ((cur % hw) + hw) % hw - hw;
      var dur = 18;
      var delay = (pos / hw) * dur;
      track.style.transform = '';
      track.style.animationDelay = delay + 's';
      track.classList.remove('property__reel-track--dragging');
    }

    reel.addEventListener('mousedown',  function (e) { onStart(e.clientX); e.preventDefault(); });
    reel.addEventListener('touchstart', function (e) { onStart(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', function (e) { onMove(e.clientX); });
    reel.addEventListener('touchmove',  function (e) {
      if (dragging) { e.preventDefault(); onMove(e.touches[0].clientX); }
    }, { passive: false });
    window.addEventListener('mouseup',  onEnd);
    window.addEventListener('touchend', onEnd);
  })();

  /* ── FLOATING WHATSAPP BUTTON ─────────────────────────────── */
  var waFloat = document.getElementById('waFloat');
  if (waFloat) {
    window.addEventListener('scroll', function () {
      waFloat.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ── PAUSE ANIMATIONS WHEN OFF-SCREEN ─────────────────────── */
  var animPauseObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.querySelectorAll('.belt__track, .proof-band__track, .property__reel-track').forEach(function (t) {
        /* off-screen → force paused; on-screen → let CSS hover rule control */
        t.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
      });
    });
  }, { rootMargin: '200px 0px 200px 0px' });

  document.querySelectorAll('.belt, .proof-band, .property__reel').forEach(function (el) {
    animPauseObs.observe(el);
  });

})();
