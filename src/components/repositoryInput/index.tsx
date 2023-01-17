import { Input, InputProps } from "antd";
import { useCallback } from "react";

import { useStore } from "store";
import { useDebounced, useOrganizations } from "hooks";

export const RepositoryInput: React.FC<InputProps> = (props) => {
    const setRepository = useStore((state) => state.setRepository);
    const repository = useStore((state) => state.repository);
    const organization = useStore((state) => state.organization);
    const repositoryInput = useStore((state) => state.repositoryInput);
    const setRepositoryInput = useStore((state) => state.setRepositoryInput);

    const { isOrganizationValid } = useOrganizations();

    const onRepositoryChange = useCallback(
        (e) => {
            const repository = e.target.value;
            setRepositoryInput(repository);
            setRepositoryDebounced(repository);
        },
        [repository, organization],
    );

    const setRepositoryDebounced = useDebounced(
        (repository: string) => {
            setRepository(repository);
        },
        [organization, repository],
    );

    return (
        <Input
            {...props}
            value={repositoryInput}
            onChange={onRepositoryChange}
            placeholder="Type to filter"
            disabled={!isOrganizationValid}
        />
    );
};
