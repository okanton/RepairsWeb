import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mails } from "../entities";

interface MailSettingsState {
  selectedMailId: Array<string | number>;
  selectedMail: Mails;
}

export const initialMail: Mails = {
  id: -1,
  name: "",
  mail: "",
  serviceTypeId: -1,
  isActive: false,
};

const initialState: MailSettingsState = {
  selectedMailId: [],
  selectedMail: initialMail,
};

const mailSettingsSlice = createSlice({
  name: "mailSettingsSlice",
  initialState,
  reducers: {
    setSelectedMailId: (
      state,
      action: PayloadAction<Array<string | number>>
    ) => {
      state.selectedMailId = action.payload;
    },
    setSelectedMail: (state, action: PayloadAction<Mails>) => {
      state.selectedMail = action.payload;
    },
  },
});

export const mailSettingsActions = {
  ...mailSettingsSlice.actions,
};
export default mailSettingsSlice.reducer;
