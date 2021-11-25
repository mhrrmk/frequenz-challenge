import React, { useMemo } from "react";
import { Row, Col, Input, Form } from "antd";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import axios from "axios";
import { useStateContextSelector } from "contextSelectors";

const BASE_API_URL = "https://api.github.com/search/";

const githubSearchApi = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

const Home: React.FC = () => {
    const [form] = Form.useForm();

    const { data, isLoading, isFetching } = useOrgs();

    console.log({ data: data?.data, isLoading, isFetching });

    return (
        <Row style={{ margin: 16 }} gutter={16}>
            <Col span={24}>
                <Form form={form} /* wrapperCol={{ span: 8 }} */>
                    <OrgsInput />
                </Form>
            </Col>
        </Row>
    );
};

const useOrgs = () => {
    const org = useStateContextSelector((v) => v.org);

    return useQuery(
        ["orgs", { org }],
        () =>
            githubSearchApi({
                url: "users",
                params: { q: `${org} type:org` },
            }),
        {
            enabled: org !== "",
            keepPreviousData: true,
            // refetchOnWindowFocus: false,
        },
    );
};

const OrgsInput = () => {
    const setOrg = useStateContextSelector((v) => v.setOrg);

    const onOrgsChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log({ org: e.target.value });
        setOrg(e.target.value);
    };

    const debouncedOnOrgsChange = useMemo(
        () => debounce(onOrgsChange, 500),
        [],
    );
    return (
        <Form.Item name="orgs">
            <Input onChange={debouncedOnOrgsChange} />
        </Form.Item>
    );
};

export default Home;
