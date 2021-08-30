import { Redirect } from "react-router";

import Login from "../views/Authentication/Login";

import { getLocalStorage, removeLocalStorage } from "../helpers/LocalStorage";
import { getRedirectedRoute } from "../helpers/RouteRedirection";

const role = getLocalStorage().role;
const redirectedUrl = getRedirectedRoute(role);

// eslint-disable-next-line
export default [
  {
    path: "/login",
    public: true,
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/logout",
    public: true,
    exact: true,
    component: () => (
      <div>
        {removeLocalStorage()}
        {<Redirect to="/" />}
      </div>
    ),
  },
  {
    path: "/",
    public: false,
    exact: true,
    component: () => <Redirect to={redirectedUrl} />,
  },
  {
    path: "*",
    public: true,
    component: false,
  },
];
