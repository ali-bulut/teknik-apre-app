import { Redirect } from "react-router";

import Login from "../views/Authentication/Login";

import { removeLocalStorage } from "../helpers/LocalStorage";
import { getSubDomain } from "../helpers/RouteRedirection";
import RolesPrefix from "../constants/RolesPrefix";
import HomePage from "../views/Home/HomePage";
import AdminHomePage from "../views/Admin/AdminHomePage";

const isAdminSite = getSubDomain() === RolesPrefix.admin;

// eslint-disable-next-line
export default [
  {
    path: "/login",
    public: true,
    exact: true,
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <Login />,
  },
  {
    path: "/logout",
    public: true,
    exact: true,
    allowedSubdomains: [RolesPrefix.admin],
    component: () => (
      <div>
        {removeLocalStorage()}
        {<Redirect to="/login" />}
      </div>
    ),
  },
  {
    path: "/",
    public: !isAdminSite,
    exact: true,
    allowedSubdomains: [isAdminSite && RolesPrefix.admin],
    roles: [isAdminSite && RolesPrefix.admin],
    component: () => (isAdminSite ? <AdminHomePage /> : <HomePage />),
  },
  {
    path: "*",
    public: true,
    component: false,
  },
];
