import { useVisCanvasContext } from '@h5web/lib';
import { useThree } from '@react-three/fiber';
import { format } from 'd3-format';
import clamp from 'lodash-es/clamp';
import range from 'lodash-es/range';
import { useEffect } from 'react';
import { Plane, Vector3 } from 'three';

export const formatRealValue = format('.2f');

export function getRingCanvasRadii(maxRadius: number): number[] {
  const numRings = clamp(3 + Math.round((4 * (maxRadius - 100)) / 600), 3, 7);

  return range(0.99 * maxRadius, 0, -maxRadius / numRings);
}

export function computeResolution(
  realRadius: number,
  wavelength: number,
  detectorDistance: number,
): number {
  return (
    (0.5 * wavelength) /
    Math.sin(0.5 * Math.atan2(realRadius, detectorDistance))
  );
}

export function useVisClipping(): void {
  const { visSize } = useVisCanvasContext();
  const { width, height } = visSize;

  const gl = useThree((state) => state.gl);

  useEffect(() => {
    gl.clippingPlanes = [
      new Plane(new Vector3(0, 1, 0), height / 2),
      new Plane(new Vector3(0, -1, 0), height / 2),
      new Plane(new Vector3(1, 0, 0), width / 2),
      new Plane(new Vector3(-1, 0, 0), width / 2),
    ];
  }, [width, height, gl]);
}
