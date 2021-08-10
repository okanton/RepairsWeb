import { AppState } from "../App/rootReducer";

export const repairsSelector = (state: AppState) => state.repairsData.repairs;

export const repairsLoadingSelector = (state: AppState) =>
  state.repairsData.isLoading;

export const repairsForReportByOrganizationIsLoadingSelector = (
  state: AppState
) => state.repairsData.repairsForReportByOrganizationIsLoading;

export const repairsForReportByOrganizationSelector = (state: AppState) =>
  state.repairsData.repairsForReportByOrganization;

export const newRepairSelector = (state: AppState) => state.repairs.newRepair;

export const selectedRepairSelector = (state: AppState) =>
  state.repairs.selectedRepair;

export const selectedRepairApprovalStatusSelector = (state: AppState) =>
  state.repairs.approvalStatus;

export const completeRepairsMoneySelector = (state: AppState) =>
  state.repairsData.completeRepairsMoney;

export const repairsEconomySelector = (state: AppState) =>
  state.repairsData.repairsEconomy;

export const filteredRepairsSelector = (state: AppState) =>
  state.repairsData.filteredRepairs;

export const searchStringSelector = (state: AppState) =>
  state.repairsData.searchString;
