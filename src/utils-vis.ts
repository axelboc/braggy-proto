import { type ArrayValue, type IntegerType } from '@h5web/app';
import {
  type Domain,
  type HistogramParams,
  type IgnoreValue,
  ScaleType,
} from '@h5web/lib';
import { format } from 'd3-format';
import standardDeviation from 'just-standard-deviation';
import { type NdArray } from 'ndarray';
import { useCallback, useMemo } from 'react';

export const formatRealValue = format('.2f');
export const formatTooltipVal = format('.5~g');

export const DEFAULT_DOMAIN: Domain = [0.1, 1];

export function useNumArray(values: ArrayValue<IntegerType>): number[] {
  return useMemo(() => [...values].map(Number), [values]);
}

export function useDomain(
  dataArray: NdArray<number[]>,
  scaleType: ScaleType,
  threshold: number,
): Domain {
  return useMemo(() => {
    const min =
      scaleType !== ScaleType.Linear && scaleType !== ScaleType.SymLog ? 1 : 0;

    const max = standardDeviation(
      dataArray.data.filter((val) => val < threshold),
    );

    return [min, max];
  }, [dataArray, scaleType, threshold]);
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
