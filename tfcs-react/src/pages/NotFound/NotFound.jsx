import { Link } from 'react-router-dom';
import areasImg from '../../assets/banners/areas.webp';
import Icon from '../../components/Icon';

export default function NotFound() {
  return (
    <section className="phero">
      <div className="bg">
        <img src={areasImg} alt="" />
      </div>
      <div className="wrap">
        <h1 className="h-xl">This page could not be found.</h1>
        <p className="lede">The link may be old or mistyped.</p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn btn-green" to="/">
            Back to home <Icon name="i-arrow" />
          </Link>
        </p>
      </div>
    </section>
  );
}
