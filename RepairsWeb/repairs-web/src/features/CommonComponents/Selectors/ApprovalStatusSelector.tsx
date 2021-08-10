import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppSelector from "../../../components/AppSelector";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import { Entity } from "../../../entities";

interface ApprovalStatusSelectorProps {
  status: number;
  items: Array<Entity>;
  onChangeStatus?: (status: Entity) => void;
  fullWidth?: boolean;
}

const ApprovalStatusSelector = ({
  status,
  onChangeStatus,
  items,
  fullWidth = true,
}: ApprovalStatusSelectorProps) => {
  const dispatch = useDispatch();

  const selectedStatusId = items.some((p) => p.id === status) ? status : -1;

  useEffect(() => {
    dispatch(commonDataActions.approvalStatusesLoading());
  }, [dispatch]);

  const statusChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedStatus = items.find(
      (p) => p.id === (event.target.value as number)
    );
    if (onChangeStatus && selectedStatus) {
      onChangeStatus(selectedStatus);
    }
  };

  return (
    <AppSelector
      style={fullWidth ? undefined : { width: 180 }}
      onChange={statusChangeHandler}
      selectedValue={selectedStatusId === -1 ? "" : selectedStatusId}
      items={items}
      label="Статус"
    />
  );
};

export default React.memo(ApprovalStatusSelector);
