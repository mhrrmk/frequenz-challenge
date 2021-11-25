import { useContextSelector } from "use-context-selector";
import type { State } from "providers";
import { stateContext } from "providers";

export const useStateContextSelector = <Selected>(
    selector: (value: State) => Selected,
) => useContextSelector<State, Selected>(stateContext, selector);
