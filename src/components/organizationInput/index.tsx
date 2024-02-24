import { AutoComplete, AutoCompleteProps } from "antd";

import { useDebounced, useOrganizations } from "hooks";
import { useStore } from "store";

export const OrganizationInput: React.FC<AutoCompleteProps> = (props) => {
  const setOrganization = useStore((state) => state.setOrganization);

  const onChange = useDebounced((value: string) => {
    setOrganization(value);
  });

  const { data } = useOrganizations();

  const options = data?.data.items.map((i) => ({
    label: i.login,
    value: i.login,
  }));

  return (
    <AutoComplete
      {...props}
      options={options}
      onChange={onChange}
      placeholder="Select Organisation"
    />
  );
};
