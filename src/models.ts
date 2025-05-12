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
  thresholdEnergy: number;
  wavelength: number;
}
