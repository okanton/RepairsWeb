import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialogTitle from "../../../components/Dialog/CustomDialogTitle";
import { limitsDataActions } from "../../../dataLayer/limits-data-slice";
import { selectedLimitSelector } from "../../../selectors/limits-selectors";
import { limitsActions } from "../../../slices/limits-slice";
import AppDatePicker from "../../../components/AppDatePicker";
import ServiceTypesSelector from "../../CommonComponents/Selectors/ServiceTypesSelector";
import { Entity } from "../../../entities";
import NumberFormatCustom from "../../../components/NumberFormatCustom";

interface EditLimitsDialogProps {
  title: string;
}

const EditLimitsDialog = ({ title }: EditLimitsDialogProps) => {
  const dispatch = useDispatch();
  const selectedLimit = useSelector(selectedLimitSelector);

  const closeDialogHandler = () => {
    dispatch(limitsActions.setShowEditLimitsDialog(false));
  };
  const saveLimitHandler = () => {
    dispatch(limitsDataActions.saveLimit(selectedLimit));
    closeDialogHandler();
  };
  const changeDateFromHandler = (dateFrom: Date | null) => {
    if (dateFrom) {
      dispatch(limitsActions.setLimit({ ...selectedLimit, dateFrom }));
    }
  };
  const changeDateToHandler = (dateTo: Date | null) => {
    if (dateTo) {
      dispatch(limitsActions.setLimit({ ...selectedLimit, dateTo }));
    }
  };
  const onChangeType = (serviceType: Entity) => {
    dispatch(
      limitsActions.setLimit({
        ...selectedLimit,
        serviceTypeId: serviceType.id,
      })
    );
  };
  const onChangeLimitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      limitsActions.setLimit({
        ...selectedLimit,
        limit: parseFloat(event.target.value),
      })
    );
  };

  return (
    <>
      <CustomDialogTitle title={title} onClose={closeDialogHandler} />
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="space-between">
            <Grid item>
              <AppDatePicker
                style={{ margin: 0 }}
                value={selectedLimit.dateFrom}
                size="small"
                inputVariant="outlined"
                onChange={changeDateFromHandler}
                label="Начало периода"
              />
            </Grid>
            <Grid item>
              <AppDatePicker
                style={{ margin: 0 }}
                value={selectedLimit.dateTo}
                size="small"
                inputVariant="outlined"
                onChange={changeDateToHandler}
                label="Конец периода"
              />
            </Grid>
          </Grid>
          <Grid item>
            <ServiceTypesSelector
              serviceId={selectedLimit.serviceTypeId}
              onChangeMail={onChangeType}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Лимит"
              value={selectedLimit.limit}
              onChange={onChangeLimitHandler}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveLimitHandler}
          disabled={
            selectedLimit.dateFrom === null ||
            selectedLimit.dateTo === null ||
            selectedLimit.limit === 0 ||
            selectedLimit.serviceTypeId === -1
          }
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default React.memo(EditLimitsDialog);
