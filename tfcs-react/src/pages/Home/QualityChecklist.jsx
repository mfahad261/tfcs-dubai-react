import { useState } from 'react';
import commercialImg from '../../assets/services/commercial.webp';
import { checklist } from '../../data/home';
import Icon from '../../components/Icon';

export default function QualityChecklist() {
  const [room, setRoom] = useState(checklist[0].key);
  const current = checklist.find((r) => r.key === room);

  return (
    <section className="sec sec-mist">
      <div className="wrap check">
        <div className="ph reveal-img">
          <img loading="lazy" src={commercialImg} alt="Cleaner scrubbing a lobby floor" />
        </div>
        <div className="rv">
          <span className="label">Our quality checklist</span>
          <h2 className="h-l" style={{ marginTop: 18 }}>
            Supervised and checked, room by room.
          </h2>
          <div className="tabs" role="tablist" aria-label="Rooms">
            {checklist.map((r) => (
              <button key={r.key} role="tab" aria-selected={r.key === room} onClick={() => setRoom(r.key)}>
                {r.label}
              </button>
            ))}
          </div>
          {/* key forces the list to re-mount so the items animate in again */}
          <ul className="clist" role="tabpanel" key={room}>
            {current.items.map(([title, text], i) => (
              <li key={title} style={{ animationDelay: `${i * 0.06}s` }}>
                <Icon name="i-check" />
                <div>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
