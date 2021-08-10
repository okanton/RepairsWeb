import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialogTitle from "../../components/Dialog/CustomDialogTitle";
import { refillingDataActions } from "../../dataLayer/refillings-data-slice";
import { Entity } from "../../entities";
import { selectedRefillingSelector } from "../../selectors/refillings-selectors";
import { filterSettingsActions } from "../../slices/filter-settings-slice";
import { refillingsActions } from "../../slices/refillings-slice";
import AddressesSelector from "../CommonComponents/Selectors/AddressesSelector";

const AddNewRefillingDialog = () => {
  const dispatch = useDispatch();
  const selectedRefilling = useSelector(selectedRefillingSelector);
  const handleCloseDialog = () => {
    dispatch(filterSettingsActions.setShowAddNewItemDialog(false));
  };

  const saveTaskHadler = () => {
    dispatch(refillingDataActions.insertNewRefilling(selectedRefilling));
    handleCloseDialog();
  };

  const changeCartridgeCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      refillingsActions.setRefilling({
        ...selectedRefilling,
        count: parseInt(e.target.value),
      })
    );
  };

  const onChangeAddressHandler = (address: Entity) => {
    dispatch(refillingsActions.setRefilling({ ...selectedRefilling, address }));
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <CustomDialogTitle
        title="Новая заявка на заправку"
        onClose={handleCloseDialog}
      />
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <AddressesSelector
              fullWidth={true}
              readonly={false}
              addressId={selectedRefilling.address?.id ?? -1}
              onChangeAddress={onChangeAddressHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Количество картриджей"
              type="number"
              onChange={changeCartridgeCount}
              value={selectedRefilling.count}
              InputProps={{
                inputProps: {
                  min: "1",
                  step: "1",
                  max: "100",
                },
              }}
              onKeyDown={onKeyDownHandler}
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveTaskHadler}
          disabled={selectedRefilling.address.id === -1}
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(AddNewRefillingDialog);
