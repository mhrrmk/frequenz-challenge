import React, { useMemo } from "react";
import debounce from "lodash.debounce";

export const useDebounced = <T>(func: T, deps?: React.DependencyList) => {
    return useMemo(() => debounce(func, 1500), deps ? [deps] : []);
};
