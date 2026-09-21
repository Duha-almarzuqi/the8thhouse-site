#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
يبني صفحات الهبوط الإعلانية الخمس من قالب واحد.

لماذا مولِّد لا خمسة ملفات مكتوبة يدوياً: الصفحات تتشارك القالب والنموذج
وأرقام الإثبات والتذييل. تعديل يدوي في خمسة ملفات يعني أربعة ملفات تتخلّف
عن الخامس. عدِّل المحتوى هنا ثم شغّل:

    python3 tools/build-landing-pages.py

المرجع الاستراتيجي (الكلمات، نصوص الإعلانات، ربط كل مجموعة بصفحتها):
THE-EIGHTH-HOUSE-MARKEITING-SYSTEM/marketing/campaigns/google-ads-2026Q4/
TH8-Google-Ads-Relaunch-Plan.md
"""

import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FORM_ACTION = ('https://docs.google.com/forms/d/e/'
               '1FAIpQLSciuc8CHx66MutIu7deGtbAZAlXZNeQJIvkhynpNA5eiXTg-A/formResponse')
GTM_ID = 'GTM-WWZN2QVH'
WA = 'https://wa.me/966569945365'
TEL = 'tel:+966569945365'
TEL_TEXT = '+966 56 994 5365'

CSP = ("default-src 'self'; "
       "script-src 'self' https://www.googletagmanager.com https://www.googleadservices.com "
       "https://googleads.g.doubleclick.net; "
       "style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; "
       "connect-src 'self' https://docs.google.com https://www.googletagmanager.com "
       "https://www.google-analytics.com https://region1.google-analytics.com "
       "https://analytics.google.com https://stats.g.doubleclick.net "
       "https://www.googleadservices.com https://googleads.g.doubleclick.net "
       "https://www.google.com https://www.google.com.sa; "
       "frame-src https://www.googletagmanager.com; "
       "form-action 'self' https://docs.google.com; base-uri 'self'; object-src 'none'; "
       "frame-ancestors 'none'; upgrade-insecure-requests")

# أرقام معتمدة فقط — لا يُضاف رقم هنا دون اعتماد المؤسِّس
PROOF = [
    ('متوسط الإشغال', '83.6%'),
    ('تقييم 5 نجوم', '96.6%'),
    ('خدمة الضيوف', '24/7'),
    ('سنوات الخبرة', '6'),
]

PTYPES = ['شقة', 'دور', 'فيلا', 'شاليه']


def read_nbhd_options():
    """أحياء الرياض — تُقرأ من index.html كي تبقى قائمة واحدة لا نسختان.

    القيم يجب أن تطابق ما يقبله نموذج Google حرفياً: الإرسال يتم بوضع
    no-cors، فأي قيمة يرفضها النموذج تُرفض بصمت بلا رسالة خطأ.
    """
    src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    start = src.index('<ul class="nbhd__list"')
    block = src[start:src.index('</ul>', start)]
    out, open_group = [], False
    for kind, val in re.findall(r'<li class="nbhd__(group|opt)"[^>]*>([^<]+)</li>', block):
        val = val.strip()
        if kind == 'group':
            if open_group:
                out.append('            </optgroup>')
            out.append('            <optgroup label="%s">' % val)
            open_group = True
        else:
            out.append('              <option>%s</option>' % val)
    if open_group:
        out.append('            </optgroup>')
    return '\n'.join(out)


def form_html(page, nbhd_options):
    ptype_options = '\n'.join(
        '            <option>%s</option>' % t for t in PTYPES)
    return """      <form id="lpForm" action="{action}" method="POST" novalidate>

        <fieldset class="lp-field">
          <legend>حالة العقار</legend>
          <div class="lp-toggle">
            <input type="radio" id="lp-furn-y" name="entry.1461119662" value="مؤثثة" required>
            <label for="lp-furn-y">مؤثثة</label>
            <input type="radio" id="lp-furn-n" name="entry.1461119662" value="غير مؤثثة">
            <label for="lp-furn-n">غير مؤثثة</label>
          </div>
          <span class="lp-err" data-error-for="lp-furnished"></span>
        </fieldset>

        <div class="lp-field">
          <label for="lp-ptype">نوع العقار</label>
          <select id="lp-ptype" name="entry.1042187207" required>
            <option value="" selected>اختر نوع العقار</option>
{ptypes}
          </select>
          <span class="lp-err" data-error-for="lp-ptype"></span>
        </div>

        <div class="lp-field">
          <label for="lp-nbhd">{nbhd_label}</label>
          <select id="lp-nbhd" name="entry.1923592827" required>
            <option value="" selected>اختر الحي</option>
{nbhds}
          </select>
          <span class="lp-err" data-error-for="lp-nbhd"></span>
        </div>

        <div class="lp-field">
          <label for="lp-name">الاسم</label>
          <input type="text" id="lp-name" name="entry.280690203" autocomplete="name"
                 maxlength="60" placeholder="اسمك الكريم" required>
          <span class="lp-err" data-error-for="lp-name"></span>
        </div>

        <div class="lp-field">
          <label for="lp-contact">رقم الجوال</label>
          <input type="tel" id="lp-contact" name="entry.1132443070" autocomplete="tel"
                 inputmode="tel" maxlength="20" placeholder="05xxxxxxxx" required>
          <span class="lp-err" data-error-for="lp-contact"></span>
        </div>

        <!-- فخّ البوتات — يبقى فارغاً ولا يراه زائر حقيقي -->
        <div class="lp-hp" aria-hidden="true">
          <label for="lp-website">لا تملأ هذا الحقل</label>
          <input type="text" id="lp-website" name="b_website_url" tabindex="-1" autocomplete="off">
        </div>

        <!-- ثلاثة حقول يَسِمها نموذج Google بـ«مطلوب». نقطة formResponse لا
             تفرض الوسم فعلياً (صفوف في شيت الردود وصلت بعدد عقارات وغرف
             فارغين)، لكن ذلك مُثبت لقيمة فارغة مُرسَلة لا لمفتاح محذوف —
             فتُرسَل فارغة كي تطابق الحمولة شكل الصفحة الرئيسية المُثبت.
             لا تُملأ بقيم افتراضية: ما لم يقله الزائر لا يُكتب عنه. -->
        <input type="hidden" name="entry.1884290589" value="">
        <input type="hidden" name="entry.147340700"  value="">
        <input type="hidden" name="entry.25795692"   value="">

        <!-- حقول يشترطها نموذج Google — قيمها مطابقة للصفحة الرئيسية -->
        <input type="hidden" name="fvv"             value="1">
        <input type="hidden" name="fbzx"            value="-3082437196889274287">
        <input type="hidden" name="pageHistory"     value="0,1">
        <input type="hidden" name="partialResponse" value="[null,null,&quot;-3082437196889274287&quot;]">

        <!-- حقول الإسناد الإعلاني — يملؤها lp.js من رابط الدخول -->
        <input type="hidden" name="entry.1297321048" id="lp-track-gclid">
        <input type="hidden" name="entry.1510685919" id="lp-track-utm-source">
        <input type="hidden" name="entry.1086051536" id="lp-track-utm-medium">
        <input type="hidden" name="entry.1763201425" id="lp-track-utm-campaign">
        <input type="hidden" name="entry.1163407617" id="lp-track-utm-content">
        <input type="hidden" name="entry.1477231513" id="lp-track-utm-term">
        <input type="hidden" name="entry.458334860"  id="lp-track-page-language">
        <input type="hidden" name="entry.1394281815" id="lp-track-landing-page">

        <label class="lp-consent">
          <input type="checkbox" id="lp-consent" required>
          <span>أوافق على معالجة بياناتي للتواصل معي وتقييم طلبي، ومشاركتها مع مزوّد
            المنصة (Google) كمعالِج، وفق <a href="../privacy.html" target="_blank"
            rel="noopener">سياسة الخصوصية</a>. يمكنني سحب موافقتي في أي وقت.</span>
        </label>
        <span class="lp-err" data-error-for="lp-consent"></span>

        <button class="lp-btn" type="submit" id="lpSubmit">{cta}</button>
        <p class="lp-status" id="lpStatus" role="status" aria-live="polite" tabindex="-1"></p>
        <p class="lp-fine">تفضّل التواصل المباشر؟
          <a href="{wa}" rel="noopener noreferrer">راسلنا على واتساب</a> أو اتصل على
          <a href="{tel}" style="direction:ltr; unicode-bidi:isolate;">{tel_text}</a>.</p>
      </form>

      <div class="lp-done" id="lpDone" role="status" aria-live="polite" tabindex="-1" hidden>
        <h2>تم استلام طلبك</h2>
        <p>{done}</p>
        <p><a href="{wa}" rel="noopener noreferrer">راسلنا على واتساب</a> إن أردت تسريع الرد.</p>
      </div>""".format(
        action=FORM_ACTION,
        ptypes=ptype_options,
        nbhds=nbhd_options,
        nbhd_label=page.get('nbhd_label', 'الحي · الرياض'),
        cta=page['cta'],
        done=page['done'],
        wa=WA, tel=TEL, tel_text=TEL_TEXT)


def build(page, nbhd_options):
    proof = '\n'.join(
        '        <div><dt>%s</dt><dd>%s</dd></div>' % (label, value)
        for label, value in PROOF)

    steps = '\n'.join(
        '        <li>\n          <h3>%s</h3>\n          <p>%s</p>\n        </li>' % (t, b)
        for t, b in page['steps'])

    items = '\n'.join(
        '        <li><strong>%s</strong> — %s</li>' % (t, b)
        for t, b in page['items'])

    faq = '\n'.join(
        '      <details class="lp-faq">\n'
        '        <summary>%s</summary>\n'
        '        <p>%s</p>\n'
        '      </details>' % (q, a)
        for q, a in page['faq'])

    note = ('\n  <!-- %s -->' % page['note']) if page.get('note') else ''

    return """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <!-- صفحة هبوط إعلانية: تُستثنى من فهرسة البحث كي لا تنافس الصفحة
       الرئيسية عضوياً. الاستثناء لا يؤثر على تقييم Google Ads لتجربة الصفحة. -->
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://the8house.sa/{slug}/">
  <meta name="theme-color" content="#1A0B2E">
  <meta http-equiv="Content-Security-Policy" content="{csp}">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://the8house.sa/{slug}/">
  <meta property="og:title"       content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:locale"      content="ar_SA">
  <meta property="og:site_name"   content="البيت الثامن | The 8th House">

  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="preload" as="font" type="font/woff2" href="../assets/fonts/cairo-arabic.woff2" crossorigin>
  <link rel="stylesheet" href="../css/lp.css?v=1">
  <script src="../js/gtm.js" defer></script>
  <script src="../js/lp.js" defer></script>
