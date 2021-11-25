import { useQuery } from "react-query";

import { useStateContextSelector } from "contextSelectors";
import { githubSearchApi } from "api";

export const useOrganizations = () => {
    const organization = useStateContextSelector((v) => v.organization);

    return useQuery(
        ["organizations", { organization }],
        async () =>
            await githubSearchApi({
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
