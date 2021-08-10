import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterSettingsDataActions } from "../dataLayer/filter-settings-data-slice";
import { FilterParameters, TimeConstraint } from "../entities";
import { TaskTypesEnum } from "../entities/enums";

interface FilterSettingsState {
  refillingsSettings: FilterParameters;
  repairsSettings: FilterParameters;
  repairsByOrganizationReportSettings: FilterParameters;
  showAddNewItemDialog: boolean;
  showApprovalStatusDialog: boolean;
}

const date = new Date();

const defaultSettings: FilterParameters = {
  addressId: -1,
  approvalStatusId: -1,
  organizationId: -1,
  dateFrom: new Date(date.getFullYear(), date.getMonth(), 1, 12, 0),
  dateTo: new Date(),
  timeConstraint: {
    minDate: null,
    taskType: -1,
  },
};

const initialState: FilterSettingsState = {
  refillingsSettings: defaultSettings,
  repairsSettings: defaultSettings,
  repairsByOrganizationReportSettings: {
    ...defaultSettings,
    dateFrom: new Date(date.getFullYear(), 0, 1, 12, 0),
  },
  showAddNewItemDialog: false,
  showApprovalStatusDialog: false,
};

const filterSettingsSlice = createSlice({
  name: "filterSettingsSlice",
  initialState,
  reducers: {
    setRefillingsSettings: (state, action: PayloadAction<FilterParameters>) => {
      state.refillingsSettings = action.payload;
    },
    setRepairsSettings: (state, action: PayloadAction<FilterParameters>) => {
      state.repairsSettings = action.payload;
    },
    setRepairsrepairsByOrganizationReportSettings: (
      state,
      action: PayloadAction<FilterParameters>
    ) => {
      state.repairsByOrganizationReportSettings = action.payload;
    },
    setShowAddNewItemDialog: (state, action: PayloadAction<boolean>) => {
      state.showAddNewItemDialog = action.payload;
    },
    setShowApprovalStatusDialog: (state, action: PayloadAction<boolean>) => {
      state.showApprovalStatusDialog = action.payload;
    },
  },
  extraReducers: {
    [filterSettingsDataActions.filterSettingsLoadingSuccess.type]: (
      state,
      action: PayloadAction<TimeConstraint>
    ) => {
      switch (action.payload.taskType) {
        case TaskTypesEnum.taskRepairs: {
          state.repairsSettings.timeConstraint = action.payload;
          break;
        }
        case TaskTypesEnum.taskRefillings: {
          state.refillingsSettings.timeConstraint = action.payload;
          break;
        }
      }
    },
  },
});

export const filterSettingsActions = {
  ...filterSettingsSlice.actions,
};
export default filterSettingsSlice.reducer;
