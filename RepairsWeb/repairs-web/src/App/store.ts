import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
import reducer from "./rootReducer";
import { AppSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = configureStore({reducer, middleware });

export type AppDispatch = typeof store.dispatch;

export default store;

sagaMiddleware.run(AppSaga);
