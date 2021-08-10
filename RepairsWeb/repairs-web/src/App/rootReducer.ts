import { combineReducers } from "redux";
import filterSettings from "../slices/filter-settings-slice";
import commonData from "../dataLayer/common-data-slice";
import refillingsData from "../dataLayer/refillings-data-slice";
import repairsData from "../dataLayer/repairs-data-slice";
import filterSettingsData from "../dataLayer/filter-settings-data-slice";
import refillings from "../slices/refillings-slice";
import repairs from '../slices/repairs-slice';
import resultStatusBar from "../slices/result-statusBar-slice";
import mailsData from '../dataLayer/mails-data-slice'
import mails from '../slices/mail-settings'
import directoriesData from '../dataLayer/directories-data-slice'
import directories from '../slices/directory-slice'
import limitsData from '../dataLayer/limits-data-slice'
import limits from '../slices/limits-slice'

const rootReducer = combineReducers({
  filterSettings,
  commonData,
  refillingsData,
  filterSettingsData,
  refillings,
  repairs,
  resultStatusBar,
  repairsData,
  mailsData,
  mails,
  directoriesData,
  directories,
  limitsData,
  limits,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;