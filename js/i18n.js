(function () {
  'use strict';

  var T = {
    ar: {
      nav_about:        'من نحن',
      nav_services:     'خدماتنا',
      nav_why:          'لماذا نحن',
      nav_testimonials: 'آراء العملاء',
      nav_cta:          'تواصل معنا',

      hero_label:       'الرياض · منذ 2019',
      hero_title_main:  'شريككم الاستراتيجي',
      hero_title_rest:  'في تشغيل الشقق المؤثثة',
      hero_cta_start:   'ابدأ الشراكة',
      hero_cta_register:'سجّل عقارك',

      about_label:      'من نحن',
      about_title:      'شراكة حقيقية<br>مع ملاك الشقق المؤثثة',
      about_body:       '"البيت الثامن" شركة متخصصة في إدارة وتشغيل الشقق السكنية المؤثثة بمدينة الرياض. نقدّم للمُلّاك حلول تشغيل متكاملة تضمن لهم نسبة إشغال عالية، تشغيل احترافي وصيانة مستمرة للعقار، مع شفافية كاملة في التقارير والعوائد.',
      about_pillar_1:   'إشغال عالٍ',
      about_pillar_2:   'تشغيل احترافي',
      about_pillar_3:   'شفافية كاملة',

      vm_vision_title:  'رؤيتنا',
      vm_mission_title: 'رسالتنا',

      values_title: 'قيمنا',
      v1_name: 'الموثوقية',
      v1_desc: 'نحرص على بناء علاقة ثقة طويلة الأمد مع المُلّاك.',
      v2_name: 'الشفافية',
      v2_desc: 'نوفر تقارير واضحة وصادقة بلا تكاليف مخفية.',
      v3_name: 'الابتكار',
      v3_desc: 'نعتمد على أنظمة تسعير وتقنيات تشغيل حديثة ترفع العوائد.',
      v4_name: 'الاحترافية',
      v4_desc: 'نلتزم بأعلى معايير الضيافة الاحترافية وإدارة العقار.',
      v5_name: 'الاستدامة',
      v5_desc: 'نحافظ على قيمة العقار وجودته عبر الصيانة الوقائية المستمرة.',
      v6_name: 'الشراكة',
      v6_desc: 'نعتبر عقارات المُلّاك جزءاً من استثماراتنا ونعمل لتحقيق نموها.',

      property_label:   'مساحاتنا',
      property_title:   'نماذج من شققنا<br>في حي الملقا · الرياض',
      property_bedroom: 'غرفة النوم',
      property_living:  'غرفة المعيشة',
      property_relax:   'جلسة الاسترخاء',

      services_label:   'خدماتنا',
      services_title:   'خدمات البيت الثامن<br>للمُلاك',
      svc1_title:       'التشغيل الكامل للعقار',
      svc2_title:       'إدارة مالية شفافة',
      svc3_title:       'حماية قيمة العقار',

      why_label:        'أرقامنا',
      why_stat1:        'متوسط نسبة الإشغال',
      why_stat2:        'تقييمات 5 نجوم',
      why_stat3:        'دعم مستمر',
      why_stat4:        'سنوات خبرة',
      why_title:        'مزايا البيت الثامن<br>للمُلاك',
      why_b1_title:     'دخل مستمر',
      why_b1_desc:      'رفع نسب الإشغال وتحقيق أعلى عائد.',
      why_b2_title:     'راحة كاملة',
      why_b2_desc:      'نحن ندير كل التفاصيل التشغيلية.',
      why_b3_title:     'احترافية تشغيلية',
      why_b3_desc:      'فريق متخصص في إدارة وتأجير الشقق.',
      why_b4_title:     'شفافية مالية',
      why_b4_desc:      'تقارير واضحة، بدون أي تكاليف مخفية.',
      why_b5_title:     'شراكة طويلة الأمد',

      journey_title: 'رحلة العميل معنا',
      j1_title: 'الاستفسار والتواصل',
      j2_title: 'المعاينة والتقييم',
      j3_title: 'توقيع العقد',
      j4_title: 'التأثيث والتجهيز',
      j5_title: 'الإطلاق والتسويق',
      j6_title: 'إدارة الحجوزات والضيوف',
      j7_title: 'التقارير والعوائد',

      test_label:    'آراء العملاء',
      test_title:    'ماذا يقول ضيوفنا',

      essence_title: 'جوهر شراكتنا',

      footer_tagline: 'إدارة وتشغيل الشقق المؤثثة · الرياض',
      footer_nav1:    'التنقل',
      footer_nav2:    'تواصل',
      footer_copy:    '© 2025 البيت الثامن. جميع الحقوق محفوظة.',
      footer_cr:      'سجل تجاري 7041576534 · الرياض'
    },

    en: {
      nav_about:        'About Us',
      nav_services:     'Our Services',
      nav_why:          'Why Us',
      nav_testimonials: 'Guest Reviews',
      nav_cta:          'Contact Us',

      hero_label:       'Riyadh · Since 2019',
      hero_title_main:  'Your Strategic Partner',
      hero_title_rest:  'in Furnished Apartment Management',
      hero_cta_start:   'Begin Partnership',
      hero_cta_register:'List Your Property',

      about_label:      'About Us',
      about_title:      'A True Partnership<br>with Furnished Apartment Owners',
      about_body:       'The 8th House specialises in the management and operation of furnished residential apartments in Riyadh. We provide owners with comprehensive operational solutions that ensure high occupancy rates, professional management, continuous property maintenance, and full transparency in reports and returns.',
      about_pillar_1:   'High Occupancy',
      about_pillar_2:   'Professional Management',
      about_pillar_3:   'Full Transparency',

      vm_vision_title:  'Our Vision',
      vm_mission_title: 'Our Mission',

      values_title: 'Our Values',
      v1_name: 'Reliability',
      v1_desc: 'We build long-term trust with every property owner we partner with.',
      v2_name: 'Transparency',
      v2_desc: 'Clear, honest reporting with no hidden costs — ever.',
      v3_name: 'Innovation',
      v3_desc: 'Dynamic pricing systems and modern operations technology to maximise returns.',
      v4_name: 'Professionalism',
      v4_desc: 'Committed to the highest standards of hospitality and property management.',
      v5_name: 'Sustainability',
      v5_desc: 'Preserving property value and quality through continuous preventive maintenance.',
      v6_name: 'Partnership',
      v6_desc: "We treat every owner's property as part of our own portfolio — invested in its growth.",

      property_label:   'Our Spaces',
      property_title:   'A Glimpse of Our Apartments<br>in Al Malqa · Riyadh',
      property_bedroom: 'Master Bedroom',
      property_living:  'Living Room',
      property_relax:   'Lounge Area',

      services_label:   'Our Services',
      services_title:   'The 8th House Services<br>for Property Owners',
      svc1_title:       'Full Property Operations',
      svc2_title:       'Transparent Financial Management',
      svc3_title:       'Asset Value Protection',

      why_label:        'Our Numbers',
      why_stat1:        'Average Occupancy Rate',
      why_stat2:        'Five-Star Reviews',
      why_stat3:        'Continuous Support',
      why_stat4:        'Years of Experience',
      why_title:        'The 8th House Advantages<br>for Property Owners',
      why_b1_title:     'Steady Income',
      why_b1_desc:      'Maximising occupancy rates and delivering the highest possible return.',
      why_b2_title:     'Complete Peace of Mind',
      why_b2_desc:      "We manage every operational detail, so you don't have to.",
      why_b3_title:     'Operational Excellence',
      why_b3_desc:      'A specialist team dedicated to apartment management and leasing.',
      why_b4_title:     'Financial Transparency',
      why_b4_desc:      'Clear reports with absolutely no hidden costs.',
      why_b5_title:     'Long-Term Partnership',

      journey_title: 'Your Journey With Us',
      j1_title: 'Initial Enquiry',
      j2_title: 'Property Assessment',
      j3_title: 'Contract Signing',
      j4_title: 'Furnishing & Setup',
      j5_title: 'Launch & Marketing',
      j6_title: 'Booking & Guest Management',
      j7_title: 'Reports & Returns',

      test_label:    'Guest Reviews',
      test_title:    'What Our Guests Say',

      essence_title: 'The Essence of Our Partnership',

      footer_tagline: 'Furnished Apartment Management · Riyadh',
      footer_nav1:    'Navigation',
      footer_nav2:    'Contact',
      footer_copy:    '© 2025 The 8th House. All rights reserved.',
      footer_cr:      'Commercial Registration 7041576534 · Riyadh'
    }
  };

  function applyLang(lang) {
    var t = T[lang] || T.ar;

    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'عر';

    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  function initI18n() {
    var saved;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    applyLang(saved || 'ar');

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var cur = document.documentElement.lang || 'ar';
        applyLang(cur === 'ar' ? 'en' : 'ar');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
})();
