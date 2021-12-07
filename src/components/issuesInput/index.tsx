import { Space, InputNumber } from "antd";

import { useOrganizations } from "hooks";
import { useStore } from "store";

export const IssuesInput = () => {
    const { isOrganizationValid } = useOrganizations();

    const setMinIssues = useStore((state) => state.setMinIssues);
    const setMaxIssues = useStore((state) => state.setMaxIssues);
    const minIssues = useStore((state) => state.minIssues);
    const maxIssues = useStore((state) => state.maxIssues);
    return (
        <Space>
            <InputNumber
                onChange={(value: number) => {
                    setMinIssues(value);
                }}
                value={minIssues}
                disabled={!isOrganizationValid}
            />
            <InputNumber
                onChange={(value: number) => setMaxIssues(value)}
                value={maxIssues}
                disabled={!isOrganizationValid}
            />
        </Space>
    );
};
