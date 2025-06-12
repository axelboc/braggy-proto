import { assertEnvVar } from '@h5web/app';
import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { prepareReport, SearchParamError } from './errors';

const REPORT_EMAIL = import.meta.env.VITE_REPORT_EMAIL;

function ErrorFallback(props: FallbackProps) {
  const { error } = props;
  assertEnvVar(REPORT_EMAIL, 'VITE_REPORT_EMAIL');

  const msg = error instanceof Error ? error.message : 'Unknown error';
  const isSearchParamError = error instanceof SearchParamError;

  return (
    <div className={styles.root}>
      <p className={styles.advice}>
        <strong>An error occurred.</strong> Please{' '}
        {isSearchParamError
          ? 'open Braggy again from the Data Portal'
          : 'try again'}
        , or report the error if it persists.
      </p>
      <p className={styles.error}>&gt;&gt; {msg}</p>
      <div>
        {!isSearchParamError && (
          <button
            className={styles.btn}
            type="button"
            onClick={() => globalThis.location.reload()}
          >
            Reload page
          </button>
        )}
        <a
          className={styles.btn}
          target="_blank"
          href={`mailto:${REPORT_EMAIL}?subject=[Braggy]%20Error%20report&body=${encodeURIComponent(
            prepareReport(msg),
          )}`}
          rel="noreferrer"
        >
          Report error
        </a>
      </div>
    </div>
  );
}

export default ErrorFallback;
