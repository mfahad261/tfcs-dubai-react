import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';

import IconSprite from './components/IconSprite';
import Intro from './layout/Intro';
import RouteTransition, { useDisplayLocation } from './layout/RouteTransition';
import Header from './layout/Header';
import Footer from './layout/Footer';
import CtaBand from './layout/CtaBand';
import FloatingActions from './layout/FloatingActions';

import { useRevealObserver } from './hooks/useRevealObserver';
import { useBodyClass } from './hooks/useBodyClass';
import { useSeo } from './hooks/useSeo';

import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import Amc from './pages/Amc/Amc';
import Areas from './pages/Areas/Areas';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

/** Old links like /#/services/deep-cleaning-dubai -> /services/deep-cleaning-dubai */
function useLegacyHashRedirect() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (hash.startsWith('#/')) navigate(hash.slice(1) || '/', { replace: true });
  }, [hash, navigate]);
}

function Layout() {
  const shown = useDisplayLocation();
  const path = shown.pathname;

  useLegacyHashRedirect();
  useRevealObserver();
  useSeo(path);
  useBodyClass('on-home', path === '/');
  useBodyClass('on-svc', /^\/services\/[^/]+/.test(path));
  useBodyClass('on-svcs', path === '/services');

  return (
    <>
      <Header />
      <main id="app">
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/amc" element={<Amc />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {path !== '/contact' && <CtaBand />}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BookingProvider>
          <IconSprite />
          <Intro />
          <RouteTransition>
            <Layout />
          </RouteTransition>
        </BookingProvider>
      </ToastProvider>
    </AppProvider>
  );
}
