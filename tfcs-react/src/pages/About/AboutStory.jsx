import heroImg from '../../assets/banners/hero.webp';
import aboutImg from '../../assets/gallery/about.webp';
import upholsteryImg from '../../assets/services/upholstery.webp';
import windowImg from '../../assets/services/window.webp';
import { site } from '../../data/site';

const MOSAIC = [
  { src: heroImg, alt: 'TFCS cleaner restoring a living room' },
  { src: aboutImg, alt: 'TFCS spray bottles and cloths' },
  { src: upholsteryImg, alt: 'Upholstery cleaning on a sofa' },
  { src: windowImg, alt: 'Cleaning a balcony window' },
];

export default function AboutStory() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="story">
          <p className="big rv">
            We believe every property deserves a spotless, healthy environment. That&apos;s the standard we hold every
            job to, whether it&apos;s a studio in JVC or a tower in Business Bay.
          </p>
          <div className="body rv d1">
            <p>
              {site.name} is based in {site.address.base}. We serve villa owners, apartment residents, property
              managers, Airbnb hosts and businesses across every community in Dubai, from Palm Jumeirah to Silicon
              Oasis.
            </p>
            <p>
              Alongside cleaning, our technical team handles AC duct and coil cleaning, marble polishing and painting,
              so one trusted company can look after the whole property.
            </p>
          </div>
        </div>
        <div className="mosaic">
          {MOSAIC.map((m) => (
            <div key={m.alt} className="ph reveal-img">
              <img loading="lazy" src={m.src} alt={m.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
