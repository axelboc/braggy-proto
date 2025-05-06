import {
  type ColorMap,
  type ColorScaleType,
  type CustomDomain,
  INTERPOLATORS,
  ScaleType,
} from '@h5web/lib';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RingColor } from './models';

interface ImageConfig {
  customDomain: CustomDomain;
  setCustomDomain: (customDomain: CustomDomain) => void;

  colorMap: ColorMap;
  setColorMap: (colorMap: ColorMap) => void;

  invertColorMap: boolean;
  toggleColorMapInversion: () => void;

  scaleType: ColorScaleType;
  setScaleType: (scaleType: ColorScaleType) => void;

  showGrid: boolean;
  toggleGrid: () => void;

  showRings: boolean;
  toggleRings: () => void;

  ringColor: RingColor;
  setRingColor: (ringColor: RingColor) => void;
  getCssRingColor: (ringColor: RingColor) => string;
}

export const useImageConfig = create<ImageConfig>()(
  persist(
    (set, get) => ({
      customDomain: [null, null],
      setCustomDomain: (customDomain: CustomDomain) => set({ customDomain }),

      colorMap: 'Viridis',
      setColorMap: (colorMap: ColorMap) => set({ colorMap }),

      invertColorMap: false,
      toggleColorMapInversion: () => {
        set((state) => ({ invertColorMap: !state.invertColorMap }));
      },

      scaleType: ScaleType.Linear,
      setScaleType: (scaleType: ColorScaleType) => set({ scaleType }),

      showGrid: false,
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

      showRings: false,
      toggleRings: () => set((state) => ({ showRings: !state.showRings })),

      ringColor: RingColor.Black,
      setRingColor: (ringColor: RingColor) => set({ ringColor }),
      getCssRingColor: (ringColor: RingColor) => {
        if (ringColor === RingColor.Black) {
          return '#000';
        }

        if (ringColor === RingColor.White) {
          return '#fff';
        }

        const { colorMap, invertColorMap } = get();
        const interpolator = INTERPOLATORS[colorMap];

        if (ringColor === RingColor.ColorMapMin) {
          return interpolator(invertColorMap ? 1 : 0);
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (ringColor === RingColor.ColorMapMax) {
          return interpolator(invertColorMap ? 0 : 1);
        }

        throw new Error('Invalid ring color');
      },
    }),
    {
      name: 'braggy:image',
      version: 3,
    },
  ),
);
