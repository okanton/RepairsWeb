import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../entities";
import { commonDataActions } from "./common-data-slice";

interface DirectoriesDataState {
  addresses: Array<Entity>;
  isLoading: boolean;
  error: string;
}

const initialState: DirectoriesDataState = {
  addresses: [],
  isLoading: false,
  error: "",
};

const directoriesDataSlice = createSlice({
  name: "directoriesDataSlice",
  initialState,
  reducers: {
    addressesSaving: (state) => {
      state.isLoading = true;
    },
    addressesSavingSuccess: (state, action: PayloadAction<Entity>) => {
      const address = state.addresses.find((p) => p.id === action.payload.id);
      if (address) {
        const filtered = state.addresses.filter(
          (p) => p.id !== action.payload.id
        );
        state.addresses = [...filtered, action.payload];
      } else {
        state.addresses = [...state.addresses, action.payload];
      }
      state.isLoading = false;
    },
    addressesSavingFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addressesDeleting: (state) => {
      state.isLoading = true;
    },
    addressesDeletingSuccess: (state, action: PayloadAction<number>) => {
      const filtered = state.addresses.filter((p) => p.id !== action.payload);
      state.addresses = filtered;
      state.isLoading = false;
    },

    addressesDeletingFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [commonDataActions.addressesLoadSuccess.type]: (
      state,
      action: PayloadAction<Array<Entity>>
    ) => {
      state.addresses = action.payload;
    },
  },
});

const saveAddress = createAction<Entity>("SaveAddress");

const deleteAddress = createAction<number>("DeleteAddress");

export const directoriesDataActions = {
  ...directoriesDataSlice.actions,
  saveAddress,
  deleteAddress,
};

export default directoriesDataSlice.reducer;
