import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig } from 'framer-motion';
import App from './App';
// Self-hosted fonts, Latin subset only: no third-party request before first paint.
import '@fontsource/lilita-one/latin-400.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/overpass/latin-800.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      {/* The hero uses the light `m` components; their animation features arrive in a separate chunk. */}
      <LazyMotion features={() => import('./lib/motionFeatures').then((r) => r.default)}>
        <App />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
);

// The static first-paint shell in index.html fades out once the real hero is on screen.
requestAnimationFrame(() => requestAnimationFrame(() => {
  const shell = document.getElementById('shell');
  if (!shell) return;
  shell.style.opacity = '0';
  window.setTimeout(() => shell.remove(), 400);
}));
