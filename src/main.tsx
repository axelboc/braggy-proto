import '@h5web/lib/styles.css';
import './styles.css';

import { assertNonNull } from '@h5web/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

createRoot(rootElem).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
