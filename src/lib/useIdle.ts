import { useEffect, useState } from 'react';

/** True once the page has loaded and the browser is idle, so decoration never competes with first paint. */
export function useIdle(timeout = 1500) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let id = 0;
    const go = () => {
      id = typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => setIdle(true), { timeout })
        : window.setTimeout(() => setIdle(true), 300);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => {
      window.removeEventListener('load', go);
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id);
      window.clearTimeout(id);
    };
  }, [timeout]);
  return idle;
}
