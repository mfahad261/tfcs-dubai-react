import { Link } from 'react-router-dom';
import { areas } from '../../data/areas';
import { useBooking } from '../../context/BookingContext';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

export default function AreaGrid() {
  const { presetArea } = useBooking();
  return (
    <section className="sec">
      <div className="wrap">
        <div className="agrid">
          {areas.map((a, i) => (
            <div key={a.name} className={`acard rv${i % 3 ? ` d${i % 3}` : ''}`}>
              <div className="top">
                <h3>{a.name}</h3>
                <span>{a.type}</span>
              </div>
              <p>{a.text}</p>
              <Link to="/contact" onClick={() => presetArea(a.name)}>
                Get a quote in {a.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="lede rv" style={{ marginTop: 48 }}>
          Don&apos;t see your community? We probably cover it.{' '}
          <WhatsAppLink className="link">
            Ask on WhatsApp <Icon name="i-arrow" />
          </WhatsAppLink>
        </p>
      </div>
    </section>
  );
}
