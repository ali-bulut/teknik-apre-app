import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "./LocalStorage";
import history from "../history";
import Texts from "../constants/Texts";

export const apiWrapper = async (
  url,
  type,
  body,
  contentType = "application/json"
) => {
  const data = await getLocalStorage();
  const apiUrl = process.env.REACT_APP_API_URL;

  let response;
  try {
    // login request
    if (!data || Object.keys(data).length === 0) {
      response = await fetch(`https://${apiUrl}/${url}`, {
        method: type,
        headers: {
          "Content-Type": contentType,
        },
        body: body ? JSON.stringify(body) : null,
      });
    } else {
      if (contentType !== "application/json") {
        response = await fetch(`https://${apiUrl}/${url}`, {
          method: type,
          headers: {
            Authorization: "Bearer " + data.token ? data.token : null,
            token: data.token ? data.token : null,
            "access-token": data.token ? data.token : null,
            "token-type": "Bearer",
            client: data.client ? data.client : null,
            uid: data.uid ? data.uid : null,
            expiry: data.expiry ? data.expiry : null,
          },
          body: body,
        });
      } else {
        response = await fetch(`https://${apiUrl}/${url}`, {
          method: type,
          headers: {
            Authorization: "Bearer " + data.token ? data.token : null,
            "Content-Type": contentType,
            "access-token": data.token ? data.token : null,
            "token-type": "Bearer",
            client: data.client ? data.client : null,
            uid: data.uid ? data.uid : null,
            expiry: data.expiry ? data.expiry : null,
          },
          body: JSON.stringify(body),
        });
      }
    }
  } catch (err) {
    return {
      error: Texts.internalServerError,
    };
  }

  if (response.status === 401) {
    removeLocalStorage();
    history.push("/login");
    return { error: Texts.authenticationFailed };
  } else if (response.status === 403) {
    history.push("/");
    return { error: Texts.authorizationFailed };
  } else if (response.status === 404) {
    return { error: Texts.notFoundError };
  } else if (response.status === 502) {
    return { error: Texts.badGatewayError };
  } else if (response.status === 500) {
    return {
      error: Texts.internalServerError,
    };
  }

  const resData = await response.json();

  if (!data || Object.keys(data).length === 0) {
    const username = resData.username;
    const role = resData.role;

    const token = response.headers.get("access-token");
    const uid = response.headers.get("uid");
    const client = response.headers.get("client");
    const expiry = response.headers.get("expiry");

    setLocalStorage({ token, username, role, uid, client, expiry });
  }

  return resData;
};
