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

type Service = { title: string; description: string; icon: typeof Stethoscope };
type Testimonial = { quote: string; name: string; detail: string };

const services: Service[] = [
  { title: 'Gentle check-ups', description: 'A thoughtful look at your oral health, with time for every question.', icon: Stethoscope },
  { title: 'A brighter smile', description: 'Conservative whitening plans that keep your smile looking like you.', icon: Sparkles },
  { title: 'Family dentistry', description: 'Comfort-first visits for little teeth, growing smiles, and everyone in between.', icon: Baby },
  { title: 'Restorative care', description: 'Modern fillings and crowns that help you eat, speak, and smile with ease.', icon: ShieldCheck },
  { title: 'Emergency visits', description: 'When something hurts, we make room to help you feel steady again.', icon: HeartHandshake },
];

const testimonials: Testimonial[] = [
  { quote: 'The first dental appointment my daughter walked out of smiling about.', name: 'Rana A.', detail: 'Mother of two · Shafa Badran' },
  { quote: 'Clear advice, no pressure, and a dentist who actually listened to what I was worried about.', name: 'Omar K.', detail: 'Patient · Amman' },
  { quote: 'It feels like a neighborhood clinic in the best possible way — warm, precise, and genuinely kind.', name: 'Lina M.', detail: 'Patient · Al Jubaiha' },
];

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
  const [serviceChoice, setServiceChoice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', service: '', day: '', message: '' });
  const heroRef = useReveal();
  const storyRef = useReveal();
  const serviceRef = useReveal();
  const careRef = useReveal();
  const doctorRef = useReveal();
  const voicesRef = useReveal();
  const visitRef = useReveal();
  const appointmentRef = useReveal();

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === 'name' || field === 'phone') setFormError('');
  };

  const chooseService = (title: string) => {
    setServiceChoice(title);
    updateField('service', title);
    scrollToId('appointment');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError('Please add your name and a phone number so we can reach you.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="site-shell">
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left"><span className="topbar-item"><MapPin size={13} /> Shafa Badran, Amman</span><span className="topbar-item"><Clock3 size={13} /> Sat–Thu · 9:00–20:00</span></div>
          <div className="topbar-right"><a className="topbar-item" href="tel:+962795551234" data-testid="link-topbar-phone"><Phone size={13} /> +962 7 9555 1234</a><span className="topbar-item topbar-ar" dir="rtl">أهلاً وسهلاً بكم</span></div>
        </div>
      </div>

      <header className="nav-wrap">
        <nav className="container navbar" aria-label="Main navigation">
          <a className="brand-link" href="#top" onClick={() => setMenuOpen(false)} data-testid="link-home"><Logo /></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link" href="#why-us" onClick={() => setMenuOpen(false)} data-testid="link-nav-about">The clinic</a>
            <a className="nav-link" href="#services" onClick={() => setMenuOpen(false)} data-testid="link-nav-services">Care</a>
            <a className="nav-link" href="#team" onClick={() => setMenuOpen(false)} data-testid="link-nav-team">Your dentist</a>
            <a className="nav-link" href="#visit" onClick={() => setMenuOpen(false)} data-testid="link-nav-visit">Visit us</a>
            <button className="button button-accent mobile-nav-cta" onClick={() => { setMenuOpen(false); scrollToId('appointment'); }} data-testid="button-mobile-appointment">Request an appointment <ArrowRight size={15} /></button>
          </div>
          <div className="nav-actions">
            <a className="button button-primary button-small" href="#appointment" data-testid="link-nav-appointment">Book a visit <CalendarDays size={15} /></a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((current) => !current)} data-testid="button-mobile-menu">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-photo"><img src={treatmentRoom} alt="Bright Smart Dental treatment room overlooking Amman" /><div className="hero-photo-shade" /></div>
          <div className="container hero-grid">
            <div ref={heroRef} className="hero-copy reveal">
              <span className="eyebrow eyebrow-light">A considered kind of dentistry</span>
              <h1 className="display">A calmer way to care for your <em>smile.</em></h1>
              <p className="hero-lede">Modern dental care, quietly personal. Take your time, ask every question, and leave with a plan that makes sense.</p>
              <div className="hero-actions"><button className="button button-accent" onClick={() => scrollToId('appointment')} data-testid="button-hero-appointment">Request an appointment <ArrowRight size={16} /></button><a className="button button-ghost-light" href="#why-us" data-testid="link-hero-services">Discover Smart Dental <ChevronRight size={16} /></a></div>
              <div className="hero-note"><span className="hero-note-mark"><Check size={15} /></span><span>Private care for individuals, couples, and growing families.</span></div>
            </div>
            <div className="hero-meta reveal delay-2"><div className="hero-meta-top"><span>01</span><span>THE ROOM TO BREATHE</span></div><p>Natural light, panoramic views, and a clinical team that never rushes the conversation.</p><div className="hero-meta-bottom"><span>Al Arrab Street</span><span>Shafa Badran, Amman</span></div></div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><span className="scroll-line" /></div>
        </section>

        <section className="intro-band">
          <div className="container intro-grid"><p className="intro-lede">The detail is in the difference.</p><p>Smart Dental Clinic is a refined, neighborhood practice in Shafa Badran — designed around comfort, clear communication, and care you can trust.</p><span className="intro-mark">SDC<span>·</span>01</span></div>
        </section>

        <section className="section story-section" id="why-us">
          <div className="container story-grid">
            <div ref={storyRef} className="story-aside reveal"><span className="section-index">01 <i>/</i> 04</span><div className="story-photo"><img src={receptionRoom} alt="Smart Dental reception lounge" /><span>First impressions matter.</span></div></div>
            <div className="story-copy reveal delay-1"><span className="eyebrow">The Smart Dental difference</span><h2 className="display">Care that starts with <span>listening.</span></h2><p>There is no rushing people through our door. Whether you are here for a routine clean, a child’s first visit, or a second opinion, we build the plan with you — in clear language, at a pace that feels right.</p><div className="values"><div className="value"><span className="value-icon"><HeartHandshake size={18} /></span><div><h3>Warm, never rushed</h3><p>More conversation. Less clinical distance.</p></div></div><div className="value"><span className="value-icon"><ShieldCheck size={18} /></span><div><h3>Thoughtful, evidence-led</h3><p>Modern tools, conservative choices.</p></div></div><div className="value"><span className="value-icon"><Sparkles size={18} /></span><div><h3>Honest about options</h3><p>Know the why, the how, and the cost.</p></div></div><div className="value"><span className="value-icon"><Baby size={18} /></span><div><h3>Made for families</h3><p>Small comforts that make a big difference.</p></div></div></div></div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container gallery-heading"><div><span className="eyebrow">Inside Smart Dental</span><h2 className="display">A space made for <em>ease.</em></h2></div><p>Bright rooms, considered details, and technology that stays quietly in the background.</p></div>
          <div className="gallery-grid container"><figure className="gallery-image gallery-large"><img src={secondRoom} alt="Second Smart Dental treatment room" /><figcaption><span>02</span> The treatment room</figcaption></figure><figure className="gallery-image gallery-tall"><img src={imagingRoom} alt="Smart Dental diagnostic imaging area" /><figcaption><span>03</span> Clearer answers</figcaption></figure><figure className="gallery-image gallery-small"><img src={receptionRoom} alt="Smart Dental reception lounge with coral seating" /><figcaption><span>04</span> Welcome in</figcaption></figure></div>
        </section>

        <section className="section services-section" id="services">
          <div className="container"><div ref={serviceRef} className="services-header reveal"><div className="section-heading"><span className="eyebrow">Care, made clear</span><h2 className="display">A calm plan for every kind of smile.</h2><p>From prevention to restorative care, every treatment is tailored to the person sitting in the chair.</p></div><button className="button button-quiet" onClick={() => scrollToId('appointment')} data-testid="button-services-appointment">Talk to our team <ArrowRight size={15} /></button></div><div className="services-grid">{services.map((service, index) => { const Icon = service.icon; return <article className="service-card reveal" style={{ animationDelay: `${index * .08}s` }} key={service.title} data-testid={`card-service-${index}`}><span className="number">0{index + 1}</span><span className="service-icon"><Icon size={20} /></span><h3>{service.title}</h3><p>{service.description}</p><button className="service-link" onClick={() => chooseService(service.title)} data-testid={`button-service-${index}`}>Start with a conversation <ArrowRight size={14} /></button></article>; })}</div></div>
        </section>

        <section className="section care-section">
          <div className="container care-grid"><div ref={careRef} className="care-copy reveal"><span className="eyebrow">What your visit feels like</span><h2 className="display">No surprises. Just a clear next step.</h2><p className="care-lede">We believe knowing what happens next is part of feeling cared for.</p><div className="care-steps"><div className="care-step"><span className="step-no">01</span><div><h3>Tell us what brought you in</h3><p>A relaxed conversation before we do anything else.</p></div></div><div className="care-step"><span className="step-no">02</span><div><h3>Understand your options</h3><p>We show you what we see and explain it without jargon.</p></div></div><div className="care-step"><span className="step-no">03</span><div><h3>Leave with a plan</h3><p>One practical next step — and someone to call if you need us.</p></div></div></div></div><div className="care-visual reveal delay-2"><img src={imagingRoom} alt="Diagnostic imaging room at Smart Dental" /><div className="care-visual-overlay"><div className="care-visual-kicker"><ScanLine size={14} /> Technology, thoughtfully used</div><h3>Clear answers. <em>Gentle hands.</em></h3><div className="care-visual-foot"><span>Modern imaging supports better conversations about your care.</span><strong>02</strong></div></div></div></div>
        </section>

        <section className="section doctor-section" id="team">
          <div className="container doctor-grid"><div className="doctor-portrait reveal"><img src={secondRoom} alt="A calm treatment room with modern dental equipment" /><div className="doctor-label"><strong>Dr. Nour Al-Khatib</strong><span>General & family dentistry</span></div></div><div ref={doctorRef} className="doctor-copy reveal delay-1"><span className="eyebrow">The person behind the care</span><h2 className="display">A dentist who <span>remembers.</span></h2><p>Dr. Nour believes a good dental visit is a partnership. She brings a careful clinical eye, a light touch, and the kind of patience that helps children open up and adults ask the questions they usually hold back.</p><div className="credentials"><span className="credential"><Check size={13} /> BDS · University of Jordan</span><span className="credential"><Check size={13} /> Family care focused</span><span className="credential"><Check size={13} /> Arabic & English</span></div><button className="button button-primary" onClick={() => scrollToId('appointment')} data-testid="button-meet-doctor">Meet Dr. Nour <ArrowRight size={15} /></button></div></div>
        </section>

        <section className="section voices-section">
          <div className="container"><div ref={voicesRef} className="voices-head reveal"><div className="section-heading"><span className="eyebrow">A few kind words</span><h2 className="display">What our neighbors say.</h2><p>Trust is built one comfortable appointment at a time.</p></div><div className="slider-controls"><button className="slider-button" aria-label="Previous testimonial" onClick={() => setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)} data-testid="button-testimonial-previous"><ChevronLeft size={18} /></button><button className="slider-button" aria-label="Next testimonial" onClick={() => setTestimonialIndex((current) => (current + 1) % testimonials.length)} data-testid="button-testimonial-next"><ChevronRight size={18} /></button></div></div><div className="testimonial-layout"><div className="testimonial-side"><span className="testimonial-index" data-testid="text-testimonial-index">0{testimonialIndex + 1}</span><p>Real words from people who trusted us with their care.</p></div><article className="testimonial-card reveal delay-1" data-testid={`card-testimonial-${testimonialIndex}`}><div className="testimonial-quote">“</div><p className="testimonial-text">{currentTestimonial.quote}</p><div className="testimonial-person"><div><strong>{currentTestimonial.name}</strong><span>{currentTestimonial.detail}</span></div><span className="stars" aria-label="5 out of 5 stars">★★★★★</span></div></article></div></div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="container visit-grid"><div ref={visitRef} className="visit-copy reveal"><span className="eyebrow">Find your way here</span><h2 className="display">Your neighborhood dentist, right in Shafa Badran.</h2><p>Easy to find, easy to reach, and close to home. We are in Al Ittifaq Complex on Al Arrab Street.</p><div className="detail-list"><div className="detail"><MapPin className="detail-icon" size={18} /><div><strong>Exact location</strong><span>Al Arrab Street, Al Ittifaq Complex<br />Shafa Badran, Amman, Jordan</span></div></div><div className="detail"><Clock3 className="detail-icon" size={18} /><div><strong>Clinic hours</strong><span>Saturday–Thursday · 9:00 am–8:00 pm<br />Friday · Closed</span></div></div><div className="detail"><Phone className="detail-icon" size={18} /><div><strong>Call the clinic</strong><a href="tel:+962795551234" data-testid="link-visit-phone">+962 7 9555 1234</a></div></div></div><a className="button button-primary" href="https://maps.google.com/?q=Al+Ittifaq+Complex+Shafa+Badran+Amman" target="_blank" rel="noreferrer" data-testid="link-open-maps">Open in maps <ArrowRight size={15} /></a></div><div className="visit-photo reveal delay-1"><img src={receptionRoom} alt="Smart Dental Clinic reception at Al Ittifaq Complex" /><div className="visit-photo-caption"><span className="map-label"><MapPin size={13} /> You are close.</span><div><strong>Smart Dental Clinic</strong><span>Al Ittifaq Complex · Al Arrab Street</span></div></div></div></div>
        </section>

        <section className="appointment-section" id="appointment">
          <div className="container appointment-grid"><div ref={appointmentRef} className="appointment-copy reveal"><span className="eyebrow">Take the first step</span><h2 className="display">Your smile has a place <em>here.</em></h2><p>Tell us a little about what you need. Our team will call to find a time that works for you — usually within one working day.</p><div className="appointment-aside"><p>“أهلاً بكم في عيادتنا”</p><span>Welcome to our clinic. We look forward to meeting you.</span></div></div><div className="form-card reveal delay-1">{submitted ? <div className="success-card" data-testid="status-appointment-success"><span className="value-icon"><Check size={18} /></span><div><strong>Thank you, {form.name.split(' ')[0] || 'there'}.</strong><p>Your request is with our team. We will call <strong>{form.phone}</strong> to confirm a suitable time.</p><button className="button button-quiet" style={{ marginTop: 18, padding: '10px 14px' }} onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: serviceChoice, day: '', message: '' }); }} data-testid="button-new-appointment">Send another request</button></div></div> : <form onSubmit={handleSubmit} noValidate data-testid="form-appointment"><div className="form-intro"><span>REQUEST A VISIT</span><p>We will be in touch personally.</p></div><div className="form-row"><div className="field"><label htmlFor="patient-name">Your name</label><input id="patient-name" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="e.g. Dana Al-Hadidi" data-testid="input-patient-name" /></div><div className="field"><label htmlFor="patient-phone">Phone number</label><input id="patient-phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="07 9xxx xxxx" data-testid="input-patient-phone" /></div></div><div className="form-row"><div className="field"><label htmlFor="patient-service">What can we help with?</label><select id="patient-service" value={form.service} onChange={(event) => updateField('service', event.target.value)} data-testid="select-patient-service"><option value="">Choose a service</option>{services.map((service) => <option value={service.title} key={service.title}>{service.title}</option>)}</select></div><div className="field"><label htmlFor="patient-day">Preferred day</label><select id="patient-day" value={form.day} onChange={(event) => updateField('day', event.target.value)} data-testid="select-patient-day"><option value="">Choose a day</option><option>Saturday</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option></select></div></div><div className="field"><label htmlFor="patient-message">Anything you would like us to know? <span className="optional">(optional)</span></label><textarea id="patient-message" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A little context helps us prepare for you." data-testid="textarea-patient-message" /></div>{formError && <div className="field-error" role="alert" data-testid="status-appointment-error">{formError}</div>}<div className="form-footer"><span className="form-privacy">Your details stay with our clinic team and are only used to arrange your visit.</span><button className="button button-primary" type="submit" data-testid="button-submit-appointment">Request my appointment <ArrowRight size={15} /></button></div></form>}</div></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><a href="#top" className="brand-link" data-testid="link-footer-home"><Logo /></a><p className="footer-blurb">Thoughtful dental care for the people and families of Amman.</p></div><div><h4>Explore</h4><a href="#why-us" data-testid="link-footer-about">The clinic</a><a href="#services" data-testid="link-footer-services">Our services</a><a href="#team" data-testid="link-footer-team">Your dentist</a></div><div><h4>Visit</h4><a href="#visit" data-testid="link-footer-location">Location & hours</a><a href="#appointment" data-testid="link-footer-appointment">Request a visit</a><a href="tel:+962795551234" data-testid="link-footer-phone">Call +962 7 9555 1234</a></div><div><h4>Clinic details</h4><p className="footer-contact">Al Arrab Street<br />Al Ittifaq Complex<br />Shafa Badran, Amman<br /><br />Sat–Thu · 9 am–8 pm</p></div></div><div className="container footer-bottom"><span>© 2024 Smart Dental Clinic · Amman, Jordan</span><span>ابتسامتك تبدأ من هنا</span></div></footer>
      <div className="mobile-bar" data-testid="mobile-action-bar"><a href="tel:+962795551234" data-testid="link-mobile-call"><Phone size={15} /> Call</a><button className="mobile-bar-main" onClick={() => scrollToId('appointment')} data-testid="button-mobile-book"><CalendarDays size={15} /> Book a visit</button><a href="#visit" data-testid="link-mobile-location"><MapPin size={15} /> Find us</a></div>
    </div>
  );
}

export default App;