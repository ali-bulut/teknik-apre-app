import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getLocalStorage } from "../helpers/LocalStorage";
import { getRedirectedRoute } from "../helpers/RouteRedirection";

const PrivateRoute = ({ component: Component, ...options }) => {
  const token = getLocalStorage()?.token;
  const shouldRedirect = !token;

  if (shouldRedirect) {
    return <Redirect to="/login" />;
  }

  const role = getLocalStorage()?.role;
  const redirectedUrl = getRedirectedRoute(role);

  if (options.roles?.includes(role)) {
    return <Route {...options} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to={redirectedUrl} />;
  }
};

export default PrivateRoute;
