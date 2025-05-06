export enum RingColor {
  Black = 'Black',
  White = 'White',
  ColorMapMin = 'Colormap min',
  ColorMapMax = 'Colormap max',
}

export interface InstrumentInfo {
  xPixelSize: number;
  yPixelSize: number;
  beamCenterX: number;
  beamCenterY: number;
  detectorDistance: number;
  wavelength: number;
}
