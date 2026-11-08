import { Fragment, useEffect, useRef, useState } from 'react';
import { bookingOptions } from '../../data/services';
import { areas } from '../../data/areas';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { niceDate, todayISO } from '../../lib/format';
import { isEmail, isUaeMobile } from '../../lib/validation';
import { openWhatsApp } from '../../lib/whatsapp';
import { sendBooking } from '../../lib/api';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

const SERVICE_OPTIONS = [...bookingOptions, 'Something else'];
const PROPERTY = ['Apartment', 'Villa', 'Office', 'Commercial', 'Other'];
const SLOTS = ['Morning', 'Afternoon', 'Evening', 'Any time'];
const STEPS = ['1. Service', '2. Timing', '3. Your details'];

const emptyForm = () => ({
  service: SERVICE_OPTIONS[0],
  propertyType: PROPERTY[0],
  date: todayISO(),
  slot: SLOTS[0],
  name: '',
  phone: '',
  email: '',
  area: '',
  notes: '',
  website: '', // honeypot: real people never fill this
});

/** Turns the form into the WhatsApp message text. */
function whatsappMessage(f) {
  return [
    'Hello TFCS, I would like a free quote.',
    `Service: ${f.service}`,
    `Property: ${f.propertyType}`,
    `Date: ${f.date} (${f.slot})`,
    `Area: ${f.area}`,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.notes && `Details: ${f.notes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Three-step quote form.
 * On submit it opens WhatsApp with the details and, when VITE_API_URL is set,
 * also sends them to the backend (see src/lib/api.js) for the email notification.
 */
export default function QuoteForm() {
  const { preset, clearPreset } = useBooking();
  const toast = useToast();
  const box = useRef(null);
  const firstRender = useRef(true);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  // Service / area picked elsewhere on the site
  useEffect(() => {
    if (!preset.service && !preset.area) return;
    setForm((f) => ({
      ...f,
      service: preset.service && SERVICE_OPTIONS.includes(preset.service) ? preset.service : f.service,
      area: preset.area || f.area,
    }));
    clearPreset();
  }, [preset, clearPreset]);

  // Keep the form in view when moving between steps
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    box.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }, [step]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (n) => {
    const e = {};
    if (n === 1) {
      if (!form.date) e.date = 'Choose a date.';
      else if (form.date < todayISO()) e.date = 'Choose today or a later date.';
    }
    if (n === 2) {
      if (!form.name.trim()) e.name = 'Enter your full name.';
      if (!isUaeMobile(form.phone)) e.phone = 'Enter a UAE mobile number, for example 050 123 4567.';
      if (form.email.trim() && !isEmail(form.email)) e.email = 'Enter a valid email address, or leave it empty.';
      if (!form.area) e.area = 'Choose your area so we can send the nearest team.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = (e) => {
    e.preventDefault();
    if (!validate(2)) return;
    if (form.website) return; // bot

    const data = {
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
    };

    // Open WhatsApp first (must happen inside the click, or browsers block it)
    openWhatsApp(whatsappMessage(data));

    // Then notify the backend, if one is configured
    const { website, ...booking } = data;
    sendBooking({ ...booking, submittedAt: new Date().toISOString() }).catch((err) =>
      console.warn('Booking email failed', err)
    );

    setDone(true);
    toast('Quote request sent to WhatsApp');
  };

  const reset = () => {
    setForm(emptyForm());
    setErrors({});
    setDone(false);
    setStep(0);
  };

  const field = (key) => `f${errors[key] ? ' bad' : ''}`;

  return (
    <div className="form rv" id="booker" ref={box}>
      <div className="prog" hidden={done}>
        {STEPS.map((label, i) => (
          <div key={label} className={i === step ? 'on' : i < step ? 'done' : undefined}>
            {label}
          </div>
        ))}
      </div>

      <form noValidate onSubmit={submit} hidden={done}>
        {/* Step 1 */}
        <div className={`fstep${step === 0 ? ' on' : ''}`}>
          <h3>What do you need?</h3>
          <div className="opts" role="radiogroup" aria-label="Service needed">
            {SERVICE_OPTIONS.map((opt, i) => (
              <div className="opt" key={opt}>
                <input
                  className="sr"
                  type="radio"
                  name="service"
                  id={`svc-${i}`}
                  value={opt}
                  checked={form.service === opt}
                  onChange={set('service')}
                />
                <label htmlFor={`svc-${i}`}>
                  <span className="dot" />
                  {opt}
                </label>
              </div>
            ))}
          </div>
          <div className="f">
            <label htmlFor="fptype">Property type</label>
            <select id="fptype" value={form.propertyType} onChange={set('propertyType')}>
              {PROPERTY.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="fnav">
            <span />
            <button className="btn btn-deep" type="button" onClick={next}>
              Choose timing
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`fstep${step === 1 ? ' on' : ''}`}>
          <h3>When do you need us?</h3>
          <div className={field('date')}>
            <label htmlFor="fdate">Date</label>
            <input type="date" id="fdate" min={todayISO()} value={form.date} onChange={set('date')} />
            <span className="err">{errors.date}</span>
          </div>
          <div className="f">
            <span className="lb" id="slbl">
              Preferred time
            </span>
            <div className="slots" role="radiogroup" aria-labelledby="slbl">
              {SLOTS.map((s, i) => (
                <Fragment key={s}>
                  <input
                    className="sr"
                    type="radio"
                    name="slot"
                    id={`slot-${i}`}
                    value={s}
                    checked={form.slot === s}
                    onChange={set('slot')}
                  />
                  <label htmlFor={`slot-${i}`}>{s}</label>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="fnav">
            <button className="btn btn-line" type="button" onClick={back}>
              Back
            </button>
            <button className="btn btn-deep" type="button" onClick={next}>
              Add your details
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`fstep${step === 2 ? ' on' : ''}`}>
          <h3>How can we reach you?</h3>
          <div className="two">
            <div className={field('name')}>
              <label htmlFor="fname">Full name</label>
              <input id="fname" autoComplete="name" value={form.name} onChange={set('name')} />
              <span className="err">{errors.name}</span>
            </div>
            <div className={field('phone')}>
              <label htmlFor="fphone">Phone / WhatsApp</label>
              <input
                id="fphone"
                type="tel"
                autoComplete="tel"
                placeholder="+971 5X XXX XXXX"
                value={form.phone}
                onChange={set('phone')}
              />
              <span className="err">{errors.phone}</span>
            </div>
          </div>
          <div className="two">
            <div className={field('email')}>
              <label htmlFor="femail">
                Email <span style={{ fontWeight: 400, color: 'var(--muted)' }}>Optional</span>
              </label>
              <input
                id="femail"
                type="email"
                autoComplete="email"
                placeholder="For your booking confirmation"
                value={form.email}
                onChange={set('email')}
              />
              <span className="err">{errors.email}</span>
            </div>
            <div className={field('area')}>
              <label htmlFor="farea">Area</label>
              <select id="farea" value={form.area} onChange={set('area')}>
                <option value="">Choose your area</option>
                {areas.map((a) => (
                  <option key={a.name}>{a.name}</option>
                ))}
                <option>Other area</option>
              </select>
              <span className="err">{errors.area}</span>
            </div>
          </div>
          <div className="f">
            <label htmlFor="fnotes">
              Additional details <span style={{ fontWeight: 400, color: 'var(--muted)' }}>Optional</span>
            </label>
            <textarea
              id="fnotes"
              placeholder="Size of the property, access, pets, areas to focus on"
              value={form.notes}
              onChange={set('notes')}
            />
          </div>

          {/* Honeypot (hidden from people, bots fill it in) */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={set('website')}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <div className="sum">
            <div>
              <span>Service</span>
              <b>{form.service}</b>
            </div>
            <div>
              <span>Property</span>
              <b>{form.propertyType}</b>
            </div>
            <div>
              <span>When</span>
              <b>
                {niceDate(form.date)}, {form.slot.toLowerCase()}
              </b>
            </div>
          </div>
          <div className="fnav">
            <button className="btn btn-line" type="button" onClick={back}>
              Back
            </button>
            <button className="btn btn-green" type="submit">
              <Icon name="i-wa" />
              Get free quote
            </button>
          </div>
        </div>
      </form>

      <div className={`done${done ? ' on' : ''}`}>
        <svg
          viewBox="0 0 88 88"
          fill="none"
          stroke="#0D3553"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="44" cy="44" r="40" />
          <path d="M28 45l11 11 21-23" />
        </svg>
        <h3 className="h-m">Quote request sent</h3>
        <p style={{ color: 'var(--muted)', maxWidth: '26em' }}>
          Your request is ready in WhatsApp. Our team will reply with a clear scope and price within minutes during
          working hours.
        </p>
        <button className="btn btn-line" type="button" onClick={reset}>
          Request another quote
        </button>
      </div>
    </div>
  );
}
