import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Mails } from "../entities";

interface MailsDataState {
  mails: Array<Mails>;
  isLoading: boolean;
  error: string;
}

const initialState: MailsDataState = {
  mails: [],
  isLoading: false,
  error: "",
};

const mailDataSlice = createSlice({
  name: "mailDataSlice",
  initialState,
  reducers: {
    mailsLoading: (state) => {
      state.isLoading = true;
    },
    mailsLoadSuccess: (state, action: PayloadAction<Array<Mails>>) => {
      state.mails = action.payload;
      state.isLoading = false;
    },
    mailsLoadFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    mailsSaving: (state) => {
      state.isLoading = true;
    },
    mailsSavingSuccess: (state, action: PayloadAction<Mails>) => {
      const mail = state.mails.find((p) => p.id === action.payload.id);

      if (mail) {
        const filtered = state.mails.filter((p) => p.id !== action.payload.id);
        state.mails = [...filtered, action.payload];
      } else {
        state.mails = [...state.mails, action.payload];
      }

      state.isLoading = false;
    },
    mailsSavingFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    mailsDeleting: (state) => {
      state.isLoading = true;
    },
    mailsDeletingSuccess: (state, action: PayloadAction<number>) => {
      const filtered = state.mails.filter((p) => p.id !== action.payload);
      state.mails = filtered;
      state.isLoading = false;
    },
    mailsDeletingFail: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload.response?.data;
    },
  },
});

const saveMail = createAction<Mails>("saveMail");
const deleteMail = createAction<number>("deleteMail");

export const mailDataActions = {
  ...mailDataSlice.actions,
  saveMail,
  deleteMail,
};
export default mailDataSlice.reducer;
