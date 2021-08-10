import { Grid } from "@material-ui/core";
import { useDashboardContext } from "itplus-react-ui";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../App/appHooks";
import AccordionComponent from "../components/AccordionComponent";
import AppSimpleDialog from "../components/Dialog/AppSimpleDialog";
import { refillingDataActions } from "../dataLayer/refillings-data-slice";
import { FilterParameters } from "../entities";
import { TaskTypesEnum } from "../entities/enums";
import AddNewRefillingDialog from "../features/Refillings/AddNewRefillingDialog";
import FilterResultPanel from "../features/CommonComponents/FilterResultPanel";
import FinancialInformation from "../features/CommonComponents/FinancialInformation";
import RefillingsTable from "../features/Refillings/RefillingsTable";
import { userAccessInformaionSelector } from "../selectors/common-selectors";
import {
  refillingsSettingsSelector,
  showAddNewItemDialogSelector,
} from "../selectors/filter-settings-selectors";
import { refillingsLoadingSelector } from "../selectors/refillings-selectors";
import { filterSettingsActions } from "../slices/filter-settings-slice";

const RefillingsPage = () => {
  const dispatch = useAppDispatch();
  const refillingSettings = useSelector(refillingsSettingsSelector);
  const access = useSelector(userAccessInformaionSelector);
  const showDialog = useSelector(showAddNewItemDialogSelector);
  const loading = useSelector(refillingsLoadingSelector);
  const { toggleLoaderShow } = useDashboardContext();
  useEffect(() => {
    toggleLoaderShow(loading);
  }, [loading, toggleLoaderShow]);

  useEffect(() => {
    dispatch(refillingDataActions.loadRefillings(refillingSettings));
  }, [dispatch, refillingSettings]);

  const changeSettingsHandler = (settings: FilterParameters) => {
    dispatch(filterSettingsActions.setRefillingsSettings(settings));
  };
  const handleCloseDialog = () => {
    dispatch(filterSettingsActions.setShowAddNewItemDialog(false));
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <FilterResultPanel
          filterSettings={refillingSettings}
          setFilterSettings={changeSettingsHandler}
          taskType={TaskTypesEnum.taskRefillings}
        />
      </Grid>
      {access.roles.includes("Administrator") ? (
        <Grid item>
          <AccordionComponent title="Финансовая информация">
            <FinancialInformation taskType={TaskTypesEnum.taskRefillings} />
          </AccordionComponent>
        </Grid>
      ) : null}
      <Grid item>
        <RefillingsTable />
      </Grid>
      <AppSimpleDialog
        open={showDialog}
        onEscapeKeyDown={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <AddNewRefillingDialog />
      </AppSimpleDialog>
    </Grid>
  );
};

export default React.memo(RefillingsPage);
