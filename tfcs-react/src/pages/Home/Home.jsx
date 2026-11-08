import Hero from './Hero';
import QuoteBar from './QuoteBar';
import TrustStrip from './TrustStrip';
import AboutIntro from './AboutIntro';
import ServicesShowcase from './ServicesShowcase';
import WhyUs from './WhyUs';
import BeforeAfter from './BeforeAfter';
import HowItWorks from './HowItWorks';
import QualityChecklist from './QualityChecklist';
import Testimonials from './Testimonials';
import AreasBand from './AreasBand';
import HomeFaq from './HomeFaq';

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteBar />
      <TrustStrip />
      <AboutIntro />
      <ServicesShowcase />
      <WhyUs />
      <BeforeAfter />
      <HowItWorks />
      <QualityChecklist />
      <Testimonials />
      <AreasBand />
      <HomeFaq />
    </>
  );
}
