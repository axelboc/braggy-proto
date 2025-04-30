import {
  assertArrayShape,
  assertDataset,
  assertIntegerType,
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

  const value = useDatasetValue(dataset, '0,:,:');

  return <ImageVis dataset={dataset} value={value} toolbarElem={toolbarElem} />;
}

export default ImageVisContainer;
