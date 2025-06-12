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

export function prepareReport(message: string): string {
  return `<< THIS EMAIL IS A TEMPLATE >>
<< Please sign your name and provide as much information as possible to help us debug the issue. >>

Hi,

I encountered the following error on Hibou:

  >> ${message}

Here is some additional context:

  - Browser: ${navigator.userAgent}
  - URL: ${globalThis.location.href}

<< Explain how you got here; what you were trying to achieve when the error occurred; etc. >>

Thanks,
<< Name >>`;
}
