import { assertEnvVar, H5GroveProvider } from '@h5web/app';
import { type PropsWithChildren, useMemo } from 'react';
import { useSearchParams } from 'wouter';

import { assertDefinedSearchParam } from './errors';
import { useSessionId } from './icat';

const ICATPLUS_URL = import.meta.env.VITE_ICATPLUS_URL;

interface Props {}

function DataProvider(props: PropsWithChildren<Props>) {
  const { children } = props;

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

  return (
    <H5GroveProvider
      url={`${ICATPLUS_URL}/h5grove`}
      filepath={name}
      axiosConfig={axiosConfig}
    >
      {children}
    </H5GroveProvider>
  );
}

export default DataProvider;
