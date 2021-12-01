import { useState } from "react";
import { createContext } from "use-context-selector";

type ReactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type State = {
    organization: string;
    setOrganization: ReactSetStateType<State["organization"]>;
    // organizationSearch: string;
    // setOrganizationSearch: ReactSetStateType<State["organizationSearch"]>;
    repository: string;
    setRepository: ReactSetStateType<State["repository"]>;
};

export const stateContext = createContext<State>(null);

export const StateProvider: React.FC = ({ children }) => {
    const [organization, setOrganization] = useState("");
    // const [organizationSearch, setOrganizationSearch] = useState("");
    const [repository, setRepository] = useState("");

    return (
        <stateContext.Provider
            value={{
                organization,
                setOrganization,
                // organizationSearch,
                // setOrganizationSearch,
                repository,
                setRepository,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};
