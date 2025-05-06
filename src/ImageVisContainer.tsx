import {
  assertArrayShape,
  assertDataset,
  assertIntegerType,
  assertNumDims,
  useDatasetValue,
  useEntity,
} from '@h5web/app';

import ImageVis from './ImageVis';

interface Props {
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVisContainer(props: Props) {
  const { toolbarElem } = props;

  const dataset = useEntity('/entry/data/data');
  assertDataset(dataset);
  assertArrayShape(dataset);
  assertIntegerType(dataset);
  assertNumDims(dataset, 3);

  const value = useDatasetValue(dataset, '0,:,:');

  return <ImageVis dataset={dataset} value={value} toolbarElem={toolbarElem} />;
}

export default ImageVisContainer;
