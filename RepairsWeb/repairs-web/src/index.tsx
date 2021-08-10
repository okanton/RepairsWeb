import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./App/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { commonDataActions } from "./dataLayer/common-data-slice";

store.dispatch(commonDataActions.accessLoading());
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
