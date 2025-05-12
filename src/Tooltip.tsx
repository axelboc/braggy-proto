import { type InstrumentInfo } from './models';
import styles from './Tooltip.module.css';
import {
  computeResolution,
  formatRealValue,
  formatTooltipVal,
} from './utils-vis';

interface Props {
  xIndex: number;
  yIndex: number;
  value: number;
  instrumentInfo: InstrumentInfo;
}

function Tooltip(props: Props) {
  const { xIndex, yIndex, value, instrumentInfo } = props;

  const {
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    wavelength,
  } = instrumentInfo;

  const dx = (xIndex - beamCenterX) * xPixelSize;
  const dy = (yIndex - beamCenterY) * yPixelSize;
  const realRadius = Math.hypot(dx, dy);

  const resolution = computeResolution(
    realRadius,
    wavelength,
    detectorDistance,
  );

  return (
    <>
      {`x=${xIndex}, y=${yIndex}`}
      <div className={styles.tooltipValue}>
        {`Intensity: ${formatTooltipVal(value)}`}
      </div>
      <div className={styles.tooltipValue}>
        {`Radius: ${formatRealValue(realRadius * 1000)} mm `}
        {`(${formatRealValue(resolution)} Å)`}
      </div>
    </>
  );
}

export default Tooltip;
