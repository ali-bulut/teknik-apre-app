import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { renderRoutes } from "./routes/RouteRendering";
import subscribeCreateExcelChannel from "./util/Pusher/createExcelChannel";
import subscribeUpdateBarcodeChannel from "./util/Pusher/updateBarcodeChannel";

import MainContent from "./views/Main/MainContent";

const App = () => {
  subscribeCreateExcelChannel();
  subscribeUpdateBarcodeChannel();
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 1800 }}
      />
      <Route
        render={({ location }) => {
          return (
            <MainContent>
              <Switch location={location.location}>{renderRoutes()}</Switch>
            </MainContent>
          );
        }}
      />
    </React.Fragment>
  );
};

export default App;
