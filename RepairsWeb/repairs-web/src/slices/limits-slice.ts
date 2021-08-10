import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Limits } from "../entities";

interface LimitsState {
  dateFrom: Date;
  dateTo: Date;
  selectedLimit: Limits;
  selectedLimitId: Array<string | number>;
  showEditDialog: boolean;
}

const dateNow = new Date();
export const initialLimit: Limits = {
  id: -1,
  dateFrom: new Date(dateNow.getFullYear(), 0, 1, 12, 0),
  dateTo: new Date(dateNow.getFullYear(), 11, 31, 12, 0),
  serviceTypeId: -1,
  limit: 0,
};
const initialState: LimitsState = {
  dateFrom: new Date(dateNow.getFullYear(), 0, 1, 12, 0),
  dateTo: dateNow,
  selectedLimit: initialLimit,
  selectedLimitId: [],
  showEditDialog: false,
};

const limitsSlice = createSlice({
  name: "limitsSlice",
  initialState,
  reducers: {
    setDateFrom: (state, action: PayloadAction<Date>) => {
      if (action.payload > state.dateTo) {
        state.dateTo = action.payload;
      }
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<Date>) => {
      if (action.payload < state.dateFrom) {
        state.dateFrom = action.payload;
      }
      state.dateTo = action.payload;
    },
    setLimit: (state, action: PayloadAction<Limits>) => {
      state.selectedLimit = action.payload;
    },
    setLimitId: (state, action: PayloadAction<Array<string | number>>) => {
      state.selectedLimitId = action.payload;
    },
    setShowEditLimitsDialog: (state, action: PayloadAction<boolean>) => {
      state.showEditDialog = action.payload;
    },
  },
});

export const limitsActions = {
  ...limitsSlice.actions,
};
export default limitsSlice.reducer;
