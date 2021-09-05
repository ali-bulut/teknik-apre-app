import { Redirect } from "react-router";

import Login from "../views/Authentication/Login";

import { removeLocalStorage } from "../helpers/LocalStorage";
import { getSubDomain } from "../helpers/RouteRedirection";
import RolesPrefix from "../constants/RolesPrefix";
import HomePage from "../views/Home/HomePage";
import AdminHomePage from "../views/Admin/AdminHomePage";
import BarcodesPage from "../views/Admin/Barcode/BarcodesPage";
import BarcodeDetailPage from "../views/Admin/Barcode/BarcodeDetailPage";
import CreateBarcodePage from "../views/Admin/Barcode/CreateBarcodePage";
import PartyDetailPage from "../views/Admin/Party/PartyDetailPage";

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
    path: "/barcodes",
    public: false,
    exact: true,
    roles: [RolesPrefix.admin],
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <BarcodesPage />,
  },
  {
    path: "/barcodes/create",
    public: false,
    exact: true,
    roles: [RolesPrefix.admin],
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <CreateBarcodePage />,
  },
  {
    path: "/barcodes/:id",
    public: false,
    exact: true,
    roles: [RolesPrefix.admin],
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <BarcodeDetailPage />,
  },
  {
    path: "/barcodes/templates",
    public: false,
    exact: true,
    roles: [RolesPrefix.admin],
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <BarcodesPage />,
  },
  {
    path: "/barcodes/:barcodeId/parties/:partyId",
    public: false,
    exact: true,
    roles: [RolesPrefix.admin],
    allowedSubdomains: [RolesPrefix.admin],
    component: () => <PartyDetailPage />,
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
