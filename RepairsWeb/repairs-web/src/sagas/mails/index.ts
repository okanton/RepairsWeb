import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { deleteMailAPI, getMailsAPI, saveMailAPI } from "../../api/mails-api";
import { mailDataActions } from "../../dataLayer/mails-data-slice";
import { Mails } from "../../entities";

export function* getAllMailsWorker() {
  try {
    const data: Mails[] = yield call(getMailsAPI);
    yield put(mailDataActions.mailsLoadSuccess(data));
  } catch (error) {
    yield put(mailDataActions.mailsLoadFail((error as Error).message));
  }
}
export function* getAllMailsWatcher() {
  yield takeEvery(mailDataActions.mailsLoading, getAllMailsWorker);
}

export function* saveMailsWorker(action: PayloadAction<Mails>) {
  try {
    yield put(mailDataActions.mailsSaving());
    const data: Mails = yield call(saveMailAPI, action.payload);
    yield put(mailDataActions.mailsSavingSuccess(data));
  } catch (error) {
    yield put(mailDataActions.mailsSavingFail((error as Error).message));
  }
}
export function* saveMailsWatcher() {
  yield takeEvery(mailDataActions.saveMail, saveMailsWorker);
}

export function* deleteMailsWorker(action: PayloadAction<number>) {
  try {
    yield put(mailDataActions.mailsDeleting());
    const data: number = yield call(deleteMailAPI, action.payload);
    yield put(mailDataActions.mailsDeletingSuccess(data));
  } catch (error) {
    yield put(mailDataActions.mailsDeletingFail(error as AxiosError));
  }
}
export function* deleteMailsWatcher() {
  yield takeEvery(mailDataActions.deleteMail, deleteMailsWorker);
}
