import { Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { useAppDispatch } from "../../../App/appHooks";
import AppTextField from "../../../components/AppTextField";
import { Entity, Repair } from "../../../entities";
import { repairsActions } from "../../../slices/repairs-slice";
import AddressesSelector from "../../CommonComponents/Selectors/AddressesSelector";
import DeviceTypesSelector from "../../CommonComponents/Selectors/DeviceTypesSelector";
import OrganizationsSelector from "../../CommonComponents/Selectors/OrganizationsSelector";

interface CommonRepairInformationProps {
  dialogType: "addNew" | "readOnly";
  repair: Repair;
}

const CommonRepairInformation = ({
  dialogType,
  repair,
}: CommonRepairInformationProps) => {
  const readOnly = dialogType === "readOnly";

  const dispatch = useAppDispatch();

  const onChangeRequestNumberHandler = (requestNumber: string) => {
    dispatch(repairsActions.setNewRepair({ ...repair, requestNumber }));
  };
  const onChangeDeviceTypeHandler = (deviceType: Entity) => {
    dispatch(repairsActions.setNewRepair({ ...repair, deviceType }));
  };
  const onChangeModelHandler = (model: string) => {
    dispatch(
      repairsActions.setNewRepair({
        ...repair,
        model: model.toUpperCase(),
      })
    );
  };
  const onChangeSerialNumber = (serialNumber: string) => {
    dispatch(
      repairsActions.setNewRepair({
        ...repair,
        serialNumber: serialNumber.toUpperCase(),
      })
    );
  };
  const onChangeConfigureUnit = (configurationUnitId: string) => {
    dispatch(
      repairsActions.setNewRepair({
        ...repair,
        configurationUnitId,
      })
    );
  };
  const onChangeTroubleHandler = (trouble: string) => {
    dispatch(repairsActions.setNewRepair({ ...repair, trouble }));
  };
  const onChangeClientNameHandler = (fullUserName: string) => {
    dispatch(
      repairsActions.setNewRepair({
        ...repair,
        client: { ...repair.client, fullUserName },
      })
    );
  };
  const onChangeAddressHandler = (address: Entity) => {
    dispatch(repairsActions.setNewRepair({ ...repair, address }));
  };
  const onChangeOrganizationHandler = (organization: Entity) => {
    dispatch(repairsActions.setNewRepair({ ...repair, organization }));
  };
  const onChangeDepartmentHandler = (userDepartment: string) => {
    dispatch(
      repairsActions.setNewRepair({
        ...repair,
        client: { ...repair.client, userDepartment },
      })
    );
  };
  const onChangeRoomHandler = (room: string) => {
    dispatch(repairsActions.setNewRepair({ ...repair, room }));
  };
  const onChangePhoneHandler = (phone: string) => {
    dispatch(repairsActions.setNewRepair({ ...repair, phone }));
  };
  const onChangeAdditionalInformation = (information: string) => {
    dispatch(repairsActions.setNewRepair({ ...repair, information }));
  };

  return (
    <Grid container item direction="column" spacing={1}>
      <Grid container item spacing={1}>
        <Grid item xs={4}>
          <AppTextField
            type="number"
            value={
              readOnly
                ? repair.requestNumber.substring(3)
                : repair.requestNumber
            }
            InputProps={{
              inputProps: {
                min: "1",
              },
              readOnly: readOnly,
            }}
            label="№ заявки ОТ"
            onChangeValue={onChangeRequestNumberHandler}
          />
        </Grid>
        <Grid item xs>
          <DeviceTypesSelector
            readOnly={readOnly}
            deviceId={repair.deviceType?.id}
            onChangeDeviceType={onChangeDeviceTypeHandler}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={1}>
        <Grid xs={8} item>
          <AppTextField
            label="Модель"
            value={repair.model}
            onChangeValue={onChangeModelHandler}
            inputProps={{ style: { textTransform: "uppercase" } }}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid xs item>
          <Tooltip title="Идентификатор КЕ из Omnitracker">
            <span>
              <AppTextField
                type="number"
                InputProps={{
                  inputProps: {
                    min: "0",
                  },
                  readOnly: readOnly,
                }}
                label="КЕ"
                value={repair.configurationUnitId}
                onChangeValue={onChangeConfigureUnit}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item>
        <AppTextField
          label="Серийный номер"
          onChangeValue={onChangeSerialNumber}
          value={repair.serialNumber}
          InputProps={{ readOnly: readOnly }}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>
      <Grid item>
        <AppTextField
          multiline
          value={repair.trouble}
          label="Подробное описание неполадки"
          InputProps={{ readOnly: readOnly }}
          onChangeValue={onChangeTroubleHandler}
        />
      </Grid>
      <Grid container item spacing={1}>
        <Grid xs item>
          <AddressesSelector
            readonly={readOnly}
            addressId={repair.address.id}
            onChangeAddress={onChangeAddressHandler}
          />
        </Grid>
        <Grid xs item>
          <AppTextField
            label="Комната"
            value={repair.room}
            InputProps={{ readOnly: readOnly }}
            onChangeValue={onChangeRoomHandler}
          />
        </Grid>
      </Grid>
      <Grid item>
        <AppTextField
          label="ФИО пользователя"
          value={repair.client.fullUserName}
          InputProps={{ readOnly: readOnly }}
          onChangeValue={onChangeClientNameHandler}
        />
      </Grid>
      <Grid item>
        <OrganizationsSelector
          readonly={readOnly}
          onChangeOrganization={onChangeOrganizationHandler}
          organizationId={repair.organization?.id}
        />
      </Grid>
      <Grid item>
        <AppTextField
          label="Отдел пользователя"
          InputProps={{ readOnly: readOnly }}
          value={repair.client.userDepartment}
          onChangeValue={onChangeDepartmentHandler}
        />
      </Grid>
      <Grid item>
        <AppTextField
          label="Телефоны пользователя"
          value={repair.phone}
          InputProps={{ readOnly: readOnly }}
          onChangeValue={onChangePhoneHandler}
        />
      </Grid>
      <Grid item>
        <AppTextField
          margin="none"
          multiline
          value={repair.information}
          label="Справочная информация"
          InputProps={{ readOnly: readOnly }}
          onChangeValue={onChangeAdditionalInformation}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(CommonRepairInformation);
