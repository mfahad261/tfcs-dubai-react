import { createContext, useContext, useState } from 'react';

/**
 * App-wide UI state.
 * `ready` turns true when the intro animation opens, which starts the hero animations.
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  return <AppContext.Provider value={{ ready, setReady }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
