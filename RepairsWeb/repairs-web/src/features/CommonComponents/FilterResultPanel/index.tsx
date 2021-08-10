import { Grid, IconButton, Paper, Tooltip } from "@material-ui/core";
import React, { useEffect } from "react";
import * as Icons from "@material-ui/icons";
import AppDatePicker from "../../../components/AppDatePicker";
import { Entity, FilterParameters } from "../../../entities";
import ApprovalStatusSelector from "../Selectors/ApprovalStatusSelector";
import AddressesSelector from "../Selectors/AddressesSelector";
import { useDispatch, useSelector } from "react-redux";
import { filterSettingsDataActions } from "../../../dataLayer/filter-settings-data-slice";
import { TaskTypesEnum } from "../../../entities/enums";
import { filterSettingsActions } from "../../../slices/filter-settings-slice";
import { refillingsActions } from "../../../slices/refillings-slice";
import { selectedRefillingSelector } from "../../../selectors/refillings-selectors";
import { initialRepair, repairsActions } from "../../../slices/repairs-slice";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import {
  allApprovalStatusesSelector,
  userAccessInformaionSelector,
} from "../../../selectors/common-selectors";
import AppTextField from "../../../components/AppTextField";
import {
  filteredRepairsSelector,
  searchStringSelector,
} from "../../../selectors/repairs-selector";
import { getFilteredRepairsByExcelAPI } from "../../../api/reports-api";
import { repairsDataActions } from "../../../dataLayer/repairs-data-slice";
import OrganizationsSelector from "../Selectors/OrganizationsSelector";

interface FilterResultPanelProps {
  filterSettings: FilterParameters;
  setFilterSettings: (settings: FilterParameters) => void;
  taskType: number;
}

const FilterResultPanel = ({
  filterSettings,
  setFilterSettings,
  taskType,
}: FilterResultPanelProps) => {
  const dispatch = useDispatch();
  const {
    addressId,
    approvalStatusId,
    organizationId,
    dateFrom,
    dateTo,
    timeConstraint,
  } = filterSettings;
  const access = useSelector(userAccessInformaionSelector);
  const selectedRefilling = useSelector(selectedRefillingSelector);
  const statuses = useSelector(allApprovalStatusesSelector);
  const searchString = useSelector(searchStringSelector);
  const filteredRepairs = useSelector(filteredRepairsSelector);

  useEffect(() => {
    dispatch(commonDataActions.approvalStatusesLoading());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterSettingsDataActions.loadTimeConstraintByTaskType(taskType));
  }, [dispatch, taskType]);

  const changeDateFromHandler = (date: Date | null) => {
    if (date) setFilterSettings({ ...filterSettings, dateFrom: date });
  };

  const changeDateToHandler = (date: Date | null) => {
    if (date) setFilterSettings({ ...filterSettings, dateTo: date });
  };

  const onChangeStatusHandler = (status: Entity) => {
    setFilterSettings({ ...filterSettings, approvalStatusId: status.id });
  };

  const onChageAddressHandler = (address: Entity) => {
    setFilterSettings({ ...filterSettings, addressId: address.id });
  };

  const resetFilterHandler = () => {
    setFilterSettings({
      ...filterSettings,
      addressId: -1,
      approvalStatusId: -1,
      organizationId: -1,
    });
    dispatch(repairsDataActions.setSearch(""));
  };

  const showAddNewItemDialogHandler = () => {
    if (taskType === TaskTypesEnum.taskRefillings) {
      dispatch(
        refillingsActions.setRefilling({
          ...selectedRefilling,
          address: { ...selectedRefilling.address, id: -1 },
          count: 1,
        })
      );
      dispatch(filterSettingsActions.setShowAddNewItemDialog(true));
    } else {
      dispatch(repairsActions.setNewRepair(initialRepair));
      dispatch(filterSettingsActions.setShowAddNewItemDialog(true));
    }
  };

  const onSearchHandler = (value: string) => {
    dispatch(repairsDataActions.setSearch(value));
  };

  const clearButtonHandler = () => {
    dispatch(repairsDataActions.setSearch(""));
  };
  const uploadToExcelHandler = () => {
    getFilteredRepairsByExcelAPI(filterSettings);
  };

  const onChangeOrganizationHandler = (organization: Entity) => {
    setFilterSettings({ ...filterSettings, organizationId: organization.id });
  };
  return (
    <Paper style={{ padding: 10, paddingRight: 25 }}>
      <Grid container justify="space-between">
        <Grid item xs container spacing={1} alignItems="center">
          <Grid item>
            <AppDatePicker
              minDate={timeConstraint.minDate}
              maxDate={new Date()}
              style={{ width: 180, margin: 0 }}
              value={dateFrom}
              size="small"
              inputVariant="outlined"
              onChange={changeDateFromHandler}
              label="Дата начала"
            />
          </Grid>
          <Grid item>
            <AppDatePicker
              minDate={timeConstraint.minDate}
              style={{ width: 180, margin: 0 }}
              maxDate={new Date()}
              inputVariant="outlined"
              size="small"
              value={dateTo}
              onChange={changeDateToHandler}
              label="Дата окончания"
            />
          </Grid>
          <Grid item>
            <ApprovalStatusSelector
              items={statuses}
              fullWidth={false}
              status={approvalStatusId}
              onChangeStatus={onChangeStatusHandler}
            />
          </Grid>
          <Grid item>
            <AddressesSelector
              fullWidth={false}
              readonly={false}
              addressId={addressId}
              onChangeAddress={onChageAddressHandler}
            />
          </Grid>
          {taskType === TaskTypesEnum.taskRepairs ? (
            <>
              <Grid item>
                <OrganizationsSelector
                  fullWidth={false}
                  title="Организация"
                  readonly={false}
                  organizationId={organizationId}
                  onChangeOrganization={onChangeOrganizationHandler}
                />
              </Grid>
              <Grid item>
                <AppTextField
                  label="Поиск"
                  value={searchString}
                  onChangeValue={onSearchHandler}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        style={{ padding: 3 }}
                        onClick={clearButtonHandler}
                      >
                        <Icons.Clear style={{ fontSize: 15 }} />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </>
          ) : null}
          <Grid item>
            <Tooltip title="Сбросить фильтр">
              <IconButton color="secondary" onClick={resetFilterHandler}>
                <Icons.RotateLeft />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item>
          <span>
            <Tooltip
              title={
                taskType === TaskTypesEnum.taskRepairs
                  ? "Создать заявку на ремонт оборудования"
                  : "Создать заявку на заправку картриджей"
              }
            >
              <IconButton
                color="secondary"
                onClick={showAddNewItemDialogHandler}
              >
                <Icons.Add />
              </IconButton>
            </Tooltip>
          </span>
        </Grid>
        {access.roles.includes("Administrator") &&
        taskType === TaskTypesEnum.taskRepairs ? (
          <Grid item>
            <Tooltip title="Выгрузить отчет в Excel">
              <span>
                <IconButton
                  disabled={filteredRepairs.length === 0}
                  color="secondary"
                  onClick={uploadToExcelHandler}
                >
                  <Icons.GetApp />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
};

export default React.memo(FilterResultPanel);
