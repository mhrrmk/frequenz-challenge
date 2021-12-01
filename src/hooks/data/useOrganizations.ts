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

    const queryResult = useQuery<ResponseType<OrganizationResponseType>>(
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

    const organizationSearchResults = queryResult.data?.data.items.map(
        (i) => i.login,
    );

    const isOrganizationValid =
        organizationSearchResults?.includes(organization);

    return {
        ...queryResult,
        isOrganizationValid,
    };
};
