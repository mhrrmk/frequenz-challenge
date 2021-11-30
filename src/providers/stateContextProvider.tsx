import { useState } from "react";
import { createContext } from "use-context-selector";

export type State = {
    organization: string;
    setOrganization: React.Dispatch<React.SetStateAction<string>>;
    repository: string;
    setRepository: React.Dispatch<React.SetStateAction<string>>;
};

export const stateContext = createContext<State>(null);

export const StateProvider: React.FC = ({ children }) => {
    const [organization, setOrganization] = useState("");
    const [repository, setRepository] = useState("");
    return (
        <stateContext.Provider
            value={{ organization, setOrganization, repository, setRepository }}
        >
            {children}
        </stateContext.Provider>
    );
};
