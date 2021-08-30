import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./store/routing/StoreConfiguration";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import history from "./history";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

// toastify
import "react-toastify/dist/ReactToastify.css";

// google fonts
import "./assets/fonts/google_comfortaa.css";
import "./assets/fonts/google_hind_siliguri.css";
import "./assets/fonts/google_muli.css";
import "./assets/fonts/google_roboto.css";

// font-awesome
import "./assets/lib/fontawesome-5.11.2/css/all.min.css";

const store = configureStore();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
