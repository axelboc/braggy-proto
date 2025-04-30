import { type ArrayValue, type IntegerType } from '@h5web/app';
import { type Domain } from '@h5web/lib';
import { useMemo } from 'react';

export const CANCELLED_ERROR_MSG = 'Request cancelled';

export const FILL_VALUE = 65_535;
export const DEFAULT_DOMAIN: Domain = [0.1, 1];

export function useNumArray(values: ArrayValue<IntegerType>): number[] {
  return useMemo(() => [...values].map(Number), [values]);
}
