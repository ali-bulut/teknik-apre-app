import {
  USER_AUTHENTICATING,
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_HAS_ERROR,
} from "../../types";

import { setLocalStorage } from "../../../helpers/LocalStorage";
import api from "../../api/Authentication/auth";

export const userAuthenticating = () => ({
  type: USER_AUTHENTICATING,
});

export const userAuthenticated = (data) => ({
  type: USER_AUTHENTICATED,
  payload: {
    userInfo: data,
  },
});

export const userAuthenticationHasError = (data) => ({
  type: USER_AUTHENTICATION_HAS_ERROR,
  payload: data.message,
});

export const userLogin = (email, password) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(userAuthenticating());

    api
      .userLogin(email, password)
      .then((data) => {
        dispatch(userAuthenticated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(userAuthenticationHasError(err));
        reject(err);
      });
  });
