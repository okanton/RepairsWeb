import { AppState } from "../App/rootReducer";

export const refillingsSettingsSelector = (state: AppState) =>
  state.filterSettings.refillingsSettings;
export const repairsSettingsSelector = (state: AppState) =>
  state.filterSettings.repairsSettings;
export const showAddNewItemDialogSelector = (state: AppState) =>
  state.filterSettings.showAddNewItemDialog;
export const showApprovalStatusDialogSelector = (state: AppState) =>
  state.filterSettings.showApprovalStatusDialog;
export const repairsByOrganizationReportSettingsSelector = (state: AppState) =>
  state.filterSettings.repairsByOrganizationReportSettings;
