import {
    Row,
    Col,
    Form,
    Table,
    Input,
    InputProps,
    InputNumber,
    Space,
} from "antd";

import { OrganizationInput } from "components";
import { useRepositories, useDebounced, useOrganizations } from "hooks";

import { useCallback, useState } from "react";
import { useStore, useIsIssueNumbersValid } from "store";

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const { data, isFetching } = useRepositories();

    const { isOrganizationValid } = useOrganizations();

    const setMinIssues = useStore((state) => state.setMinIssues);
    const setMaxIssues = useStore((state) => state.setMaxIssues);
    const minIssues = useStore((state) => state.minIssues);
    const maxIssues = useStore((state) => state.maxIssues);

    const isIssueNumbersValid = useIsIssueNumbersValid();

    const repositoryList = data?.data.items.filter(
        (i) =>
            (maxIssues ? i.open_issues_count < maxIssues : true) &&
            (minIssues ? i.open_issues_count > minIssues : true),
    );

    // console.log({ isIssueNumbersValid, minIssues, maxIssues });

    // console.log({ data: data?.data, isLoading, isFetching });

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form
                    layout="vertical"
                    form={form} /* wrapperCol={{ span: 12 }} */
                >
                    <Row gutter={24}>
                        <Col span="24">
                            <Form.Item name="organizations">
                                <OrganizationInput />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                label="Filter repository by name"
                                name="repositories"
                            >
                                <RepositoryInput />
                            </Form.Item>
                        </Col>

                        <Col span="12">
                            <Form.Item
                                label="Filter by number of issues"
                                validateStatus={
                                    isIssueNumbersValid ? "success" : "error"
                                }
                                help={
                                    isIssueNumbersValid
                                        ? ""
                                        : "Conflicting min and max values"
                                }
                                name="minIssues"
                            >
                                <Space>
                                    <InputNumber
                                        onChange={(value: number) => {
                                            // console.log({ value });
                                            setMinIssues(value);
                                        }}
                                        value={minIssues}
                                        disabled={!isOrganizationValid}
                                    />
                                    <InputNumber
                                        onChange={(value: number) =>
                                            setMaxIssues(value)
                                        }
                                        value={maxIssues}
                                        disabled={!isOrganizationValid}
                                    />
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={24}>
                <Table dataSource={repositoryList} loading={isFetching}>
                    <Table.Column
                        dataIndex="name"
                        title="Name"
                        sorter={(a: { name: string }, b: { name: string }) => {
                            // console.log({ a, b });
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
                            // console.log({ a, b });
                            if (a.stargazers_count > b.stargazers_count)
                                return 1;
                            if (a.stargazers_count < b.stargazers_count)
                                return -1;
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
                            // console.log({ a, b });
                            if (a.open_issues_count > b.open_issues_count)
                                return 1;
                            if (a.open_issues_count < b.open_issues_count)
                                return -1;
                            return 0;
                        }}
                    />
                </Table>
            </Col>
        </Row>
    );
};

const RepositoryInput: React.FC<InputProps> = (props) => {
    const setRepository = useStore((state) => state.setRepository);
    const repository = useStore((state) => state.repository);
    const organization = useStore((state) => state.organization);
    const repositoryInput = useStore((state) => state.repositoryInput);
    const setRepositoryInput = useStore((state) => state.setRepositoryInput);

    const { isOrganizationValid } = useOrganizations();

    const onRepositoryChange = useCallback(
        (e) => {
            const repository = e.target.value;
            setRepositoryInput(repository);
            setRepositoryDebounced(repository);
        },
        [repository, organization],
    );

    const setRepositoryDebounced = useDebounced(
        (repository) => {
            setRepository(repository);
        },
        [organization, repository],
    );

    return (
        <Input
            {...props}
            value={repositoryInput}
            onChange={onRepositoryChange}
            placeholder="Type to filter"
            disabled={!isOrganizationValid}
        />
    );
};

export default Home;
