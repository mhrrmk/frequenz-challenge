import { useCallback, useState } from "react";
import { createContext } from "use-context-selector";

type ReactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

type IssuesType = number | null;

export type State = {
    organization: string;
    setOrganization: ReactSetStateType<State["organization"]>;
    // organizationSearch: string;
    // setOrganizationSearch: ReactSetStateType<State["organizationSearch"]>;
    repository: string;
    // setRepository: ReactSetStateType<State["repository"]>;
    setRepository: (repository: string) => void;
    minIssues: IssuesType;
    // setMinIssues: ReactSetStateType<State["minIssues"]>;
    setMinIssues: (minIssues: IssuesType) => void;
    maxIssues: IssuesType;
    setMaxIssues: (maxIssues: IssuesType) => void;
    isIssueNumbersValid: boolean;
};

export const stateContext = createContext<State>(null);

type LocalFilters = {
    repository?: string;
    minIssues?: IssuesType;
    maxIssues?: IssuesType;
};

const setLocalFilters = (
    organization: string,
    { repository, minIssues, maxIssues }: LocalFilters,
) => {
    const localFilters = JSON.parse(localStorage.getItem("filters")) ?? {};

    console.log({ localFilters });

    localStorage.setItem(
        "filters",
        JSON.stringify({
            ...localFilters,
            [organization]: {
                ...(localFilters[organization]
                    ? localFilters[organization]
                    : {}),
                ...(repository !== undefined ? { repository } : {}),
                ...(minIssues !== undefined ? { minIssues } : {}),
                ...(maxIssues !== undefined ? { maxIssues } : {}),
            },
        }),
    );
};

export const StateProvider: React.FC = ({ children }) => {
    const [organization, setOrganization] = useState("");
    // const [organizationSearch, setOrganizationSearch] = useState("");
    const [repository, setRepositoryState] = useState("");
    const [minIssues, setMinIssuesState] = useState<number | null>();
    const [maxIssues, setMaxIssuesState] = useState<number | null>();

    console.log({ minIssues, maxIssues });

    const setRepository = useCallback(
        (repository: string) => {
            setLocalFilters(organization, { repository });
            setRepositoryState(repository);
        },
        [organization, repository],
    );

    const setMinIssues = useCallback(
        (minIssues: IssuesType) => {
            setLocalFilters(organization, { minIssues });
            setMinIssuesState(minIssues);
        },
        [organization, minIssues],
    );

    const setMaxIssues = useCallback(
        (maxIssues: IssuesType) => {
            setLocalFilters(organization, { maxIssues });
            setMaxIssuesState(maxIssues);
        },
        [organization, maxIssues],
    );

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
