import { Link } from 'react-router-dom';
import areasImg from '../../assets/banners/areas.webp';
import QuoteForm from './QuoteForm';
import ContactCard from './ContactCard';

export default function Contact() {
  return (
    <>
      <section className="phero">
        <div className="bg">
          <img src={areasImg} alt="" />
        </div>
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="h-xl">Get your free quote in minutes.</h1>
          <p className="lede">Tell us what you need and we&apos;ll reply fast on WhatsApp or by phone.</p>
        </div>
      </section>
      <section className="sec">
        <div className="wrap book">
          <QuoteForm />
          <ContactCard />
        </div>
      </section>
    </>
  );
}
