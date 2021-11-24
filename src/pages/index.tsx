import React, { useState, useMemo } from "react";
import { Row, Col, Input, Form } from "antd";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://api.github.com/search/";

const githubSearchApi = axios.create({
    baseURL: BASE_API_URL,
});

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const [org, setOrg] = useState("");

    const { data } = useQuery(
        ["orgs", { org }],
        () =>
            githubSearchApi({
                url: "users",
                params: { q: `${org} type:org` },
            }),
        { enabled: org !== "" },
    );

    console.log({ data });

    const onOrgsChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log({ org: e.target.value });
        setOrg(e.target.value);
    };

    const debouncedOnOrgsChange = useMemo(
        () => debounce(onOrgsChange, 500),
        [],
    );

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form form={form} /* wrapperCol={{ span: 8 }} */>
                    <Form.Item name="orgs">
                        <Input onChange={debouncedOnOrgsChange} />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Home;
