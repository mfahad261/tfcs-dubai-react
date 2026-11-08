import { pad2 } from '../../lib/format';
import Icon from '../../components/Icon';

export default function ServiceIncludes({ service }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">What is included</span>
            <h2 className="h-l">Everything in your {service.short}.</h2>
          </div>
          <div className="rv d1">
            <p className="lede">
              A clear scope agreed before we start, and every item checked by a supervisor before we leave.
            </p>
            <div className="ideal">
              <b>Ideal for</b>
              {service.idealFor.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="inc">
          {service.includes.map((x, k) => (
            <div key={x} className={`rv${k % 4 ? ` d${Math.min(k % 4, 2)}` : ''}`}>
              <span className="ck">
                <Icon name="i-tick" />
              </span>
              <b>{x}</b>
              <small>{pad2(k + 1)}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
