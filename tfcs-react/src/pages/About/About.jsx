import { Link } from 'react-router-dom';
import aboutImg from '../../assets/gallery/about.webp';
import AboutStory from './AboutStory';
import Differentiators from './Differentiators';
import Team from './Team';
import Values from './Values';

const WHO_WE_SERVE = [
  'Villa owners in Arabian Ranches',
  'Apartment residents in Dubai Marina',
  'Office managers in Business Bay',
  'Facility management companies',
  'Real estate agencies',
  'Airbnb hosts',
  'Luxury property owners',
];

export default function About() {
  return (
    <>
      <section className="phero">
        <div className="bg">
          <img src={aboutImg} alt="TFCS cleaning supplies on a kitchen counter" />
        </div>
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
          <h1 className="h-xl">Dubai&apos;s cleaning and maintenance partner.</h1>
          <p className="lede">For homes, villas, offices and commercial properties across the city.</p>
        </div>
      </section>
      <AboutStory />
      <Differentiators />
      <Team />
      <Values />
      <section className="sec sec-mist">
        <div className="wrap">
          <div className="head">
            <div className="rv">
              <span className="label">Who we serve</span>
              <h2 className="h-l">Tailored to the way you use your property.</h2>
            </div>
            <p className="lede rv d1">
              From a single apartment to a portfolio of buildings, we adapt the scope, schedule and team to fit.
            </p>
          </div>
          <div className="serve rv">
            {WHO_WE_SERVE.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
