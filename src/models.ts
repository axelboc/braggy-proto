export enum RingColor {
  Black = 'Black',
  White = 'White',
  ColorMapMin = 'Colormap min',
  ColorMapMax = 'Colormap max',
}

export interface BraggyHeader {
  pixelSizeX: number;
  pixelSizeY: number;
  wavelength: number;
  detectorDistance: number;
  beamOcx: number;
  beamOcy: number;
}
