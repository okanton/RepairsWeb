import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApprovalStatusParameter, Refilling } from "../entities";
import { ApprovalStatusesEnum } from "../entities/enums";

interface RefillingsState {
  refilling: Refilling;
  approvalStatus: ApprovalStatusParameter;
}

const initialRefilling: Refilling = {
  id: 0,
  address: { id: 0, value: "" },
  approvalStatus: { id: 0, value: "" },
  count: 0,
  createDate: new Date(),
  executeDate: null,
  money: 0,
  itUser: null,
  comment: "",
};

const initialState: RefillingsState = {
  refilling: initialRefilling,
  approvalStatus: {
    id: 0,
    approvalStatusId: 0,
    money: 0,
    executeDate: null,
    comment: "",
  },
};

const refillingsSlice = createSlice({
  name: "refillingsSlice",
  initialState,
  reducers: {
    setRefilling: (state, action: PayloadAction<Refilling>) => {
      state.refilling = action.payload;
    },
    setRefilllingApprovalStatus: (
      state,
      action: PayloadAction<ApprovalStatusParameter>
    ) => {
      state.approvalStatus = action.payload;
      if (action.payload.approvalStatusId != ApprovalStatusesEnum.completed) {
        state.approvalStatus.money = 0;
        state.approvalStatus.executeDate = null;
        state.approvalStatus.comment = null;
      }
    },
  },
});

export const refillingsActions = {
  ...refillingsSlice.actions,
};
export default refillingsSlice.reducer;
