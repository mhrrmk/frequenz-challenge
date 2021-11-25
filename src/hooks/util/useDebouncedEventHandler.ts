import { useMemo } from "react";
import debounce from "lodash.debounce";

export const useDebouncedEventHandler = <EventHandler>(
    eventHandler: EventHandler,
) => {
    return useMemo(() => debounce(eventHandler, 500), []);
};
