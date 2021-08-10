import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NoAccess from "../pages/StatusPages/NoAccess";
import pages from "./pagesConfig";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/StatusPages/404";

const Pages = () => (
  <Switch>
    <Route exact path="/noaccess" component={NoAccess} />
    {pages.map((pageProps) => (
      <ProtectedRoute key={pageProps.path} {...pageProps} />
    ))}
    <Route exact path="/404" component={NotFound} />
    <Route>
      <Redirect to="/404" />
    </Route>
  </Switch>
);

export default React.memo(Pages);
