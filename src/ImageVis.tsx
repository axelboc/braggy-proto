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
import RingsOverlay from './rings/RingsOverlay';
import ImageToolbar from './toolbar/ImageToolbar';
import { DEFAULT_DOMAIN, FILL_VALUE, useNumArray } from './utils';

const BRAGGY_HEADER = {
  beamOcx: 11.456_359_863_281_25,
  beamOcy: -2.329_467_773_437_5,
  detectorDistance: 0.178_574_994_206_428_53,
  pixelSizeX: 0.000_075_000_003_562_308_85,
  pixelSizeY: 0.000_075_000_003_562_308_85,
  wavelength: 0.967_700_004_577_636_7,
};

interface Props {
  dataset: Dataset<ArrayShape, IntegerType>;
  value: ArrayValue<IntegerType>;
  toolbarElem: HTMLDivElement | undefined;
}

function ImageVis(props: Props) {
  const { dataset, value, toolbarElem } = props;

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
          <RingsOverlay
            dims={slicedDims}
            ringColor={getCssRingColor(ringColor)}
            braggyHeader={BRAGGY_HEADER}
          />
        )}
      </HeatmapVis>
    </>
  );
}

export default ImageVis;
