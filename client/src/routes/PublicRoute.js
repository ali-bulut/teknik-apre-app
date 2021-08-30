import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getLocalStorage } from "../helpers/LocalStorage";
import { subdomainRedirection } from "../helpers/RouteRedirection";

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...options
}) => {
  if (subdomainRedirection(options.allowedSubdomains)) {
    return <Redirect to="/" />;
  }

  const token = getLocalStorage().token;
  if (options.path === "/login" && token) {
    return <Route {...options} render={(props) => <Redirect to="/" />} />;
  }

  return <Route {...options} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
