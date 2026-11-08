import deepImg from '../../assets/services/deep.webp';
import aboutImg from '../../assets/gallery/about.webp';
import { site } from '../../data/site';

export default function AboutIntro() {
  return (
    <section className="sec">
      <div className="wrap intro">
        <div className="frame">
          <div className="ph reveal-img">
            <img loading="lazy" src={deepImg} alt="Cleaner scrubbing a kitchen hob" />
          </div>
          <div className="ph small reveal-img">
            <img loading="lazy" src={aboutImg} alt="TFCS cleaning supplies on a kitchen counter" />
          </div>
        </div>
        <div className="rv">
          <span className="label">About TFCS</span>
          <h2 className="h-l">Every property deserves a spotless, healthy space.</h2>
          <p className="lede">
            Based in {site.address.base}, we look after villa owners, apartment residents, property managers, Airbnb
            hosts and businesses in every community in Dubai, from Palm Jumeirah to Silicon Oasis.
          </p>
          <dl className="facts">
            <div>
              <dt>Licensed and verified</dt>
              <dd>Every team member is trained and background-checked.</dd>
            </div>
            <div>
              <dt>Family safe</dt>
              <dd>Child-safe and pet-safe products are used by default.</dd>
            </div>
            <div>
              <dt>Fast response</dt>
              <dd>Same-day and next-day booking by WhatsApp or phone.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
