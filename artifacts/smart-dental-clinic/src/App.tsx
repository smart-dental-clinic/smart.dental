import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartHandshake,
  Image as ImageIcon,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import clinicLogo from '@assets/0_Gemini_Generated_Image_mjjqx7mjjqx7mjjq_1787768235413.png';
import treatmentRoom from '@assets/0_tempImagein9XmF_1787768350652.png';
import secondRoom from '@assets/0_0f03a1af-e2ee-47d5-9d9b-e989b06fcd40_1787768450528.JPG';
import imagingRoom from '@assets/0_tempImagemeKyY9_1787768474622.png';
import receptionRoom from '@assets/0_tempImage1NFqaC_1787768542212.png';
import smileBeforeAfter from '@assets/smd_webb_1790529490006.jpeg';

type Language = 'en' | 'ar';
type Localized = { en: string; ar: string };
type Service = { id: string; title: Localized; description: Localized; icon: typeof Stethoscope };
type Testimonial = { quote: Localized; name: string; detail: Localized };

const services: Service[] = [
  { id: 'comprehensive', title: { en: 'Comprehensive dental care', ar: 'رعاية أسنان شاملة' }, description: { en: 'Thoughtful check-ups, prevention, and a clear plan for your long-term oral health.', ar: 'فحوصات دقيقة ووقاية وخطة واضحة للحفاظ على صحة فمك على المدى الطويل.' }, icon: Stethoscope },
  { id: 'implants', title: { en: 'Dental implants', ar: 'زراعة الأسنان' }, description: { en: 'Carefully planned implant solutions designed to restore comfort, confidence, and function.', ar: 'حلول زراعة مدروسة لاستعادة الراحة والثقة والقدرة على المضغ.' }, icon: ShieldCheck },
  { id: 'cosmetic', title: { en: 'Cosmetic dentistry', ar: 'تجميل الأسنان' }, description: { en: 'Personalized smile treatments that enhance your natural features with a refined result.', ar: 'علاجات مخصصة لتحسين ابتسامتك والحفاظ على مظهر طبيعي وأنيق.' }, icon: Sparkles },
  { id: 'endodontics', title: { en: 'Endodontics', ar: 'علاج جذور الأسنان' }, description: { en: 'Precise root canal care focused on relieving discomfort and protecting your natural tooth.', ar: 'علاج دقيق لجذور الأسنان يركز على تخفيف الألم والحفاظ على أسنانك الطبيعية.' }, icon: Stethoscope },
  { id: 'family', title: { en: 'Family dentistry', ar: 'طب أسنان العائلة' }, description: { en: 'Comfort-first visits for little teeth, growing smiles, and everyone in between.', ar: 'زيارات مريحة للأطفال والعائلات ولكل ابتسامة في أي مرحلة من العمر.' }, icon: Baby },
  { id: 'emergency', title: { en: 'Emergency visits', ar: 'الزيارات الطارئة' }, description: { en: 'When something hurts, we make room to help you feel steady again.', ar: 'عندما تشعر بالألم، نخصص لك موعداً يساعدك على استعادة راحتك بسرعة.' }, icon: HeartHandshake },
];

const testimonials: Testimonial[] = [
  { quote: { en: 'The first dental appointment my daughter walked out of smiling about.', ar: 'كان هذا أول موعد أسنان تخرج منه ابنتي وهي تبتسم.' }, name: 'Rana A.', detail: { en: 'Mother of two · Shafa Badran', ar: 'أم لطفلين · شفا بدران' } },
  { quote: { en: 'Clear advice, no pressure, and a dentist who actually listened to what I was worried about.', ar: 'نصائح واضحة بلا ضغط، وطبيب استمع فعلاً إلى ما يقلقني.' }, name: 'Omar K.', detail: { en: 'Patient · Amman', ar: 'مريض · عمّان' } },
  { quote: { en: 'It feels like a neighborhood clinic in the best possible way — warm, precise, and genuinely kind.', ar: 'إنها عيادة قريبة من القلب — دافئة، دقيقة، ولطيفة بصدق.' }, name: 'Lina M.', detail: { en: 'Patient · Al Jubaiha', ar: 'مريضة · الجبيهة' } },
];

const days = [
  { value: 'Saturday', en: 'Saturday', ar: 'السبت' },
  { value: 'Sunday', en: 'Sunday', ar: 'الأحد' },
  { value: 'Monday', en: 'Monday', ar: 'الاثنين' },
  { value: 'Tuesday', en: 'Tuesday', ar: 'الثلاثاء' },
  { value: 'Wednesday', en: 'Wednesday', ar: 'الأربعاء' },
  { value: 'Thursday', en: 'Thursday', ar: 'الخميس' },
];

