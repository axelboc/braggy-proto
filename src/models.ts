export enum RingColor {
  Black = 'Black',
  White = 'White',
  ColorMapMin = 'Min',
  ColorMapMax = 'Max',
}

export interface InstrumentInfo {
  xPixelSize: number;
  yPixelSize: number;
  beamCenterX: number;
  beamCenterY: number;
  detectorDistance: number;
  saturationValue: number;
  underloadValue: number;
  wavelength: number;
}

export interface Bounds {
  min: number;
  max: number;
  stdMin: number;
  stdMax: number;
  positiveMin: number;
  strictPositiveMin: number;
}
