import {
  assertArrayShape,
  assertDataset,
  assertIntegerType,
  assertNumDims,
  useDatasetValue,
  useEntity,
} from '@h5web/app';

import ImageVis from './ImageVis';
import { useDetectorInfo } from './utils';

interface Props {
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVisContainer(props: Props) {
  const { toolbarElem } = props;

  const detectorInfo = useDetectorInfo();

  const dataset = useEntity('/entry/data/data_000001');
  assertDataset(dataset);
  assertArrayShape(dataset);
  assertIntegerType(dataset);
  assertNumDims(dataset, 3);

  const value = useDatasetValue(dataset, '0,:,:');

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
