import { assertEnvVar, H5GroveProvider, useDataContext } from '@h5web/app';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'wouter';

import { assertDefinedSearchParam } from './errors';
import { useSessionId } from './icat';
import ImageLoader from './ImageLoader';
import ImageVisContainer from './ImageVisContainer';
import styles from './Viewer.module.css';
import VisErrorFallback from './VisErrorFallback';

const ICATPLUS_URL = import.meta.env.VITE_ICATPLUS_URL;

function Viewer() {
  assertEnvVar(ICATPLUS_URL, 'VITE_ICATPLUS_URL');

  const sessionId = useSessionId();

  const [searchParams] = useSearchParams();
  const datafileId = searchParams.get('datafileId');
  const name = searchParams.get('name');
  assertDefinedSearchParam(datafileId, 'datafileId');
  assertDefinedSearchParam(name, 'name');

  const axiosConfig = useMemo(
    () => ({ params: { sessionId, datafileId } }),
    [sessionId, datafileId],
  );

  const [toolbarElem, setToolbarElem] = useState<HTMLDivElement>();
  const { valuesStore } = useDataContext();

  return (
    <H5GroveProvider
      url={`${ICATPLUS_URL}/h5grove`}
      filepath={name}
      axiosConfig={axiosConfig}
    >
      <div className={styles.root}>
        <div
          ref={(elem) => setToolbarElem(elem ?? undefined)}
          className={styles.toolbar}
        />
        <ErrorBoundary
          FallbackComponent={VisErrorFallback}
          onError={() => valuesStore.evictErrors()}
        >
          <Suspense fallback={<ImageLoader />}>
            <ImageVisContainer toolbarElem={toolbarElem} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </H5GroveProvider>
  );
}

export default Viewer;
