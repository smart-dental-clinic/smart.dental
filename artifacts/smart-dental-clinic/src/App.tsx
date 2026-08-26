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
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';

type Service = {
  title: string;
  description: string;
  icon: typeof Stethoscope;
};

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

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

function Logo() {
  return (
    <span className="brand" data-testid="brand-logo">
      <span className="brand-mark"><Sparkles size={20} strokeWidth={2.2} /></span>
      <span className="brand-copy">
        <span className="brand-name">Smart Dental</span>
        <span className="brand-ar">عيادة سمارت لطب الأسنان</span>
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
          <div className="topbar-left">
            <span className="topbar-item"><MapPin size={13} /> Shafa Badran, Amman</span>
            <span className="topbar-item"><Clock3 size={13} /> Sat–Thu · 9:00–20:00</span>
          </div>
          <div className="topbar-right">
            <a className="topbar-item" href="tel:+962795551234" data-testid="link-topbar-phone"><Phone size={13} /> 07 9555 1234</a>
            <span className="topbar-item" dir="rtl">أهلاً وسهلاً بكم</span>
          </div>
        </div>
      </div>

      <header className="nav-wrap">
        <nav className="container navbar" aria-label="Main navigation">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)} data-testid="link-home">
            <Logo />
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link" href="#why-us" onClick={() => setMenuOpen(false)} data-testid="link-nav-about">Why Smart Dental</a>
            <a className="nav-link" href="#services" onClick={() => setMenuOpen(false)} data-testid="link-nav-services">Services</a>
            <a className="nav-link" href="#team" onClick={() => setMenuOpen(false)} data-testid="link-nav-team">Your dentist</a>
            <a className="nav-link" href="#visit" onClick={() => setMenuOpen(false)} data-testid="link-nav-visit">Visit us</a>
            <button className="button button-accent mobile-nav-cta" onClick={() => { setMenuOpen(false); scrollToId('appointment'); }} data-testid="button-mobile-appointment">Request an appointment <ArrowRight size={15} /></button>
          </div>
          <div className="nav-actions">
            <a className="button button-primary" href="#appointment" data-testid="link-nav-appointment">Book a visit <CalendarDays size={15} /></a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((current) => !current)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div ref={heroRef} className="reveal">
              <span className="eyebrow">A kinder kind of dentistry</span>
              <h1 className="display">Feel at home in your <em>smile.</em></h1>
              <p className="hero-lede">Modern dental care with a neighborhood heart. We take the time to explain, listen, and make your next visit feel lighter than the last.</p>
              <div className="hero-actions">
                <button className="button button-accent" onClick={() => scrollToId('appointment')} data-testid="button-hero-appointment">Request an appointment <ArrowRight size={16} /></button>
                <a className="button button-quiet" href="#services" data-testid="link-hero-services">Explore care <ChevronRight size={16} /></a>
              </div>
              <div className="hero-note">
                <span className="hero-note-mark"><Check size={15} /></span>
                <span>Thoughtful care for individuals, couples, and growing families.</span>
              </div>
            </div>
            <div className="hero-art reveal delay-2" aria-label="Illustration of a calm dental visit" data-testid="illustration-hero-care">
              <div className="orbit" />
              <div className="portrait-panel"><div className="portrait-person" /></div>
              <div className="art-sticker sticker-top"><span className="sticker-icon"><HeartHandshake size={16} /></span> Here, you can ask anything.</div>
              <div className="art-sticker sticker-bottom"><span className="sticker-icon"><ShieldCheck size={16} /></span> Gentle by design</div>
            </div>
          </div>
        </section>

        <section className="trust-band" aria-label="Clinic highlights">
          <div className="container trust-grid">
            <div className="trust-intro"><strong>A small clinic with a big focus on you.</strong> Local care, thoughtfully delivered.</div>
            <div className="trust-stat"><strong>12+</strong><span>years caring for Amman</span></div>
            <div className="trust-stat"><strong>4.9/5</strong><span>patient experience rating</span></div>
            <div className="trust-stat"><strong>1:1</strong><span>time with your dentist</span></div>
          </div>
        </section>

        <section className="section story-section" id="why-us">
          <div className="container story-grid">
            <div ref={storyRef} className="story-aside reveal">
              <span className="story-number">01</span>
              <p>“Smart” means current knowledge and good questions. It also means knowing when a person needs a little more time.</p>
            </div>
            <div className="story-copy reveal delay-1">
              <span className="eyebrow">The Smart Dental difference</span>
              <h2 className="display">Care that starts with <span>listening.</span></h2>
              <p>There is no rushing people through our door. Whether you are here for a routine clean, a child’s first visit, or a second opinion, we build the plan with you — in clear language, at a pace that feels right.</p>
              <div className="values">
                <div className="value"><span className="value-icon"><HeartHandshake size={18} /></span><div><h3>Warm, never rushed</h3><p>More conversation. Less clinical distance.</p></div></div>
                <div className="value"><span className="value-icon"><ShieldCheck size={18} /></span><div><h3>Thoughtful, evidence-led</h3><p>Modern tools, conservative choices.</p></div></div>
                <div className="value"><span className="value-icon"><Sparkles size={18} /></span><div><h3>Honest about options</h3><p>Know the why, the how, and the cost.</p></div></div>
                <div className="value"><span className="value-icon"><Baby size={18} /></span><div><h3>Made for families</h3><p>Small comforts that make a big difference.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div ref={serviceRef} className="services-header reveal">
              <div className="section-heading"><span className="eyebrow">Care, made clear</span><h2 className="display">A calm plan for every kind of smile.</h2><p>From prevention to restorative care, every treatment is tailored to the person sitting in the chair.</p></div>
              <button className="button button-quiet" onClick={() => scrollToId('appointment')} data-testid="button-services-appointment">Talk to our team <ArrowRight size={15} /></button>
            </div>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className="service-card reveal" style={{ animationDelay: `${index * .08}s` }} key={service.title} data-testid={`card-service-${index}`}>
                    <span className="number">0{index + 1}</span>
                    <span className="service-icon"><Icon size={20} /></span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button className="service-link" onClick={() => chooseService(service.title)} data-testid={`button-service-${index}`}>Start with a conversation <ArrowRight size={14} /></button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section care-section">
          <div className="container care-grid">
            <div ref={careRef} className="care-copy reveal">
              <span className="eyebrow">What your visit feels like</span>
              <h2 className="display" style={{ color: 'hsl(var(--primary))', fontSize: 'clamp(38px, 4vw, 56px)', margin: '18px 0 16px' }}>No surprises. Just a clear next step.</h2>
              <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, margin: 0 }}>We believe knowing what happens next is part of feeling cared for.</p>
              <div className="care-steps">
                <div className="care-step"><span className="step-no">01</span><div><h3>Tell us what brought you in</h3><p>A relaxed conversation before we do anything else.</p></div></div>
                <div className="care-step"><span className="step-no">02</span><div><h3>Understand your options</h3><p>We show you what we see and explain it without jargon.</p></div></div>
                <div className="care-step"><span className="step-no">03</span><div><h3>Leave with a plan</h3><p>One practical next step — and someone to call if you need us.</p></div></div>
              </div>
            </div>
            <div className="care-visual reveal delay-2" data-testid="visual-care-promise">
              <div className="care-visual-inner"><div className="care-visual-kicker"><Sparkles size={14} /> A promise from our chair</div><div className="quote-mark">“</div><h3>You never have to be brave <em>alone.</em></h3><div className="care-visual-foot"><span>For anxious patients, curious children, and anyone who has put off a visit.</span><strong>02</strong></div></div>
            </div>
          </div>
        </section>

        <section className="section doctor-section" id="team">
          <div className="container doctor-grid">
            <div className="doctor-portrait reveal" data-testid="illustration-doctor">
              <div className="doctor-head" />
              <div className="doctor-label"><strong>Dr. Nour Al-Khatib</strong><span>General & family dentistry</span></div>
            </div>
            <div ref={doctorRef} className="doctor-copy reveal delay-1">
              <span className="eyebrow">The person behind the care</span>
              <h2 className="display">Meet a dentist who <span>remembers.</span></h2>
              <p>Dr. Nour believes a good dental visit is a partnership. She brings a careful clinical eye, a light touch, and the kind of patience that helps children open up and adults ask the questions they usually hold back.</p>
              <div className="credentials"><span className="credential"><Check size={13} /> BDS · University of Jordan</span><span className="credential"><Check size={13} /> Family care focused</span><span className="credential"><Check size={13} /> Arabic & English</span></div>
              <button className="button button-primary" onClick={() => scrollToId('appointment')} data-testid="button-meet-doctor">Meet Dr. Nour <ArrowRight size={15} /></button>
            </div>
          </div>
        </section>

        <section className="section voices-section">
          <div className="container">
            <div ref={voicesRef} className="voices-head reveal">
              <div className="section-heading"><span className="eyebrow">A few kind words</span><h2 className="display">What our neighbors say.</h2><p>Trust is built one comfortable appointment at a time.</p></div>
              <div className="slider-controls"><button className="slider-button" aria-label="Previous testimonial" onClick={() => setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)} data-testid="button-testimonial-previous"><ChevronLeft size={18} /></button><button className="slider-button" aria-label="Next testimonial" onClick={() => setTestimonialIndex((current) => (current + 1) % testimonials.length)} data-testid="button-testimonial-next"><ChevronRight size={18} /></button></div>
            </div>
            <div className="testimonial-layout">
              <div className="testimonial-side"><span className="testimonial-index" data-testid="text-testimonial-index">0{testimonialIndex + 1}</span><p>Real words from people who trusted us with their care.</p></div>
              <article className="testimonial-card reveal delay-1" data-testid={`card-testimonial-${testimonialIndex}`}><div className="testimonial-quote">“</div><p className="testimonial-text">{currentTestimonial.quote}</p><div className="testimonial-person"><div><strong>{currentTestimonial.name}</strong><span>{currentTestimonial.detail}</span></div><span className="stars" aria-label="5 out of 5 stars">★★★★★</span></div></article>
            </div>
          </div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="container visit-grid">
            <div ref={visitRef} className="visit-copy reveal">
              <span className="eyebrow">Find your way here</span>
              <h2 className="display">Your neighborhood dentist, right in Shafa Badran.</h2>
              <p>Easy to find, easy to reach, and close to home. We are in Al Ittifaq Complex on Al Arrab Street.</p>
              <div className="detail-list">
                <div className="detail"><MapPin className="detail-icon" size={18} /><div><strong>Exact location</strong><span>Al Arrab Street, Al Ittifaq Complex<br />Shafa Badran, Amman, Jordan</span></div></div>
                <div className="detail"><Clock3 className="detail-icon" size={18} /><div><strong>Clinic hours</strong><span>Saturday–Thursday · 9:00 am–8:00 pm<br />Friday · Closed</span></div></div>
                <div className="detail"><Phone className="detail-icon" size={18} /><div><strong>Call the clinic</strong><a href="tel:+962795551234" data-testid="link-visit-phone">+962 7 9555 1234</a></div></div>
              </div>
              <a className="button button-primary" href="https://maps.google.com/?q=Al+Ittifaq+Complex+Shafa+Badran+Amman" target="_blank" rel="noreferrer" data-testid="link-open-maps">Open in maps <ArrowRight size={15} /></a>
            </div>
            <div className="map-card reveal delay-1" data-testid="visual-clinic-map"><span className="map-label">You are close.</span><MapPin className="map-pin" size={39} strokeWidth={1.8} /><div className="map-caption"><div><strong>Smart Dental Clinic</strong><span>Al Ittifaq Complex · Al Arrab Street</span></div><MapPin size={19} /></div></div>
          </div>
        </section>

        <section className="appointment-section" id="appointment">
          <div className="container appointment-grid">
            <div ref={appointmentRef} className="appointment-copy reveal">
              <span className="eyebrow">Take the first step</span>
              <h2 className="display">Your smile has a place <em>here.</em></h2>
              <p>Tell us a little about what you need. Our team will call to find a time that works for you — usually within one working day.</p>
              <div className="appointment-aside"><p>“أهلاً بكم في عيادتنا”</p><span>Welcome to our clinic. We look forward to meeting you.</span></div>
            </div>
            <div className="form-card reveal delay-1">
              {submitted ? (
                <div className="success-card" data-testid="status-appointment-success"><span className="value-icon"><Check size={18} /></span><div><strong>Thank you, {form.name.split(' ')[0] || 'there'}.</strong><p>Your request is with our team. We will call <strong>{form.phone}</strong> to confirm a suitable time.</p><button className="button button-quiet" style={{ marginTop: 18, padding: '10px 14px' }} onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: serviceChoice, day: '', message: '' }); }} data-testid="button-new-appointment">Send another request</button></div></div>
              ) : (
                <form onSubmit={handleSubmit} noValidate data-testid="form-appointment">
                  <div className="form-row">
                    <div className="field"><label htmlFor="patient-name">Your name</label><input id="patient-name" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="e.g. Dana Al-Hadidi" data-testid="input-patient-name" /></div>
                    <div className="field"><label htmlFor="patient-phone">Phone number</label><input id="patient-phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="07 9xxx xxxx" data-testid="input-patient-phone" /></div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label htmlFor="patient-service">What can we help with?</label><select id="patient-service" value={form.service} onChange={(event) => updateField('service', event.target.value)} data-testid="select-patient-service"><option value="">Choose a service</option>{services.map((service) => <option value={service.title} key={service.title}>{service.title}</option>)}</select></div>
                    <div className="field"><label htmlFor="patient-day">Preferred day</label><select id="patient-day" value={form.day} onChange={(event) => updateField('day', event.target.value)} data-testid="select-patient-day"><option value="">Choose a day</option><option>Saturday</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option></select></div>
                  </div>
                  <div className="field"><label htmlFor="patient-message">Anything you would like us to know? <span style={{ fontWeight: 400, color: 'hsl(var(--muted-foreground))' }}>(optional)</span></label><textarea id="patient-message" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A little context helps us prepare for you." data-testid="textarea-patient-message" /></div>
                  {formError && <div className="field-error" role="alert" data-testid="status-appointment-error">{formError}</div>}
                  <div className="form-footer"><span className="form-privacy">Your details stay with our clinic team and are only used to arrange your visit.</span><button className="button button-primary" type="submit" data-testid="button-submit-appointment">Request my appointment <ArrowRight size={15} /></button></div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><a href="#top" className="brand" data-testid="link-footer-home"><Logo /></a><p className="footer-blurb">Thoughtful dental care for the people and families of Amman.</p></div>
          <div><h4>Explore</h4><a href="#why-us" data-testid="link-footer-about">Why Smart Dental</a><a href="#services" data-testid="link-footer-services">Our services</a><a href="#team" data-testid="link-footer-team">Your dentist</a></div>
          <div><h4>Visit</h4><a href="#visit" data-testid="link-footer-location">Location & hours</a><a href="#appointment" data-testid="link-footer-appointment">Request a visit</a><a href="tel:+962795551234" data-testid="link-footer-phone">Call 07 9555 1234</a></div>
          <div><h4>Clinic details</h4><p className="footer-contact">Al Arrab Street<br />Al Ittifaq Complex<br />Shafa Badran, Amman<br /><br />Sat–Thu · 9 am–8 pm</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2024 Smart Dental Clinic · Amman, Jordan</span><span>ابتسامتك تبدأ من هنا</span></div>
      </footer>
      <div className="mobile-bar" data-testid="mobile-action-bar"><a href="tel:+962795551234" data-testid="link-mobile-call"><Phone size={15} /> Call</a><button className="mobile-bar-main" onClick={() => scrollToId('appointment')} data-testid="button-mobile-book"><CalendarDays size={15} /> Book a visit</button><a href="#visit" data-testid="link-mobile-location"><MapPin size={15} /> Find us</a></div>
    </div>
  );
}

export default App;
