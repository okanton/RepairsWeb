import { Grid } from "@material-ui/core";
import { useDashboardContext } from "itplus-react-ui";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../App/appHooks";
import AccordionComponent from "../components/AccordionComponent";
import AppSimpleDialog from "../components/Dialog/AppSimpleDialog";
import { repairsDataActions } from "../dataLayer/repairs-data-slice";
import { FilterParameters } from "../entities";
import { TaskTypesEnum } from "../entities/enums";
import AddNewRepairDialog from "../features/Repairs/AddNewRepairDialog";
import FilterResultPanel from "../features/CommonComponents/FilterResultPanel";
import FinancialInformation from "../features/CommonComponents/FinancialInformation";
import RepairsTable from "../features/Repairs/RepairsTable";
import { userAccessInformaionSelector } from "../selectors/common-selectors";
import {
  repairsSettingsSelector,
  showAddNewItemDialogSelector,
} from "../selectors/filter-settings-selectors";
import { repairsLoadingSelector } from "../selectors/repairs-selector";
import { filterSettingsActions } from "../slices/filter-settings-slice";

const RepairsPage = () => {
  const dispatch = useAppDispatch();
  const repairsSettings = useSelector(repairsSettingsSelector);
  const access = useSelector(userAccessInformaionSelector);
  const loading = useSelector(repairsLoadingSelector);
  const showDialog = useSelector(showAddNewItemDialogSelector);
  const { toggleLoaderShow } = useDashboardContext();
  useEffect(() => {
    toggleLoaderShow(loading);
  }, [loading, toggleLoaderShow]);

  useEffect(() => {
    dispatch(repairsDataActions.loadRepairs(repairsSettings));
  }, [dispatch, repairsSettings]);

  const handleCloseDialog = () => {
    dispatch(filterSettingsActions.setShowAddNewItemDialog(false));
  };
  const changeSettingsHandler = (settings: FilterParameters) => {
    dispatch(filterSettingsActions.setRepairsSettings(settings));
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <FilterResultPanel
          filterSettings={repairsSettings}
          setFilterSettings={changeSettingsHandler}
          taskType={TaskTypesEnum.taskRepairs}
        />
      </Grid>
      {access.roles.includes("Administrator") ? (
        <Grid item>
          <AccordionComponent title="Финансовая информация">
            <FinancialInformation taskType={TaskTypesEnum.taskRepairs} />
          </AccordionComponent>
        </Grid>
      ) : null}
      <Grid item>
        <RepairsTable />
      </Grid>
      <AppSimpleDialog
        open={showDialog}
        onEscapeKeyDown={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <AddNewRepairDialog />
      </AppSimpleDialog>
    </Grid>
  );
};

export default React.memo(RepairsPage);
