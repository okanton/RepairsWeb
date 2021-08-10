import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  changeRefillingApprovalStatusAPI,
  getCompleteRefillingsMoneyByPeriodAPI,
  getEconomyRefillingsMoneyForCurrentPeriodAPI,
  GetRefillingsByFilterParametersAPI,
  InsertNewRefillingAPI,
} from "../../api/refillings-api";
import { refillingDataActions } from "../../dataLayer/refillings-data-slice";
import {
  ApprovalStatusParameter,
  FilterParameters,
  Refilling,
} from "../../entities";

function* getRefillingsByFilterWorker(action: PayloadAction<FilterParameters>) {
  try {
    yield put(refillingDataActions.refillingsLoading());
    const data: Refilling[] = yield call(
      GetRefillingsByFilterParametersAPI,
      action.payload
    );
    yield put(refillingDataActions.refillingsLoadSuccess(data));
  } catch (error) {
    yield put(
      refillingDataActions.refillingsLoadFail(error as AxiosError)
    );
  }
}
export function* getRefillingsByFilterWatcher() {
  yield takeEvery(
    refillingDataActions.loadRefillings,
    getRefillingsByFilterWorker
  );
}

function* insertNewRefillingWorker(action: PayloadAction<Refilling>) {
  try {
    yield put(refillingDataActions.insertingNewRefilling());
    const data: Refilling = yield call(InsertNewRefillingAPI, action.payload);
    yield put(refillingDataActions.insertNewRefillingSuccsess(data));
  } catch (error) {
    yield put(
      refillingDataActions.insertNewRefillingFail(error as AxiosError)
    );
  }
}
export function* insertNewRefillingWatcher() {
  yield takeEvery(
    refillingDataActions.insertNewRefilling,
    insertNewRefillingWorker
  );
}

function* changeRefillingApprovalStatusWorker(
  action: PayloadAction<ApprovalStatusParameter>
) {
  try {
    yield put(refillingDataActions.changingRefillingApprovalStatus());
    const data: Refilling = yield call(
      changeRefillingApprovalStatusAPI,
      action.payload
    );
    yield put(refillingDataActions.changeRefillingApprovalStatusSuccess(data));
  } catch (error) {
    yield put(
      refillingDataActions.changeRefillingApprovalStatusFail(
        error as AxiosError
      )
    );
  }
}
export function* changeRefillingApprovalStatusWatcher() {
  yield takeEvery(
    refillingDataActions.changeRefillingApprovalStatus,
    changeRefillingApprovalStatusWorker
  );
}

function* getCompleteRefillingsMoneyWorker(
  action: PayloadAction<{ dateFrom: Date; dateTo: Date }>
) {
  try {
    yield put(refillingDataActions.getCompleteRefillingsMoneyLoading());
    const data: number = yield call(
      getCompleteRefillingsMoneyByPeriodAPI,
      action.payload.dateFrom,
      action.payload.dateTo
    );
    yield put(refillingDataActions.getCompleteRefillingsMoneySuccess(data));
  } catch (error) {
    yield put(
      refillingDataActions.getCompleteRefillingsMoneyFail(error as AxiosError)
    );
  }
}
export function* getCompleteRefillingsMoneyWatcher() {
  yield takeEvery(
    refillingDataActions.getCompleteRefillingsMoneyByPeriod,
    getCompleteRefillingsMoneyWorker
  );
}

function* getRefillingsEconomyWorker() {
  try {
    const data: number = yield call(
      getEconomyRefillingsMoneyForCurrentPeriodAPI
    );
    yield put(refillingDataActions.getEconomyRefillingsMoneySuccess(data));
  } catch (error) {
    yield put(
      refillingDataActions.getEconomyRefillingsMoneyFail(error as AxiosError)
    );
  }
}
export function* getRefillingsEconomyWatcher() {
  yield takeEvery(
    refillingDataActions.getEconomyRefillingsMoneyLoading,
    getRefillingsEconomyWorker
  );
}
