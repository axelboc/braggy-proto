import {
  type ArrayShape,
  type ArrayValue,
  type Dataset,
  type IntegerType,
  useDataContext,
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
import { type InstrumentInfo } from './models';
import Rings from './rings/Rings';
import ImageToolbar from './toolbar/ImageToolbar';
import { DEFAULT_DOMAIN, FILL_VALUE, useNumArray } from './utils';

interface Props {
  dataset: Dataset<ArrayShape, IntegerType>;
  value: ArrayValue<IntegerType>;
  instrumentInfo: InstrumentInfo;
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVis(props: Props) {
  const { dataset, value, instrumentInfo, toolbarElem } = props;

  const { filename } = useDataContext();

  const {
    customDomain,
    colorMap,
    invertColorMap,
    scaleType,
    showGrid,
    showRings,
    ringColor,
    getCssRingColor,
  } = useImageConfig();

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
        title={filename}
        dataArray={dataArray}
        domain={safeDomain}
        scaleType={scaleType}
        colorMap={colorMap}
        invertColorMap={invertColorMap}
        showGrid={showGrid}
        flipYAxis
      >
        {showRings && (
          <Rings
            dims={slicedDims}
            ringColor={getCssRingColor(ringColor)}
            instrumentInfo={instrumentInfo}
          />
        )}
      </HeatmapVis>
    </>
  );
}

export default ImageVis;
