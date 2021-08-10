import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  changeRepairApprovalStatusAPI,
  getCompleteRepairsMoneyByPeriodAPI,
  getEconomyRepairsMoneyForCurrentPeriodAPI,
  GetRepairsByFilterParametersAPI,
  InsertNewRepairAPI,
} from "../../api/repairs-api";
import { repairsDataActions } from "../../dataLayer/repairs-data-slice";
import {
  ApprovalStatusParameter,
  FilterParameters,
  Repair,
} from "../../entities";

function* getRepairsByFilterWorker(action: PayloadAction<FilterParameters>) {
  try {
    yield put(repairsDataActions.repairsLoading());
    const data: Repair[] = yield call(
      GetRepairsByFilterParametersAPI,
      action.payload
    );
    yield put(repairsDataActions.repairsLoadSuccess(data));
  } catch (error) {
    yield put(repairsDataActions.repairsLoadFail((error as Error).message));
  }
}
export function* getRepairsByFilterWatcher() {
  yield takeEvery(repairsDataActions.loadRepairs, getRepairsByFilterWorker);
}

function* getRepairsForReportByOrganizationWorker(
  action: PayloadAction<FilterParameters>
) {
  try {
    yield put(repairsDataActions.repairsForReportByOrganizationLoading());
    const data: Repair[] = yield call(
      GetRepairsByFilterParametersAPI,
      action.payload
    );
    yield put(repairsDataActions.repairsForReportByOrganizationSuccess(data));
  } catch (error) {
    yield put(
      repairsDataActions.repairsForReportByOrganizationFail(error as AxiosError)
    );
  }
}
export function* getRepairsForReportByOrganizationWatcher() {
  yield takeEvery(
    repairsDataActions.loadRepairsForReportByOrganization,
    getRepairsForReportByOrganizationWorker
  );
}

function* insertNewRepairWorker(action: PayloadAction<Repair>) {
  try {
    yield put(repairsDataActions.insertingNewRepair());
    const data: Repair = yield call(InsertNewRepairAPI, action.payload);
    yield put(repairsDataActions.insertNewRepairSuccsess(data));
  } catch (error) {
    yield put(repairsDataActions.insertNewRepairFail((error as Error).message));
  }
}
export function* insertNewRepairWatcher() {
  yield takeEvery(repairsDataActions.insertNewRepair, insertNewRepairWorker);
}

function* changeRepairApprovalStatusWorker(
  action: PayloadAction<ApprovalStatusParameter>
) {
  try {
    yield put(repairsDataActions.changingRepairApprovalStatus());
    const data: Repair = yield call(
      changeRepairApprovalStatusAPI,
      action.payload
    );
    yield put(repairsDataActions.changeRepairApprovalStatusSuccess(data));
  } catch (error) {
    yield put(
      repairsDataActions.changeRepairApprovalStatusFail(
        (error as Error).message
      )
    );
  }
}
export function* changeRepairApprovalStatusWatcher() {
  yield takeEvery(
    repairsDataActions.changeRepairApprovalStatus,
    changeRepairApprovalStatusWorker
  );
}

function* getCompleteRepairsMoneyWorker(
  action: PayloadAction<{ dateFrom: Date; dateTo: Date }>
) {
  try {
    yield put(repairsDataActions.getCompleteRepairsMoneyLoading());
    const data: number = yield call(
      getCompleteRepairsMoneyByPeriodAPI,
      action.payload.dateFrom,
      action.payload.dateTo
    );
    yield put(repairsDataActions.getCompleteRepairsMoneySuccess(data));
  } catch (error) {
    yield put(
      repairsDataActions.getCompleteRepairsMoneyFail(error as AxiosError)
    );
  }
}
export function* getCompleteRepairsMoneyWatcher() {
  yield takeEvery(
    repairsDataActions.getCompleteRepairsMoneyByPeriod,
    getCompleteRepairsMoneyWorker
  );
}

function* getRepairsEconomyWorker() {
  try {
    const data: number = yield call(getEconomyRepairsMoneyForCurrentPeriodAPI);
    yield put(repairsDataActions.getEconomyRepairsMoneySuccess(data));
  } catch (error) {
    yield put(
      repairsDataActions.getEconomyRepairsMoneyFail(error as AxiosError)
    );
  }
}
export function* getRepairsEconomyWatcher() {
  yield takeEvery(
    repairsDataActions.getEconomyRepairsMoneyLoading,
    getRepairsEconomyWorker
  );
}
