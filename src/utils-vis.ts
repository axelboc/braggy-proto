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

export const DEFAULT_DOMAIN: Domain = [1, 10];

export function useNumArray(values: ArrayValue<IntegerType>): number[] {
  return useMemo(() => [...values].map(Number), [values]);
}

export function useIgnoreValue(threshold: number): IgnoreValue {
  return useCallback((val) => val > threshold, [threshold]);
}

export function useBounds(values: number[], ignoreValue: IgnoreValue): Bounds {
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
      min,
      max,
      stdMin: Math.max(min, mean - threeStdDevs),
      stdMax: Math.min(max, mean + threeStdDevs),
      positiveMin,
      strictPositiveMin,
    };
  }, [values, ignoreValue]);
}

export function useDomain(
  bounds: Bounds,
  scaleType: ScaleType,
): { fullDomain: Domain; stdDomain: Domain } {
  const stdBounds = useMemo(
    () => ({ ...bounds, min: bounds.stdMin, max: bounds.stdMax }),
    [bounds],
  );

  return {
    fullDomain: useValidDomainForScale(bounds, scaleType) || DEFAULT_DOMAIN,
    stdDomain: useValidDomainForScale(stdBounds, scaleType) || DEFAULT_DOMAIN,
  };
}

export function useHistogram(
  dataArray: NdArray<number[]>,
  domain: Domain,
): Pick<HistogramParams, 'values' | 'bins'> {
  return useMemo(() => {
    const min = Math.floor(domain[0]);
    const max = Math.ceil(domain[1]);
    const size = max - min;

    const binsCount = Math.min(size, 10);
    const binSize = size / binsCount;

    const bins = Array.from({ length: binsCount }, (_, i) => min + binSize * i);
    const values = Array.from({ length: binsCount }, () => 0);

    dataArray.data.forEach((val) => {
      const index = Math.floor((val - min) / binSize);
      if (index in values) {
        values[index] += 1;
      }
    });

    return { bins, values };
  }, [dataArray, domain]);
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
