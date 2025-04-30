import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { CANCELLED_ERROR_MSG } from './utils';

function prepareReport(message: string): string {
  return `<< THIS EMAIL IS A TEMPLATE >>
<< Please add your name and as much information as possible to help us debug the issue. >>

Hi,

I encountered the following error on Hibou:

  >> ${message}

Here is some additional context:

  - Browser: ${navigator.userAgent}
  - URL: ${globalThis.location.href}
  - << proposal, HDF5 file name, etc. >>

Thanks,
<< Name >>`;
}

function ErrorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

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

  return (
    <div className={styles.root}>
      <p className={styles.error}>
        {msg}. Please try again, or report the error if it persists.
      </p>
      <a
        className={styles.reportBtn}
        target="_blank"
        href={`mailto:h5web@esrf.fr?subject=[Hibou]%20Error%20report&body=${encodeURIComponent(
          prepareReport(msg),
        )}`}
        rel="noreferrer"
      >
        Report error
      </a>
    </div>
  );
}

export default ErrorFallback;
