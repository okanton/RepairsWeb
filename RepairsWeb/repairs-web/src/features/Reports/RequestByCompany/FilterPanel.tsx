import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import * as Icons from "@material-ui/icons";
import { useAppDispatch } from "../../../App/appHooks";
import AppDatePicker from "../../../components/AppDatePicker";
import { repairsByOrganizationReportSettingsSelector } from "../../../selectors/filter-settings-selectors";
import { filterSettingsActions } from "../../../slices/filter-settings-slice";
import { getRepairsByOrganizationToExcelAPI } from "../../../api/reports-api";
import useTable from "./useTable";

const useStyles = makeStyles({
  datePicker: {
    width: 180,
    margin: 0,
  },
  rootPaper: {
    padding: 10,
    paddingRight: 25,
  },
});

const FilterPanel = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { rows } = useTable();
  const repairsByOrganizationReportSettings = useSelector(
    repairsByOrganizationReportSettingsSelector
  );

  const changeDateFromHandler = (dateFrom: Date | null) => {
    if (dateFrom)
      dispatch(
        filterSettingsActions.setRepairsrepairsByOrganizationReportSettings({
          ...repairsByOrganizationReportSettings,
          dateFrom,
        })
      );
  };

  const changeDateToHandler = (dateTo: Date | null) => {
    if (dateTo)
      dispatch(
        filterSettingsActions.setRepairsrepairsByOrganizationReportSettings({
          ...repairsByOrganizationReportSettings,
          dateTo,
        })
      );
  };
  const getExcelReport = () => {
    getRepairsByOrganizationToExcelAPI(repairsByOrganizationReportSettings);
  };
  return (
    <Paper className={classes.rootPaper}>
      <Grid container justify="space-between">
        <Grid item xs container spacing={1} alignItems="center">
          <Grid item>
            <AppDatePicker
              className={classes.datePicker}
              value={repairsByOrganizationReportSettings.dateFrom}
              size="small"
              disableFuture
              inputVariant="outlined"
              onChange={changeDateFromHandler}
              label="Дата начала"
            />
          </Grid>
          <Grid item>
            <AppDatePicker
              className={classes.datePicker}
              inputVariant="outlined"
              size="small"
              disableFuture
              value={repairsByOrganizationReportSettings.dateTo}
              onChange={changeDateToHandler}
              label="Дата окончания"
            />
          </Grid>
        </Grid>
        <Grid item>
          <span>
            <Tooltip title="Выгрузить в Excel">
              <IconButton
                disabled={rows.length === 0}
                color="secondary"
                onClick={getExcelReport}
              >
                <Icons.GetApp />
              </IconButton>
            </Tooltip>
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(FilterPanel);
