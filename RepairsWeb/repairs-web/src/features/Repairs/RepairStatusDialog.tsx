import { Button, DialogActions, DialogContent, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CustomDialogTitle from "../../components/Dialog/CustomDialogTitle";
import { ApprovalStatusesEnum } from "../../entities/enums";
import { selectedRepairSelector } from "../../selectors/repairs-selector";
import ChangeStatusComponent from "../CommonComponents/ChangeStatusComponent";
import CommonRepairInformation from "./RepairsTable/CommonRepairInformation";

interface RepairStatusDialogProps {
  approvalStatusId: number;
  money: number;
  executeDate: Date | null;
  comment: string | null;
  onChangeStatus: (statusId: number) => void;
  onChangeComment: (comment: string) => void;
  onChangeMoney: (money: string) => void;
  onCloseDialog: () => void;
  onChangeExecuteDate: (date: Date) => void;
  saveHandler: () => void;
}

const RepairStatusDialog = ({
  approvalStatusId,
  money,
  comment,
  executeDate,
  onChangeComment,
  onChangeMoney,
  onChangeStatus,
  onCloseDialog,
  onChangeExecuteDate,
  saveHandler,
}: RepairStatusDialogProps) => {
  const selectedRepair = useSelector(selectedRepairSelector);

  if (selectedRepair === null) return null;
  return (
    <>
      <CustomDialogTitle
        title="Изменение статуса заявки"
        onClose={onCloseDialog}
      />
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <CommonRepairInformation
            dialogType="readOnly"
            repair={selectedRepair}
          />
          <ChangeStatusComponent
            approvalStatusId={approvalStatusId}
            money={money}
            onChangeComment={onChangeComment}
            comment={comment}
            executeDate={executeDate}
            onChangeExecuteDate={onChangeExecuteDate}
            onChangeMoney={onChangeMoney}
            onChangeStatus={onChangeStatus}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveHandler}
          disabled={
            approvalStatusId === ApprovalStatusesEnum.onAgreement ||
            (approvalStatusId === ApprovalStatusesEnum.completed &&
              executeDate == null)
          }
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(RepairStatusDialog);
