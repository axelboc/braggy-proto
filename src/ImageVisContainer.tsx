import {
  assertArrayShape,
  assertDataset,
  assertIntegerType,
  assertNumDims,
  useDatasetValue,
  useEntity,
} from '@h5web/app';

import ImageVis from './ImageVis';
import { useDetectorInfo } from './utils-data';

interface Props {
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVisContainer(props: Props) {
  const { toolbarElem } = props;

  const detectorInfo = useDetectorInfo();

  const dataset = useEntity('/entry_0000/measurement/data');
  assertDataset(dataset);
  assertArrayShape(dataset);
  assertIntegerType(dataset);
  assertNumDims(dataset, 3);

  const value = useDatasetValue(dataset, '24170,:,:');

  return (
    <ImageVis
      dataset={dataset}
      value={value}
      instrumentInfo={detectorInfo}
      toolbarElem={toolbarElem}
    />
  );
}

export default ImageVisContainer;
