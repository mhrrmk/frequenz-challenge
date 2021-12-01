import { Row, Col, Form, Table, Input, InputProps } from "antd";

import { OrganizationInput } from "components";
import { useRepositories, useDebounced, useOrganizations } from "hooks";

import { useStateContextSelector } from "contextSelectors";

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const { data, isLoading, isFetching } = useRepositories();

    // console.log({ data: data?.data, isLoading, isFetching });

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form form={form} /* wrapperCol={{ span: 8 }} */>
                    <Form.Item name="orgs">
                        <OrganizationInput />
                    </Form.Item>
                    <Form.Item name="orgs">
                        <RepositoryInput />
                    </Form.Item>
                </Form>
            </Col>
            <Col span={24}>
                <Table dataSource={data?.data?.items} loading={isFetching}>
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
