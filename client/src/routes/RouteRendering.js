import React from "react";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { Redirect } from "react-router-dom";

export const renderRoutes = () => {
  return routes.map((route, idx) =>
    !route.component ? (
      <Redirect key={idx} to="/" />
    ) : route.public ? (
      <PublicRoute
        key={route.path || idx}
        path={route.path}
        exact={route.exact}
        component={route.component}
        allowedSubdomains={route.allowedSubdomains}
      />
    ) : (
      <PrivateRoute
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.component}
        roles={route.roles}
        allowedSubdomains={route.allowedSubdomains}
      />
    )
  );
};
