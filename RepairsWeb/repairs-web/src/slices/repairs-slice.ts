import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApprovalStatusParameter, Repair } from "../entities";
import { ApprovalStatusesEnum } from "../entities/enums";

interface RepairsState {
  newRepair: Repair;
  selectedRepair: Repair | null;
  approvalStatus: ApprovalStatusParameter;
}

export const initialRepair: Repair = {
  id: -1,
  address: { id: -1, value: "" },
  approvalStatus: { id: -1, value: "" },
  attachment: "",
  client: { fullUserName: "", userDepartment: "", userName: "" },
  createDate: new Date(),
  deviceType: { id: -1, value: "" },
  organization: { id: -1, value: "" },
  executeDate: null,
  information: "",
  itUser: null,
  model: "",
  money: 0,
  phone: "",
  requestNumber: "",
  room: "",
  serialNumber: "",
  trouble: "",
  configurationUnitId: "",
  comment: "",
};

const initialState: RepairsState = {
  newRepair: initialRepair,
  selectedRepair: null,
  approvalStatus: {
    id: -1,
    approvalStatusId: -1,
    money: 0,
    executeDate: null,
    comment: "",
  },
};

const repairsSlice = createSlice({
  name: "repairsSlice",
  initialState,
  reducers: {
    setNewRepair: (state, action: PayloadAction<Repair>) => {
      state.newRepair = action.payload;
    },
    setSelectedRepair: (state, action: PayloadAction<Repair>) => {
      state.selectedRepair = action.payload;
    },
    setRepairApprovalStatus: (
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

export const repairsActions = {
  ...repairsSlice.actions,
};
export default repairsSlice.reducer;
