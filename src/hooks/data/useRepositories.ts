import { useQuery } from "react-query";

import { githubSearchApi } from "api";
import { useOrganizations } from "hooks";
import { useStore } from "store";

type RepositoryResponseType = {
    items: Array<{
        name: string;
        stargazers_count: number;
        open_issues_count: number;
    }>;
    total_count: number;
};

type ResponseType<Data> = {
    data: Data;
};

export const useRepositories = () => {
    const organization = useStore((state) => state.organization);
    const repository = useStore((state) => state.repository);

    const { isOrganizationValid } = useOrganizations();

    // console.log({ organization, repository, isOrganizationValid });

    return useQuery<ResponseType<RepositoryResponseType>>(
        ["repositories", { organization, repository, isOrganizationValid }],
        () => {
            if (/* repository === "" ||  */ !isOrganizationValid) {
                return {
                    data: {
                        items: [],
                        total_count: 0,
                    },
                };
            }
            return githubSearchApi({
                url: "repositories",
                params: { q: `${repository} org:${organization} in:name` },
            });
        },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            // enabled: isOrganizationValid,
        },
    );
};
