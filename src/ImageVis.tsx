import {
  type ArrayShape,
  type ArrayValue,
  type Dataset,
  type IntegerType,
  useDataContext,
  useNdArray,
} from '@h5web/app';
import { HeatmapVis, useSafeDomain, useVisDomain } from '@h5web/lib';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useImageConfig } from './config';
import { type InstrumentInfo } from './models';
import Rings from './rings/Rings';
import ImageToolbar from './toolbar/ImageToolbar';
import Tooltip from './Tooltip';
import {
  useDomain,
  useHistogram,
  useIgnoreValue,
  useNumArray,
} from './utils-vis';

interface Props {
  dataset: Dataset<ArrayShape, IntegerType>;
  value: ArrayValue<IntegerType>;
  instrumentInfo: InstrumentInfo;
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVis(props: Props) {
  const { dataset, value, instrumentInfo, toolbarElem } = props;
  const { thresholdEnergy } = instrumentInfo;

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

  const domainStd = useDomain(dataArray, scaleType, thresholdEnergy);
  const ignoreValue = useIgnoreValue(thresholdEnergy);

  const visDomain = useVisDomain(customDomain, domainStd);
  const [safeDomain] = useSafeDomain(visDomain, domainStd, scaleType);

  const histogram = useHistogram(dataArray, domainStd[1]);

  return (
    <>
      {toolbarElem &&
        createPortal(
          <ImageToolbar dataDomain={domainStd} histogram={histogram} />,
          toolbarElem,
        )}

      <HeatmapVis
        title={filename}
        dataArray={dataArray}
        domain={safeDomain}
        scaleType={scaleType}
        ignoreValue={ignoreValue}
        colorMap={colorMap}
        invertColorMap={invertColorMap}
        showGrid={showGrid}
        flipYAxis
        renderTooltip={({ xi, yi }) => (
          <Tooltip
            xIndex={xi}
            yIndex={yi}
            value={dataArray.get(yi, xi)}
            instrumentInfo={instrumentInfo}
          />
        )}
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
