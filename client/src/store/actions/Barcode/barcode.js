import {
  BARCODES_FETCHING,
  BARCODES_FETCHED,
  BARCODES_FETCH_HAS_ERROR,
  BARCODE_FETCHING,
  BARCODE_FETCHED,
  BARCODE_FETCH_HAS_ERROR,
  BARCODE_UPDATING,
  BARCODE_UPDATED,
  BARCODE_UPDATE_HAS_ERROR,
  BARCODE_DELETING,
  BARCODE_DELETED,
  BARCODE_DELETE_HAS_ERROR,
  BARCODE_CREATING,
  BARCODE_CREATED,
  BARCODE_CREATE_HAS_ERROR,
  BARCODE_PARTIES_FETCHING,
  BARCODE_PARTIES_FETCHED,
  BARCODE_PARTIES_FETCH_HAS_ERROR,
} from "../../types";

import api from "../../api/Barcode/barcode";

export const barcodesFetching = () => ({
  type: BARCODES_FETCHING,
});

export const barcodesFetched = (data) => ({
  type: BARCODES_FETCHED,
  payload: {
    barcodesData: data,
  },
});

export const barcodesFetchHasError = (data) => ({
  type: BARCODES_FETCH_HAS_ERROR,
  payload: data.message,
});

export const barcodeFetching = () => ({
  type: BARCODE_FETCHING,
});

export const barcodeFetched = (data) => ({
  type: BARCODE_FETCHED,
  payload: {
    barcodeData: data,
  },
});

export const barcodeFetchHasError = (data) => ({
  type: BARCODE_FETCH_HAS_ERROR,
  payload: data.message,
});

export const barcodeUpdating = () => ({
  type: BARCODE_UPDATING,
});

export const barcodeUpdated = (data) => ({
  type: BARCODE_UPDATED,
  payload: {
    updateData: data.message,
  },
});

export const barcodeUpdateHasError = (data) => ({
  type: BARCODE_UPDATE_HAS_ERROR,
  payload: data.message,
});

export const barcodeDeleting = () => ({
  type: BARCODE_DELETING,
});

export const barcodeDeleted = (data) => ({
  type: BARCODE_DELETED,
  payload: {
    deleteData: data.message,
  },
});

export const barcodeDeleteHasError = (data) => ({
  type: BARCODE_DELETE_HAS_ERROR,
  payload: data.message,
});

export const barcodeCreating = () => ({
  type: BARCODE_CREATING,
});

export const barcodeCreated = (data) => ({
  type: BARCODE_CREATED,
  payload: {
    createData: data.message,
  },
});

export const barcodeCreateHasError = (data) => ({
  type: BARCODE_CREATE_HAS_ERROR,
  payload: data.message,
});

export const barcodePartiesFetching = () => ({
  type: BARCODE_PARTIES_FETCHING,
});

export const barcodePartiesFetched = (data) => ({
  type: BARCODE_PARTIES_FETCHED,
  payload: {
    barcodePartiesData: data,
  },
});

export const barcodePartiesFetchHasError = (data) => ({
  type: BARCODE_PARTIES_FETCH_HAS_ERROR,
  payload: data.message,
});

export const fetchBarcodes = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodesFetching());

    api
      .fetchBarcodes(data)
      .then((data) => {
        dispatch(barcodesFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodesFetchHasError(err));
        reject(err);
      });
  });

export const fetchBarcode = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodeFetching());

    api
      .fetchBarcode(id)
      .then((data) => {
        dispatch(barcodeFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodeFetchHasError(err));
        reject(err);
      });
  });

export const updateBarcode = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodeUpdating());

    api
      .updateBarcode(data)
      .then((data) => {
        dispatch(barcodeUpdated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodeUpdateHasError(err));
        reject(err);
      });
  });

export const deleteBarcode = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodeDeleting());

    api
      .deleteBarcode(id)
      .then((data) => {
        dispatch(barcodeDeleted(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodeDeleteHasError(err));
        reject(err);
      });
  });

export const createBarcode = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodeCreating());

    api
      .createBarcode(data)
      .then((data) => {
        dispatch(barcodeCreated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodeCreateHasError(err));
        reject(err);
      });
  });

export const fetchBarcodeParties = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(barcodePartiesFetching());

    api
      .fetchBarcodeParties(data)
      .then((data) => {
        dispatch(barcodePartiesFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(barcodePartiesFetchHasError(err));
        reject(err);
      });
  });
