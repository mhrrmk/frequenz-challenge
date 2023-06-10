import React, { useMemo } from "react";
import debounce from "lodash.debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounced = <T extends (...args: any) => any>(
  func: T,
  deps?: React.DependencyList,
  wait?: number,
) => {
  return useMemo(() => debounce(func, wait ?? 500), deps ?? []);
};
