import { Button, DialogActions, DialogContent } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialogTitle from "../../components/Dialog/CustomDialogTitle";
import { repairsDataActions } from "../../dataLayer/repairs-data-slice";
import { newRepairSelector } from "../../selectors/repairs-selector";
import { filterSettingsActions } from "../../slices/filter-settings-slice";
import { requaredFieldRepair } from "../../utils";
import CommonRepairInformation from "./RepairsTable/CommonRepairInformation";

const AddNewRepairDialog = () => {
  const dispatch = useDispatch();
  const newRepair = useSelector(newRepairSelector);
  const handleCloseDialog = () => {
    dispatch(filterSettingsActions.setShowAddNewItemDialog(false));
  };
  const saveTaskHadler = () => {
    dispatch(repairsDataActions.insertNewRepair(newRepair));
    handleCloseDialog();
  };

  return (
    <>
      <CustomDialogTitle
        title="Новая заявка на ремонт"
        onClose={handleCloseDialog}
      />
      <DialogContent>
        <CommonRepairInformation repair={newRepair} dialogType="addNew" />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveTaskHadler}
          disabled={requaredFieldRepair(newRepair)}
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(AddNewRepairDialog);
