import { AppState } from "../App/rootReducer";

export const allMailsSelector = (state: AppState) => state.mailsData.mails;

export const selectedMailIdSelector = (state: AppState) =>
    state.mails.selectedMailId;

export const selectedMailSelector = (state: AppState) =>
    state.mails.selectedMail;