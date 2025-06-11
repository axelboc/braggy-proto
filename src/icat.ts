import {
  assertDefined,
  assertEnvVar,
  assertNonNull,
  assertStr,
} from '@h5web/app';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';

const ICATPLUS_URL = import.meta.env.VITE_ICATPUS_URL;

export function useSessionId(): string {
  assertEnvVar(ICATPLUS_URL, 'VITE_ICATPUS_URL');

  const { user } = useAuth();
  assertDefined(user);
  assertNonNull(user);
  assertDefined(user.id_token);

  return useSuspenseQuery({
    queryKey: ['session', user.id_token],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;

      const response = await fetch(`${ICATPLUS_URL}/session`, {
        method: 'POST',
        body: JSON.stringify({ plugin: 'esrf', password: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error("Couldn't log into ICAT", { cause: payload });
      }

      const { sessionId } = payload;
      assertDefined(sessionId);
      assertStr(sessionId);

      return sessionId;
    },
    staleTime: Infinity,
    refetchInterval: 60 * 60 * 1000, // 60 min
  }).data;
}
