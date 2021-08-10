import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../entities";

interface DirectoryState {
  selectedAddressId: Array<string | number>;
  selectedAddress: Entity;
}

const initialState: DirectoryState = {
  selectedAddress: { id: -1, value: "" },
  selectedAddressId: [],
};

const directorySlice = createSlice({
  name: "directorySlice",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Entity>) => {
      state.selectedAddress = action.payload;
    },
    setAddressId: (state, action: PayloadAction<Array<string | number>>) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const directoryActions = {
  ...directorySlice.actions,
};

export default directorySlice.reducer;
