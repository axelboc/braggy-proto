import { assertEnvVar, H5GroveProvider } from '@h5web/app';
import { useMemo, useState } from 'react';

import Boundary from './Boundary';
import { useSessionId } from './icat';
import ImageVisContainer from './ImageVisContainer';
import styles from './Viewer.module.css';

const H5GROVE_URL = import.meta.env.VITE_H5GROVE_URL || '';
const FILEPATH = 'FetuB-27A_5_w1_1_1_master.h5';

function Viewer() {
  assertEnvVar(H5GROVE_URL, 'VITE_H5GROVE_URL');

  // const sessionId = useSessionId();
  // console.log(sessionId);

  const axiosConfig = useMemo(() => ({ params: { file: FILEPATH } }), []);

  const [toolbarElem, setToolbarElem] = useState<HTMLDivElement>();

  return (
    <H5GroveProvider
      url={H5GROVE_URL}
      filepath={FILEPATH}
      axiosConfig={axiosConfig}
    >
      <div className={styles.root}>
        <div
          ref={(elem) => setToolbarElem(elem ?? undefined)}
          className={styles.toolbar}
        />
        <Boundary>
          <ImageVisContainer toolbarElem={toolbarElem} />
        </Boundary>
      </div>
    </H5GroveProvider>
  );
}

export default Viewer;
