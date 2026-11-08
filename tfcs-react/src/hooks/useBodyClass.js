import { useEffect } from 'react';

/** Toggle a class on <body> while `on` is true. */
export function useBodyClass(className, on = true) {
  useEffect(() => {
    document.body.classList.toggle(className, on);
    return () => document.body.classList.remove(className);
  }, [className, on]);
}
