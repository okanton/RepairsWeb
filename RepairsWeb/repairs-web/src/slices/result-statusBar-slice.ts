/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { directoriesDataActions } from "../dataLayer/directories-data-slice";
import { limitsDataActions } from "../dataLayer/limits-data-slice";
import { mailDataActions } from "../dataLayer/mails-data-slice";
import { refillingDataActions } from "../dataLayer/refillings-data-slice";
import { repairsDataActions } from "../dataLayer/repairs-data-slice";
import { Refilling, Repair, Result } from "../entities";

interface ResultStatusBarState {
  isShowResult: boolean;
  result: Result;
}

const initialState: ResultStatusBarState = {
  isShowResult: false,
  result: {
    message: "",
    resultStatus: undefined,
  },
};

const errorResult = (state: ResultStatusBarState, errorString: string) => {
  state.isShowResult = true;
  state.result = {
    message: errorString,
    resultStatus: "error",
  };
};

const successResult = (state: ResultStatusBarState, resultMessage: string) => {
  state.isShowResult = true;
  state.result = {
    message: resultMessage,
    resultStatus: "success",
  };
};

const resultStatusBarSlice = createSlice({
  name: "resultStatusBarSlice",
  initialState,
  reducers: {
    closeResultStatusBar: (state) => {
      state.isShowResult = false;
    },
  },
  extraReducers: {
    [refillingDataActions.refillingsLoadFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при загрузке данных: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [refillingDataActions.insertNewRefillingSuccsess.type]: (
      state,
      action: PayloadAction<Refilling>
    ) =>
      successResult(
        state,
        `Заявка № ${action.payload.id} успешно отправлена на согласование`
      ),
    [refillingDataActions.insertNewRefillingFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при сохранении заявки: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [refillingDataActions.changeRefillingApprovalStatusSuccess.type]: (
      state,
      action: PayloadAction<Refilling>
    ) =>
      successResult(
        state,
        `Статус заявки № ${action.payload.id} успешно изменен на ${action.payload.approvalStatus.value}`
      ),
    [repairsDataActions.repairsLoadFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при загрузке данных: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [repairsDataActions.insertNewRepairSuccsess.type]: (
      state,
      action: PayloadAction<Repair>
    ) =>
      successResult(
        state,
        `Заявка № ${action.payload.id} успешно отправлена на согласование`
      ),
    [repairsDataActions.insertNewRepairFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при сохранении заявки: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [repairsDataActions.changeRepairApprovalStatusSuccess.type]: (
      state,
      action: PayloadAction<Refilling>
    ) =>
      successResult(
        state,
        `Статус заявки № ${action.payload.id} успешно изменен на ${action.payload.approvalStatus.value}`
      ),
    [mailDataActions.mailsSavingSuccess.type]: (state) =>
      successResult(state, "Сохранение выполнено успешно"),
    [mailDataActions.mailsSavingFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при сохранении: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [mailDataActions.mailsDeletingSuccess.type]: (state) =>
      successResult(state, "Удаление выполнено успешно"),
    [mailDataActions.mailsDeletingFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при удалении:${action.payload.message}:${action.payload.response?.data}`
      ),
    [directoriesDataActions.addressesSavingSuccess.type]: (state) =>
      successResult(state, "Сохранение выполнено успешно"),
    [directoriesDataActions.addressesSavingFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при сохранении: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [directoriesDataActions.addressesDeletingSuccess.type]: (state) =>
      successResult(state, "Удаление выполнено успешно"),
    [directoriesDataActions.addressesDeletingFail.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) =>
      errorResult(
        state,
        `Произошла ошибка при удалении: ${action.payload.message}:${action.payload.response?.data}`
      ),
    [limitsDataActions.saveLimitsSuccess.type]: (state) =>
      successResult(state, "Сохранение выполнено успешно"),
    [limitsDataActions.saveLimitsFail.type]: (state) =>
      successResult(state, "Удаление выполнено успешно"),
  },
});

export const { closeResultStatusBar } = resultStatusBarSlice.actions;

export default resultStatusBarSlice.reducer;
