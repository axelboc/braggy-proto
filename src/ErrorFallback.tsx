import { assertEnvVar } from '@h5web/app';
import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { SearchParamError } from './errors';
import { CANCELLED_ERROR_MSG } from './utils-data';

const REPORT_EMAIL = import.meta.env.VITE_REPORT_EMAIL;

function prepareReport(message: string): string {
  return `<< THIS EMAIL IS A TEMPLATE >>
<< Please sign with your name and provide as much information as possible to help us debug the issue. >>

Hi,

I encountered the following error on Hibou:

  >> ${message}

Here is some additional context:

  - Browser: ${navigator.userAgent}
  - URL: ${globalThis.location.href}

<< Explain how you got here; what you were trying to achieve when the error occurred; etc. >>

Thanks,
<< Name >>`;
}

function ErrorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  assertEnvVar(REPORT_EMAIL, 'VITE_REPORT_EMAIL');

  if (error instanceof Error && error.message === CANCELLED_ERROR_MSG) {
    return (
      <div className={styles.root}>
        <p className={styles.error}>
          {CANCELLED_ERROR_MSG}
          <span>–</span>
          <button
            className={styles.retryBtn}
            type="button"
            onClick={() => resetErrorBoundary()}
          >
            Retry?
          </button>
        </p>
      </div>
    );
  }

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
