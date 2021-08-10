import { all, fork } from "redux-saga/effects";
import {
  getAllAddressesWatcher,
  getAllApprovalStatusesWatcher,
  getAllDeviceTypesWatcher,
  getAllOrganizationWatcher,
  getUserAccessInformationWatcher,
} from "./common";
import { deleteAddressWatcher, saveAddressWatcher } from "./directories";
import { getTimeConstraintWatcher } from "./filter-settings";
import { getCurrentLimitsWatcher, getLimitsByPeriodWatcher, saveLimitsWatcher } from "./limits";
import {
  deleteMailsWatcher,
  getAllMailsWatcher,
  saveMailsWatcher,
} from "./mails";
import {
  changeRefillingApprovalStatusWatcher,
  getCompleteRefillingsMoneyWatcher,
  getRefillingsByFilterWatcher,
  getRefillingsEconomyWatcher,
  insertNewRefillingWatcher,
} from "./refillings";
import {
  changeRepairApprovalStatusWatcher,
  getCompleteRepairsMoneyWatcher,
  getRepairsByFilterWatcher,
  getRepairsEconomyWatcher,
  getRepairsForReportByOrganizationWatcher,
  insertNewRepairWatcher,
} from "./repairs";

export function* AppSaga() {
  yield all([
    // CommonWatchers
    fork(getAllAddressesWatcher),
    fork(getUserAccessInformationWatcher),
    fork(getAllOrganizationWatcher),
    fork(getAllApprovalStatusesWatcher),
    fork(getAllDeviceTypesWatcher),
    // RefillingWatchers
    fork(getRefillingsByFilterWatcher),
    fork(insertNewRefillingWatcher),
    fork(changeRefillingApprovalStatusWatcher),
    fork(getCompleteRefillingsMoneyWatcher),
    fork(getRefillingsEconomyWatcher),
    // FilterSettingsWatchers
    fork(getTimeConstraintWatcher),
    // RepairsWatchers
    fork(getRepairsByFilterWatcher),
    fork(insertNewRepairWatcher),
    fork(changeRepairApprovalStatusWatcher),
    fork(getCompleteRepairsMoneyWatcher),
    fork(getRepairsEconomyWatcher),
    fork(getRepairsForReportByOrganizationWatcher),
    // MailsWatchers
    fork(getAllMailsWatcher),
    fork(saveMailsWatcher),
    fork(deleteMailsWatcher),
    // AddressesWatchers
    fork(saveAddressWatcher),
    fork(deleteAddressWatcher),
    // LimitsWatchers
    fork(getLimitsByPeriodWatcher),
    fork(saveLimitsWatcher),
    fork(getCurrentLimitsWatcher),
  ]);
}
