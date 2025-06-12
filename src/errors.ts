export class SearchParamError extends Error {
  public constructor(paramName: string) {
    super(`Expected URL parameter '${paramName}'`);
    this.name = 'SearchParamError';
  }
}

export function assertDefinedSearchParam(
  value: string | null,
  name: string,
): asserts value is string {
  if (!value) {
    throw new SearchParamError(name);
  }
}
