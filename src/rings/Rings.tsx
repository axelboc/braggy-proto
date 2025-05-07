import { Annotation, useVisCanvasContext } from '@h5web/lib';
import { Fragment } from 'react/jsx-runtime';
import { Vector3 } from 'three';

import { type InstrumentInfo } from '../models';
import {
  computeResolution,
  formatRealValue,
  getRingCanvasRadii,
  useVisClipping,
} from '../vis-utils';
import BeamCenter from './BeamCenter';
import styles from './Rings.module.css';

interface Props {
  dims: number[];
  ringColor: string;
  instrumentInfo: InstrumentInfo;
}

const Z_POSITION = 1; // above heatmap mesh

function Rings(props: Props) {
  const { dims, ringColor, instrumentInfo } = props;
  const [rows, cols] = dims;
  const {
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    wavelength,
  } = instrumentInfo;

  const { visSize, dataToWorld, worldToData } = useVisCanvasContext();
  const { width, height } = visSize;

  useVisClipping(); // clip rings to vis

  const beamCenter = new Vector3(beamCenterX, beamCenterY);
  const beamCenterWorld = dataToWorld(beamCenter);

  const maxCanvasRadius = Math.max(
    Math.abs(beamCenterWorld.x) + width / 2,
    Math.abs(beamCenterWorld.y) + height / 2,
  );

  const canvasRadii = getRingCanvasRadii(maxCanvasRadius);

  const realToCanvasRatio =
    Math.hypot(width, height) /
    Math.hypot(cols * xPixelSize, rows * yPixelSize);

  return (
    <group
      position={new Vector3(beamCenterWorld.x, beamCenterWorld.y, Z_POSITION)}
    >
      <BeamCenter />

      {canvasRadii.map((radius) => {
        const resolution = computeResolution(
          radius / realToCanvasRatio,
          wavelength,
          detectorDistance,
        );

        const annotationPos = worldToData(
          new Vector3(beamCenterWorld.x, beamCenterWorld.y + radius),
        );

        return (
          <Fragment key={radius}>
            <mesh>
              <meshBasicMaterial color={ringColor} />
              <ringGeometry
                args={[
                  radius - 0.5,
                  radius + 0.5,
                  Math.floor(2 * Math.PI * radius), // segments of 1px guarantee circles of round aspect
                ]}
              />
            </mesh>

            <Annotation x={annotationPos.x} y={annotationPos.y}>
              <div className={styles.resolution} style={{ color: ringColor }}>
                {formatRealValue(resolution)} Å
              </div>
            </Annotation>
          </Fragment>
        );
      })}
    </group>
  );
}

export default Rings;
