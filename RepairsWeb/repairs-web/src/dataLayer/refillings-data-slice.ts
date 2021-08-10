import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ApprovalStatusParameter,
  FilterParameters,
  Refilling,
} from "../entities";

interface RefillingsDataState {
  refillings: Array<Refilling>;
  isLoading: boolean;
  completeRefillingsMoney: number;
  refillingsEconomy: number;
  error: string;
}

const initialState: RefillingsDataState = {
  refillings: [],
  completeRefillingsMoney: 0,
  refillingsEconomy: 0,
  isLoading: false,
  error: "",
};

const refillingsDataSlice = createSlice({
  name: "refillingsDataSlice",
  initialState,
  reducers: {
    refillingsLoading: (state) => {
      state.isLoading = true;
    },
    refillingsLoadSuccess: (state, action: PayloadAction<Array<Refilling>>) => {
      state.refillings = action.payload;
      state.isLoading = false;
    },
    refillingsLoadFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
    },
    insertingNewRefilling: (state) => {
      state.isLoading = true;
    },
    insertNewRefillingSuccsess: (state, action: PayloadAction<Refilling>) => {
      state.refillings = [...state.refillings, action.payload];
      state.isLoading = false;
    },
    insertNewRefillingFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
    },
    changingRefillingApprovalStatus: (state) => {
      state.isLoading = true;
    },
    changeRefillingApprovalStatusSuccess: (
      state,
      action: PayloadAction<Refilling>
    ) => {
      const refillings = state.refillings.filter(
        (p) => p.id !== action.payload.id
      );
      state.refillings = [...refillings, action.payload];
      state.isLoading = false;
    },
    changeRefillingApprovalStatusFail: (
      state,
      action: PayloadAction<AxiosError>
    ) => {
      state.error = action.payload.response?.data;
    },
    getCompleteRefillingsMoneyLoading: (state) => {
      state.isLoading = true;
    },
    getCompleteRefillingsMoneySuccess: (
      state,
      action: PayloadAction<number>
    ) => {
      state.completeRefillingsMoney = action.payload;
      state.isLoading = false;
    },
    getCompleteRefillingsMoneyFail: (
      state,
      action: PayloadAction<AxiosError>
    ) => {
      state.error = action.payload.response?.data;
      state.isLoading = false;
    },
    getEconomyRefillingsMoneyLoading: (state) => {
      state.isLoading = true;
    },
    getEconomyRefillingsMoneySuccess: (
      state,
      action: PayloadAction<number>
    ) => {
      state.isLoading = false;
      state.refillingsEconomy = action.payload;
    },
    getEconomyRefillingsMoneyFail: (
      state,
      action: PayloadAction<AxiosError>
    ) => {
      state.error = action.payload.response?.data;
      state.isLoading = false;
    },
  },
});

const loadRefillings = createAction<FilterParameters>("loadRefillings");

const insertNewRefilling = createAction<Refilling>("insertNewRefilling");

const changeRefillingApprovalStatus = createAction<ApprovalStatusParameter>(
  "changeRefillingApprovalStatus"
);

const getCompleteRefillingsMoneyByPeriod = createAction<{
  dateFrom: Date;
  dateTo: Date;
}>("getCompleteRefillingsMonetByPeriod");

export const refillingDataActions = {
  ...refillingsDataSlice.actions,
  loadRefillings,
  insertNewRefilling,
  changeRefillingApprovalStatus,
  getCompleteRefillingsMoneyByPeriod,
};

export default refillingsDataSlice.reducer;
