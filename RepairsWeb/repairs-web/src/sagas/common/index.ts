import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAddressesAPI,
  getApprovalStatusesAPI,
  getDeviceTypesAPI,
  getOrganizationsAPI,
  getUserAccessInformationAPI,
} from "../../api/common-api";
import { commonDataActions } from "../../dataLayer/common-data-slice";
import { Entity, UserAccessInformation } from "../../entities";

export function* getAllAddressesWorker() {
  try {
    const data: Entity[] = yield call(getAddressesAPI);
    yield put(commonDataActions.addressesLoadSuccess(data));
  } catch (error) {
    yield put(commonDataActions.addressesLoadFail((error as Error).message));
  }
}
export function* getAllAddressesWatcher() {
  yield takeEvery(commonDataActions.addressesLoading, getAllAddressesWorker);
}

export function* getAllOrganizationsWorker() {
  try {
    const data: Entity[] = yield call(getOrganizationsAPI);
    yield put(commonDataActions.organizationsLoadSuccess(data));
  } catch (error) {
    yield put(
      commonDataActions.organizationsLoadFail((error as Error).message)
    );
  }
}
export function* getAllOrganizationWatcher() {
  yield takeEvery(
    commonDataActions.organizationsLoading,
    getAllOrganizationsWorker
  );
}

export function* getAllApprovalStatusesWorker() {
  try {
    const data: Entity[] = yield call(getApprovalStatusesAPI);
    yield put(commonDataActions.approvalStatusesLoadSuccess(data));
  } catch (error) {
    yield put(
      commonDataActions.approvalStatusesLoadFail((error as Error).message)
    );
  }
}
export function* getAllApprovalStatusesWatcher() {
  yield takeEvery(
    commonDataActions.approvalStatusesLoading,
    getAllApprovalStatusesWorker
  );
}

export function* getAllDeviceTypesWorker() {
  try {
    const data: Entity[] = yield call(getDeviceTypesAPI);
    yield put(commonDataActions.deviceTypesLoadSuccess(data));
  } catch (error) {
    yield put(commonDataActions.deviceTypesLoadFail((error as Error).message));
  }
}
export function* getAllDeviceTypesWatcher() {
  yield takeEvery(
    commonDataActions.deviceTypesLoading,
    getAllDeviceTypesWorker
  );
}

export function* getUserAccessInformationWorker() {
  try {
    const data: UserAccessInformation = yield call(getUserAccessInformationAPI);
    yield put(commonDataActions.accessLoadSuccess(data));
  } catch (error) {
    yield put(commonDataActions.accessLoadFail((error as Error).message));
  }
}
export function* getUserAccessInformationWatcher() {
  yield takeEvery(
    commonDataActions.accessLoading,
    getUserAccessInformationWorker
  );
}
