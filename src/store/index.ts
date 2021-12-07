import create from "zustand";

type IssuesType = number | null;

type State = {
    organization: string;
    repository: string;
    repositoryInput: string;
    minIssues: IssuesType;
    maxIssues: IssuesType;
    setRepositoryInput: (repository: string) => void;
    setRepository: (repository: string) => void;
    setOrganization: (organization: string) => void;
    setMinIssues: (minIssues: IssuesType) => void;
    setMaxIssues: (maxIssues: IssuesType) => void;
};

export const useStore = create<State>((set) => ({
    organization: "",
    repository: "",
    repositoryInput: "",
    minIssues: null,
    maxIssues: null,
    setRepositoryInput: (repository) =>
        set(() => ({
            repositoryInput: repository,
        })),
    setRepository: (repository) =>
        set(() => ({
            repository,
        })),
    setOrganization: (organization) =>
        set(() => ({
            organization,
        })),
    setMinIssues: (minIssues) =>
        set(() => ({
            minIssues,
        })),
    setMaxIssues: (maxIssues) =>
        set(() => ({
            maxIssues,
        })),
}));

export const useIsIssueNumbersValid = () => {
    const minIssues = useStore((state) => state.minIssues);
    const maxIssues = useStore((state) => state.maxIssues);

    return minIssues && maxIssues ? minIssues < maxIssues : true;
};
