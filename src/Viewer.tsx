import { useDataContext } from '@h5web/app';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ImageLoader from './ImageLoader';
import ImageVisContainer from './ImageVisContainer';
import styles from './Viewer.module.css';
import VisErrorFallback from './VisErrorFallback';

function Viewer() {
  const [toolbarElem, setToolbarElem] = useState<HTMLDivElement>();
  const { valuesStore } = useDataContext();

  return (
    <div className={styles.root}>
      <div
        ref={(elem) => setToolbarElem(elem ?? undefined)}
        className={styles.toolbar}
      />
      {toolbarElem && (
        <ErrorBoundary
          FallbackComponent={VisErrorFallback}
          onError={() => valuesStore.evictErrors()}
        >
          <Suspense fallback={<ImageLoader />}>
            <ImageVisContainer toolbarElem={toolbarElem} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default Viewer;
