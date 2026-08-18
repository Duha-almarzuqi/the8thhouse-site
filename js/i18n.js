(function () {
  'use strict';

  var T = {
    ar: {
      nav_about:        'من نحن',
      nav_services:     'خدماتنا',
      nav_why:          'لماذا نحن',
      nav_testimonials: 'تجارب الضيوف',
      nav_faq:          'الأسئلة الشائعة',
      nav_cta:          'تواصل معنا',
      a11y_home:        'البيت الثامن — الصفحة الرئيسية',
      a11y_main_nav:    'القائمة الرئيسية',
      a11y_mobile_nav:  'قائمة الجوال',
      a11y_menu:        'قائمة التنقل',
      a11y_lang_toggle: 'التبديل إلى الإنجليزية',
      a11y_about_image: 'مدخل عقار سكني احترافي بإطلالة طبيعية على أبراج الرياض',
      a11y_reviews_rating: 'تقييم 5 نجوم',
      a11y_footer_nav:  'روابط التذييل',
      a11y_sbc_logo:    'المركز السعودي للأعمال',
      a11y_form_progress: 'تقدم النموذج',
      a11y_whatsapp:    'تواصل معنا عبر واتساب',

      hero_label_city:  'الرياض',
      hero_label_since: ' · منذ 2019',
      hero_title_main:  'شريككم في إدارة وتشغيل العقارات',
      hero_title_rest:  'من تقييم الجاهزية إلى التشغيل والتقارير الشهرية',
      hero_helper:      'تملك عقارًا قائمًا؟ «سجّل عقارك». تقيّم عقارًا قبل الشراء؟ «ابدأ الشراكة» للتواصل حول ملاءمته لنموذج التشغيل.',
      hero_caption:     'إدارة احترافية · تشغيل ذكي · نمو مستدام',
      hero_cta_start:   'ابدأ الشراكة',
      hero_cta_register:'سجّل عقارك',
      contact_whatsapp_short: 'WhatsApp',

      about_label:      'لمن نخدم',
      about_title:      'للمالك اليوم،<br>وللمستثمر قبل الشراء',
      about_body:       'البيت الثامن شركة متخصصة في إدارة وتشغيل العقارات السكنية في الرياض. نعمل مع ملاك العقارات القائمة، ولمن يقيّم عقارًا قبل الشراء نراجع ملاءمته الأولية لنموذج تشغيلنا، دون توصية بالشراء أو وعد بالعائد. وبعد التعاقد نتولى التشغيل والصيانة والمتابعة والتقارير بوضوح.',
      audience_owner_title:    'لديك عقار قائم',
      audience_owner_desc:     'نراجع جاهزيته ونوضح نطاق التشغيل والخطوات التالية.',
      audience_investor_title: 'تقيّم عقارًا قبل الشراء',
      audience_investor_desc:  'نراجع ملاءمته الأولية لنموذج التشغيل دون توصية استثمارية.',
      about_image_note:         'من مراجعة الجاهزية إلى تشغيل يومي واضح',

      services_label:   'خدماتنا',
      services_title:   'تشغيل واضح،<br>من البداية إلى التقرير',
      services_intro:   'ثلاثة محاور تغطي تجهيز العقار وتشغيله ومتابعة أدائه.',
      svc1_title:       'التشغيل الكامل للعقار',
      svc1_bullets:     '<li>خطة الجاهزية والتأثيث</li><li>التصوير الاحترافي وإعداد الإعلان</li><li>إدارة الحجوزات والضيوف والتنظيف</li>',
      svc2_title:       'تقارير مالية وتشغيلية واضحة',
      svc2_bullets:     '<li>تقارير شهرية عن الإشغال والإيرادات والمصروفات المتفق عليها</li><li>تسعير ديناميكي يراعي المواسم والطلب</li>',
      svc3_title:       'حماية قيمة العقار',
      svc3_bullets:     '<li>متابعة الصيانة الوقائية</li><li>متابعة معايير استخدام تهدف إلى الحفاظ على جودة العقار ومحتوياته</li>',

      why_label:        'مؤشرات تشغيلية',
      why_stat1:        'متوسط إشغال تاريخي*',
      why_stat2:        'تقييمات ضيوف بخمس نجوم*',
      why_stat3:        'خبرة تشغيلية منذ',
      why_stat4:        'تقارير تشغيلية ومالية',
      why_value4:       'شهريًا',
      why_note:         '*نتائج تاريخية لمحفظة التشغيل المباشر منذ 2019. تختلف النتائج باختلاف العقار والموسم ولا تضمن أداء عقار جديد.',
      why_title:        'لماذا<br>البيت الثامن؟',
      why_b1_title:     'إدارة يومية متكاملة',
      why_b1_desc:      'نتولى تفاصيل التشغيل من التسعير حتى متابعة الضيف.',
      why_b2_title:     'وضوح مالي',
      why_b2_desc:      'الرسوم والتكاليف موضحة في العرض والعقد، مع تقارير شهرية.',
      why_b3_title:     'قرارات مبنية على الأداء',
      why_b3_desc:      'نراجع خطة التشغيل وفق بيانات العقار والطلب والنتائج الفعلية.',

      journey_label: 'كيف نبدأ',
      journey_title: 'من العقار إلى التشغيل في ثلاث خطوات',
      j1_title: 'المراجعة الأولية',
      j1_desc:  'نراجع تفاصيل العقار القائم أو المستهدف ونوضح ملاءمته الأولية ومتطلبات التشغيل.',
      j2_title: 'الخطة والاتفاق',
      j2_desc:  'نقدّم نطاقًا واضحًا للتجهيز والتسويق والرسوم والمسؤوليات قبل بدء العمل.',
      j3_title: 'التشغيل والمتابعة',
      j3_desc:  'نتولى التشغيل والتسعير وتجربة الضيف، مع تقارير شهرية عن الأداء وحالة العقار.',

      test_label:    'تجارب الضيوف',
      test_title:    'ما يقوله ضيوف وحدات تولّى البيت الثامن تشغيلها',
      test_sub:      'تعكس هذه المراجعات تجربة الضيف وجودة التشغيل، وليست شهادات ملاك عن العائد.',
      review4_text:  'أنصح بها وبشدة — نظيفة ومتكاملة والمضيف مرن ومتعاون. أشكره على حسن تعامله وسرعة رده. مكان العقار جميل جدًا والحي هادئ.',
      review4_name:  'منيرة',
      review4_meta:  'المملكة العربية السعودية · أغسطس 2025',

      brand_name:    'البيت الثامن',

      contact_label:    'تواصل معنا',
      contact_title:    'ابدأ شراكتك مع<br>البيت الثامن اليوم',
      contact_sub:      'سواء كنت تملك عقارًا قائمًا أو تقيّم عقارًا قبل الشراء، تواصل معنا لنوضح ملاءمته الأولية لنموذج التشغيل والخطوات التالية.',
      contact_whatsapp: '966-56-994-5365+',

      lm_eyebrow:           'استفسار عقاري',
      lm_title:             'أخبرنا عن عقارك',
      lm_sub:               'سنتواصل معك بأقرب وقت',
      lm_close:             'إغلاق النافذة',
      lm_unit_type:         'حالة التأثيث',
      lm_ptype_label:       'نوع العقار',
      lm_ptype_ph:          'اختر نوع العقار',
      lm_pt_apartment:      'شقة',
      lm_pt_floor:          'دور',
      lm_pt_villa:          'فيلا',
      lm_pt_chalet:         'شاليه',
      lm_count_label:       'عدد العقارات (اختياري)',
      lm_count_placeholder: 'مثال: 3',
      lm_rooms_label:       'عدد الغرف (اختياري)',
      lm_rooms_ph:          'مثال: 2',
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
      lm_consent:           'أوافق على تزويد البيت الثامن ببياناتي للتواصل وتقييم طلبي، وفق <a href="privacy.html" target="_blank" rel="noopener">سياسة الخصوصية</a>.',
      lm_step_property:     'بيانات العقار',
      lm_step_contact:      'بيانات التواصل',
      lm_next:              'التالي',
      lm_back:              'السابق',
      lm_sending:           'جاري الإرسال…',
      lm_success_title:     'تم إرسال طلبك',
      lm_success_sub:       'شكرًا لك، سنتواصل معك بأقرب وقت.',
      lm_close_done:        'إغلاق',
      lm_required_error:    'أكمل الحقول المطلوبة قبل المتابعة.',
      lm_positive_error:    'أدخل رقمًا صحيحًا أكبر من صفر.',
      lm_contact_error:     'أدخل وسيلة تواصل صحيحة.',
      lm_submit_error:      'تعذر إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى.',

      faq_label:  'الأسئلة الشائعة',
      faq_title:  'قبل أن تبدأ معنا',

      faq_q1: 'ما نسبة عمولتكم أو رسومكم؟',
      faq_a1: 'تُحدَّد الرسوم وآلية التسوية بعد مراجعة العقار ونطاق الخدمة، وتظهر بوضوح في العرض والعقد قبل بدء التشغيل. لا ننشر نسبة ثابتة لأنها تختلف بحسب حالة العقار ومتطلبات التشغيل.',

      faq_q2: 'هل أحتاج أن أؤثث العقار قبل التسليم؟',
      faq_a2: 'لا يلزم أن يكون العقار مؤثثًا. نوضح احتياجات التجهيز بما يلائم خطة التشغيل وتجربة الضيف، ثم يعتمد المالك الخيارات قبل التنفيذ.',

      faq_q3: 'ماذا يحدث إذا تعرّض العقار لضرر من الضيوف؟',
      faq_a3: 'نتبع إجراءات للتحقق والتوثيق بعد كل إقامة. عند حدوث تلف، نوثقه ونرفع المطالبة عبر آليات المنصة وفق شروطها، ثم ننسق الصيانة اللازمة. التعويض والتغطية يخضعان لشروط المنصة والحالة.',

      faq_q4: 'ما مدة عقد الشراكة؟',
      faq_a4: 'عادةً ما تبدأ الشراكة بعقد سنوي قابل للتجديد. نوضح المدة وآلية التجديد والالتزامات في العرض والعقد قبل بدء التشغيل.',

      faq_q5: 'هل يمكنكم مراجعة عقار قبل شرائه؟',
      faq_a5: 'نراجع ملاءمة العقار الأولية لنموذج تشغيلنا بناءً على المعلومات المتاحة، دون أن تمثل المراجعة تقييمًا عقاريًا أو توصية بالشراء أو وعدًا بالعائد.',

      footer_whatsapp: 'WhatsApp',
      footer_tagline: 'إدارة وتشغيل العقارات السكنية · الرياض',
      footer_nav1:    'التنقل',
      footer_nav2:    'تواصل',
      footer_copy:    '© 2026 البيت الثامن. جميع الحقوق محفوظة.',
      footer_cr:      'الرياض، المملكة العربية السعودية',
      footer_privacy: 'سياسة الخصوصية',

      trust_heading:     'موثوقية والتزام',
      trust_auth:        'موثّق',
      trust_active:      'نشط',
      trust_status:      'موثّق · سجل تجاري نشط',
      trust_cr:          'السجل التجاري 7041576534',
      trust_cr_label:    'C.R.',
      trust_verify_aria: 'تحقّق من السجل التجاري 7041576534 لدى وزارة التجارة (يفتح في نافذة جديدة)'
    },

    en: {
      nav_about:        'About Us',
      nav_services:     'Our Services',
      nav_why:          'Why Us',
      nav_testimonials: 'Guest Experiences',
      nav_faq:          'FAQ',
      nav_cta:          'Contact Us',
      a11y_home:        'The 8th House — Home',
      a11y_main_nav:    'Main navigation',
      a11y_mobile_nav:  'Mobile navigation',
      a11y_menu:        'Navigation menu',
      a11y_lang_toggle: 'Switch to Arabic',
      a11y_about_image: 'A professionally presented residential property entrance with a natural view of Riyadh’s skyline',
      a11y_reviews_rating: '5-star rating',
      a11y_footer_nav:  'Footer navigation',
      a11y_sbc_logo:    'Saudi Business Center',
      a11y_form_progress: 'Form progress',
      a11y_whatsapp:    'Contact us on WhatsApp',

      hero_label_city:  'Riyadh',
      hero_label_since: ' · Since 2019',
      hero_title_main:  'Your Property Operations Partner',
      hero_title_rest:  'From operational readiness to day-to-day management and monthly reporting',
      hero_helper:      'Own a property? “List Your Property.” Evaluating one before purchase? “Begin Partnership” to discuss its fit with our operating model.',
      hero_caption:     'Professional Management · Smart Operations · Sustainable Growth',
      hero_cta_start:   'Begin Partnership',
      hero_cta_register:'List Your Property',
      contact_whatsapp_short: 'WhatsApp',

      about_label:      'Who We Serve',
      about_title:      'For Today\'s Owner —<br>and the Investor Before Purchase',
      about_body:       'The 8th House specialises in managing and operating residential properties in Riyadh. We work with owners of existing properties and, for investors evaluating a property before purchase, we review its initial fit with our operating model without recommending a purchase or promising returns. After contracting, we manage operations, maintenance, performance monitoring and reporting with clarity.',
      audience_owner_title:    'You Own a Property',
      audience_owner_desc:     'We review its readiness and clarify the operating scope and next steps.',
      audience_investor_title: 'You Are Evaluating a Purchase',
      audience_investor_desc:  'We review its initial fit with our operating model without offering investment advice.',
      about_image_note:         'From readiness review to clear day-to-day operations',

      services_label:   'Our Services',
      services_title:   'Clear Operations,<br>from Setup to Reporting',
      services_intro:   'Three areas covering property setup, day-to-day operations and performance monitoring.',
      svc1_title:       'Full Property Operations',
      svc1_bullets:     '<li>Readiness and furnishing plan</li><li>Professional photography and listing setup</li><li>Booking, guest and cleaning management</li>',
      svc2_title:       'Clear Financial and Operational Reporting',
      svc2_bullets:     '<li>Monthly reports on occupancy, revenue and agreed expenses</li><li>Dynamic pricing that accounts for seasons and demand</li>',
      svc3_title:       'Protecting Property Value',
      svc3_bullets:     '<li>Preventive maintenance follow-up</li><li>Usage standards designed to help preserve property quality and furnishings</li>',

      why_label:        'Operating Indicators',
      why_stat1:        'Historical Average Occupancy*',
      why_stat2:        'Five-Star Guest Reviews*',
      why_stat3:        'Operating Experience Since',
      why_stat4:        'Financial & Operational Reports',
      why_value4:       'Monthly',
      why_note:         '*Historical results from the directly operated portfolio since 2019. Results vary by property and season and do not guarantee the performance of a new property.',
      why_title:        'Why<br>The 8th House?',
      why_b1_title:     'Integrated Daily Operations',
      why_b1_desc:      'We manage the operating details, from pricing to guest follow-up.',
      why_b2_title:     'Financial Clarity',
      why_b2_desc:      'Fees and costs are set out in the proposal and contract, with monthly reporting.',
      why_b3_title:     'Performance-Led Decisions',
      why_b3_desc:      'We review the operating plan using property data, demand and actual results.',

      journey_label: 'How We Start',
      journey_title: 'From Property to Operations in Three Steps',
      j1_title: 'Initial Review',
      j1_desc:  'We review the existing or target property and clarify its initial fit and operating requirements.',
      j2_title: 'Plan and Agreement',
      j2_desc:  'We set out a clear scope for setup, marketing, fees and responsibilities before work begins.',
      j3_title: 'Operations and Follow-Up',
      j3_desc:  'We manage operations, pricing and the guest experience, with monthly reports on performance and property condition.',

      test_label:    'Guest Experiences',
      test_title:    'What Guests of Units Operated by The 8th House Say',
      test_sub:      'These reviews reflect the guest experience and operating quality; they are not owner testimonials about returns.',
      review4_text:  'Highly recommended — clean, fully equipped, and the host is flexible and helpful. Thank you for the warm service and quick responses. The property is in a lovely location and the neighbourhood is quiet.',
      review4_name:  'Munira',
      review4_meta:  'Saudi Arabia · August 2025',

      brand_name:    'The 8th House',

      contact_label:    'Contact Us',
      contact_title:    'Begin Your Partnership with<br>The 8th House Today',
      contact_sub:      'Whether you own an existing property or are evaluating one before purchase, contact us to discuss its initial fit with our operating model and the next steps.',
      contact_whatsapp: '+966-56-994-5365',

      lm_eyebrow:           'Property Inquiry',
      lm_title:             'Tell Us About Your Property',
      lm_sub:               "We'll get back to you as soon as possible",
      lm_close:             'Close window',
      lm_unit_type:         'Furnishing',
      lm_ptype_label:       'Property Type',
      lm_ptype_ph:          'Select property type',
      lm_pt_apartment:      'Apartment',
      lm_pt_floor:          'Floor',
      lm_pt_villa:          'Villa',
      lm_pt_chalet:         'Chalet',
      lm_count_label:       'Number of Properties (optional)',
      lm_count_placeholder: 'e.g. 3',
      lm_rooms_label:       'Number of Rooms (optional)',
      lm_rooms_ph:          'e.g. 2',
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
      lm_consent:           'I consent to The 8th House using my details to contact me and review my request, per the <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>.',
      lm_step_property:     'Property Details',
      lm_step_contact:      'Contact Details',
      lm_next:              'Next',
      lm_back:              'Back',
      lm_sending:           'Sending…',
      lm_success_title:     'Request Sent',
      lm_success_sub:       'Thank you. We will contact you shortly.',
      lm_close_done:        'Close',
      lm_required_error:    'Complete the required fields before continuing.',
      lm_positive_error:    'Enter a valid number greater than zero.',
      lm_contact_error:     'Enter valid contact details.',
      lm_submit_error:      'We could not send your request. Check your connection and try again.',

      faq_label:  'FAQ',
      faq_title:  'Before You Get Started',

      faq_q1: 'What is your commission or fee structure?',
      faq_a1: 'Fees and settlement terms are determined after reviewing the property and service scope. They are stated clearly in the proposal and contract before operations begin. We do not publish one fixed rate because requirements vary by property.',

      faq_q2: 'Do I need to furnish my property before handing it over?',
      faq_a2: 'The property does not need to be furnished. We identify setup needs that support the operating plan and guest experience, and the owner approves the options before implementation.',

      faq_q3: 'What happens if guests damage my property?',
      faq_a3: 'We follow verification and documentation procedures after each stay. If damage occurs, we document it, submit a claim through the platform under its terms, and coordinate the required maintenance. Compensation and coverage depend on the platform terms and the specific case.',

      faq_q4: 'How long is the partnership contract?',
      faq_a4: 'Partnerships typically begin with a renewable one-year contract. The term, renewal mechanism and obligations are clarified in the proposal and contract before operations begin.',

      faq_q5: 'Can you review a property before I purchase it?',
      faq_a5: 'We review the property\'s initial fit with our operating model using the available information. This is not a property valuation, purchase recommendation or promise of returns.',

      footer_whatsapp: 'WhatsApp',
      footer_tagline: 'Residential Property Operations · Riyadh',
      footer_nav1:    'Navigation',
      footer_nav2:    'Contact',
      footer_copy:    '© 2026 The 8th House. All rights reserved.',
      footer_cr:      'Riyadh, Saudi Arabia',
      footer_privacy: 'Privacy Policy',

      trust_heading:     'Trust & Compliance',
      trust_auth:        'Authenticated',
      trust_active:      'Active',
      trust_status:      'Authenticated · Active Registration',
      trust_cr:          'Commercial Registration 7041576534',
      trust_cr_label:    'C.R.',
      trust_verify_aria: 'Verify commercial registration 7041576534 at the Ministry of Commerce (opens in a new window)'
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

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (t[key] !== undefined) el.setAttribute('alt', t[key]);
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

    try {
      window.dispatchEvent(new CustomEvent('the8house:language-change', {
        detail: { lang: lang }
      }));
    } catch (e) {}
  }

  function initI18n() {
    var saved;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    applyLang(saved || 'ar');

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var cur  = document.documentElement.lang || 'ar';
        var next = cur === 'ar' ? 'en' : 'ar';

        document.body.style.transition = 'opacity .18s ease';
        document.body.style.opacity = '0';

        setTimeout(function () {
          applyLang(next);
          document.body.style.opacity = '1';
          setTimeout(function () {
            document.body.style.transition = '';
          }, 200);
        }, 180);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
})();
