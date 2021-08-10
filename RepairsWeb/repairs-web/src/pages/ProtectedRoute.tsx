import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

import useUserAuth from "../dataLayer/hooks/useUserAuth";

export interface ProtectedRouteProps {
  roles: string[];
  redirectPath?: string;
}

const ProtectedRoute = (props: ProtectedRouteProps & RouteProps) => {
  const { roles, redirectPath = "/noaccess", ...restProps } = props;
  const { isAuth, hasAccess } = useUserAuth(roles);

  return isAuth && hasAccess ? (
    <Route {...restProps} />
  ) : (
    <Redirect to={{ pathname: redirectPath }} />
  );
};

export default ProtectedRoute;
