/* ================================================================
   THE 8TH HOUSE — Owner income calculator
   Estimates an owner's net income from short-stay operation, month by
   month, and compares it with an annual lease. Every figure is an
   estimate driven by the visitor's own inputs.
   ================================================================ */
(function () {
  'use strict';

  var root = document.getElementById('calculator');
  if (!root) return;

  /* Riyadh serviced-apartment seasonality, GASTAT tourism-establishment
     statistics for Q3 2025 – Q2 2026: occupancy % and average daily rate
     (SAR) per calendar quarter. Only the shape is used; the visitor's own
     price and occupancy set the level. */
  var QUARTERS = [
    { occ: 59.3, adr: 246 },  /* Q1: Jan–Mar */
    { occ: 52.7, adr: 230 },  /* Q2: Apr–Jun */
    { occ: 65.9, adr: 237 },  /* Q3: Jul–Sep */
    { occ: 70.5, adr: 261 }   /* Q4: Oct–Dec */
  ];
  var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var MONTHS = {
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  var S = {
    ar: {
      sar: 'ريال',
      perMonth: 'شهريًا',
      perYear: 'سنويًا',
      net_month: 'صافي دخلك الشهري المتوقع',
      net_month_sub: 'متوسط شهري · {y} ريال سنويًا · {u}',
      units_one: 'وحدة واحدة',
      units_many: '{n} وحدات',
      kpi_gross: 'الإيراد المحصَّل سنويًا',
      kpi_nights: 'الليالي المؤجرة سنويًا',
      kpi_revpar: 'الإيراد لكل ليلة متاحة',
      kpi_share: 'نصيبك الصافي من الإيراد',
      split_title: 'أين يذهب كل 100 ريال يدفعها الضيوف',
      split_comm: 'عمولات المنصات',
      split_fee: 'رسوم الإدارة',
      split_exp: 'مصاريفك',
      split_net: 'صافي دخلك',
      chart_title: 'صافي دخلك شهرًا بشهر',
      chart_note: 'توزيع تقديري بحسب موسمية الشقق المخدومة في الرياض كما نشرتها الهيئة العامة للإحصاء لآخر أربعة أرباع.',
      chart_rent: 'صافي الإيجار السنوي شهريًا',
      chart_net: 'صافي دخل التشغيل',
      tip: '{m}: {n} ليلة · إشغال {o}% · إيراد {g} · صافي {v} ريال',
      table_toggle: 'عرض الأرقام الشهرية',
      th_month: 'الشهر', th_nights: 'الليالي', th_occ: 'الإشغال', th_gross: 'الإيراد المحصَّل', th_net: 'صافي دخلك',
      sc_title: 'ثلاثة سيناريوهات',
      sc_cons: 'متحفّظ', sc_base: 'مدخلاتك', sc_opt: 'متفائل',
      sc_price: 'سعر الليلة', sc_occ: 'الإشغال', sc_month: 'صافي شهري', sc_year: 'صافي سنوي',
      sc_note: 'المتحفّظ: سعر أقل 10% وإشغال أقل 10 نقاط. المتفائل: سعر أعلى 10% وإشغال أعلى 10 نقاط.',
      rent_title: 'المقارنة بالإيجار السنوي',
      rent_net: 'صافي الإيجار السنوي',
      rent_str: 'صافي التشغيل',
      rent_diff_more: 'التشغيل أعلى بنحو {d} ريال سنويًا',
      rent_diff_less: 'الإيجار أعلى بنحو {d} ريال سنويًا',
      rent_be_price: 'سعر الليلة الذي يتعادل عنده الخياران بالإشغال الحالي: نحو {p} ريال',
      rent_be_occ: 'الإشغال الذي يتعادل عنده الخياران بالسعر الحالي: نحو {o}%',
      rent_be_occ_na: 'لا يتعادل الخياران بالسعر الحالي حتى بإشغال كامل.',
      rent_months: 'يتجاوز التشغيل الإيجار في {k} من 12 شهرًا.',
      rent_empty: 'أدخل الإيجار السنوي المتوقع في الإعدادات المتقدمة لمقارنته بالتشغيل.',
      pay_title: 'استرداد تكلفة التجهيز',
      pay_months: 'تُسترد تكلفة التجهيز ({c} ريال) خلال نحو {m} شهرًا',
      pay_months_rent: 'تُسترد تكلفة التجهيز ({c} ريال) من فرق الدخل عن الإيجار خلال نحو {m} شهرًا',
      pay_never: 'لا تُسترد تكلفة التجهيز عند هذه المدخلات، لأن صافي التشغيل لا يتجاوز الإيجار.',
      pay_never_net: 'لا تُسترد تكلفة التجهيز عند هذه المدخلات، لأن صافي التشغيل ليس موجبًا.',
      copied: 'نُسخ الرابط',
      copy_fail: 'تعذّر النسخ — انسخ الرابط من شريط العنوان'
    },
    en: {
      sar: 'SAR',
      perMonth: 'per month',
      perYear: 'per year',
      net_month: 'Your estimated monthly net income',
      net_month_sub: 'Monthly average · SAR {y} a year · {u}',
      units_one: 'one unit',
      units_many: '{n} units',
      kpi_gross: 'Gross booking revenue a year',
      kpi_nights: 'Nights booked a year',
      kpi_revpar: 'Revenue per available night',
      kpi_share: 'Your net share of revenue',
      split_title: 'Where every SAR 100 paid by guests goes',
      split_comm: 'Platform commissions',
      split_fee: 'Management fee',
      split_exp: 'Your expenses',
      split_net: 'Your net income',
      chart_title: 'Your net income, month by month',
      chart_note: 'Estimated split using Riyadh serviced-apartment seasonality published by GASTAT for the last four quarters.',
      chart_rent: 'Annual-lease net, per month',
      chart_net: 'Operating net income',
      tip: '{m}: {n} nights · {o}% occupancy · revenue {g} · net SAR {v}',
      table_toggle: 'Show monthly figures',
      th_month: 'Month', th_nights: 'Nights', th_occ: 'Occupancy', th_gross: 'Gross revenue', th_net: 'Your net',
      sc_title: 'Three scenarios',
      sc_cons: 'Conservative', sc_base: 'Your inputs', sc_opt: 'Optimistic',
      sc_price: 'Nightly rate', sc_occ: 'Occupancy', sc_month: 'Net / month', sc_year: 'Net / year',
      sc_note: 'Conservative: rate 10% lower, occupancy 10 points lower. Optimistic: rate 10% higher, occupancy 10 points higher.',
      rent_title: 'Compared with an annual lease',
      rent_net: 'Annual-lease net',
      rent_str: 'Operating net',
      rent_diff_more: 'Operating earns about SAR {d} more a year',
      rent_diff_less: 'The lease earns about SAR {d} more a year',
      rent_be_price: 'Break-even nightly rate at your occupancy: about SAR {p}',
      rent_be_occ: 'Break-even occupancy at your rate: about {o}%',
      rent_be_occ_na: 'At your rate, operating cannot match the lease even at full occupancy.',
      rent_months: 'Operating beats the lease in {k} of 12 months.',
      rent_empty: 'Enter the expected annual rent under advanced settings to compare it with operating.',
      pay_title: 'Furnishing payback',
      pay_months: 'The furnishing cost (SAR {c}) is recovered in about {m} months',
      pay_months_rent: 'The furnishing cost (SAR {c}) is recovered from the income above the lease in about {m} months',
      pay_never: 'At these inputs the furnishing cost is not recovered, because operating does not beat the lease.',
      pay_never_net: 'At these inputs the furnishing cost is not recovered, because operating net income is not positive.',
      copied: 'Link copied',
      copy_fail: 'Copy failed — copy the link from the address bar'
    }
  };

  /* field id → { url param, default, min, max } */
  var FIELDS = {
    calcUnits:    { q: 'u',  def: 1,    min: 1,   max: 50 },
    calcPrice:    { q: 'p',  def: 500,  min: 100, max: 5000 },
    calcOcc:      { q: 'o',  def: 65,   min: 10,  max: 98 },
    calcComm:     { q: 'c',  def: 15,   min: 0,   max: 40 },
    calcFee:      { q: 'f',  def: 20,   min: 0,   max: 50 },
    calcExp:      { q: 'e',  def: 2000, min: 0,   max: 100000 },
    calcRent:     { q: 'r',  def: 0,    min: 0,   max: 5000000 },
    calcRentExp:  { q: 're', def: 0,    min: 0,   max: 1000000 },
    calcFurnish:  { q: 'fc', def: 0,    min: 0,   max: 5000000 }
  };

  var nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  var nfIn = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
  function fmt(v) { return nf.format(Math.round(v)); }
  /* typed values are shown back with thousands separators, in Latin digits */
  function fmtInput(v) { return nfIn.format(v); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function t(key, vars) {
    var s = (S[lang()][key] || S.ar[key] || '');
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function el(id) { return document.getElementById(id); }

  /* Arabic-Indic and Persian digits are accepted and shown back as Latin digits */
  function toNumber(raw) {
    var s = String(raw == null ? '' : raw)
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); })
      .replace(/[٬,\s]/g, '')
      .replace(/٫/g, '.');
    var n = parseFloat(s);
    return isFinite(n) ? n : NaN;
  }

  function clamp(v, f) { return Math.min(f.max, Math.max(f.min, v)); }

  function read() {
    var v = {};
    Object.keys(FIELDS).forEach(function (id) {
      var f = FIELDS[id], n = toNumber(el(id).value);
      v[id] = isNaN(n) ? f.def : clamp(n, f);
    });
    return v;
  }

  /* nights are a whole number: 365 × 70% = 255.5 rounds to 256 (integer
     arithmetic keeps the .5 exact, which a float product would not) */
  function nightsFor(occPct) { return Math.round(365 * Math.round(occPct * 100) / 10000); }

  function model(price, occPct, v) {
    var nights = nightsFor(occPct);
    var keep = (1 - v.calcComm / 100) * (1 - v.calcFee / 100);
    var gross = price * nights;
    var expYear = v.calcExp * 12;
    var net = gross * keep - expYear;
    return { nights: nights, gross: gross, net: net, keep: keep, expYear: expYear };
  }

  /* spread the year over months with the official seasonal shape; a high
     occupancy is damped so that no month goes above 100% */
  function monthly(price, occPct, v) {
    var occ = occPct / 100, base = model(price, occPct, v);
    var maxIdx = 0, meanOcc = 0, meanAdr = 0;
    QUARTERS.forEach(function (q) { meanOcc += q.occ / 4; meanAdr += q.adr / 4; });
    QUARTERS.forEach(function (q) { maxIdx = Math.max(maxIdx, q.occ / meanOcc); });
    var damp = Math.min(1, Math.max(0, (0.98 / Math.max(occ, 0.01) - 1) / (maxIdx - 1)));
    var w = DAYS.map(function (d, m) {
      var q = QUARTERS[Math.floor(m / 3)];
      return d * (1 + (q.occ / meanOcc - 1) * damp);
    });
    var wSum = w.reduce(function (a, b) { return a + b; }, 0);
    var nights = w.map(function (x) { return base.nights * x / wSum; });
    var adrIdx = DAYS.map(function (d, m) { return QUARTERS[Math.floor(m / 3)].adr / meanAdr; });
    var nightW = nights.reduce(function (a, n, m) { return a + n * adrIdx[m]; }, 0) || 1;
    return nights.map(function (n, m) {
      var gross = base.gross * n * adrIdx[m] / nightW;
      return {
        nights: n,
        occ: n / DAYS[m] * 100,
        gross: gross,
        net: gross * base.keep - v.calcExp
      };
    });
  }

  function setText(id, s) { var e = el(id); if (e) e.textContent = s; }

  function render() {
    var v = read(), L = lang(), u = v.calcUnits;
    var b = model(v.calcPrice, v.calcOcc, v);
    var months = monthly(v.calcPrice, v.calcOcc, v);

    /* headline */
    setText('calcNetMonth', fmt(b.net * u / 12));
    setText('calcNetCurrency', t('sar') + ' ' + t('perMonth'));
    setText('calcNetLabel', t('net_month'));
    setText('calcNetSub', t('net_month_sub', {
      y: fmt(b.net * u),
      u: u === 1 ? t('units_one') : t('units_many', { n: u })
    }));
    el('calcNetMonth').classList.toggle('is-negative', b.net < 0);

    /* KPIs */
    setText('calcKpiGrossL', t('kpi_gross'));   setText('calcKpiGross', fmt(b.gross * u));
    setText('calcKpiNightsL', t('kpi_nights')); setText('calcKpiNights', fmt(b.nights * u));
    setText('calcKpiRevparL', t('kpi_revpar')); setText('calcKpiRevpar', fmt(b.gross / 365));
    setText('calcKpiShareL', t('kpi_share'));
    setText('calcKpiShare', b.gross > 0 ? Math.round(b.net / b.gross * 100) + '%' : '—');

    /* where every 100 goes */
    var comm = v.calcComm, fee = (100 - comm) * v.calcFee / 100;
    var exp = b.gross > 0 ? b.expYear / b.gross * 100 : 0;
    var parts = [
      { k: 'split_comm', v: comm, cls: 'comm' },
      { k: 'split_fee', v: fee, cls: 'fee' },
      { k: 'split_exp', v: Math.min(exp, Math.max(0, 100 - comm - fee)), cls: 'exp' },
    ];
    var used = parts.reduce(function (a, p) { return a + p.v; }, 0);
    parts.push({ k: 'split_net', v: Math.max(0, 100 - used), cls: 'net' });
    setText('calcSplitTitle', t('split_title'));
    var bar = el('calcSplitBar'), legend = el('calcSplitLegend');
    bar.innerHTML = ''; legend.innerHTML = '';
    parts.forEach(function (p) {
      var seg = document.createElement('span');
      seg.className = 'calc-split__seg calc-split__seg--' + p.cls;
      seg.style.flexGrow = String(Math.max(p.v, 0));
      seg.style.flexBasis = '0';
      if (p.v >= 9) seg.textContent = Math.round(p.v);
      bar.appendChild(seg);
      var li = document.createElement('li');
      li.innerHTML = '<span class="calc-key calc-key--' + p.cls + '" aria-hidden="true"></span>';
      li.appendChild(document.createTextNode(t(p.k) + ': ' + Math.round(p.v)));
      legend.appendChild(li);
    });

    /* rent comparison */
    var rentNetUnit = v.calcRent > 0 ? v.calcRent - v.calcRentExp : null;
    renderChart(months, rentNetUnit, u, L);
    renderTable(months, u, L);
    renderScenarios(v, u);
    renderRent(v, b, months, rentNetUnit, u);
    renderPayback(v, b, rentNetUnit, u);
    syncUrlPreview(v);
  }

  function renderChart(months, rentNetUnit, u, L) {
    setText('calcChartTitle', t('chart_title'));
    setText('calcChartNote', t('chart_note'));
    var plot = el('calcChartPlot'), labels = el('calcChartLabels');
    plot.innerHTML = ''; labels.innerHTML = '';
    var vals = months.map(function (m) { return m.net * u; });
    var rentM = rentNetUnit != null ? rentNetUnit * u / 12 : null;
    var hi = Math.max.apply(null, vals.concat([rentM || 0, 0]));
    var lo = Math.min.apply(null, vals.concat([0]));
    var span = (hi - lo) || 1;
    var zero = (0 - lo) / span * 100;
    var iMax = vals.indexOf(Math.max.apply(null, vals));
    var iMin = vals.indexOf(Math.min.apply(null, vals));

    vals.forEach(function (val, i) {
      var m = months[i];
      var col = document.createElement('div');
      col.className = 'calc-chart__col';
      col.tabIndex = 0;
      var tip = t('tip', {
        m: MONTHS[L][i], n: fmt(m.nights * u), o: Math.round(m.occ),
        g: fmt(m.gross * u), v: fmt(val)
      });
      col.setAttribute('aria-label', tip);
      col.setAttribute('data-tip', tip);
      var barEl = document.createElement('span');
      barEl.className = 'calc-chart__bar' + (val < 0 ? ' is-negative' : '');
      var h = Math.abs(val) / span * 100;
      barEl.style.height = h + '%';
      barEl.style.bottom = (val >= 0 ? zero : zero - h) + '%';
      col.appendChild(barEl);
      if (i === iMax || i === iMin) {
        var lab = document.createElement('span');
        lab.className = 'calc-chart__val';
        lab.textContent = fmt(val);
        lab.style.bottom = 'calc(' + (val >= 0 ? zero + h : zero) + '% + 4px)';
        col.appendChild(lab);
      }
      plot.appendChild(col);
      var mLab = document.createElement('span');
      mLab.textContent = MONTHS[L][i];
      labels.appendChild(mLab);
    });

    var line = el('calcChartRent');
    if (rentM != null) {
      line.hidden = false;
      line.style.bottom = ((rentM - lo) / span * 100) + '%';
    } else {
      line.hidden = true;
    }
    el('calcChartZero').style.bottom = zero + '%';
    var lg = el('calcChartLegend');
    lg.innerHTML = '<li><span class="calc-key calc-key--net" aria-hidden="true"></span>' + t('chart_net') + '</li>' +
      (rentM != null ? '<li><span class="calc-key calc-key--line" aria-hidden="true"></span>' + t('chart_rent') + ' (' + fmt(rentM) + ')</li>' : '');
  }

  function renderTable(months, u, L) {
    setText('calcTableToggle', t('table_toggle'));
    var head = '<tr><th scope="col">' + t('th_month') + '</th><th scope="col">' + t('th_nights') +
      '</th><th scope="col">' + t('th_occ') + '</th><th scope="col">' + t('th_gross') +
      '</th><th scope="col">' + t('th_net') + '</th></tr>';
    var rows = months.map(function (m, i) {
      return '<tr><th scope="row">' + MONTHS[L][i] + '</th><td>' + fmt(m.nights * u) + '</td><td>' +
        Math.round(m.occ) + '%</td><td>' + fmt(m.gross * u) + '</td><td>' + fmt(m.net * u) + '</td></tr>';
    }).join('');
    el('calcTable').innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';
  }

  function renderScenarios(v, u) {
    setText('calcScTitle', t('sc_title'));
    setText('calcScNote', t('sc_note'));
    var sc = [
      { k: 'sc_cons', p: v.calcPrice * 0.9, o: Math.max(10, v.calcOcc - 10) },
      { k: 'sc_base', p: v.calcPrice, o: v.calcOcc },
      { k: 'sc_opt', p: v.calcPrice * 1.1, o: Math.min(98, v.calcOcc + 10) }
    ];
    var head = '<tr><th scope="col"></th>' + sc.map(function (s) {
      return '<th scope="col"' + (s.k === 'sc_base' ? ' class="is-base"' : '') + '>' + t(s.k) + '</th>';
    }).join('') + '</tr>';
    function row(label, fn) {
      return '<tr><th scope="row">' + label + '</th>' + sc.map(function (s) {
        return '<td' + (s.k === 'sc_base' ? ' class="is-base"' : '') + '>' + fn(s) + '</td>';
      }).join('') + '</tr>';
    }
    el('calcScenarios').innerHTML = '<thead>' + head + '</thead><tbody>' +
      row(t('sc_price'), function (s) { return fmt(s.p); }) +
      row(t('sc_occ'), function (s) { return Math.round(s.o) + '%'; }) +
      row(t('sc_month'), function (s) { return fmt(model(s.p, s.o, v).net * u / 12); }) +
      row(t('sc_year'), function (s) { return fmt(model(s.p, s.o, v).net * u); }) +
      '</tbody>';
  }

  function renderRent(v, b, months, rentNetUnit, u) {
    setText('calcRentTitle', t('rent_title'));
    var box = el('calcRentBody');
    if (rentNetUnit == null) {
      box.innerHTML = '<p class="calc-muted">' + t('rent_empty') + '</p>';
      return;
    }
    var diff = (b.net - rentNetUnit) * u;
    var need = rentNetUnit + b.expYear;               /* gross × keep must reach this */
    var bePrice = b.nights > 0 && b.keep > 0 ? need / (b.nights * b.keep) : null;
    var beNights = v.calcPrice > 0 && b.keep > 0 ? need / (v.calcPrice * b.keep) : Infinity;
    var beOcc = beNights / 365 * 100;
    var beat = months.filter(function (m) { return m.net > rentNetUnit / 12; }).length;
    box.innerHTML =
      '<dl class="calc-rent__grid">' +
        '<div><dt>' + t('rent_str') + '</dt><dd>' + fmt(b.net * u) + '</dd></div>' +
        '<div><dt>' + t('rent_net') + '</dt><dd>' + fmt(rentNetUnit * u) + '</dd></div>' +
      '</dl>' +
      '<p class="calc-rent__verdict">' + (diff >= 0
        ? t('rent_diff_more', { d: fmt(diff) })
        : t('rent_diff_less', { d: fmt(-diff) })) + '</p>' +
      '<ul class="calc-rent__list">' +
        (bePrice != null ? '<li>' + t('rent_be_price', { p: fmt(bePrice) }) + '</li>' : '') +
        '<li>' + (beOcc <= 100 ? t('rent_be_occ', { o: Math.ceil(beOcc) }) : t('rent_be_occ_na')) + '</li>' +
        '<li>' + t('rent_months', { k: beat }) + '</li>' +
      '</ul>';
  }

  function renderPayback(v, b, rentNetUnit, u) {
    var wrap = el('calcPayback');
    if (!(v.calcFurnish > 0)) { wrap.hidden = true; return; }
    wrap.hidden = false;
    setText('calcPayTitle', t('pay_title'));
    var cost = v.calcFurnish * u;
    var gain = (rentNetUnit != null ? b.net - rentNetUnit : b.net) * u / 12;
    var msg;
    if (gain <= 0) msg = rentNetUnit != null ? t('pay_never') : t('pay_never_net');
    else msg = t(rentNetUnit != null ? 'pay_months_rent' : 'pay_months', { c: fmt(cost), m: Math.ceil(cost / gain) });
    setText('calcPayText', msg);
  }

  /* ── shareable link: the inputs travel in the query string ─────────── */
  function shareUrl(v) {
    var p = new URLSearchParams();
    Object.keys(FIELDS).forEach(function (id) {
      var f = FIELDS[id];
      if (v[id] !== f.def) p.set('calc_' + f.q, String(v[id]));
    });
    var qs = p.toString();
    return location.origin + location.pathname + (qs ? '?' + qs : '') + '#calculator';
  }
  var lastUrl = '';
  function syncUrlPreview(v) { lastUrl = shareUrl(v); }

  function loadFromUrl() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return false; }
    var any = false;
    Object.keys(FIELDS).forEach(function (id) {
      var raw = p.get('calc_' + FIELDS[id].q);
      if (raw == null) return;
      var n = toNumber(raw);
      if (isNaN(n)) return;
      el(id).value = fmtInput(clamp(n, FIELDS[id]));
      any = true;
    });
    return any;
  }

  /* ── wiring ────────────────────────────────────────────────────────── */
  var engaged = false;
  function pushEvent(name, extra) {
    window.dataLayer = window.dataLayer || [];
    var data = { event: name, page_language: lang() };
    if (extra) Object.keys(extra).forEach(function (k) { data[k] = extra[k]; });
    window.dataLayer.push(data);
  }
  function onInput(e) {
    /* a slider and its text field mirror each other */
    var id = e.target.getAttribute('data-calc-sync');
    if (id) {
      el(id).value = fmtInput(toNumber(e.target.value));
    } else {
      var slider = root.querySelector('[data-calc-sync="' + e.target.id + '"]');
      var n = toNumber(e.target.value);
      if (slider && !isNaN(n)) slider.value = String(n);
    }
    if (!engaged) { engaged = true; pushEvent('calculator_engaged'); }
    render();
  }

  root.querySelectorAll('input').forEach(function (inp) {
    inp.addEventListener('input', onInput);
    inp.addEventListener('change', function () {
      /* tidy the typed value once the visitor leaves the field */
      var f = FIELDS[inp.id];
      if (!f) return;
      var n = toNumber(inp.value);
      var val = isNaN(n) ? f.def : clamp(n, f);
      inp.value = fmtInput(val);
      var slider = root.querySelector('[data-calc-sync="' + inp.id + '"]');
      if (slider) slider.value = String(val);
      render();
    });
  });

  /* chart tooltip: one element, moved to the hovered or focused month */
  var plotEl = el('calcChartPlot'), tipEl = el('calcChartTip');
  function showTip(col) {
    if (!col || !col.getAttribute) return;
    var text = col.getAttribute('data-tip');
    if (!text) return;
    tipEl.textContent = text;
    tipEl.classList.add('is-on');
    var pr = plotEl.getBoundingClientRect(), cr = col.getBoundingClientRect();
    var x = cr.left + cr.width / 2 - pr.left;
    var half = tipEl.offsetWidth / 2;
    tipEl.style.left = Math.min(Math.max(x, half), pr.width - half) + 'px';
  }
  function hideTip() { tipEl.classList.remove('is-on'); }
  function colOf(e) { return e.target.closest ? e.target.closest('.calc-chart__col') : null; }
  plotEl.addEventListener('mouseover', function (e) { showTip(colOf(e)); });
  plotEl.addEventListener('focusin', function (e) { showTip(colOf(e)); });
  plotEl.addEventListener('mouseleave', hideTip);
  plotEl.addEventListener('focusout', hideTip);

  /* Enter in a field must not submit the page */
  var form = el('calcForm');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

  var cta = el('calcCta');
  if (cta) cta.addEventListener('click', function () {
    pushEvent('calculator_cta_click');
    var open = el('openLead');
    if (open) open.click();
    else location.hash = '#contact';
  });

  var copyBtn = el('calcCopy'), copyStatus = el('calcCopyStatus');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var url = lastUrl || shareUrl(read());
    function done(ok) {
      copyStatus.textContent = ok ? t('copied') : t('copy_fail');
      if (ok) pushEvent('calculator_link_copied');
      setTimeout(function () { copyStatus.textContent = ''; }, 3500);
    }
    try { history.replaceState(null, '', url); } catch (e) {}
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  var printBtn = el('calcPrint');
  if (printBtn) printBtn.addEventListener('click', function () {
    /* the printout shows every input and the monthly table */
    var opened = [el('calcTableWrap'), el('calcAdvanced')].filter(function (d) { return d && !d.open; });
    opened.forEach(function (d) { d.open = true; });
    document.body.classList.add('is-printing-calc');
    window.print();
    document.body.classList.remove('is-printing-calc');
    opened.forEach(function (d) { d.open = false; });
  });

  if (loadFromUrl()) {
    /* a shared link opens the advanced settings it relies on */
    var adv = el('calcAdvanced');
    var advIds = ['calcComm', 'calcFee', 'calcExp', 'calcRent', 'calcRentExp', 'calcFurnish'];
    if (adv && advIds.some(function (id) { return toNumber(el(id).value) !== FIELDS[id].def; })) adv.open = true;
  }
  Object.keys(FIELDS).forEach(function (id) {
    var n = toNumber(el(id).value);
    el(id).value = fmtInput(isNaN(n) ? FIELDS[id].def : n);
  });
  root.querySelectorAll('[data-calc-sync]').forEach(function (s) {
    s.value = String(toNumber(el(s.getAttribute('data-calc-sync')).value));
  });

  window.addEventListener('the8house:language-change', render);
  render();
})();
