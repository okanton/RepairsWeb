import { AppState } from "../App/rootReducer";

export const allLimitsSelector = (state: AppState) => state.limitsData.limits;

export const selectedLimitsIdSelector = (state: AppState) =>
  state.limits.selectedLimitId;

export const selectedLimitSelector = (state: AppState) =>
  state.limits.selectedLimit;

export const limitDateFromSelector = (state: AppState) => state.limits.dateFrom;

export const limitDateToSelector = (state: AppState) => state.limits.dateTo;

export const showEditLimitsDialogSelector = (state: AppState) =>
  state.limits.showEditDialog;

export const currentLimitsSelector = (state: AppState) =>
  state.limitsData.currentLimits;
