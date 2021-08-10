import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeConstraint } from "../entities";

interface FilterSettingsDataState {
  timeConstraint: TimeConstraint;
  isLoading: boolean;
  error: string;
}

const initialState: FilterSettingsDataState = {
  error: "",
  isLoading: false,
  timeConstraint: {
    minDate: null,
    taskType: -1,
  },
};

const filterSettingsDataSlice = createSlice({
  name: "filterSettingsDataSlice",
  initialState,
  reducers: {
    filterSettingsLoading: (state) => {
      state.isLoading = true;
    },
    filterSettingsLoadingSuccess: (
      state,
      action: PayloadAction<TimeConstraint>
    ) => {
      state.timeConstraint = action.payload;
      state.isLoading = false;
    },
    filterSettingsLoadingFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

const loadTimeConstraintByTaskType = createAction<number>(
  "loadTimeConstraintByTaskType"
);

export const filterSettingsDataActions = {
  ...filterSettingsDataSlice.actions,
  loadTimeConstraintByTaskType,
};

export default filterSettingsDataSlice.reducer;
