import {
  COLOR_SCALE_TYPES,
  ColorMapSelector,
  type Domain,
  DomainWidget,
  type InteractionInfo,
  ScaleSelector,
  Separator,
  ToggleBtn,
  Toolbar,
} from '@h5web/lib';
import { BsGrid3X3 } from 'react-icons/bs';

import { useImageConfig } from '../config';
import RingControl from './RingControl';

export const INTERACTIONS: InteractionInfo[] = [
  { shortcut: 'Drag', description: 'Pan' },
  { shortcut: 'Wheel', description: 'Zoom' },
  { shortcut: `Ctrl+Drag`, description: 'Select to zoom' },
];

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
    showRings,
    toggleRings,
    ringColor,
    setRingColor,
    getCssRingColor,
  } = useImageConfig();

  return (
    <Toolbar interactions={INTERACTIONS}>
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

      <RingControl
        showRings={showRings}
        ringColor={ringColor}
        toggleRings={toggleRings}
        setRingColor={setRingColor}
        getCssRingColor={getCssRingColor}
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
