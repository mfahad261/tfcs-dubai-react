import { Link } from 'react-router-dom';
import areasImg from '../../assets/banners/areas.webp';
import { site } from '../../data/site';
import AreaGrid from './AreaGrid';

export default function Areas() {
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
            <span>Areas we serve</span>
          </div>
          <h1 className="h-xl">Cleaning across every Dubai community.</h1>
          <p className="lede">
            From our base in {site.address.base}, our team covers the whole city, with same-day service available.
          </p>
        </div>
      </section>
      <AreaGrid />
    </>
  );
}
