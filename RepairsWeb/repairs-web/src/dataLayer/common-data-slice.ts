import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity, Mails, UserAccessInformation } from "../entities";

interface CommonDataState {
  addresses: Array<Entity>;
  organizations: Array<Entity>;
  deviceTypes: Array<Entity>;
  approvalStatuses: Array<Entity>;
  accessInformation: UserAccessInformation;
  addressesLoading: boolean;
  approvalStatusesLoading: boolean;
  organizationsLoading: boolean;
  deviceTypesLoading: boolean;
  mailsLoading: boolean;
  accessLoading: boolean;
  error: string;
}

const initialState: CommonDataState = {
  addresses: [],
  addressesLoading: false,
  accessLoading: false,
  approvalStatusesLoading: false,
  deviceTypesLoading: false,
  mailsLoading: false,
  organizationsLoading: false,
  approvalStatuses: [],
  deviceTypes: [],
  organizations: [],
  accessInformation: {
    approvalStatusesByRoles: [],
    roles: [],
    isAuth: false,
    userFullName: "",
    userName: "",
  },
  error: "",
};

const commonDataSlice = createSlice({
  name: "commonDataSlice",
  initialState,
  reducers: {
    addressesLoading: (state) => {
      state.addressesLoading = true;
    },
    addressesLoadSuccess: (state, action: PayloadAction<Array<Entity>>) => {
      state.addresses = action.payload;
      state.addressesLoading = false;
    },
    addressesLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    approvalStatusesLoading: (state) => {
      state.approvalStatusesLoading = true;
    },
    approvalStatusesLoadSuccess: (
      state,
      action: PayloadAction<Array<Entity>>
    ) => {
      state.approvalStatuses = action.payload;
      state.approvalStatusesLoading = false;
    },
    approvalStatusesLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    organizationsLoading: (state) => {
      state.organizationsLoading = true;
    },
    organizationsLoadSuccess: (state, action: PayloadAction<Array<Entity>>) => {
      state.organizations = action.payload;
      state.organizationsLoading = false;
    },
    organizationsLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deviceTypesLoading: (state) => {
      state.deviceTypesLoading = true;
    },
    deviceTypesLoadSuccess: (state, action: PayloadAction<Array<Entity>>) => {
      state.deviceTypes = action.payload;
      state.deviceTypesLoading = false;
    },
    deviceTypesLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    accessLoading: (state) => {
      state.accessLoading = true;
    },
    accessLoadSuccess: (
      state,
      action: PayloadAction<UserAccessInformation>
    ) => {
      if (action.payload !== null) {
        state.accessInformation = action.payload;
        state.accessLoading = false;
      }
    },
    accessLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const commonDataActions = { ...commonDataSlice.actions };

export default commonDataSlice.reducer;
