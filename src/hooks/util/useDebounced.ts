import { useMemo } from "react";
import debounce from "lodash.debounce";

export const useDebounced = <T>(func: T) => {
    return useMemo(() => debounce(func, 500), []);
};
