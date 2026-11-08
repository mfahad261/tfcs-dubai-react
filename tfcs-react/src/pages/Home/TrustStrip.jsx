import { services } from '../../data/services';

// Marketing figure shown in the strip (the Areas page lists the main ones)
const AREAS_COVERED = 15;

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Why clients choose TFCS">
      <div className="wrap">
        <div className="rv">
          <b>Same day</b>
          <span>fast response when you need it</span>
        </div>
        <div className="rv d1">
          <b>
            <span data-count={services.length}>{services.length}</span> services
          </b>
          <span>homes and businesses, one team</span>
        </div>
        <div className="rv d2">
          <b>
            <span data-count={AREAS_COVERED}>{AREAS_COVERED}</span>+ areas
          </b>
          <span>from Marina to the Ranches</span>
        </div>
        <div className="rv">
          <b>7 days</b>
          <span>evenings and weekends included</span>
        </div>
      </div>
    </section>
  );
}
