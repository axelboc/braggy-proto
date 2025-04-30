import {
  type ColorMap,
  type ColorScaleType,
  type CustomDomain,
  ScaleType,
} from '@h5web/lib';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

export const useImageConfig = create<ImageConfig>()(
  persist(
    (set) => ({
      customDomain: [null, null],
      setCustomDomain: (customDomain: CustomDomain) => set({ customDomain }),

      colorMap: 'Viridis',
      setColorMap: (colorMap: ColorMap) => set({ colorMap }),

      invertColorMap: false,
      toggleColorMapInversion: () => {
        set((state) => ({ invertColorMap: !state.invertColorMap }));
      },

      scaleType: ScaleType.Linear,
      setScaleType: (scaleType: ColorScaleType) => {
        set({ scaleType });
      },

      showGrid: false,
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
    }),
    {
      name: 'braggy:image',
      version: 3,
    },
  ),
);
