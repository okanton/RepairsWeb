import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Limits } from "../entities";

interface LimitsDataState {
  limits: Limits[];
  currentLimits: Limits[];
  isLoading: boolean;
  error: string;
}

const initialState: LimitsDataState = {
  limits: [],
  currentLimits: [],
  isLoading: false,
  error: "",
};

const limitsDataSlice = createSlice({
  name: "limitsDataSlice",
  initialState,
  reducers: {
    limitsLoading: (state) => {
      state.isLoading = true;
    },
    limitsLoadSuccess: (state, action: PayloadAction<Array<Limits>>) => {
      state.limits = action.payload;
      state.isLoading = false;
    },
    limitsLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    savingLimits: (state) => {
      state.isLoading = true;
    },
    saveLimitsSuccess: (state, action: PayloadAction<Limits>) => {
      var limit = state.limits.find((p) => p.id === action.payload.id);
      if (limit) {
        var filtered = state.limits.filter((p) => p.id !== action.payload.id);
        state.limits = [...filtered, action.payload];
      } else {
        state.limits = [...state.limits, action.payload];
      }
    },
    saveLimitsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getCurrentLimitsLoading: (state) => {
      state.isLoading = true;
    },
    getCurrentLimitsSuccess: (state, action: PayloadAction<Limits[]>) => {
      state.currentLimits = action.payload;
      state.isLoading = false;
    },
    getCurrentLimitsFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
      state.isLoading = false;
    },
  },
});

const loadLimitsByPeriods = createAction<{
  dateFrom: Date;
  dateTo: Date;
}>("loadLimitsByPeriods");

const saveLimit = createAction<Limits>("saveLimit");

export const limitsDataActions = {
  ...limitsDataSlice.actions,
  saveLimit,
  loadLimitsByPeriods,
};
export default limitsDataSlice.reducer;