const content = {
  en: {
    topLocation: 'Shafa Badran, Amman',
     hours: 'Sat–Thu · 10:00–17:00',
    nav: { clinic: 'The clinic', care: 'Care', dentist: 'Your dentist', visit: 'Visit us', appointment: 'Request an appointment', book: 'Book a visit', switch: 'العربية', close: 'Close menu', open: 'Open menu' },
    hero: { eyebrow: 'A considered kind of dentistry', title: <>A calmer way to care for your <em>smile.</em></>, lede: 'Modern dental care, quietly personal. Take your time, ask every question, and leave with a plan that makes sense.', primary: 'Request an appointment', secondary: 'Discover Smart Dental', note: 'Private care for individuals, couples, and growing families.', meta: 'Natural light, panoramic views, and a clinical team that never rushes the conversation.', room: 'THE ROOM TO BREATHE', scroll: 'Scroll to explore' },
    intro: { lead: 'The detail is in the difference.', body: 'Smart Dental Clinic is a refined, neighborhood practice in Shafa Badran — designed around comfort, clear communication, and care you can trust.' },
    story: { eyebrow: 'The Smart Dental difference', title: <>Care that starts with <span>listening.</span></>, body: 'There is no rushing people through our door. Whether you are here for a routine clean, a child’s first visit, or a second opinion, we build the plan with you — in clear language, at a pace that feels right.', values: [['Warm, never rushed', 'More conversation. Less clinical distance.'], ['Thoughtful, evidence-led', 'Modern tools, conservative choices.'], ['Honest about options', 'Know the why, the how, and the cost.'], ['Made for families', 'Small comforts that make a big difference.']], photo: 'First impressions matter.' },
    gallery: { eyebrow: 'Inside Smart Dental', title: <>A space made for <em>ease.</em></>, body: 'Bright rooms, considered details, and technology that stays quietly in the background.', captions: ['The treatment room', 'Clearer answers', 'Welcome in'] },
    services: { eyebrow: 'Care, made clear', title: 'A calm plan for every kind of smile.', body: 'From prevention to implants, cosmetic care, and endodontics, every treatment is tailored to the person sitting in the chair.', action: 'Talk to our team', link: 'Start with a conversation' },
    care: { eyebrow: 'What your visit feels like', title: 'No surprises. Just a clear next step.', lede: 'We believe knowing what happens next is part of feeling cared for.', steps: [['Tell us what brought you in', 'A relaxed conversation before we do anything else.'], ['Understand your options', 'We show you what we see and explain it without jargon.'], ['Leave with a plan', 'One practical next step — and someone to call if you need us.']], kicker: 'Technology, thoughtfully used', titleOverlay: <>Clear answers. <em>Gentle hands.</em></>, foot: 'Modern imaging supports better conversations about your care.' },
    doctor: { eyebrow: 'The person behind the care', title: <>A dentist who <span>remembers.</span></>, body: 'Dr. Suhaib believes a good dental visit is a partnership. He brings a careful clinical eye, a light touch, and the kind of patience that helps children open up and adults ask the questions they usually hold back.', credentials: ['Member of the Jordanian Dental Implant Organisation', 'Family care focused', 'Arabic & English'], button: 'Meet Dr. Suhaib' },
     voices: { eyebrow: 'From our patients', title: 'Patient reviews.', body: 'Trust is built one comfortable appointment at a time.', side: 'Real words from patients who trusted us with their care.', reviewButton: 'Leave a review', reviewHelp: 'Share your experience on our Google Business Profile.', previous: 'Previous patient review', next: 'Next patient review', stars: '5 out of 5 stars' },
     visit: { eyebrow: 'Find your way here', title: 'Your neighborhood dentist, right in Shafa Badran.', body: 'Easy to find, easy to reach, and close to home. We are in Al Ittifaq Complex on Al Arrab Street.', location: 'Exact location', address: <>Al Arrab Street, Al Ittifaq Complex<br />Shafa Badran, Amman, Jordan</>, hours: 'Clinic hours', hoursValue: <>Saturday–Thursday · 10:00 am–5:00 pm<br />Friday · Holiday</>, phone: 'Call the clinic', whatsapp: 'Message us on WhatsApp', maps: 'Open in maps', close: 'You are close.' },
    appointment: { eyebrow: 'Take the first step', title: <>Your smile has a place <em>here.</em></>, body: 'Tell us a little about what you need. Our team will call to find a time that works for you — usually within one working day.', aside: 'Welcome to our clinic. We look forward to meeting you.', formKicker: 'REQUEST A VISIT', formIntro: 'We will be in touch personally.', name: 'Your name', namePlaceholder: 'e.g. Dana Al-Hadidi', phone: 'Phone number', phonePlaceholder: '07 9xxx xxxx', service: 'What can we help with?', servicePlaceholder: 'Choose a service', day: 'Preferred day', dayPlaceholder: 'Choose a day', message: 'Anything you would like us to know?', optional: '(optional)', messagePlaceholder: 'A little context helps us prepare for you.', privacy: 'Your details stay with our clinic team and are only used to arrange your visit.', submit: 'Request my appointment', error: 'Please add your name and a phone number so we can reach you.', success: 'Thank you,', successBody: 'Your request is with our team. We will call', confirm: 'to confirm a suitable time.', another: 'Send another request' },
     footer: { blurb: 'Thoughtful dental care for the people and families of Amman.', explore: 'Explore', clinic: 'The clinic', services: 'Our services', dentist: 'Your dentist', visit: 'Visit', location: 'Location & hours', appointment: 'Request a visit', phone: 'Call +962 7 7975 7377', whatsapp: 'WhatsApp us', details: 'Clinic details', hours: 'Sat–Thu · 10 am–5 pm · Friday holiday', call: 'Call', book: 'Book a visit', find: 'Find us', copyright: '© 2024 Smart Dental Clinic · Amman, Jordan' },
  },
  ar: {
    topLocation: 'شفا بدران، عمّان',
     hours: 'السبت–الخميس · 10:00–17:00',
    nav: { clinic: 'العيادة', care: 'خدماتنا', dentist: 'طبيبك', visit: 'موقعنا', appointment: 'احجز موعداً', book: 'احجز زيارة', switch: 'English', close: 'إغلاق القائمة', open: 'فتح القائمة' },
    hero: { eyebrow: 'رعاية أسنان مدروسة', title: <>طريقة أكثر هدوءاً للعناية <em>بابتسامتك.</em></>, lede: 'رعاية أسنان حديثة بلمسة شخصية. خذ وقتك، اطرح كل أسئلتك، وغادر بخطة واضحة ومناسبة لك.', primary: 'احجز موعداً', secondary: 'اكتشف سمارت دينتال', note: 'رعاية خاصة للأفراد والأزواج والعائلات.', meta: 'إضاءة طبيعية وإطلالات بانورامية وفريق طبي لا يستعجل الحديث معك.', room: 'مساحة تمنحك الراحة', scroll: 'اكتشف المزيد' },
    intro: { lead: 'التفاصيل تصنع الفرق.', body: 'سمارت دينتال عيادة أسنان راقية في شفا بدران، صُممت حول راحتك والتواصل الواضح والرعاية التي تستحق ثقتك.' },
    story: { eyebrow: 'ما يميز سمارت دينتال', title: <>رعاية تبدأ <span>بالاستماع.</span></>, body: 'لا نستعجل أي شخص يدخل عيادتنا. سواء كنت هنا لتنظيف دوري أو لأول زيارة لطفلك أو للحصول على رأي آخر، نبني الخطة معك بلغة واضحة وبالسرعة التي تناسبك.', values: [['دافئة بلا استعجال', 'حديث أكثر ومسافة طبية أقل.'], ['مدروسة ومبنية على الدليل', 'أدوات حديثة وخيارات محافظة.'], ['صريحة حول الخيارات', 'اعرف السبب والطريقة والتكلفة.'], ['مناسبة للعائلات', 'تفاصيل صغيرة تصنع فرقاً كبيراً.']], photo: 'الانطباع الأول مهم.' },
    gallery: { eyebrow: 'داخل سمارت دينتال', title: <>مساحة صُممت <em>لراحتك.</em></>, body: 'غرف مشرقة وتفاصيل مدروسة وتقنيات حديثة تبقى بهدوء في الخلفية.', captions: ['غرفة العلاج', 'إجابات أوضح', 'أهلاً بكم'] },
    services: { eyebrow: 'رعاية واضحة', title: 'خطة هادئة لكل ابتسامة.', body: 'من الوقاية إلى زراعة الأسنان وتجميلها وعلاج الجذور، نخصص كل علاج للشخص الجالس على كرسي العيادة.', action: 'تحدث مع فريقنا', link: 'ابدأ بحوار' },
    care: { eyebrow: 'كيف ستكون زيارتك', title: 'لا مفاجآت. فقط خطوة تالية واضحة.', lede: 'نؤمن أن معرفة ما سيحدث تالياً جزء من شعورك بالاهتمام.', steps: [['أخبرنا بما أتى بك', 'حديث مريح قبل أن نفعل أي شيء آخر.'], ['افهم خياراتك', 'نوضح ما نراه ونشرحه دون مصطلحات معقدة.'], ['غادر بخطة', 'خطوة عملية تالية وشخص تتواصل معه عند الحاجة.']], kicker: 'تقنيات نستخدمها بعناية', titleOverlay: <>إجابات أوضح. <em>ولطف أكثر.</em></>, foot: 'التصوير الحديث يساعدنا على التحدث معك بوضوح عن رعايتك.' },
    doctor: { eyebrow: 'الشخص خلف هذه الرعاية', title: <>طبيب أسنان <span>يتذكرك.</span></>, body: 'يؤمن الدكتور صهيب بأن زيارة الأسنان الجيدة هي شراكة. يجمع بين النظرة السريرية الدقيقة واللمسة اللطيفة والصبر الذي يساعد الأطفال على الانفتاح ويشجع الكبار على طرح أسئلتهم.', credentials: ['عضو في المنظمة الأردنية لزراعة الأسنان', 'رعاية متخصصة للعائلات', 'العربية والإنجليزية'], button: 'تعرّف على د. صهيب' },
     voices: { eyebrow: 'من مرضانا', title: 'تقييمات المرضى.', body: 'الثقة تُبنى مع كل زيارة مريحة.', side: 'كلمات حقيقية من مرضى وثقوا بنا في رعايتهم.', reviewButton: 'أضف تقييمك', reviewHelp: 'شارك تجربتك على صفحة العيادة في Google.', previous: 'تقييم المريض السابق', next: 'تقييم المريض التالي', stars: '5 من 5 نجوم' },
     visit: { eyebrow: 'كيف تصل إلينا', title: 'طبيب أسنان قريب منك في شفا بدران.', body: 'الوصول إلينا سهل وقريب من منزلك. نحن في مجمع الاتفاق على شارع العراب.', location: 'الموقع بالتفصيل', address: <>شارع العراب، مجمع الاتفاق<br />شفا بدران، عمّان، الأردن</>, hours: 'ساعات العيادة', hoursValue: <>السبت–الخميس · 10:00 صباحاً–5:00 مساءً<br />الجمعة · عطلة</>, phone: 'اتصل بالعيادة', whatsapp: 'راسلنا عبر واتساب', maps: 'افتح الموقع على الخريطة', close: 'أنت قريب' },
    appointment: { eyebrow: 'خذ الخطوة الأولى', title: <>ابتسامتك لها مكان <em>هنا.</em></>, body: 'أخبرنا قليلاً بما تحتاجه. سيتصل بك فريقنا للعثور على وقت مناسب لك — عادة خلال يوم عمل واحد.', aside: 'أهلاً بكم في عيادتنا. نتطلع إلى لقائكم.', formKicker: 'احجز زيارة', formIntro: 'سنتواصل معك شخصياً.', name: 'الاسم', namePlaceholder: 'مثال: دانا الحديدي', phone: 'رقم الهاتف', phonePlaceholder: '07 9xxx xxxx', service: 'كيف يمكننا مساعدتك؟', servicePlaceholder: 'اختر الخدمة', day: 'اليوم المفضل', dayPlaceholder: 'اختر اليوم', message: 'هل تود إخبارنا بأي شيء؟', optional: '(اختياري)', messagePlaceholder: 'أي تفاصيل تساعدنا على الاستعداد لزيارتك.', privacy: 'تبقى بياناتك مع فريق العيادة وتُستخدم فقط لترتيب زيارتك.', submit: 'إرسال طلب الموعد', error: 'يرجى إضافة اسمك ورقم هاتف حتى نتمكن من التواصل معك.', success: 'شكراً لك،', successBody: 'تم استلام طلبك. سيتصل بك فريقنا على الرقم', confirm: 'لتأكيد الوقت المناسب.', another: 'إرسال طلب آخر' },
     footer: { blurb: 'رعاية أسنان مدروسة لأهل وعائلات عمّان.', explore: 'استكشف', clinic: 'العيادة', services: 'خدماتنا', dentist: 'طبيبك', visit: 'زيارة', location: 'الموقع والساعات', appointment: 'احجز زيارة', phone: 'اتصل +962 7 7975 7377', whatsapp: 'واتساب', details: 'تفاصيل العيادة', hours: 'السبت–الخميس · 10 صباحاً–5 مساءً · الجمعة عطلة', call: 'اتصل', book: 'احجز زيارة', find: 'موقعنا', copyright: '© 2024 Smart Dental Clinic · عمّان، الأردن' },
  },
} as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`} data-testid="brand-logo">
      <img src={clinicLogo} alt="Smart Dental Clinic" className="brand-logo-image" />
      <span className="brand-copy">
        <span className="brand-name">SMART <b>DENTAL</b></span>
        <span className="brand-caption">PRIVATE DENTAL CLINIC · AMMAN</span>
      </span>
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [serviceChoice, setServiceChoice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', service: '', day: '', message: '' });
  const c = content[language];
  const isArabic = language === 'ar';
  const heroRef = useReveal();
  const storyRef = useReveal();
  const serviceRef = useReveal();
  const careRef = useReveal();
  const doctorRef = useReveal();
  const voicesRef = useReveal();
  const visitRef = useReveal();
  const appointmentRef = useReveal();
  const reviewHref = 'https://g.page/r/CcammFOyLSh2EAI/review';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [language, isArabic]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === 'name' || field === 'phone') setFormError('');
  };

  const chooseService = (id: string) => {
    setServiceChoice(id);
    updateField('service', id);
    scrollToId('appointment');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError(c.appointment.error);
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className={`site-shell ${isArabic ? 'is-rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'} lang={language}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left"><span className="topbar-item"><MapPin size={13} /> {c.topLocation}</span><span className="topbar-item"><Clock3 size={13} /> {c.hours}</span></div>
          <div className="topbar-right"><a className="topbar-item" href="tel:+962779757377" data-testid="link-topbar-phone"><Phone size={13} /> +962 7 7975 7377</a><a className="topbar-item" href="https://wa.me/962779757377" target="_blank" rel="noreferrer" data-testid="link-topbar-whatsapp"><MessageCircle size={13} /> WhatsApp</a><span className="topbar-item topbar-ar" dir="rtl">أهلاً وسهلاً بكم</span></div>
        </div>
      </div>

      <header className="nav-wrap">
        <nav className="container navbar" aria-label={c.nav.clinic}>
          <a className="brand-link" href="#top" onClick={() => setMenuOpen(false)} data-testid="link-home"><Logo /></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link" href="#why-us" onClick={() => setMenuOpen(false)} data-testid="link-nav-about">{c.nav.clinic}</a>
            <a className="nav-link" href="#services" onClick={() => setMenuOpen(false)} data-testid="link-nav-services">{c.nav.care}</a>
            <a className="nav-link" href="#team" onClick={() => setMenuOpen(false)} data-testid="link-nav-team">{c.nav.dentist}</a>
            <a className="nav-link" href="#visit" onClick={() => setMenuOpen(false)} data-testid="link-nav-visit">{c.nav.visit}</a>
            <button className="button button-accent mobile-nav-cta" onClick={() => { setMenuOpen(false); scrollToId('appointment'); }} data-testid="button-mobile-appointment">{c.nav.appointment} <ArrowRight size={15} /></button>
          </div>
          <div className="nav-actions">
            <button className="language-toggle" onClick={() => setLanguage((current) => current === 'en' ? 'ar' : 'en')} aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'} data-testid="button-language-toggle">{c.nav.switch}</button>
            <a className="button button-primary button-small" href="#appointment" data-testid="link-nav-appointment">{c.nav.book} <CalendarDays size={15} /></a>
            <button className="menu-toggle" aria-label={menuOpen ? c.nav.close : c.nav.open} onClick={() => setMenuOpen((current) => !current)} data-testid="button-mobile-menu">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-photo"><img src={treatmentRoom} alt="Bright Smart Dental treatment room overlooking Amman" /><div className="hero-photo-shade" /></div>
          <div className="container hero-grid">
            <div ref={heroRef} className="hero-copy reveal">
              <span className="eyebrow eyebrow-light">{c.hero.eyebrow}</span>
              <h1 className="display">{c.hero.title}</h1>
              <p className="hero-lede">{c.hero.lede}</p>
              <div className="hero-actions"><button className="button button-accent" onClick={() => scrollToId('appointment')} data-testid="button-hero-appointment">{c.hero.primary} <ArrowRight size={16} /></button><a className="button button-ghost-light" href="#why-us" data-testid="link-hero-services">{c.hero.secondary} <ChevronRight size={16} /></a></div>
              <div className="hero-note"><span className="hero-note-mark"><Check size={15} /></span><span>{c.hero.note}</span></div>
            </div>
            <div className="hero-meta reveal delay-2"><div className="hero-meta-top"><span>01</span><span>{c.hero.room}</span></div><p>{c.hero.meta}</p><div className="hero-meta-bottom"><span>Al Arrab Street</span><span>{c.topLocation}</span></div></div>
          </div>
          <div className="hero-scroll"><span>{c.hero.scroll}</span><span className="scroll-line" /></div>
        </section>

        <section className="intro-band">
          <div className="container intro-grid"><p className="intro-lede">{c.intro.lead}</p><p>{c.intro.body}</p><span className="intro-mark">SDC<span>·</span>01</span></div>
        </section>

        <section className="section story-section" id="why-us">
          <div className="container story-grid">
             <div ref={storyRef} className="story-aside reveal"><span className="section-index">01 <i>/</i> 04</span><div className="story-photo"><img src={receptionRoom} alt="Smart Dental reception lounge" /><span>{c.story.photo}</span></div></div>
             <div className="story-copy reveal delay-1"><span className="eyebrow">{c.story.eyebrow}</span><h2 className="display">{c.story.title}</h2><p>{c.story.body}</p><div className="values">{c.story.values.map(([title, body], index) => { const icons = [HeartHandshake, ShieldCheck, Sparkles, Baby]; const Icon = icons[index]; return <div className="value" key={title}><span className="value-icon"><Icon size={18} /></span><div><h3>{title}</h3><p>{body}</p></div></div>; })}</div></div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container gallery-heading"><div><span className="eyebrow">{c.gallery.eyebrow}</span><h2 className="display">{c.gallery.title}</h2></div><p>{c.gallery.body}</p></div>
          <div className="gallery-grid container"><figure className="gallery-image gallery-large"><img src={secondRoom} alt="Second Smart Dental treatment room" /><figcaption><span>02</span> {c.gallery.captions[0]}</figcaption></figure><figure className="gallery-image gallery-tall"><img src={imagingRoom} alt="Smart Dental diagnostic imaging area" /><figcaption><span>03</span> {c.gallery.captions[1]}</figcaption></figure><figure className="gallery-image gallery-small"><img src={receptionRoom} alt="Smart Dental reception lounge with coral seating" /><figcaption><span>04</span> {c.gallery.captions[2]}</figcaption></figure></div>
        </section>

        <section className="section services-section" id="services">
           <div className="container"><div ref={serviceRef} className="services-header reveal"><div className="section-heading"><span className="eyebrow">{c.services.eyebrow}</span><h2 className="display">{c.services.title}</h2><p>{c.services.body}</p></div><button className="button button-quiet" onClick={() => scrollToId('visit')} data-testid="button-services-appointment">{c.services.action} <ArrowRight size={15} /></button></div><div className="services-grid">{services.map((service, index) => { const Icon = service.icon; return <article className="service-card reveal" style={{ animationDelay: `${index * .08}s` }} key={service.id} data-testid={`card-service-${index}`}><span className="number">0{index + 1}</span><span className="service-icon"><Icon size={20} /></span><h3>{service.title[language]}</h3><p>{service.description[language]}</p><button className="service-link" onClick={() => chooseService(service.id)} data-testid={`button-service-${index}`}>{c.services.link} <ArrowRight size={14} /></button></article>; })}</div></div>
        </section>

         <section className="section care-section" id="care">
           <div className="container care-grid"><div ref={careRef} className="care-copy reveal"><span className="eyebrow">{c.care.eyebrow}</span><h2 className="display">{c.care.title}</h2><img className="care-title-image" src={smileBeforeAfter} alt="Before and after smile treatment result" /><p className="care-lede">{c.care.lede}</p><div className="care-steps">{c.care.steps.map(([title, body], index) => <div className="care-step" key={title}><span className="step-no">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div></div><div className="care-visual reveal delay-2"><img src={imagingRoom} alt="Diagnostic imaging room at Smart Dental" /><div className="care-visual-overlay"><div className="care-visual-kicker"><ScanLine size={14} /> {c.care.kicker}</div><h3>{c.care.titleOverlay}</h3><div className="care-visual-foot"><span>{c.care.foot}</span><strong>02</strong></div></div></div></div>
        </section>

        <section className="section doctor-section" id="team">
           <div className="container doctor-grid"><div className="doctor-card reveal"><div className="doctor-card-top"><span>SMART DENTAL</span><span>03 <i>/</i> 04</span></div><div className="doctor-card-emblem"><span>SA</span><Stethoscope size={30} /></div><div className="doctor-label"><strong>Dr. Suhaib Ali</strong><span>{isArabic ? 'طب الأسنان العام والعائلي' : 'General & family dentistry'}</span></div><div className="doctor-card-note"><span>{c.doctor.eyebrow}</span><strong>{isArabic ? 'رعاية دقيقة. حضور إنساني.' : 'Precise care. A human presence.'}</strong></div></div><div ref={doctorRef} className="doctor-copy reveal delay-1"><span className="eyebrow">{c.doctor.eyebrow}</span><h2 className="display">{c.doctor.title}</h2><p>{c.doctor.body}</p><div className="credentials">{c.doctor.credentials.map((credential) => <span className="credential" key={credential}><Check size={13} /> {credential}</span>)}</div><button className="button button-primary" onClick={() => scrollToId('appointment')} data-testid="button-meet-doctor">{c.doctor.button} <ArrowRight size={15} /></button></div></div>
        </section>

        <section className="section voices-section">
           <div className="container"><div ref={voicesRef} className="voices-head reveal"><div className="section-heading"><span className="eyebrow">{c.voices.eyebrow}</span><h2 className="display">{c.voices.title}</h2><p>{c.voices.body}</p></div><div className="voices-actions"><a className="button button-accent review-button" href={reviewHref} target="_blank" rel="noreferrer" data-testid="link-leave-review"><MessageCircle size={15} /> {c.voices.reviewButton}</a><div className="slider-controls"><button className="slider-button" aria-label={c.voices.previous} onClick={() => setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)} data-testid="button-testimonial-previous"><ChevronLeft size={18} /></button><button className="slider-button" aria-label={c.voices.next} onClick={() => setTestimonialIndex((current) => (current + 1) % testimonials.length)} data-testid="button-testimonial-next"><ChevronRight size={18} /></button></div></div></div><div className="testimonial-layout"><div className="testimonial-side"><span className="testimonial-index" data-testid="text-testimonial-index">0{testimonialIndex + 1}</span><p>{c.voices.side}</p><p className="review-help">{c.voices.reviewHelp}</p></div><article className="testimonial-card reveal delay-1" data-testid={`card-testimonial-${testimonialIndex}`}><div className="testimonial-quote">“</div><p className="testimonial-text">{currentTestimonial.quote[language]}</p><div className="testimonial-person"><div><strong>{currentTestimonial.name}</strong><span>{currentTestimonial.detail[language]}</span></div><span className="stars" aria-label={c.voices.stars}>★★★★★</span></div></article></div></div>
        </section>

        <section className="section visit-section" id="visit">
           <div className="container visit-grid"><div ref={visitRef} className="visit-copy reveal"><span className="eyebrow">{c.visit.eyebrow}</span><h2 className="display">{c.visit.title}</h2><p>{c.visit.body}</p><div className="detail-list"><div className="detail"><MapPin className="detail-icon" size={18} /><div><strong>{c.visit.location}</strong><span>{c.visit.address}</span></div></div><div className="detail"><Clock3 className="detail-icon" size={18} /><div><strong>{c.visit.hours}</strong><span>{c.visit.hoursValue}</span></div></div><div className="detail"><Phone className="detail-icon" size={18} /><div><strong>{c.visit.phone}</strong><a href="tel:+962779757377" data-testid="link-visit-phone">+962 7 7975 7377</a><a href="https://wa.me/962779757377" target="_blank" rel="noreferrer" data-testid="link-visit-whatsapp">{c.visit.whatsapp}</a></div></div></div><a className="button button-primary" href="https://g.page/r/CcammFOyLSh2EAI" target="_blank" rel="noreferrer" data-testid="link-open-maps">{c.visit.maps} <ArrowRight size={15} /></a></div><div className="visit-photo reveal delay-1"><img src={receptionRoom} alt="Smart Dental Clinic reception at Al Ittifaq Complex" /><div className="visit-photo-caption"><span className="map-label"><MapPin size={13} /> {c.visit.close}</span><div><strong>Smart Dental Clinic</strong><span>Al Ittifaq Complex · Al Arrab Street</span></div></div></div></div>
        </section>

        <section className="appointment-section" id="appointment">
          <div className="container appointment-grid"><div ref={appointmentRef} className="appointment-copy reveal"><span className="eyebrow">{c.appointment.eyebrow}</span><h2 className="display">{c.appointment.title}</h2><p>{c.appointment.body}</p><div className="appointment-aside"><p>“أهلاً بكم في عيادتنا”</p><span>{c.appointment.aside}</span></div></div><div className="form-card reveal delay-1">{submitted ? <div className="success-card" data-testid="status-appointment-success"><span className="value-icon"><Check size={18} /></span><div><strong>{c.appointment.success} {form.name.split(' ')[0] || (isArabic ? 'بكم' : 'there')}.</strong><p>{c.appointment.successBody} <strong>{form.phone}</strong> {c.appointment.confirm}</p><button className="button button-quiet" style={{ marginTop: 18, padding: '10px 14px' }} onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: serviceChoice, day: '', message: '' }); }} data-testid="button-new-appointment">{c.appointment.another}</button></div></div> : <form onSubmit={handleSubmit} noValidate data-testid="form-appointment"><div className="form-intro"><span>{c.appointment.formKicker}</span><p>{c.appointment.formIntro}</p></div><div className="form-row"><div className="field"><label htmlFor="patient-name">{c.appointment.name}</label><input id="patient-name" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder={c.appointment.namePlaceholder} data-testid="input-patient-name" /></div><div className="field"><label htmlFor="patient-phone">{c.appointment.phone}</label><input id="patient-phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={c.appointment.phonePlaceholder} data-testid="input-patient-phone" /></div></div><div className="form-row"><div className="field"><label htmlFor="patient-service">{c.appointment.service}</label><select id="patient-service" value={form.service} onChange={(event) => updateField('service', event.target.value)} data-testid="select-patient-service"><option value="">{c.appointment.servicePlaceholder}</option>{services.map((service) => <option value={service.id} key={service.id}>{service.title[language]}</option>)}</select></div><div className="field"><label htmlFor="patient-day">{c.appointment.day}</label><select id="patient-day" value={form.day} onChange={(event) => updateField('day', event.target.value)} data-testid="select-patient-day"><option value="">{c.appointment.dayPlaceholder}</option>{days.map((day) => <option value={day.value} key={day.value}>{day[language]}</option>)}</select></div></div><div className="field"><label htmlFor="patient-message">{c.appointment.message} <span className="optional">{c.appointment.optional}</span></label><textarea id="patient-message" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder={c.appointment.messagePlaceholder} data-testid="textarea-patient-message" /></div>{formError && <div className="field-error" role="alert" data-testid="status-appointment-error">{formError}</div>}<div className="form-footer"><span className="form-privacy">{c.appointment.privacy}</span><button className="button button-primary" type="submit" data-testid="button-submit-appointment">{c.appointment.submit} <ArrowRight size={15} /></button></div></form>}</div></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><a href="#top" className="brand-link" data-testid="link-footer-home"><Logo /></a><p className="footer-blurb">{c.footer.blurb}</p></div><div><h4>{c.footer.explore}</h4><a href="#why-us" data-testid="link-footer-about">{c.footer.clinic}</a><a href="#services" data-testid="link-footer-services">{c.footer.services}</a><a href="#team" data-testid="link-footer-team">{c.footer.dentist}</a></div><div><h4>{c.footer.visit}</h4><a href="#visit" data-testid="link-footer-location">{c.footer.location}</a><a href="#appointment" data-testid="link-footer-appointment">{c.footer.appointment}</a><a href="tel:+962779757377" data-testid="link-footer-phone">{c.footer.phone}</a><a href="https://wa.me/962779757377" target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp">{c.footer.whatsapp}</a></div><div><h4>{c.footer.details}</h4><p className="footer-contact">{c.visit.address}<br /><br />{c.footer.hours}</p></div></div><div className="container footer-bottom"><span>{c.footer.copyright}</span><span>ابتسامتك تبدأ من هنا</span></div></footer>
      <div className="mobile-bar" data-testid="mobile-action-bar"><a href="tel:+962779757377" data-testid="link-mobile-call"><Phone size={15} /> {c.footer.call}</a><button className="mobile-bar-main" onClick={() => scrollToId('appointment')} data-testid="button-mobile-book"><CalendarDays size={15} /> {c.footer.book}</button><a href="https://wa.me/962779757377" target="_blank" rel="noreferrer" data-testid="link-mobile-whatsapp"><MessageCircle size={15} /> {c.footer.whatsapp}</a></div>
    </div>
  );
}

export default App;