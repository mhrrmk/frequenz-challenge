import { useQuery } from "react-query";
import { notification } from "antd";

import { githubSearchApi } from "api";
import { useStore } from "store";
import { AxiosError } from "axios";

type OrganizationResponseType = {
    items: Array<{ login: string }>;
    total_count: number;
};

type ResponseType<Data> = {
    data: Data;
};

export const useOrganizations = () => {
    const organization = useStore((state) => state.organization);

    // console.log({ organization });

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
            refetchOnWindowFocus: false,
            onError: (err: AxiosError) => {
                console.log({ err });
                notification.open({
                    key: "organizations",
                    message: "Organizations Query",
                    description: err.response.data.message,
                    duration: 15,
                });
            },
            retry: false,
        },
    );

    const organizationSearchResults =
        queryResult.data?.data.items.map((i) => i.login) ?? [];

    const isOrganizationValid =
        organizationSearchResults?.includes(organization);

    return {
        ...queryResult,
        isOrganizationValid,
    };
};
