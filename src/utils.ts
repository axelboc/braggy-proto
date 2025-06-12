const SIGN_IN_PARAMS = ['state', 'session_state', 'iss', 'code', 'error'];

export function removeSignInParams(): void {
  const params = new URLSearchParams(globalThis.location.search);

  SIGN_IN_PARAMS.forEach((p) => {
    params.delete(p);
  });

  globalThis.history.replaceState(
    null,
    '',
    `${globalThis.location.pathname}?${params.toString()}`,
  );
}
