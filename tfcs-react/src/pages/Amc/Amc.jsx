import { Link } from 'react-router-dom';
import livingAfter from '../../assets/gallery/living-after.webp';
import { amcAudience } from '../../data/plans';
import PlanCards from './PlanCards';

export default function Amc() {
  return (
    <>
      <section className="phero">
        <div className="bg">
          <img src={livingAfter} alt="Freshly cleaned Dubai apartment living room" />
        </div>
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>AMC contracts</span>
          </div>
          <h1 className="h-xl">Annual maintenance contracts, one fixed monthly price.</h1>
          <p className="lede">
            Scheduled cleaning and technical care for homes, offices and buildings, with priority support and guaranteed
            service levels.
          </p>
        </div>
      </section>
      <PlanCards />
      <section className="sec sec-mist">
        <div className="wrap">
          <div className="head">
            <div className="rv">
              <span className="label">Who AMC is for</span>
              <h2 className="h-l">Built for people who manage property.</h2>
            </div>
            <p className="lede rv d1">
              One contract, one invoice and one point of contact, instead of booking and chasing every visit.
            </p>
          </div>
          <div className="serve rv">
            {amcAudience.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
