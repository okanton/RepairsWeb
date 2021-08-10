import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSelector from "../../../components/AppSelector";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import { Entity } from "../../../entities";
import { allDeviceTypesSelector } from "../../../selectors/common-selectors";

interface DeviceTypesSelectorProps {
  deviceId?: number;
  onChangeDeviceType?: (deviceType: Entity) => void;
  readOnly: boolean;
}
const DeviceTypesSelector = ({
  onChangeDeviceType,
  deviceId,
  readOnly,
}: DeviceTypesSelectorProps) => {
  const dispatch = useDispatch();
  const deviceTypes = useSelector(allDeviceTypesSelector);
  
  useEffect(() => {
    dispatch(commonDataActions.deviceTypesLoading());
  }, [dispatch]);
  const deviceTypeChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedDevType = deviceTypes.find(
      (p) => p.id === (event.target.value as number)
    );
    if (onChangeDeviceType && selectedDevType)
      onChangeDeviceType(selectedDevType);
  };

  if (deviceTypes.length === 0) return null;
  return (
    <AppSelector
      onChange={deviceTypeChangeHandler}
      selectedValue={deviceId ?? ""}
      items={deviceTypes}
      isReadOnly={readOnly}
      label="Тип оборудования"
    />
  );
};

export default React.memo(DeviceTypesSelector);
