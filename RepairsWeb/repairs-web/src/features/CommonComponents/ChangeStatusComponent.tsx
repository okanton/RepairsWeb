import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import AppDatePicker from "../../components/AppDatePicker";
import NumberFormatCustom from "../../components/NumberFormatCustom";
import { Entity } from "../../entities";
import { ApprovalStatusesEnum } from "../../entities/enums";
import { userAccessInformaionSelector } from "../../selectors/common-selectors";
import ApprovalStatusSelector from "./Selectors/ApprovalStatusSelector";

interface ChangeStatusComponentProps {
  approvalStatusId: number;
  money: number;
  executeDate: Date | null;
  comment: string | null;
  onChangeStatus: (statusId: number) => void;
  onChangeComment: (comment: string) => void;
  onChangeMoney: (money: string) => void;
  onChangeExecuteDate: (date: Date) => void;
}

const ChangeStatusComponent = ({
  approvalStatusId,
  money,
  comment,
  executeDate,
  onChangeComment,
  onChangeMoney,
  onChangeStatus,
  onChangeExecuteDate,
}: ChangeStatusComponentProps) => {
  const accessInformation = useSelector(userAccessInformaionSelector);

  const onChangeStatusHandler = (status: Entity) => {
    onChangeStatus(status.id);
  };
  const onChangeMoneyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMoney(event.target.value);
  };
  const changeExecuteDateHandler = (date: Date | null) => {
    if (date) onChangeExecuteDate(date);
  };
  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeComment(event.target.value);
  };
  return (
    <Grid container item direction="column" spacing={1}>
      <Grid item>
        <ApprovalStatusSelector
          items={accessInformation.approvalStatusesByRoles}
          status={approvalStatusId}
          onChangeStatus={onChangeStatusHandler}
        />
      </Grid>
      {approvalStatusId !== ApprovalStatusesEnum.completed ? null : (
        <Grid item container direction="column" spacing={1}>
          <Grid container item spacing={1}>
            <Grid xs={5} item>
              <TextField
                label="Стоимость услуги"
                value={money}
                onChange={onChangeMoneyHandler}
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid xs item>
              <AppDatePicker
                style={{ margin: 0 }}
                value={executeDate}
                size="small"
                required
                fullWidth
                inputVariant="outlined"
                onChange={changeExecuteDateHandler}
                label="Дата завершения"
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              label="Примечание"
              value={comment ?? ""}
              multiline
              onChange={onChangeCommentHandler}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(ChangeStatusComponent);
