import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (...args: any[]) => any;

/**
 * usePersistFn 可以替代 useCallback 以降低心智负担
 */
export function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>(null);
  if (!persistFn.current) {
    // eslint-disable-next-line react-hooks/unsupported-syntax
    persistFn.current = function (this: unknown, ...args) {
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}
