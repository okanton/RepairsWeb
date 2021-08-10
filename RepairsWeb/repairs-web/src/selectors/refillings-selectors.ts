import { AppState } from "../App/rootReducer";

export const refillingsSelector = (state: AppState) =>
  state.refillingsData.refillings;

export const selectedRefillingApprovalStatusSelector = (state: AppState) =>
  state.refillings.approvalStatus;

export const refillingsLoadingSelector = (state: AppState) =>
  state.refillingsData.isLoading;

export const selectedRefillingSelector = (state: AppState) =>
  state.refillings.refilling;

export const completeRefillingsMoneySelector = (state: AppState) =>
  state.refillingsData.completeRefillingsMoney;

export const refillingsEconomySelector = (state: AppState) =>
  state.refillingsData.refillingsEconomy;
