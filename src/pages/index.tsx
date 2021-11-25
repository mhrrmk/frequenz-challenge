import { Row, Col, Form } from "antd";

import { OrganizationInput } from "components";
import { useOrganizations } from "hooks";

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const { data, isLoading, isFetching } = useOrganizations();

    console.log({ data: data?.data, isLoading, isFetching });

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form form={form} /* wrapperCol={{ span: 8 }} */>
                    <Form.Item name="orgs">
                        <OrganizationInput />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Home;
