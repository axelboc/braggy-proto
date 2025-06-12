import {
  assertDataset,
  assertDefined,
  assertGroup,
  assertNumericType,
  assertScalarShape,
  type Dataset,
  type GroupWithChildren,
  type NumericType,
  type ScalarShape,
  useDatasetsValues,
  useEntity,
  usePrefetchValues,
} from '@h5web/app';

import { type InstrumentInfo } from './models';

export const CANCELLED_ERROR_MSG = 'Request cancelled';

export function useDetectorInfo(): InstrumentInfo {
  const beamGroup = useEntity('/entry_0000/instrument/jungfrau4m_rr4_smx/beam');
  const detectorGroup = useEntity(
    '/entry_0000/instrument/jungfrau4m_rr4_smx/detector_information',
  );
  assertGroup(beamGroup);
  assertGroup(detectorGroup);

  const infoDatasets = [
    getChildDataset(detectorGroup, 'x_pixel_size'),
    getChildDataset(detectorGroup, 'y_pixel_size'),
    getChildDataset(detectorGroup, 'beam_center_x'),
    getChildDataset(detectorGroup, 'beam_center_y'),
    getChildDataset(detectorGroup, 'detector_distance'),
    getChildDataset(detectorGroup, 'saturation_value'),
    getChildDataset(detectorGroup, 'underload_value'),
    getChildDataset(beamGroup, 'incident_wavelength'),
  ];

  usePrefetchValues(infoDatasets);
  const [
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    saturationValue,
    underloadValue,
    wavelength,
  ] = useDatasetsValues(infoDatasets).map(Number);

  return {
    xPixelSize,
    yPixelSize,
    beamCenterX,
    beamCenterY,
    detectorDistance,
    saturationValue,
    underloadValue,
    wavelength,
  };
}

export function getChildDataset(
  group: GroupWithChildren,
  datasetName: string,
): Dataset<ScalarShape, NumericType> {
  const dataset = group.children.find((child) => child.name === datasetName);
  assertDefined(dataset);
  assertDataset(dataset);
  assertScalarShape(dataset);
  assertNumericType(dataset);

  return dataset;
}
