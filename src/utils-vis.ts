import { type ArrayValue, type IntegerType } from '@h5web/app';
import {
  type Domain,
  type HistogramParams,
  type IgnoreValue,
  type ScaleType,
  useValidDomainForScale,
} from '@h5web/lib';
import { format } from 'd3-format';
import { type NdArray } from 'ndarray';
import { useCallback, useMemo } from 'react';

import { type Bounds } from './models';

export const formatRealValue = format('.2f');
export const formatTooltipVal = format('.5~g');

export const DEFAULT_DOMAIN: Domain = [0.1, 1];

export function useNumArray(values: ArrayValue<IntegerType>): number[] {
  return useMemo(() => [...values].map(Number), [values]);
}

export function useDomain(
  dataArray: NdArray<number[]>,
  scaleType: ScaleType,
  ignoreValue: IgnoreValue,
): Domain {
  const bounds = useBounds(dataArray.data, ignoreValue);
  return useValidDomainForScale(bounds, scaleType) || DEFAULT_DOMAIN;
}

function useBounds(values: number[], ignoreValue: IgnoreValue): Bounds {
  return useMemo(() => {
    let mean = 0;
    let sumSqrs = 0;
    let count = 0;

    let min = Infinity;
    let max = -Infinity;
    let positiveMin = Infinity;
    let strictPositiveMin = Infinity;

    for (const val of values) {
      // Ignore NaN and Infinity from the bounds computation
      if (!Number.isFinite(val) || ignoreValue(val)) {
        continue; // eslint-disable-line no-continue
      }

      const delta = val - mean;
      count += 1;
      mean += delta / count;
      sumSqrs += delta * (val - mean);

      min = Math.min(val, min);
      max = Math.max(val, max);
      positiveMin = val >= 0 ? Math.min(val, positiveMin) : positiveMin;
      strictPositiveMin =
        val > 0 ? Math.min(val, strictPositiveMin) : strictPositiveMin;
    }

    const threeStdDevs = 3 * Math.sqrt(sumSqrs / count);

    return {
      min: Math.max(min, mean - threeStdDevs),
      max: Math.min(max, mean + threeStdDevs),
      positiveMin,
      strictPositiveMin,
    };
  }, [values, ignoreValue]);
}

export function useIgnoreValue(threshold: number): IgnoreValue {
  return useCallback((val) => val > threshold, [threshold]);
}

export function useHistogram(
  dataArray: NdArray<number[]>,
  binsCount: number,
): Pick<HistogramParams, 'values' | 'bins'> {
  return useMemo(() => {
    const values = Array.from({ length: binsCount }, () => 0);
    const bins = Array.from({ length: binsCount }, (_, i) => i);

    dataArray.data.forEach((val) => {
      values[val] += 1;
    });

    return { values, bins };
  }, [dataArray, binsCount]);
}

export function computeResolution(
  realRadius: number,
  wavelength: number,
  detectorDistance: number,
): number {
  return (
    (0.5 * wavelength) /
    Math.sin(0.5 * Math.atan2(realRadius, detectorDistance))
  );
}
