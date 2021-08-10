import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSimpleDialog from "../../components/Dialog/AppSimpleDialog";
import { limitsDataActions } from "../../dataLayer/limits-data-slice";
import EditLimitsDialog from "../../features/Settings/Limits/EditLimitsDialog";
import LimitsFilterPanel from "../../features/Settings/Limits/LimitsFilterPanel";
import LimitsTable from "../../features/Settings/Limits/LimitsTable";
import {
  allLimitsSelector,
  limitDateFromSelector,
  limitDateToSelector,
  selectedLimitsIdSelector,
  showEditLimitsDialogSelector,
} from "../../selectors/limits-selectors";
import { initialLimit, limitsActions } from "../../slices/limits-slice";

const LimitsPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const showEdit = useSelector(showEditLimitsDialogSelector);
  const limits = useSelector(allLimitsSelector);
  const limitId = useSelector(selectedLimitsIdSelector);
  const dateFrom = useSelector(limitDateFromSelector);
  const dateTo = useSelector(limitDateToSelector);

  useEffect(() => {
    dispatch(limitsDataActions.loadLimitsByPeriods({ dateFrom, dateTo }));
  }, [dispatch, dateFrom, dateTo]);

  const closeDialogHandler = () => {
    dispatch(limitsActions.setShowEditLimitsDialog(false));
  };
  const onAddLimitHandler = () => {
    setTitle("Добавление лимита");
    dispatch(limitsActions.setLimit(initialLimit));
    dispatch(limitsActions.setShowEditLimitsDialog(true));
  };
  const onEditLimitHandler = () => {
    setTitle("Изменение лимита");
    const limit = limits.find((p) => p.id === (limitId[0] as number));
    if (limit) {
      dispatch(limitsActions.setLimit(limit));
      dispatch(limitsActions.setShowEditLimitsDialog(true));
    }
  };
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <LimitsFilterPanel
          onAddClick={onAddLimitHandler}
          onEditClick={onEditLimitHandler}
        />
      </Grid>
      <Grid item>
        <LimitsTable />
      </Grid>
      <AppSimpleDialog
        open={showEdit}
        onEscapeKeyDown={closeDialogHandler}
        maxWidth="sm"
        fullWidth
      >
        <EditLimitsDialog title={title} />
      </AppSimpleDialog>
    </Grid>
  );
};

export default React.memo(LimitsPage);
