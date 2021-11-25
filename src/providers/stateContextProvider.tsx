import { useState } from "react";
import { createContext } from "use-context-selector";

export type State = {
    organization: string;
    setOrganization: React.Dispatch<React.SetStateAction<string>>;
};

export const stateContext = createContext<State>(null);

export const StateProvider: React.FC = ({ children }) => {
    const [organization, setOrganization] = useState("");
    return (
        <stateContext.Provider value={{ organization, setOrganization }}>
            {children}
        </stateContext.Provider>
    );
};
