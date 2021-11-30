import { useQuery } from "react-query";

import { useStateContextSelector } from "contextSelectors";
import { githubSearchApi } from "api";

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
    const organization = useStateContextSelector((v) => v.organization);
    const repository = useStateContextSelector((v) => v.repository);

    return useQuery<ResponseType<RepositoryResponseType>>(
        ["repositories", { organization, repository }],
        () => {
            if (repository === "") {
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
            // refetchOnWindowFocus: false,
        },
    );
};
