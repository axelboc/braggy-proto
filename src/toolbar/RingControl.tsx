import { Selector, ToggleBtn } from '@h5web/lib';
import { BsBullseye } from 'react-icons/bs';

import { RingColor } from '../models';
import styles from './RingControl.module.css';

interface Props {
  showRings: boolean;
  ringColor: RingColor;
  toggleRings: () => void;
  setRingColor: (ringColor: RingColor) => void;
  getCssRingColor: (ringColor: RingColor) => string;
}

function RingControl(props: Props) {
  const { showRings, ringColor, toggleRings, setRingColor, getCssRingColor } =
    props;

  return (
    <div className={styles.container}>
      <ToggleBtn
        label="Rings"
        Icon={BsBullseye}
        value={showRings}
        onToggle={toggleRings}
      />

      <Selector
        options={{
          'B & W': [RingColor.Black, RingColor.White],
          'Color map': [RingColor.ColorMapMin, RingColor.ColorMapMax],
        }}
        renderOption={(option) => (
          <div className={styles.option}>
            <div
              className={styles.square}
              style={{ backgroundColor: getCssRingColor(option) }}
            />
            <span className={styles.optionLabel}>{option}</span>
          </div>
        )}
        disabled={!showRings}
        value={ringColor}
        onChange={(val: string) => setRingColor(val as RingColor)}
      />
    </div>
  );
}

export default RingControl;
