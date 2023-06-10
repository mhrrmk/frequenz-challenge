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

export const useStore = create<State>((set, get) => ({
  organization: "",
  repository: "",
  repositoryInput: "",
  minIssues: null,
  maxIssues: null,
  setOrganization: (organization) => {
    const localStorageFilters = localStorage.getItem("filters");
    const localFilters = localStorageFilters
      ? JSON.parse(localStorageFilters)
      : {};

    const localOrganizationFilters: LocalFilters | undefined =
      localFilters[organization];

    const repository = localOrganizationFilters?.repository ?? "";
    const minIssues =
      localOrganizationFilters?.minIssues !== undefined
        ? localOrganizationFilters?.minIssues
        : null;
    const maxIssues =
      localOrganizationFilters?.maxIssues !== undefined
        ? localOrganizationFilters?.maxIssues
        : null;

    return set(() => ({
      organization,
      repository,
      repositoryInput: repository,
      maxIssues,
      minIssues,
    }));
  },
  setRepositoryInput: (repository) =>
    set(() => ({
      repositoryInput: repository,
    })),
  setRepository: (repository) => {
    const organization = get().organization;
    setLocalFilters(organization, { repository });

    return set(() => ({
      repository,
    }));
  },
  setMinIssues: (minIssues) => {
    const organization = get().organization;
    setLocalFilters(organization, { minIssues });

    return set(() => ({
      minIssues,
    }));
  },
  setMaxIssues: (maxIssues) => {
    const organization = get().organization;
    setLocalFilters(organization, { maxIssues });

    return set(() => ({
      maxIssues,
    }));
  },
}));

export const useIsIssueNumbersValid = () => {
  const minIssues = useStore((state) => state.minIssues);
  const maxIssues = useStore((state) => state.maxIssues);

  return minIssues && maxIssues ? minIssues < maxIssues : true;
};

type LocalFilters = {
  repository?: string;
  minIssues?: IssuesType;
  maxIssues?: IssuesType;
};

const setLocalFilters = (
  organization: string,
  { repository, minIssues, maxIssues }: LocalFilters,
) => {
  const localStorageFilters = localStorage.getItem("filters");
  const localFilters = localStorageFilters
    ? JSON.parse(localStorageFilters)
    : {};

  localStorage.setItem(
    "filters",
    JSON.stringify({
      ...localFilters,
      [organization]: {
        ...(localFilters[organization] ? localFilters[organization] : {}),
        ...(repository !== undefined ? { repository } : {}),
        ...(minIssues !== undefined ? { minIssues } : {}),
        ...(maxIssues !== undefined ? { maxIssues } : {}),
      },
    }),
  );
};
