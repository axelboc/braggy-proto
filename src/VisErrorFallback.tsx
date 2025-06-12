import { type FallbackProps } from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import styles from './ErrorFallback.module.css';
import { CANCELLED_ERROR_MSG } from './utils-data';

function VisErrorFallback(props: FallbackProps) {
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

  return <ErrorFallback {...props} />;
}

export default VisErrorFallback;
