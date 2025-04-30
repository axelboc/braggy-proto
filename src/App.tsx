import { assertEnvVar, H5GroveProvider } from '@h5web/app';
import { useMemo, useState } from 'react';

import styles from './App.module.css';
import Boundary from './Boundary';
import ImageVisContainer from './ImageVisContainer';

const URL = import.meta.env.VITE_H5GROVE_URL || '';

function Viewer() {
  assertEnvVar(URL, 'VITE_H5GROVE_URL');

  const filepath = 'braggy.h5';
  const axiosConfig = useMemo(() => ({ params: { file: filepath } }), []);

  const [toolbarElem, setToolbarElem] = useState<HTMLDivElement>();

  return (
    <H5GroveProvider url={URL} filepath={filepath} axiosConfig={axiosConfig}>
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
