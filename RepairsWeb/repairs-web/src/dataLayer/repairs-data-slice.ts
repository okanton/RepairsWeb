import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ApprovalStatusParameter, FilterParameters, Repair } from "../entities";
import { filterRepairs } from "../utils";

interface RepairsDataState {
  repairs: Array<Repair>;
  repairsForReportByOrganization: Repair[];
  repairsForReportByOrganizationIsLoading: boolean;
  isLoading: boolean;
  completeRepairsMoney: number;
  repairsEconomy: number;
  error: string;
  filteredRepairs: Repair[];
  searchString: string;
}

const initialState: RepairsDataState = {
  repairs: [],
  repairsForReportByOrganizationIsLoading: false,
  repairsForReportByOrganization: [],
  completeRepairsMoney: 0,
  repairsEconomy: 0,
  isLoading: false,
  error: "",
  filteredRepairs: [],
  searchString: "",
};

const repairsDataSlice = createSlice({
  name: "repairsDataSlice",
  initialState,
  reducers: {
    repairsLoading: (state) => {
      state.isLoading = true;
    },
    repairsLoadSuccess: (state, action: PayloadAction<Array<Repair>>) => {
      state.repairs = action.payload;
      state.filteredRepairs = [
        ...filterRepairs(action.payload, state.searchString),
      ];
      state.isLoading = false;
    },
    repairsLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    repairsForReportByOrganizationLoading: (state) => {
      state.repairsForReportByOrganizationIsLoading = true;
    },
    repairsForReportByOrganizationSuccess: (
      state,
      action: PayloadAction<Repair[]>
    ) => {
      state.repairsForReportByOrganization = action.payload;
      state.repairsForReportByOrganizationIsLoading = false;
    },
    repairsForReportByOrganizationFail: (
      state,
      action: PayloadAction<AxiosError>
    ) => {
      state.error = action.payload.response?.data;
      state.repairsForReportByOrganizationIsLoading = false;
    },
    insertingNewRepair: (state) => {
      state.isLoading = true;
    },
    insertNewRepairSuccsess: (state, action: PayloadAction<Repair>) => {
      state.repairs = [...state.repairs, action.payload];
      state.filteredRepairs = [
        ...filterRepairs(state.repairs, state.searchString),
      ];
      state.isLoading = false;
    },
    insertNewRepairFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    changingRepairApprovalStatus: (state) => {
      state.isLoading = true;
    },
    changeRepairApprovalStatusSuccess: (
      state,
      action: PayloadAction<Repair>
    ) => {
      const repairs = state.repairs.filter((p) => p.id !== action.payload.id);
      state.repairs = [...repairs, action.payload];
      state.filteredRepairs = [
        ...filterRepairs(state.repairs, state.searchString),
      ];
      state.isLoading = false;
    },
    changeRepairApprovalStatusFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getCompleteRepairsMoneyLoading: (state) => {
      state.isLoading = true;
    },
    getCompleteRepairsMoneySuccess: (state, action: PayloadAction<number>) => {
      state.completeRepairsMoney = action.payload;
      state.isLoading = false;
    },
    getCompleteRepairsMoneyFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
      state.isLoading = false;
    },
    getEconomyRepairsMoneyLoading: (state) => {
      state.isLoading = true;
    },
    getEconomyRepairsMoneySuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.repairsEconomy = action.payload;
    },
    getEconomyRepairsMoneyFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
      state.isLoading = false;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      state.filteredRepairs = [
        ...filterRepairs(state.repairs, state.searchString),
      ];
    },
  },
});

const loadRepairs = createAction<FilterParameters>("loadRepairs");
const loadRepairsForReportByOrganization = createAction<FilterParameters>(
  "loadRepairsForOrganizationReport"
);
const insertNewRepair = createAction<Repair>("insertNewRepair");

const changeRepairApprovalStatus = createAction<ApprovalStatusParameter>(
  "changeRepairApprovalStatus"
);
const getCompleteRepairsMoneyByPeriod = createAction<{
  dateFrom: Date;
  dateTo: Date;
}>("getCompleteRepairsMoneyByPeriod");

export const repairsDataActions = {
  ...repairsDataSlice.actions,
  loadRepairs,
  insertNewRepair,
  changeRepairApprovalStatus,
  getCompleteRepairsMoneyByPeriod,
  loadRepairsForReportByOrganization,
};

export default repairsDataSlice.reducer;
