import React from "react";
import { Row, Col, Input, Form, Card } from "antd";

const Home: React.FC = () => {
    return (
        <Card>
            <Row gutter={16}>
                <Col span={24}>
                    <Form wrapperCol={{ span: 8 }}>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default Home;
