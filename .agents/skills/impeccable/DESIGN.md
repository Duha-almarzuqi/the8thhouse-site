# The 8th House — Brand Design System

## رؤية بصرية
المرجع: Aman, Rosewood, Four Seasons (morning lobby aesthetic)
الإحساس: Quiet luxury, cream-based, light and airy, editorial, trustworthy
الجمهور: ملاك العقارات الفاخرة في الرياض

## Color Tokens (CSS Variables — استخدم هذي بالضبط)

:root {
  /* Backgrounds — light is the foundation */
  --cream:          #F5F1EB;   /* primary section bg */
  --warm-beige:     #EAE3D7;   /* card / alternate section bg */
  --soft-ivory:     #FAF7F2;   /* alternate section bg */
  --warm-white:     #FFFEFA;   /* hero + highlights */

  /* Purple — accent & text only, NOT backgrounds */
  --purple-royal:   #2B1556;   /* headings + primary text */
  --purple-deep:    #1A0B2E;   /* footer background only */
  --midnight:       #0A0612;   /* drawer background only */

  /* Gold — borders, decorative numbers, icons ONLY */
  --gold:           #C5A572;
  --gold-soft:      #D4B585;
  --gold-dim:       rgba(197,165,114,.55);
  --gold-rule:      rgba(197,165,114,.3);

  /* Text on light backgrounds */
  --text-primary:   #2B1556;   /* headings (contrast 14:1 on cream) */
  --text-secondary: #4A3D5C;   /* body text (contrast ~7:1 on cream) */
  --text-muted:     #8A7E96;   /* subdued / label text */
  --text-ghost:     #B8AECB;   /* decorative small text */

  /* off-white kept for footer/drawer explicit light text */
  --off-white:      #F5F1EB;
}

## Background System (إلزامي)

الخلفيات الفاتحة هي الأساس — البنفسجي كلون تمييز فقط:

- Hero:          var(--warm-white) → var(--cream) gradient
- من نحن:        var(--soft-ivory)
- شريط proof:   var(--warm-beige)
- مساحاتنا:      var(--warm-beige)
- خدماتنا:       var(--cream)
- لماذا نحن:     var(--soft-ivory)
- آراء العملاء:  var(--warm-white)
- تواصل:         var(--cream)
- الفوتر:        var(--purple-deep) — الوحيد الداكن (يعطي إغلاق بصري)

ممنوع منعاً باتاً: خلفيات بنفسجية أو سوداء في أي section عدا الفوتر والـ drawer.

## Background Images

الصور الحقيقية لمساحاتنا في assets/img/ — لا تستخدم صور Unsplash.

Hero: assets/img/hero-arch.jpg (ممر معماري درامي)
من نحن: assets/img/apt-lounge.jpg
مساحاتنا: apt-bedroom.jpg, apt-living.jpg, apt-fireplace.jpg

طبّق على صور الخلفية في الـ hero:
- mix-blend-mode: multiply
- opacity: 0.28
- وراء veil فاتح (cream translucent)

## Typography

- العناوين الرئيسية (h1, h2):
  color: var(--text-primary);   /* #2B1556 */
  font-weight: 300;
  letter-spacing: .02em;

- النصوص العادية:
  color: var(--text-secondary); /* #4A3D5C */
  font-weight: 400;
  line-height: 1.8;

- النصوص الثانوية / الـ labels:
  color: var(--text-muted);     /* #8A7E96 */
  font-weight: 300;

- نص الفوتر والـ drawer: قيم صريحة rgba(245,241,235,x) — لا تعتمد على المتغيرات العامة

## Decorative Elements

- خطوط ذهبية أفقية رفيعة (1px) كفواصل: rgba(197,165,114,.3)
- إطارات ذهبية خفيفة حول البطاقات: rgba(197,165,114,.2)
- ظل ناعم على البطاقات: 0 4px 20px rgba(43,21,86,.05)
- زاوية البطاقات: border-radius: 4px

## Numbers / Stats

الأرقام الكبيرة (مثل 83.6%):
- font-size: 3-5rem
- color: var(--text-primary)   /* بنفسجي لا ذهبي — يجتاز WCAG AA */
- font-weight: 300
- جنب الرقم خط ذهبي رفيع كعنصر زخرفي فقط

## WCAG Contrast Rules (إلزامي)

✅ --text-primary  (#2B1556) على cream   → 14:1 ✓
✅ --text-secondary (#4A3D5C) على cream  → ~7:1  ✓
✅ --text-muted (#8A7E96) على cream      → ~3.6:1 ✓ (للنصوص الكبيرة uppercase)
❌ --gold (#C5A572) على cream            → ~2.2:1 ✗ — ممنوع كنص، للزخرفة فقط

## Forbidden

❌ خلفيات بنفسجية أو سوداء في الـ sections الرئيسية
❌ --gold كلون نص على خلفيات فاتحة
❌ overlay داكنة على sections الفاتحة
❌ ظلال ثقيلة
❌ neon أو glow

## RTL Support

- direction: rtl على body
- text-align: right للعربي
- الفوتر والـ drawer يحتفظان بألوانهما الداكنة مع نص فاتح صريح
