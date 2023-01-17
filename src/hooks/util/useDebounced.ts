import React, { useMemo } from "react";
import debounce from "lodash.debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounced = <T extends (...args: any) => any>(
    func: T,
    deps?: React.DependencyList,
) => {
    return useMemo(() => debounce(func, 500), deps ? [deps] : []);
};
