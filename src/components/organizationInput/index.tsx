import { AutoComplete, AutoCompleteProps } from "antd";

import { useStateContextSelector } from "contextSelectors";
import { useDebounced, useOrganizations } from "hooks";

export const OrganizationInput: React.FC<AutoCompleteProps> = (props) => {
    const setOrganization = useStateContextSelector((v) => v.setOrganization);

    const onChange = useDebounced((value) => {
        console.log({ org: value });
        setOrganization(value);
    });

    const { data } = useOrganizations();

    const options = data?.data.items.map((i) => ({
        label: i.login,
        value: i.login,
    }));

    return <AutoComplete {...props} options={options} onChange={onChange} />;
};
