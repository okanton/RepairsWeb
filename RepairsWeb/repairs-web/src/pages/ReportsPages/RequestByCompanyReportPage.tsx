import { Grid } from "@material-ui/core";
import { useDashboardContext } from "itplus-react-ui";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../App/appHooks";
import { repairsDataActions } from "../../dataLayer/repairs-data-slice";
import FilterPanel from "../../features/Reports/RequestByCompany/FilterPanel";
import RequestByCompanyTable from "../../features/Reports/RequestByCompany/RequestByCompanyTable";
import { repairsByOrganizationReportSettingsSelector } from "../../selectors/filter-settings-selectors";
import { repairsForReportByOrganizationIsLoadingSelector } from "../../selectors/repairs-selector";

const RequestByCompanyReportPage = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(repairsForReportByOrganizationIsLoadingSelector);
  const filterSettings = useSelector(
    repairsByOrganizationReportSettingsSelector
  );

  useEffect(() => {
    dispatch(
      repairsDataActions.loadRepairsForReportByOrganization(filterSettings)
    );
  }, [dispatch, filterSettings]);

  const { toggleLoaderShow } = useDashboardContext();

  useEffect(() => {
    toggleLoaderShow(loading);
  }, [loading, toggleLoaderShow]);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <FilterPanel />
      </Grid>
      <Grid item>
        <RequestByCompanyTable />
      </Grid>
    </Grid>
  );
};

export default React.memo(RequestByCompanyReportPage);
