import { useDataContext } from '@h5web/app';
import { type PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import ImageLoader from './ImageLoader';

interface Props {
  resetKey?: unknown;
}

function Boundary(props: PropsWithChildren<Props>) {
  const { resetKey, children } = props;
  const { valuesStore } = useDataContext();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[resetKey]}
      onError={() => valuesStore.evictErrors()}
    >
      <Suspense fallback={<ImageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default Boundary;
