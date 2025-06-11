import '@h5web/lib/styles.css';
import './styles.css';

import { assertEnvVar, assertNonNull } from '@h5web/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';

import Auth from './Auth';
import Viewer from './Viewer';

const SSO_AUTHORITY_URL = import.meta.env.VITE_SSO_AUTHORITY_URL;
const SSO_CLIENT_ID = import.meta.env.VITE_SSO_CLIENT_ID;
assertEnvVar(SSO_AUTHORITY_URL, 'VITE_SSO_AUTHORITY_URL');
assertEnvVar(SSO_CLIENT_ID, 'VITE_SSO_CLIENT_ID');

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

createRoot(rootElem).render(
  <StrictMode>
    <AuthProvider
      authority={SSO_AUTHORITY_URL}
      client_id={SSO_CLIENT_ID}
      redirect_uri={globalThis.location.origin}
      onSigninCallback={() => {
        globalThis.history.replaceState(
          {},
          document.title,
          globalThis.location.pathname,
        );
      }}
    >
      <Auth>
        <Viewer />
      </Auth>
    </AuthProvider>
  </StrictMode>,
);
