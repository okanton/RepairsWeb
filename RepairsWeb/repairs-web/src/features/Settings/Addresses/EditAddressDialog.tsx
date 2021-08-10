import { Button, DialogActions, DialogContent } from "@material-ui/core";
import React from "react";
import AppTextField from "../../../components/AppTextField";
import CustomDialogTitle from "../../../components/Dialog/CustomDialogTitle";
import { Entity } from "../../../entities";

interface EditAddressDialogProps {
  title: string;
  onClose: () => void;
  address: Entity;
  onSave: () => void;
  onChange: (address: Entity) => void;
}

const EditAddressDialog = ({
  title,
  onClose,
  address,
  onSave,
  onChange,
}: EditAddressDialogProps) => {
  const onChangeAddressName = (value: string) => {
    onChange({ ...address, value });
  };
  return (
    <>
      <CustomDialogTitle title={title} onClose={onClose} />
      <DialogContent>
        <AppTextField
          value={address.value}
          label="Название площадки"
          onChangeValue={onChangeAddressName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} disabled={address.value === ""}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(EditAddressDialog);
