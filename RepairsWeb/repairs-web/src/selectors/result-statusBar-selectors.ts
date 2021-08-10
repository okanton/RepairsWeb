import { AppState } from '../App/rootReducer';

export const isShowResultStatusBarSelector = (state: AppState) => state.resultStatusBar.isShowResult;
export const resultStatusBarSelector = (state: AppState) => state.resultStatusBar.result;