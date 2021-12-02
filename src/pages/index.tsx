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

import { useStateContextSelector } from "contextSelectors";

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const { data, isFetching } = useRepositories();

    const { isOrganizationValid } = useOrganizations();

    const setMinIssues = useStateContextSelector((v) => v.setMinIssues);
    const setMaxIssues = useStateContextSelector((v) => v.setMaxIssues);
    const minIssues = useStateContextSelector((v) => v.minIssues);
    const maxIssues = useStateContextSelector((v) => v.maxIssues);
    const isIssueNumbersValid = useStateContextSelector(
        (v) => v.isIssueNumbersValid,
    );

    const repositoryList = data?.data.items.filter(
        (i) =>
            (maxIssues ? i.open_issues_count < maxIssues : true) &&
            (minIssues ? i.open_issues_count > minIssues : true),
    );

    console.log({ isIssueNumbersValid, minIssues, maxIssues });

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
                                        disabled={!isOrganizationValid}
                                    />
                                    <InputNumber
                                        onChange={(value: number) =>
                                            setMaxIssues(value)
                                        }
                                        disabled={!isOrganizationValid}
                                    />
                                </Space>
                            </Form.Item>
                        </Col>

                        {/* <Form.Item name="maxIssues">
                        <InputNumber />
                    </Form.Item> */}
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
    const setRepository = useStateContextSelector((v) => v.setRepository);

    const { isOrganizationValid } = useOrganizations();

    const onChange = useDebounced((e) => {
        const repository = e.target.value;
        // console.log({ repository });
        setRepository(repository);
    });

    return (
        <Input
            {...props}
            onChange={onChange}
            placeholder="Type to filter"
            disabled={!isOrganizationValid}
        />
    );
};

export default Home;
