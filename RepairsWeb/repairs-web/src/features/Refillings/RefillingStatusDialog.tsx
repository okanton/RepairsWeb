import React from "react";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import CustomDialogTitle from "../../components/Dialog/CustomDialogTitle";
import { ApprovalStatusesEnum } from "../../entities/enums";
import ChangeStatusComponent from "../CommonComponents/ChangeStatusComponent";

interface RefillingStatusDialogProps {
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

const RefillingStatusDialog = ({
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
}: RefillingStatusDialogProps) => {
  return (
    <>
      <CustomDialogTitle
        title="Изменение статуса заявки"
        onClose={onCloseDialog}
      />
      <DialogContent>
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

export default React.memo(RefillingStatusDialog);
