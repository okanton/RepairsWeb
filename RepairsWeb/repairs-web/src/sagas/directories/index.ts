import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { deleteAddressAPI, saveAddressAPI } from "../../api/directories-api";
import { directoriesDataActions } from "../../dataLayer/directories-data-slice";
import { Entity } from "../../entities";

export function* saveAddressWorker(action: PayloadAction<Entity>) {
  try {
    yield put(directoriesDataActions.addressesSaving());
    const data: Entity = yield call(saveAddressAPI, action.payload);
    yield put(directoriesDataActions.addressesSavingSuccess(data));
  } catch (error) {
    yield put(
      directoriesDataActions.addressesSavingFail((error as Error).message)
    );
  }
}
export function* saveAddressWatcher() {
  yield takeEvery(directoriesDataActions.saveAddress, saveAddressWorker);
}

export function* deleteAddressWorker(action: PayloadAction<number>) {
  try {
    yield put(directoriesDataActions.addressesDeleting());
    const data: number = yield call(deleteAddressAPI, action.payload);
    yield put(directoriesDataActions.addressesDeletingSuccess(data));
  } catch (error) {
    yield put(
      directoriesDataActions.addressesDeletingFail((error as Error).message)
    );
  }
}
export function* deleteAddressWatcher() {
  yield takeEvery(directoriesDataActions.deleteAddress, deleteAddressWorker);
}
