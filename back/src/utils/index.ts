import { IFlow } from '../models/Flow';

export const safeJsonParse = <T>(guard: (o: any) => o is T) => (text: string): ParseResult<T> => {
  const parsed = JSON.parse(text);
  return guard(parsed) ? { parsed, hasError: false } : { hasError: true };
};

export type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown }
export function isFlowTypeArray(o: any): o is Array<IFlow> {
  if (Array.isArray(o)) {
    // eslint-disable-next-line no-use-before-define
    return isFlowType(o[0]);
  }
  return false;
}

export function isFlowType(o: any): o is IFlow {
  if (typeof o === 'object') {
    return 'v' in o && 'vw' in o;
  }
  return false;
}
