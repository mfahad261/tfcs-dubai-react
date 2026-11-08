import { Fragment } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { serviceBySlug } from '../../data/services';
import ServiceFaq from './ServiceFaq';
import ServiceDetailHero from './ServiceDetailHero';
import ServiceIncludes from './ServiceIncludes';
import ServiceProcess from './ServiceProcess';
import MoreServices from './MoreServices';
import ServiceBar from './ServiceBar';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug[slug];
  if (!service) return <Navigate to="/services" replace />;

  const quoteMessage = `Hello TFCS, I would like a free quote for ${service.name.toLowerCase()}.`;

  // key resets the page (FAQ, carousel scroll) when moving between services
  return (
    <Fragment key={service.slug}>
      <ServiceDetailHero service={service} quoteMessage={quoteMessage} />
      <ServiceIncludes service={service} />
      <ServiceProcess service={service} />
      <ServiceFaq service={service} quoteMessage={quoteMessage} />
      <MoreServices service={service} />
      <ServiceBar service={service} quoteMessage={quoteMessage} />
    </Fragment>
  );
}
