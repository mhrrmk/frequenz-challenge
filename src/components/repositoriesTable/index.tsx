import { Table } from "antd";

import { useRepositories } from "hooks";
import { useStore } from "store";

export const RepositoriesTable = () => {
    const { data, isFetching } = useRepositories();

    const minIssues = useStore((state) => state.minIssues);
    const maxIssues = useStore((state) => state.maxIssues);

    const repositoryList = data?.data.items.filter(
        (i) =>
            (maxIssues ? i.open_issues_count < maxIssues : true) &&
            (minIssues ? i.open_issues_count > minIssues : true),
    );

    return (
        <Table dataSource={repositoryList} loading={isFetching}>
            <Table.Column
                dataIndex="name"
                title="Name"
                sorter={(a: { name: string }, b: { name: string }) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }}
            />
            <Table.Column
                dataIndex="stargazers_count"
                title="Stars"
                sorter={(
                    a: {
                        stargazers_count: number;
                    },
                    b: {
                        stargazers_count: number;
                    },
                ) => {
                    if (a.stargazers_count > b.stargazers_count) return 1;
                    if (a.stargazers_count < b.stargazers_count) return -1;
                    return 0;
                }}
            />
            <Table.Column
                dataIndex="open_issues_count"
                title="Issues"
                sorter={(
                    a: {
                        open_issues_count: number;
                    },
                    b: {
                        open_issues_count: number;
                    },
                ) => {
                    if (a.open_issues_count > b.open_issues_count) return 1;
                    if (a.open_issues_count < b.open_issues_count) return -1;
                    return 0;
                }}
            />
        </Table>
    );
};
