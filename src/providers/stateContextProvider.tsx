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
    minIssues: number;
    setMinIssues: ReactSetStateType<State["minIssues"]>;
    maxIssues: number;
    setMaxIssues: ReactSetStateType<State["maxIssues"]>;
    isIssueNumbersValid: boolean;
};

export const stateContext = createContext<State>(null);

export const StateProvider: React.FC = ({ children }) => {
    const [organization, setOrganization] = useState("");
    // const [organizationSearch, setOrganizationSearch] = useState("");
    const [repository, setRepository] = useState("");
    const [minIssues, setMinIssues] = useState<number>();
    const [maxIssues, setMaxIssues] = useState<number>();

    const isIssueNumbersValid =
        minIssues && maxIssues ? minIssues < maxIssues : true;

    return (
        <stateContext.Provider
            value={{
                organization,
                setOrganization,
                // organizationSearch,
                // setOrganizationSearch,
                repository,
                setRepository,
                minIssues,
                setMinIssues,
                maxIssues,
                setMaxIssues,
                isIssueNumbersValid,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};
