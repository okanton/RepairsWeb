import {
  DialogContent,
  DialogActions,
  Grid,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTextField from "../../../components/AppTextField";
import CustomDialogTitle from "../../../components/Dialog/CustomDialogTitle";
import { Entity } from "../../../entities";
import { selectedMailSelector } from "../../../selectors/mails-selectors";
import { mailSettingsActions } from "../../../slices/mail-settings";
import ServiceTypesSelector from "../../CommonComponents/Selectors/ServiceTypesSelector";

interface NewMailDialogProps {
  onCloseDialog: () => void;
  onSaveMail: () => void;
  title: string;
}
const NewMailDialog = ({
  onCloseDialog,
  onSaveMail,
  title,
}: NewMailDialogProps) => {
  const dispatch = useDispatch();
  const selectedMail = useSelector(selectedMailSelector);

  const saveMailHandler = () => {
    onSaveMail();
  };
  const onChangeName = (name: string) => {
    dispatch(mailSettingsActions.setSelectedMail({ ...selectedMail, name }));
  };
  const onChangeMail = (mail: string) => {
    dispatch(mailSettingsActions.setSelectedMail({ ...selectedMail, mail }));
  };
  const onChangeMailType = (mailType: Entity) => {
    dispatch(
      mailSettingsActions.setSelectedMail({
        ...selectedMail,
        serviceTypeId: mailType.id,
      })
    );
  };
  const onChangeIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      mailSettingsActions.setSelectedMail({
        ...selectedMail,
        isActive: event.target.checked,
      })
    );
  };

  return (
    <>
      <CustomDialogTitle title={title} onClose={onCloseDialog} />
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <AppTextField
              value={selectedMail.name}
              label="Сервисная организация"
              onChangeValue={onChangeName}
            />
          </Grid>
          <Grid item>
            <ServiceTypesSelector
              serviceId={selectedMail.serviceTypeId}
              onChangeMail={onChangeMailType}
            />
          </Grid>
          <Grid item>
            <AppTextField
              value={selectedMail.mail}
              label="E-mail"
              onChangeValue={onChangeMail}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={selectedMail.isActive}
                  onChange={onChangeIsActive}
                />
              }
              label="Активный"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveMailHandler}
          disabled={
            selectedMail.name === "" ||
            selectedMail.mail === "" ||
            selectedMail.serviceTypeId === -1
          }
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(NewMailDialog);
