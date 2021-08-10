import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSelector from "../../../components/AppSelector";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import { Entity } from "../../../entities";
import { allOrganizationsSelector } from "../../../selectors/common-selectors";

interface OrganizationsSelectorProps {
  organizationId?: number;
  onChangeOrganization?: (organization: Entity) => void;
  readonly: boolean;
  fullWidth?: boolean;
  title?: string;
}
const OrganizationsSelector = ({
  onChangeOrganization,
  organizationId = -1,
  readonly,
  title,
  fullWidth = true,
}: OrganizationsSelectorProps) => {
  const dispatch = useDispatch();
  const organizations = useSelector(allOrganizationsSelector);
  useEffect(() => {
    dispatch(commonDataActions.organizationsLoading());
  }, [dispatch]);

  const organizationChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOrganization = organizations.find(
      (p) => p.id === (event.target.value as number)
    );
    if (onChangeOrganization && selectedOrganization)
      onChangeOrganization(selectedOrganization);
  };
  if (organizations.length === 0) return null;
  return (
    <AppSelector
      fullWidth
      style={fullWidth ? undefined : { width: 270 }}
      isReadOnly={readonly}
      onChange={organizationChangeHandler}
      selectedValue={organizationId === -1 ? "" : organizationId}
      items={organizations}
      label={title ?? "Организация пользователя"}
    />
  );
};

export default React.memo(OrganizationsSelector);
