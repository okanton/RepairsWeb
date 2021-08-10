import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCurrentLimitsCostAPI,
  getLimitsByPeriodsAPI,
  saveLimitAPI,
} from "../../api/limits-api";
import { limitsDataActions } from "../../dataLayer/limits-data-slice";
import { Limits } from "../../entities";

function* getLimitsByPeriodWorker(
  action: PayloadAction<{ dateFrom: Date; dateTo: Date }>
) {
  try {
    yield put(limitsDataActions.limitsLoading());
    const data: Limits[] = yield call(
      getLimitsByPeriodsAPI,
      action.payload.dateFrom,
      action.payload.dateTo
    );
    yield put(limitsDataActions.limitsLoadSuccess(data));
  } catch (error) {
    yield put(limitsDataActions.limitsLoadFail((error as AxiosError).message));
  }
}
export function* getLimitsByPeriodWatcher() {
  yield takeEvery(
    limitsDataActions.loadLimitsByPeriods,
    getLimitsByPeriodWorker
  );
}

function* saveLimitsWorker(action: PayloadAction<Limits>) {
  try {
    yield put(limitsDataActions.savingLimits());
    const data: Limits = yield call(saveLimitAPI, action.payload);
    yield put(limitsDataActions.saveLimitsSuccess(data));
  } catch (error) {
    yield put(limitsDataActions.saveLimitsFail((error as AxiosError).message));
  }
}
export function* saveLimitsWatcher() {
  yield takeEvery(limitsDataActions.saveLimit, saveLimitsWorker);
}

function* getCurrentLimitsWorker() {
  try {
    const data: Limits[] = yield call(getCurrentLimitsCostAPI);
    yield put(limitsDataActions.getCurrentLimitsSuccess(data));
  } catch (error) {
    yield put(limitsDataActions.getCurrentLimitsFail(error as AxiosError));
  }
}
export function* getCurrentLimitsWatcher() {
  yield takeEvery(
    limitsDataActions.getCurrentLimitsLoading,
    getCurrentLimitsWorker
  );
}
