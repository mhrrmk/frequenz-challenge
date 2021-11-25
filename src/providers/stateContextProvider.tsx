import { useState } from "react";
import { createContext } from "use-context-selector";

export type State = {
    org: string;
    setOrg: React.Dispatch<React.SetStateAction<string>>;
};

export const stateContext = createContext<State>(null);

export const StateProvider: React.FC = ({ children }) => {
    const [org, setOrg] = useState("");
    return (
        <stateContext.Provider value={{ org, setOrg }}>
            {children}
        </stateContext.Provider>
    );
};
