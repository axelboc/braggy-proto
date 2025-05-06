import { useVisCanvasContext } from '@h5web/lib';
import { Vector3 } from 'three';

import { type BraggyHeader } from '../models';
import BeamCenter from './BeamCenter';
import Ring from './Ring';
import { computeResolution, getRingCanvasRadii, useVisClipping } from './utils';

interface Props {
  dims: number[];
  ringColor: string;
  braggyHeader: BraggyHeader;
}

const Z_POSITION = 1; // above heatmap mesh

function RingsOverlay(props: Props) {
  const { dims, ringColor, braggyHeader } = props;
  const [rows, cols] = dims;
  const {
    pixelSizeX,
    pixelSizeY,
    beamOcx,
    beamOcy,
    wavelength,
    detectorDistance,
  } = braggyHeader;

  const { visSize } = useVisCanvasContext();
  const { width, height } = visSize;

  const realToCanvasRatio =
    Math.hypot(width, height) /
    Math.hypot(cols * pixelSizeX, rows * pixelSizeY);

  const beamCenterCoords = new Vector3(
    -(beamOcx / cols) * width,
    (beamOcy / rows) * height,
    Z_POSITION,
  );

  const maxCanvasRadius = Math.max(
    Math.abs(beamCenterCoords.x) + width / 2,
    Math.abs(beamCenterCoords.y) + height / 2,
  );

  const canvasRadii = getRingCanvasRadii(maxCanvasRadius);

  useVisClipping();

  return (
    <group position={beamCenterCoords}>
      <BeamCenter />

      {canvasRadii.map((radius) => (
        <Ring
          key={radius}
          radius={radius}
          resolution={computeResolution(
            radius / realToCanvasRatio,
            wavelength,
            detectorDistance,
          )}
          color={ringColor}
          beamCenterCoords={beamCenterCoords}
        />
      ))}
    </group>
  );
}

export default RingsOverlay;
