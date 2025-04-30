import {
  type ArrayShape,
  type ArrayValue,
  type Dataset,
  type IntegerType,
  useNdArray,
} from '@h5web/app';
import {
  type Domain,
  HeatmapVis,
  useDomain,
  useSafeDomain,
  useVisDomain,
} from '@h5web/lib';
import standardDeviation from 'just-standard-deviation';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useImageConfig } from './config';
import ImageToolbar from './ImageToolbar';
import { DEFAULT_DOMAIN, FILL_VALUE, useNumArray } from './utils';

interface Props {
  dataset: Dataset<ArrayShape, IntegerType>;
  value: ArrayValue<IntegerType>;
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVis(props: Props) {
  const { dataset, value, toolbarElem } = props;

  const { customDomain, colorMap, invertColorMap, scaleType, showGrid } =
    useImageConfig();

  const slicedDims = useMemo(() => dataset.shape.slice(1), [dataset]);
  const dataArray = useNdArray(useNumArray(value), slicedDims);

  const domain = useDomain(dataArray, scaleType) || DEFAULT_DOMAIN;
  const domainStd: Domain = useMemo(() => {
    const std = standardDeviation(
      dataArray.data.filter((val) => val !== FILL_VALUE),
    );
    return [domain[0], std];
  }, [dataArray, domain]);

  const visDomain = useVisDomain(customDomain, domainStd);
  const [safeDomain] = useSafeDomain(visDomain, domainStd, scaleType);

  return (
    <>
      {toolbarElem &&
        createPortal(<ImageToolbar dataDomain={domainStd} />, toolbarElem)}

      <HeatmapVis
        dataArray={dataArray}
        domain={safeDomain}
        scaleType={scaleType}
        colorMap={colorMap}
        invertColorMap={invertColorMap}
        showGrid={showGrid}
        flipYAxis
      />
    </>
  );
}

export default ImageVis;
