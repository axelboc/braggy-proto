import {
  COLOR_SCALE_TYPES,
  ColorMapSelector,
  type Domain,
  DomainWidget,
  ScaleSelector,
  Separator,
  ToggleBtn,
  Toolbar,
} from '@h5web/lib';
import { BsGrid3X3 } from 'react-icons/bs';

import { useImageConfig } from './config';

interface Props {
  dataDomain: Domain;
}

function ImageToolbar(props: Props) {
  const { dataDomain } = props;

  const {
    customDomain,
    setCustomDomain,
    colorMap,
    setColorMap,
    invertColorMap,
    toggleColorMapInversion,
    scaleType,
    setScaleType,
    showGrid,
    toggleGrid,
  } = useImageConfig();

  return (
    <Toolbar>
      <Separator />

      <DomainWidget
        dataDomain={dataDomain}
        customDomain={customDomain}
        scaleType={scaleType}
        onCustomDomainChange={setCustomDomain}
      />

      <Separator />

      <ScaleSelector
        value={scaleType}
        onScaleChange={setScaleType}
        options={COLOR_SCALE_TYPES}
      />

      <Separator />

      <ColorMapSelector
        value={colorMap}
        onValueChange={setColorMap}
        invert={invertColorMap}
        onInversionChange={toggleColorMapInversion}
      />

      <Separator />

      <ToggleBtn
        label="Grid"
        Icon={BsGrid3X3}
        value={showGrid}
        onToggle={toggleGrid}
      />
    </Toolbar>
  );
}

export default ImageToolbar;
