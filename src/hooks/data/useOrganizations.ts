import { useQuery } from "react-query";

import { useStateContextSelector } from "contextSelectors";
import { githubSearchApi } from "api";

type OrganizationResponseType = {
    items: Array<{ login: string }>;
    total_count: number;
};

type ResponseType<Data> = {
    data: Data;
};

export const useOrganizations = () => {
    const organization = useStateContextSelector((v) => v.organization);

    return useQuery<ResponseType<OrganizationResponseType>>(
        ["organizations", { organization }],
        () => {
            if (organization === "") {
                return {
                    data: {
                        items: [],
                        total_count: 0,
                    },
                };
            }
            return githubSearchApi({
                url: "users",
                params: { q: `${organization} type:org` },
            });
        },
        {
            keepPreviousData: true,
            // refetchOnWindowFocus: false,
        },
    );
};
