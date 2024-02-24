import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { AxiosError } from "axios";

import { githubSearchApi } from "api";
import { useOrganizations } from "hooks";
import { useStore } from "store";

type RepositoryResponseType = {
  items: Array<{
    name: string;
    stargazers_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
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

  return useQuery<ResponseType<RepositoryResponseType>, AxiosError>(
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
        params: {
          q: `${repository} org:${organization} in:name`,
        },
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (err) => {
        notification.open({
          key: "repositories",
          message: "Repositories Query",
          description: err.response?.data.message,
          duration: 15,
        });
      },
      retry: false,
    },
  );
};
