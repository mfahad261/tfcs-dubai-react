import { createContext, useCallback, useContext, useRef, useState } from 'react';
import Icon from '../components/Icon';

const ToastContext = createContext(() => {});

/** Small status message at the bottom of the screen: const toast = useToast(); toast('Saved'); */
export function ToastProvider({ children }) {
  const [state, setState] = useState({ show: false, message: '' });
  const timer = useRef();

  const toast = useCallback((message) => {
    setState({ show: true, message });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState((s) => ({ ...s, show: false })), 3200);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div id="toast" className={state.show ? 'show' : ''} role="status" aria-live="polite">
        <Icon name="i-check" />
        <span>{state.message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
