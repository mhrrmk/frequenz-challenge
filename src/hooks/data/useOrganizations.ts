import { useQuery } from "react-query";

import { useStateContextSelector } from "contextSelectors";
import { githubSearchApi } from "api";
import { AxiosResponse } from "axios";

type OrganizationResponseType = {
    items: Array<{ login: string }>;
};

export const useOrganizations = () => {
    const organization = useStateContextSelector((v) => v.organization);

    return useQuery<AxiosResponse<OrganizationResponseType>>(
        ["organizations", { organization }],
        () =>
            githubSearchApi({
                url: "users",
                params: { q: `${organization} type:org` },
            }),
        {
            enabled: organization !== "",
            keepPreviousData: true,
            // refetchOnWindowFocus: false,
        },
    );
};
