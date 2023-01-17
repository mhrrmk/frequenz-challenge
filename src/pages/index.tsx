import { Row, Col, Form, Button } from 'antd';

import {
    OrganizationInput,
    RepositoryInput,
    RepositoriesTable,
    IssuesInput,
    Charts,
} from 'components';
import { useRepositories } from 'hooks';

import { useIsIssueNumbersValid } from 'store';

const Home: React.FC = () => {
    const isIssueNumbersValid = useIsIssueNumbersValid();

    const { refetch, data } = useRepositories();
    return (
        <div style={{ padding: 16 }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span="24">
                                <Form.Item
                                    wrapperCol={{ span: 8 }}
                                    name="organizations"
                                >
                                    <OrganizationInput />
                                </Form.Item>
                            </Col>
                            <Col span="8">
                                <Form.Item
                                    // wrapperCol={{ span: 12 }}
                                    label="Filter repository by name"
                                    name="repositories"
                                >
                                    <RepositoryInput />
                                </Form.Item>
                            </Col>

                            <Col span="6">
                                <Form.Item
                                    label="Filter by number of issues"
                                    validateStatus={
                                        isIssueNumbersValid
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        isIssueNumbersValid
                                            ? ''
                                            : 'Conflicting min and max values'
                                    }
                                    name="minIssues"
                                >
                                    <IssuesInput />
                                </Form.Item>
                            </Col>
                            <Col span="24">
                                <Button onClick={() => refetch()}>Retry</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={12}>
                    <RepositoriesTable />
                </Col>
                <Col span={12}>
                    <Charts />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
