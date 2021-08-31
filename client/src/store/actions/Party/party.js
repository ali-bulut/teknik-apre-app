import {
  PARTIES_FETCHING,
  PARTIES_FETCHED,
  PARTIES_FETCH_HAS_ERROR,
} from "../../types";

import api from "../../api/Party/party";

export const partiesFetching = () => ({
  type: PARTIES_FETCHING,
});

export const partiesFetched = (data) => ({
  type: PARTIES_FETCHED,
  payload: {
    partiesData: data,
  },
});

export const partiesFetchHasError = (data) => ({
  type: PARTIES_FETCH_HAS_ERROR,
  payload: data.message,
});

export const fetchParties = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partiesFetching());

    api
      .fetchParties()
      .then((data) => {
        dispatch(partiesFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partiesFetchHasError(err));
        reject(err);
      });
  });
