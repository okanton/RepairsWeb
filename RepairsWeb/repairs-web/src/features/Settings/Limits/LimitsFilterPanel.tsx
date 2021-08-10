import { Grid, IconButton, Paper } from "@material-ui/core";
import React from "react";
import * as Icons from "@material-ui/icons";
import AppDatePicker from "../../../components/AppDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  limitDateFromSelector,
  limitDateToSelector,
  selectedLimitsIdSelector,
} from "../../../selectors/limits-selectors";
import { limitsActions } from "../../../slices/limits-slice";

interface LimitsFilterPanelProps {
  onAddClick: () => void;
  onEditClick: () => void;
}

const LimitsFilterPanel = ({
  onAddClick,
  onEditClick,
}: LimitsFilterPanelProps) => {
  const dispatch = useDispatch();
  const selectedDateFrom = useSelector(limitDateFromSelector);
  const selectedDateTo = useSelector(limitDateToSelector);
  const selectedId = useSelector(selectedLimitsIdSelector);
  const changeDateFromHandler = (dateFrom: Date | null) => {
    if (dateFrom) {
      dispatch(limitsActions.setDateFrom(dateFrom));
    }
  };
  const changeDateToHandler = (dateTo: Date | null) => {
    if (dateTo) {
      dispatch(limitsActions.setDateTo(dateTo));
    }
  };
  return (
    <Paper style={{ padding: 10 }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <AppDatePicker
            style={{ width: 180, margin: 0 }}
            value={selectedDateFrom}
            size="small"
            inputVariant="outlined"
            onChange={changeDateFromHandler}
            label="Начало периода"
          />
        </Grid>
        <Grid item>
          <AppDatePicker
            style={{ width: 180, margin: 0 }}
            value={selectedDateTo}
            size="small"
            inputVariant="outlined"
            onChange={changeDateToHandler}
            label="Конец периода"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={onAddClick}>
            <Icons.Add />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={onEditClick} disabled={selectedId.length === 0}>
            <Icons.Edit />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(LimitsFilterPanel);
