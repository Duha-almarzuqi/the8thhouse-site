(function () {
  'use strict';

  var T = {
    ar: {
      nav_about:        'من نحن',
      nav_services:     'خدماتنا',
      nav_why:          'لماذا نحن',
      nav_testimonials: 'آراء العملاء',
      nav_cta:          'تواصل معنا',

      hero_label_city:  'الرياض',
      hero_label_since: ' · منذ 2019',
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
      vm_vision_body:   'أن نكون الاختيار الأول لمُلّاك الشقق في الرياض، عبر تحويل عقاراتهم إلى أصول عالية العائد تُدار باحترافية وموثوقية تضاهي أرقى معايير الضيافة العالمية.',
      vm_mission_title: 'رسالتنا',
      vm_mission_body:  'في البيت الثامن رسالتنا هي إدارة وتشغيل الشقق السكنية المؤثثة باحترافية عالية، من خلال رفع نسب الإشغال، ضمان تجربة ضيافة راقية، وحماية أصول المُلّاك عبر إدارة مالية شفافة وصيانة مستمرة، لنحقق لهم دخلاً مستقراً وشراكة طويلة الأمد مبنية على الثقة.',

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
      property_dining:  'غرفة الطعام',
      property_lounge:  'صالة الاستقبال',
      property_exterior:'الواجهة الخارجية',
      property_drag:    'اسحب لاستعراض الصور',

      services_label:   'خدماتنا',
      services_title:   'خدمات البيت الثامن<br>للمُلاك',
      svc1_title:       'التشغيل الكامل للعقار',
      svc1_bullets:     '<li>تأثيث وتنسيق داخلي يناسب معايير التأجير القصير</li><li>تصوير احترافي</li><li>تسويق العقار على المنصات العالمية</li><li>إدارة الحجوزات واستقبال الضيوف</li><li>تنظيف وصيانة دورية</li>',
      svc2_title:       'إدارة مالية شفافة',
      svc2_bullets:     '<li>تقارير شهرية عن نسب الإشغال والعوائد</li><li>تسعير ديناميكي يراعي المواسم والطلب</li>',
      svc3_title:       'حماية قيمة العقار',
      svc3_bullets:     '<li>متابعة الصيانة الوقائية</li><li>ضمان معايير استخدام تحافظ على جودة الشقة ومحتوياتها</li>',

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
      why_b5_desc:      'نعتبر عقاراتكم جزءاً من استثماراتنا، ونقدم استشارات عقارية مالية لضمان نماء المحفظة الاستثمارية العقارية.',

      journey_title: 'رحلة العميل معنا',
      j1_title: 'الاستفسار والتواصل',
      j1_desc:  'يتواصل المالك معنا عبر الهاتف أو الإيميل، ونقدم له استشارة مبدئية مجانية حول خيارات تشغيل عقاره.',
      j2_title: 'المعاينة والتقييم',
      j2_desc:  'نقوم بزيارة الشقة (أو استلام تفاصيلها) وتقييم جاهزيتها للتشغيل، مع تقديم مقترح تفصيلي يتضمن التأثيث المناسب، التسويق، والعوائد المتوقعة.',
      j3_title: 'توقيع العقد',
      j3_desc:  'نبرم عقد شراكة واضح وشفاف، يحدد نسب العوائد، مسؤوليات الطرفين، وفترة التشغيل.',
      j4_title: 'التأثيث والتجهيز',
      j4_desc:  'يتم تأثيث الشقة وتنسيقها داخلياً حسب معايير Airbnb والضيافة الراقية، مع جلسة تصوير احترافية.',
      j5_title: 'الإطلاق والتسويق',
      j5_desc:  'إدراج الشقة على المنصات العالمية مثل Airbnb وتفعيل نظام التسعير الديناميكي.',
      j6_title: 'إدارة الحجوزات والضيوف',
      j6_desc:  'استقبال الضيوف، متابعة إقامتهم، التنظيف الدوري، وخدمة العملاء على مدار الساعة.',
      j7_title: 'التقارير والعوائد',
      j7_desc:  'تزويد المالك بتقارير شهرية شفافة عن نسب الإشغال، العوائد، وحالة العقار.',

      test_label:    'آراء العملاء',
      test_title:    'ماذا يقول ضيوفنا',

      essence_title: 'جوهر شراكتنا',

      brand_name:    'البيت الثامن',

      contact_label:    'تواصل معنا',
      contact_title:    'ابدأ شراكتك مع<br>البيت الثامن اليوم',
      contact_sub:      'أخبرنا عن عقارك وسنشرح لك بالتفصيل كيف نعمل وما الذي يمكنك توقعه كل شهر.',
      contact_whatsapp: 'واتساب · 966-56-994-5365+',

      lm_eyebrow:           'استفسار عقاري',
      lm_title:             'أخبرنا عن عقارك',
      lm_sub:               'سنتواصل معك بأقرب وقت',
      lm_close:             'إغلاق النافذة',
      lm_unit_type:         'نوع الوحدة',
      lm_count_label:       'عدد الشقق',
      lm_count_placeholder: 'مثال: 3',
      lm_nbhd_label:        'الحي · الرياض',
      lm_nbhd_placeholder:  'اختر الحي',
      lm_nbhd_search:       'ابحث عن حي...',
      lm_group_north:       'شمال الرياض',
      lm_group_central:     'وسط الرياض',
      lm_group_east:        'شرق الرياض',
      lm_group_west:        'غرب الرياض',
      lm_group_south:       'جنوب الرياض',
      lm_no_results:        'لا توجد نتائج',
      lm_name_label:        'الاسم',
      lm_name_placeholder:  'اسمك الكريم',
      lm_contact_pref:      'وسيلة التواصل المفضلة',
      lm_wa:                'واتساب',
      lm_call:              'مكالمة',
      lm_email:             'إيميل',
      lm_phone_label:       'رقم الجوال',
      lm_submit:            'إرسال الطلب',

      footer_whatsapp: 'واتساب',
      footer_tagline: 'إدارة وتشغيل الشقق المؤثثة · الرياض',
      footer_nav1:    'التنقل',
      footer_nav2:    'تواصل',
      footer_copy:    '© 2025 البيت الثامن. جميع الحقوق محفوظة.',
      footer_cr:      'سجل تجاري 7041576534 · الرياض'
    },

    en: {
      nav_about:        'About Us',
      nav_services:     'Our Services',
      nav_why:          'Why Us',
      nav_testimonials: 'Guest Reviews',
      nav_cta:          'Contact Us',

      hero_label_city:  'Riyadh',
      hero_label_since: ' · Since 2019',
      hero_title_main:  'Your Strategic Partner',
      hero_title_rest:  'in Operating Furnished Apartments',
      hero_cta_start:   'Begin Partnership',
      hero_cta_register:'List Your Property',

      about_label:      'Who We Are',
      about_title:      'A True Partnership<br>with Furnished Apartment Owners',
      about_body:       'The 8th House specialises in the management and operation of furnished residential apartments in Riyadh. We provide owners with comprehensive operational solutions that ensure high occupancy rates, professional management, continuous property maintenance, and full transparency in reports and returns.',
      about_pillar_1:   'High Occupancy',
      about_pillar_2:   'Professional Management',
      about_pillar_3:   'Full Transparency',

      vm_vision_title:  'Our Vision',
      vm_vision_body:   'To be the first choice for apartment owners in Riyadh — transforming their properties into high-yield assets managed with the professionalism and reliability that matches the finest global hospitality standards.',
      vm_mission_title: 'Our Mission',
      vm_mission_body:  'At The 8th House, our mission is to manage and operate furnished residential apartments with the highest level of professionalism — raising occupancy rates, ensuring a premium hospitality experience, and protecting owners\' assets through transparent financial management and ongoing maintenance, delivering a stable income stream built on a long-term partnership of trust.',

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
      property_dining:  'Dining Room',
      property_lounge:  'Reception Hall',
      property_exterior:'Building Exterior',
      property_drag:    'Drag to explore',

      services_label:   'Our Services',
      services_title:   'The 8th House Services<br>for Property Owners',
      svc1_title:       'Full Property Operations',
      svc1_bullets:     '<li>Furnishing and interior styling to short-term rental standards</li><li>Professional photography</li><li>Listing the property on global platforms</li><li>Booking management and guest reception</li><li>Regular cleaning and maintenance</li>',
      svc2_title:       'Transparent Financial Management',
      svc2_bullets:     '<li>Monthly reports on occupancy rates and returns</li><li>Dynamic pricing that accounts for seasons and demand</li>',
      svc3_title:       'Asset Value Protection',
      svc3_bullets:     '<li>Preventive maintenance monitoring</li><li>Usage standards that preserve apartment quality and its contents</li>',

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
      why_b5_desc:      'We consider your property part of our portfolio and provide real estate financial advisory to ensure portfolio growth.',

      journey_title: 'Customer Journey',
      j1_title: 'Initial Enquiry',
      j1_desc:  'The owner contacts us by phone or email, and we provide a free initial consultation on their property\'s management options.',
      j2_title: 'Property Assessment',
      j2_desc:  'We visit the apartment (or receive its details) and assess its operational readiness, with a detailed proposal covering furnishing, marketing, and expected returns.',
      j3_title: 'Contract Signing',
      j3_desc:  'We establish a clear and transparent partnership agreement specifying return rates, responsibilities of both parties, and the management period.',
      j4_title: 'Furnishing & Setup',
      j4_desc:  'The apartment is furnished and styled by the owner according to Airbnb and premium hospitality standards, followed by a professional photography session.',
      j5_title: 'Launch & Marketing',
      j5_desc:  'The apartment is listed on global platforms such as Airbnb with dynamic pricing activated.',
      j6_title: 'Booking & Guest Management',
      j6_desc:  'Guest reception, stay management, regular cleaning, and round-the-clock customer service.',
      j7_title: 'Reports & Returns',
      j7_desc:  'The owner receives transparent monthly reports on occupancy rates, returns, and property condition.',

      test_label:    'Guest Reviews',
      test_title:    'What Our Guests Say',

      essence_title: 'The Essence of Our Partnership',

      brand_name:    'The 8th House',

      contact_label:    'Contact Us',
      contact_title:    'Begin Your Partnership<br>with The 8th House Today',
      contact_sub:      "Tell us about your property and we'll explain in detail how we work and what you can expect each month.",
      contact_whatsapp: 'WhatsApp · +966-56-994-5365',

      lm_eyebrow:           'Property Inquiry',
      lm_title:             'Tell Us About Your Property',
      lm_sub:               "We'll get back to you as soon as possible",
      lm_close:             'Close window',
      lm_unit_type:         'Unit Type',
      lm_count_label:       'Number of Units',
      lm_count_placeholder: 'e.g. 3',
      lm_nbhd_label:        'District · Riyadh',
      lm_nbhd_placeholder:  'Select District',
      lm_nbhd_search:       'Search district...',
      lm_group_north:       'North Riyadh',
      lm_group_central:     'Central Riyadh',
      lm_group_east:        'East Riyadh',
      lm_group_west:        'West Riyadh',
      lm_group_south:       'South Riyadh',
      lm_no_results:        'No results found',
      lm_name_label:        'Name',
      lm_name_placeholder:  'Your name',
      lm_contact_pref:      'Preferred Contact Method',
      lm_wa:                'WhatsApp',
      lm_call:              'Phone Call',
      lm_email:             'Email',
      lm_phone_label:       'Phone Number',
      lm_submit:            'Submit Request',

      footer_whatsapp: 'WhatsApp',
      footer_tagline: 'Furnished Apartment Management · Riyadh',
      footer_nav1:    'Navigation',
      footer_nav2:    'Contact',
      footer_copy:    '© 2025 The 8th House. All rights reserved.',
      footer_cr:      'Commercial Registration 7041576534 · Riyadh'
    }
  };

  var NBHD = {
    'الملقا':              'Al Malqa',
    'النرجس':             'Al Narjis',
    'العليا':              'Al Olaya',
    'حطين':               'Hittin',
    'الياسمين':           'Al Yasmin',
    'الغدير':             'Al Ghadir',
    'القيروان':           'Al Qirawan',
    'الرحمانية':          'Al Rahmaniyah',
    'العقيق':             'Al Aqiq',
    'الإزدهار':           'Al Izdihar',
    'الصحافة':            'Al Sahafa',
    'المحمدية':           'Al Muhammadiyah',
    'قرطبة':              'Qurtuba',
    'الندى':              'Al Nada',
    'الخزامى':            'Al Khuzama',
    'العارض':             'Al Arid',
    'الجنادرية':          'Al Janadriyah',
    'النخيل':             'Al Nakhil',
    'الربيع':             'Al Rabie',
    'الريان':             'Al Rayan',
    'الأندلس':            'Al Andalus',
    'إشبيلية':            'Ishbiliyah',
    'المرجان':            'Al Murjan',
    'الجوهرة':            'Al Jawharah',
    'الواحة':             'Al Waha',
    'البساتين':           'Al Basatin',
    'الوادي':             'Al Wadi',
    'المنار':             'Al Manar',
    'السفارات':           'Al Safarat',
    'الورود':             'Al Wurud',
    'العزيزية':           'Al Aziziyah',
    'الروضة':             'Al Rawdah',
    'الحمراء':            'Al Hamra',
    'المنصورة':           'Al Mansura',
    'النزهة':             'Al Nuzha',
    'الفلاح':             'Al Falah',
    'الفيحاء':            'Al Fayha',
    'السليمانية':         'Al Sulaymaniyah',
    'الوزارات':           'Al Wizarat',
    'المربع':             'Al Muraba',
    'الملز':              'Al Malaz',
    'المروج':             'Al Muruj',
    'الزهرة':             'Al Zahrah',
    'الفيصلية':           'Al Faisaliyah',
    'صلاح الدين':         'Salah Al-Din',
    'اليرموك':            'Al Yarmouk',
    'القادسية':           'Al Qadisiyah',
    'الضباط':             'Al Dubat',
    'المرسلات':           'Al Mursalat',
    'المصيف':             'Al Masif',
    'الناصرية':           'Al Nasriyah',
    'الفرسان':            'Al Fursan',
    'الكوثر':             'Al Kawthar',
    'المعذر':             'Al Muadhar',
    'الخليج':             'Al Khalij',
    'الربوة':             'Al Rabwah',
    'النسيم':             'Al Naseem',
    'المشاعل':            'Al Mashaiel',
    'الشفاء':             'Al Shifa',
    'الرماية':            'Al Rimayah',
    'النهضة':             'Al Nahdah',
    'الحناء':             'Al Hana',
    'أم الحمام الشرقي':  'Umm Al Hamam East',
    'البديعة':            'Al Badeah',
    'المعادن':            'Al Maadn',
    'لبن':                'Laban',
    'عرقة':               'Arqa',
    'الشهداء':            'Al Shuhada',
    'الحزم':              'Al Hazm',
    'الرمال':             'Al Rimal',
    'طويق':               'Tuwaiq',
    'ديراب':              'Dirab',
    'الدار البيضاء':      'Al Dar Al Baida',
    'أم الحمام الغربي':  'Umm Al Hamam West',
    'الثليم':             'Al Thulaim',
    'المهدية':            'Al Muhaidib',
    'نمار':               'Namar',
    'الرفيعة':            'Al Rafiah',
    'بدر':                'Badr',
    'الحائر':             'Al Haer',
    'عكاظ':               'Okaz',
    'الشعلة':             'Al Shuala',
    'منفوحة':             'Manfuhah',
    'منفوحة الجديدة':    'New Manfuhah',
    'الجزيرة':            'Al Jazirah',
    'العود':              'Al Oud',
    'الشميسي':            'Al Shumaisi',
    'البطحاء':            'Al Batha',
    'الديرة':             'Al Dirah',
    'دخنة':               'Dakhna',
    'السلام':             'Al Salam',
    'التضامن':            'Al Tadamun',
    'الجنوبية':           'Al Janubiyah',
    'شبرا':               'Shubra',
    'خشم العان':          'Khashm Al Aan',
    'أخرى':               'Other'
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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    document.querySelectorAll('.nbhd__opt').forEach(function (el) {
      var ar = el.getAttribute('data-ar') || el.textContent.trim();
      if (!el.getAttribute('data-ar')) el.setAttribute('data-ar', ar);
      el.textContent = lang === 'en' ? (NBHD[ar] || ar) : ar;
    });

    var nbhdVal = document.getElementById('lm-nbhd-val');
    var nbhdDisplay = document.getElementById('nbhdDisplay');
    if (nbhdDisplay && t['lm_nbhd_placeholder'] && (!nbhdVal || !nbhdVal.value)) {
      nbhdDisplay.textContent = t['lm_nbhd_placeholder'];
    }

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
