import {
  TEMPLATES_DATA_FETCHING,
  TEMPLATES_DATA_FETCHED,
  TEMPLATES_DATA_FETCH_HAS_ERROR,
} from "../../types";

import api from "../../api/BarcodeTemplate/barcodeTemplate";

const templatesDataFetching = () => ({
  type: TEMPLATES_DATA_FETCHING,
});

const templatesDataFetched = (data) => ({
  type: TEMPLATES_DATA_FETCHED,
  payload: {
    templatesData: data,
  },
});

const templatesDataFetchHasError = (data) => ({
  type: TEMPLATES_DATA_FETCH_HAS_ERROR,
  payload: data.message,
});

export const fetchTemplatesData = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(templatesDataFetching());

    api
      .fetchTemplatesData()
      .then((data) => {
        dispatch(templatesDataFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(templatesDataFetchHasError(err));
        reject(err);
      });
  });
