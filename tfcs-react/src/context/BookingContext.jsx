import { createContext, useCallback, useContext, useState } from 'react';

/**
 * Remembers a service or area picked elsewhere on the site
 * (e.g. "Book online" on a service page, "Get a quote in JVC" on the areas page)
 * so the quote form on the Contact page opens with it already selected.
 */
const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [preset, setPreset] = useState({ service: null, area: null });

  const presetService = useCallback((service) => setPreset((p) => ({ ...p, service })), []);
  const presetArea = useCallback((area) => setPreset((p) => ({ ...p, area })), []);
  const clearPreset = useCallback(() => setPreset({ service: null, area: null }), []);

  return (
    <BookingContext.Provider value={{ preset, presetService, presetArea, clearPreset }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
