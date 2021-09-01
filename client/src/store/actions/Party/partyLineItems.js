import {
  PARTY_LINE_ITEMS_FETCHING,
  PARTY_LINE_ITEMS_FETCHED,
  PARTY_LINE_ITEMS_FETCH_HAS_ERROR,
  PARTY_LINE_ITEM_DELETING,
  PARTY_LINE_ITEM_DELETED,
  PARTY_LINE_ITEM_DELETE_HAS_ERROR,
  EXCEL_FILE_CREATING,
  EXCEL_FILE_CREATED,
  EXCEL_FILE_CREATE_HAS_ERROR,
  PARTY_LINE_ITEM_CREATING,
  PARTY_LINE_ITEM_CREATED,
  PARTY_LINE_ITEM_CREATE_HAS_ERROR,
} from "../../types";

import api from "../../api/Party/partyLineItems";

const partyLineItemsFetching = () => ({
  type: PARTY_LINE_ITEMS_FETCHING,
});

const partyLineItemsFetched = (data) => ({
  type: PARTY_LINE_ITEMS_FETCHED,
  payload: {
    lineItemsData: data,
  },
});

const partyLineItemsFetchHasError = (data) => ({
  type: PARTY_LINE_ITEMS_FETCH_HAS_ERROR,
  payload: data.message,
});

const partyLineItemDeleting = () => ({
  type: PARTY_LINE_ITEM_DELETING,
});

const partyLineItemDeleted = (data) => ({
  type: PARTY_LINE_ITEM_DELETED,
  payload: {
    deleteData: data.message,
  },
});

const partyLineItemDeleteHasError = (data) => ({
  type: PARTY_LINE_ITEM_DELETE_HAS_ERROR,
  payload: data.message,
});

const excelFileCreating = () => ({
  type: EXCEL_FILE_CREATING,
});

const excelFileCreated = (data) => ({
  type: EXCEL_FILE_CREATED,
  payload: {
    excelFileData: data,
  },
});

const excelFileCreateHasError = (data) => ({
  type: EXCEL_FILE_CREATE_HAS_ERROR,
  payload: data.message,
});

const partyLineItemCreating = () => ({
  type: PARTY_LINE_ITEM_CREATING,
});

const partyLineItemCreated = (data) => ({
  type: PARTY_LINE_ITEM_CREATED,
  payload: {
    createData: data.message,
  },
});

const partyLineItemCreateHasError = (data) => ({
  type: PARTY_LINE_ITEM_CREATE_HAS_ERROR,
  payload: data.message,
});

export const fetchPartyLineItems = (partyId) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyLineItemsFetching());

    api
      .fetchPartyLineItems(partyId)
      .then((data) => {
        dispatch(partyLineItemsFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyLineItemsFetchHasError(err));
        reject(err);
      });
  });

export const deletePartyLineItem = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyLineItemDeleting());

    api
      .deletePartyLineItem(id)
      .then((data) => {
        dispatch(partyLineItemDeleted(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyLineItemDeleteHasError(err));
        reject(err);
      });
  });

export const createExcelFile = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(excelFileCreating());

    api
      .createExcelFile(id)
      .then((data) => {
        dispatch(excelFileCreated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(excelFileCreateHasError(err));
        reject(err);
      });
  });

export const createPartyLineItem = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyLineItemCreating());

    api
      .createPartyLineItem(data)
      .then((data) => {
        dispatch(partyLineItemCreated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyLineItemCreateHasError(err));
        reject(err);
      });
  });