</head>
<body>{note}

  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={gtm}"
    height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>

  <header class="lp-head">
    <div class="lp-head__in">
      <a href="../" aria-label="البيت الثامن — الصفحة الرئيسية">
        <img src="../assets/logo-final.png" width="300" height="110" alt="البيت الثامن">
      </a>
      <a class="lp-tel" href="{tel}">{tel_text}</a>
    </div>
  </header>

  <main>
    <section class="lp-hero">
      <div class="wrap lp-hero__grid">
        <div>
          <p class="lp-eyebrow">{eyebrow}</p>
          <h1>{h1}</h1>
          <p class="lp-sub">{sub}</p>
          <p class="lp-qual">{qual}</p>
        </div>

        <div class="lp-card" id="lp-form">
          <h2>{form_title}</h2>
          <p class="lp-card__note">{form_note}</p>
{form}
        </div>
      </div>
    </section>

    <section class="lp-proof">
      <dl class="lp-proof__grid">
{proof}
      </dl>
    </section>

    <section class="wrap" id="كيف-نعمل">
      <h2 class="lp-h">{steps_title}</h2>
      <p class="lp-lede">{steps_lede}</p>
      <ol class="lp-steps">
{steps}
      </ol>
    </section>

    <section class="wrap">
      <h2 class="lp-h">{items_title}</h2>
      <p class="lp-lede">{items_lede}</p>
      <ul class="lp-list">
{items}
      </ul>
    </section>

    <section class="wrap" id="الأسئلة">
      <h2 class="lp-h">أسئلة يسألها الملّاك</h2>
{faq}
    </section>

    <section class="lp-cta-band">
      <div class="wrap">
        <h2 class="lp-h">{band_title}</h2>
        <p class="lp-lede" style="margin-inline:auto;">{band_sub}</p>
        <a class="lp-btn" href="#lp-form" style="text-decoration:none; display:block; max-width:330px; margin-inline:auto; text-align:center;">{cta}</a>
      </div>
    </section>
  </main>

  <footer class="lp-foot">
    <div class="wrap">
      <p><strong>شركة البيت الثامن للخدمات العقارية</strong> · The 8th House Real Estate Services</p>
      <p>سجل تجاري <span class="ltr">1009093403</span> · الرقم الموحّد <span class="ltr">7041576534</span> · الرياض — حي حطين</p>
      <p><a href="mailto:info@the8house.sa">info@the8house.sa</a> ·
         <a class="ltr" href="{tel}">{tel_text}</a> ·
         <a href="../privacy.html">سياسة الخصوصية</a> ·
         <a href="../">الموقع الرئيسي</a></p>
    </div>
  </footer>

  <div class="lp-sticky">
    <a href="#lp-form">{cta}</a>
  </div>

</body>
</html>
""".format(
        title=page['title'], desc=page['desc'], slug=page['slug'], csp=CSP, gtm=GTM_ID,
        tel=TEL, tel_text=TEL_TEXT, note=note,
        eyebrow=page['eyebrow'], h1=page['h1'], sub=page['sub'], qual=page['qual'],
        form_title=page['form_title'], form_note=page['form_note'],
        form=form_html(page, nbhd_options), proof=proof,
        steps_title=page['steps_title'], steps_lede=page['steps_lede'], steps=steps,
        items_title=page['items_title'], items_lede=page['items_lede'], items=items,
        faq=faq, band_title=page['band_title'], band_sub=page['band_sub'], cta=page['cta'])


def main():
    from lp_content import PAGES
    nbhd = read_nbhd_options()
    for page in PAGES:
        d = os.path.join(ROOT, page['slug'])
        if not os.path.isdir(d):
            os.makedirs(d)
        path = os.path.join(d, 'index.html')
        html = build(page, nbhd)
        io.open(path, 'w', encoding='utf-8').write(html)
        sys.stdout.write('%-28s %6d bytes\n' % (page['slug'] + '/index.html', len(html.encode('utf-8'))))


if __name__ == '__main__':
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    main()
