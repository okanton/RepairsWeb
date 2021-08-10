import { AppState } from "../App/rootReducer";

export const allAddressesSelector = (state: AppState) => state.commonData.addresses;

export const allOrganizationsSelector = (state: AppState) => state.commonData.organizations;

export const allDeviceTypesSelector = (state: AppState) => state.commonData.deviceTypes;

export const allApprovalStatusesSelector = (state: AppState) => state.commonData.approvalStatuses;

export const userAccessInformaionSelector = (state: AppState) => state.commonData.accessInformation;

export const userAccessLoadingSelector = (state: AppState) => state.commonData.accessLoading;