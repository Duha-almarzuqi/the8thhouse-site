/* ============================================================
   THE 8TH HOUSE — نموذج صفحات الهبوط
   يتقاسم مع الصفحة الرئيسية: نفس نقطة إرسال Google Form، نفس
   مفتاح تخزين الإسناد، ونفس حمولة حدث generate_lead — حتى يبقى
   القياس متصلاً أياً كانت الصفحة التي دخل منها المالك.
   ============================================================ */
(function () {
  'use strict';

  var FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSciuc8CHx66MutIu7deGtbAZAlXZNeQJIvkhynpNA5eiXTg-A/formResponse';
  var STORAGE_KEY = 'the8house:lead-attribution';
  var ATTR_KEYS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  var form    = document.getElementById('lpForm');
  if (!form) return;
  var submit  = document.getElementById('lpSubmit');
  var status  = document.getElementById('lpStatus');
  var done    = document.getElementById('lpDone');
  var hp      = document.getElementById('lp-website');

  /* نداء الزر يختلف بين الصفحات — يُلتقط عند التهيئة ليُستعاد كما هو */
  var submitLabel = submit ? submit.textContent.trim() : 'أرسل الطلب';

  var isSubmitting = false;
  var leadEventSent = false;
  var lastSubmittedBody = '';
  var lastAttribution = null;

  /* ── الإسناد ────────────────────────────────────────────── */

  function getAttribution() {
    var params = new URLSearchParams(window.location.search);
    var hasCurrent = ATTR_KEYS.some(function (k) { return Boolean(params.get(k)); });
    var attr = {};

    if (!hasCurrent) {
      try { attr = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}'); }
      catch (e) { attr = {}; }
    }

    if (hasCurrent) {
      ATTR_KEYS.forEach(function (k) { attr[k] = params.get(k) || ''; });
      attr.landing_page = window.location.href.split('#')[0];
    } else if (!attr.landing_page) {
      attr.landing_page = window.location.href.split('#')[0];
    }

    attr.page_language = document.documentElement.lang || 'ar';

    try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr)); } catch (e) {}
    return attr;
  }

  function syncAttribution() {
    var attr = getAttribution();
    Object.keys(attr).forEach(function (k) {
      var el = document.getElementById('lp-track-' + k.replace(/_/g, '-'));
      if (el) el.value = attr[k] || '';
    });
    return attr;
  }

  /* ── القياس ─────────────────────────────────────────────── */

  function emitLeadSuccess() {
    /* حدث واحد لكل تحميل صفحة — إرسال مكرر لا يُحتسب مرتين */
    if (leadEventSent) return;
    leadEventSent = true;

    var attr = lastAttribution || syncAttribution();
    var eventData = {
      event: 'generate_lead',
      form_name: 'property_registration',
      lead_type: 'property_owner',
      utm_source: attr.utm_source || '',
      utm_medium: attr.utm_medium || '',
      utm_campaign: attr.utm_campaign || '',
      utm_content: attr.utm_content || '',
      utm_term: attr.utm_term || '',
      page_language: attr.page_language || ''
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);

    try {
      window.dispatchEvent(new CustomEvent('the8house:lead-success', { detail: eventData }));
    } catch (e) {}
  }

  /* ── الحالة ─────────────────────────────────────────────── */

  function setSubmitting(state) {
    isSubmitting = state;
    if (!submit) return;
    submit.disabled = state;
    submit.textContent = state ? 'جاري الإرسال…' : submitLabel;
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg || '';
    status.className = 'lp-status' + (kind ? ' is-' + kind : '');
  }

  function showSuccess(shouldMeasure) {
    setSubmitting(false);
    setStatus('');
    form.hidden = true;
    if (done) { done.hidden = false; done.focus(); }
    if (shouldMeasure) emitLeadSuccess();
  }

  function showError() {
    setSubmitting(false);
    setStatus('تعذّر إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى، أو راسلنا على واتساب.', 'error');
    if (status) status.focus();
  }

  /* ── التحقق ─────────────────────────────────────────────── */

  function fieldError(el, msg) {
    el.setAttribute('aria-invalid', 'true');
    var slot = document.querySelector('[data-error-for="' + el.id + '"]');
    if (slot) slot.textContent = msg || '';
  }

  function clearErrors() {
    form.querySelectorAll('[aria-invalid="true"]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.lp-err').forEach(function (el) { el.textContent = ''; });
  }

  function isSaudiMobile(v) {
    var d = v.replace(/[\s\-().]/g, '');
    d = d.replace(/^\+966/, '0').replace(/^00966/, '0').replace(/^966/, '0');
    if (/^5\d{8}$/.test(d)) d = '0' + d;
    return /^05\d{8}$/.test(d);
  }

  function validate() {
    clearErrors();
    var ok = true;
    var first = null;

    var required = [
      ['lp-ptype',   'اختر نوع العقار'],
      ['lp-nbhd',    'اكتب اسم الحي'],
      ['lp-name',    'اكتب اسمك'],
      ['lp-contact', 'اكتب رقم الجوال']
    ];

    required.forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      if (!el) return;
      if (!el.value.trim()) { fieldError(el, pair[1]); ok = false; first = first || el; }
    });

    var phone = document.getElementById('lp-contact');
    if (phone && phone.value.trim() && !isSaudiMobile(phone.value)) {
      fieldError(phone, 'رقم جوال سعودي يبدأ بـ 05');
      ok = false; first = first || phone;
    }

    var furnished = form.querySelector('input[name="entry.1461119662"]:checked');
    if (!furnished) {
      var slot = document.querySelector('[data-error-for="lp-furnished"]');
      if (slot) slot.textContent = 'اختر حالة التأثيث';
      ok = false;
    }

    var consent = document.getElementById('lp-consent');
    if (consent && !consent.checked) {
      var cslot = document.querySelector('[data-error-for="lp-consent"]');
      if (cslot) cslot.textContent = 'نحتاج موافقتك على معالجة البيانات قبل الإرسال';
      ok = false; first = first || consent;
    }

    if (first) first.focus();
    return ok;
  }

  /* ── الإرسال ────────────────────────────────────────────── */

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    /* فخّ البوتات: شاشة نجاح بلا إطلاق حدث ولا إرسال */
    if (hp && hp.value.trim() !== '') { showSuccess(false); return; }

    var attr = syncAttribution();
    var body = new URLSearchParams(new FormData(form)).toString();

    /* إرسال مطابق لإرسال ناجح سابق في نفس تحميل الصفحة: أعِد عرض
       التأكيد بدل كتابة صفّ ثانٍ في شيت الردود. مقارنة الحمولة تُبقي
       مالكاً لديه عقار ثانٍ مختلف قادراً على الإرسال من جديد. */
    if (leadEventSent && body === lastSubmittedBody) { showSuccess(false); return; }

    setSubmitting(true);
    setStatus('جاري إرسال طلبك…');
    lastAttribution = attr;
    lastSubmittedBody = body;

    fetch(FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
      .then(function () { showSuccess(true); })
      .catch(function () { showError(); });
  });

  var consentBox = document.getElementById('lp-consent');
  if (consentBox) {
    consentBox.addEventListener('change', function () {
      var cslot = document.querySelector('[data-error-for="lp-consent"]');
      if (cslot && consentBox.checked) cslot.textContent = '';
    });
  }

  /* نقرات الاتصال المباشر تُقاس أيضاً: بدونها يبدو كل زائر اتصل
     واتساب أو هاتفاً وكأنه غادر بلا تفاعل. */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="https://wa.me/"], a[href^="tel:"]');
    if (!link) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact_click',
      contact_method: link.getAttribute('href').indexOf('tel:') === 0 ? 'phone' : 'whatsapp',
      page_language: document.documentElement.lang || 'ar'
    });
  });

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid')) {
      e.target.removeAttribute('aria-invalid');
      var slot = document.querySelector('[data-error-for="' + e.target.id + '"]');
      if (slot) slot.textContent = '';
    }
  });

  syncAttribution();
})();
