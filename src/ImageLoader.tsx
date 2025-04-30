import { useDataContext } from '@h5web/app';

import styles from './ImageLoader.module.css';
import { CANCELLED_ERROR_MSG } from './utils';

function ImageLoader() {
  const { valuesStore } = useDataContext();

  return (
    <div className={styles.loader}>
      <div className={styles.grid}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>Loading data...</p>
      <p>
        <button
          className={styles.cancelBtn}
          type="button"
          onClick={() => valuesStore.abortAll(CANCELLED_ERROR_MSG)}
        >
          Cancel?
        </button>
      </p>
    </div>
  );
}

export default ImageLoader;
