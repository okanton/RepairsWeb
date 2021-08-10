import { AppState } from "../App/rootReducer";

export const addressesDirectorySelector = (state: AppState) =>
    state.directoriesData.addresses;

export const selectedAddressSelector = (state: AppState) =>
    state.directories.selectedAddress;

export const selectedAddressIdSelector = (state: AppState) =>
    state.directories.selectedAddressId;