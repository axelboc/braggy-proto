const SIGN_IN_PARAMS = ['state', 'session_state', 'iss', 'code', 'error'];

export function removeSignInParams(): void {
  const params = new URLSearchParams(globalThis.location.search);

  SIGN_IN_PARAMS.forEach((p) => {
    params.delete(p);
  });

  const queryStr = params.toString();

  globalThis.history.replaceState(
    null,
    '',
    `${globalThis.location.pathname}${queryStr ? `?${queryStr}` : ''}`,
  );
}
