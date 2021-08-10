import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { getTimeConstraintAPI } from "../../api/filter-settings-api";
import { filterSettingsDataActions } from "../../dataLayer/filter-settings-data-slice";
import { TimeConstraint } from "../../entities";

export function* getTimeConstraintWorker(action: PayloadAction<number>) {
  try {
    yield put(filterSettingsDataActions.filterSettingsLoading());
    const data: TimeConstraint = yield call(
      getTimeConstraintAPI,
      action.payload
    );
    yield put(filterSettingsDataActions.filterSettingsLoadingSuccess(data));
  } catch (error) {
    yield put(
      filterSettingsDataActions.filterSettingsLoadingFail(
        (error as Error).message
      )
    );
  }
}
export function* getTimeConstraintWatcher() {
  yield takeEvery(
    filterSettingsDataActions.loadTimeConstraintByTaskType,
    getTimeConstraintWorker
  );
}
