import {
  assertDataset,
  assertDefined,
  assertFloatType,
  assertGroup,
  assertScalarShape,
  type Dataset,
  type FloatType,
  type GroupWithChildren,
  type ScalarShape,
  useDatasetsValues,
  useEntity,
  usePrefetchValues,
} from '@h5web/app';

import { type InstrumentInfo } from './models';

export const CANCELLED_ERROR_MSG = 'Request cancelled';

export function useDetectorInfo(): InstrumentInfo {
  const beamGroup = useEntity('/entry/instrument/beam');
  const detectorGroup = useEntity('/entry/instrument/detector');
  assertGroup(beamGroup);
  assertGroup(detectorGroup);

  const infoDatasets = [
    getChildDataset(detectorGroup, 'x_pixel_size'),
    getChildDataset(detectorGroup, 'y_pixel_size'),
    getChildDataset(detectorGroup, 'beam_center_x'),
    getChildDataset(detectorGroup, 'beam_center_y'),
    getChildDataset(detectorGroup, 'detector_distance'),
    getChildDataset(detectorGroup, 'threshold_energy'),
    getChildDataset(beamGroup, 'incident_wavelength'),
  ];

  usePrefetchValues(infoDatasets);
  const [
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    thresholdEnergy,
    wavelength,
  ] = useDatasetsValues(infoDatasets);

  return {
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    thresholdEnergy,
    wavelength,
  };
}

export function getChildDataset(
  group: GroupWithChildren,
  datasetName: string,
): Dataset<ScalarShape, FloatType> {
  const dataset = group.children.find((child) => child.name === datasetName);
  assertDefined(dataset);
  assertDataset(dataset);
  assertScalarShape(dataset);
  assertFloatType(dataset);

  return dataset;
}
