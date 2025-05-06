import { Annotation, useVisCanvasContext } from '@h5web/lib';
import { Vector3 } from 'three';

import { formatRealValue } from './utils';

interface Props {
  radius: number;
  resolution: number;
  color: string;
  beamCenterCoords: Vector3;
}

function Ring(props: Props) {
  const { radius, resolution, color, beamCenterCoords } = props;

  const { worldToData } = useVisCanvasContext();
  const pos = worldToData(
    new Vector3(beamCenterCoords.x, beamCenterCoords.y + radius),
  );

  return (
    <>
      <mesh>
        <meshBasicMaterial color={color} />
        <ringGeometry
          args={[
            radius - 0.5,
            radius + 0.5,
            Math.floor(2 * Math.PI * radius), // segments of 1px guarantee circles of round aspect
          ]}
        />
      </mesh>
      <Annotation x={pos.x} y={pos.y}>
        <div
          style={{
            color,
            transform: 'translate3d(-50%, 0, 0)', // center the text
            whiteSpace: 'nowrap',
          }}
        >
          {`${formatRealValue(resolution)} Å`}
        </div>
      </Annotation>
    </>
  );
}

export default Ring;
