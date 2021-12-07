import { Row, Col, Form, Button } from "antd";

import {
    OrganizationInput,
    RepositoryInput,
    RepositoriesTable,
    IssuesInput,
} from "components";
import { useRepositories } from "hooks";

import { useIsIssueNumbersValid } from "store";

const Home: React.FC = () => {
    const isIssueNumbersValid = useIsIssueNumbersValid();

    const { refetch } = useRepositories();

    // console.log({ isIssueNumbersValid, minIssues, maxIssues });

    // console.log({ data: data?.data, isLoading, isFetching });

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form
                    layout="vertical"
                    // form={form} /* wrapperCol={{ span: 12 }} */
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
                                <IssuesInput />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Button onClick={() => refetch()}>Retry</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={24}>
                <RepositoriesTable />
            </Col>
        </Row>
    );
};

export default Home;
