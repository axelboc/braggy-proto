import '@h5web/lib/styles.css';
import './styles.css';

import { assertEnvVar, assertNonNull } from '@h5web/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from 'react-oidc-context';

import Auth from './Auth';
import ErrorFallback from './ErrorFallback';
import Viewer from './Viewer';

const SSO_AUTHORITY_URL = import.meta.env.VITE_SSO_AUTHORITY_URL;
const SSO_CLIENT_ID = import.meta.env.VITE_SSO_CLIENT_ID;
assertEnvVar(SSO_AUTHORITY_URL, 'VITE_SSO_AUTHORITY_URL');
assertEnvVar(SSO_CLIENT_ID, 'VITE_SSO_CLIENT_ID');

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

const queryClient = new QueryClient();

createRoot(rootElem).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Viewer />
          </ErrorBoundary>
        </Auth>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
