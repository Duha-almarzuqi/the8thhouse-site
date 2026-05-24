# The 8th House — Brand Design System

## رؤية بصرية
المرجع: Four Seasons, Rosewood, Aman + هوية البيت الثامن الرسمية
الإحساس: Quiet luxury, cinematic, atmospheric, editorial
الجمهور: ملاك العقارات الفاخرة في الرياض

## Color Tokens (CSS Variables — استخدم هذي بالضبط)

:root {
  --purple-royal: #2B1556;
  --purple-deep: #1A0B2E;
  --black-midnight: #0A0612;
  --gold: #C5A572;
  --gold-soft: #D4B585;
  --off-white: #F5F1EB;
  --text-muted: rgba(245, 241, 235, 0.7);
}

## Background System (إلزامي)

جميع الـ sections يجب أن تستخدم تدرج بنفسجي-أسود:

background: linear-gradient(135deg, #2B1556 0%, #1A0B2E 60%, #0A0612 100%);

- Hero: تدرج قطري من upper-left بنفسجي إلى lower-right أسود
- باقي السكشنات: تدرج عمودي من #1A0B2E إلى #0A0612
- ممنوع منعاً باتاً: أي خلفية بيضاء، رمادية، أو فاتحة

## Background Images

استخدم صور معمارية من Unsplash لكل سكشن:

- Hero: صورة ناطحات سحاب الرياض من زاوية منخفضة (low-angle skyscrapers)
  مثال: https://source.unsplash.com/1920x1080/?riyadh,skyscraper,architecture

- من نحن: صورة باب فاخر داكن أو لوبي فندق
  مثال: https://source.unsplash.com/1920x1080/?luxury,door,dark

- خدماتنا: صورة معمارية حديثة من الداخل
  مثال: https://source.unsplash.com/1920x1080/?modern,architecture,interior

- لماذا نحن: صورة مبنى فاخر ليلاً
  مثال: https://source.unsplash.com/1920x1080/?luxury,building,night

طبّق على كل صورة:
- background-blend-mode: multiply
- background-color: rgba(43, 21, 86, 0.85)
- opacity للصورة نفسها: 0.4-0.6
- بحيث تطلع الصورة مغمورة بالبنفسجي

## Typography

- العناوين الرئيسية (h1, h2):
  color: var(--gold);
  font-weight: 300;
  letter-spacing: 0.02em;

- النصوص العادية:
  color: var(--off-white);
  font-weight: 400;
  line-height: 1.8;

- النصوص الثانوية:
  color: var(--text-muted);
  font-weight: 300;

## Decorative Elements

- خطوط ذهبية أفقية رفيعة (1px) كفواصل بين العناصر
- إطارات ذهبية حول البطاقات: border: 1px solid rgba(197, 165, 114, 0.3)
- زاوية البطاقات: border-radius: 4px

## Numbers / Stats

الأرقام الكبيرة (مثل 83.6%):
- font-size: 4-6rem
- color: var(--gold)
- font-weight: 300
- جنب الرقم خط ذهبي أفقي رفيع

## Forbidden

❌ ألوان فاتحة أو مشبعة
❌ خلفيات بيضاء أو رمادية
❌ تدرجات غير بنفسجية
❌ uppercase للنصوص العربية الطويلة
❌ ظلال ثقيلة
❌ تأثيرات neon أو glow قوية

## RTL Support

- direction: rtl على body
- text-align: right للعربي
- الأيقونات والأسهم تتجه يمين-يسار
