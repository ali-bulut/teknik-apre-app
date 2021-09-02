import {
  PARTIES_FETCHING,
  PARTIES_FETCHED,
  PARTIES_FETCH_HAS_ERROR,
  PARTY_FETCHING,
  PARTY_FETCHED,
  PARTY_FETCH_HAS_ERROR,
  PARTY_UPDATING,
  PARTY_UPDATED,
  PARTY_UPDATE_HAS_ERROR,
  PARTY_DELETING,
  PARTY_DELETED,
  PARTY_DELETE_HAS_ERROR,
  PARTY_CREATING,
  PARTY_CREATED,
  PARTY_CREATE_HAS_ERROR,
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

export const partyFetching = () => ({
  type: PARTY_FETCHING,
});

export const partyFetched = (data) => ({
  type: PARTY_FETCHED,
  payload: {
    partyData: data,
  },
});

export const partyFetchHasError = (data) => ({
  type: PARTY_FETCH_HAS_ERROR,
  payload: data.message,
});

export const partyUpdating = () => ({
  type: PARTY_UPDATING,
});

export const partyUpdated = (data) => ({
  type: PARTY_UPDATED,
  payload: {
    updateData: data.message,
  },
});

export const partyUpdateHasError = (data) => ({
  type: PARTY_UPDATE_HAS_ERROR,
  payload: data.message,
});

export const partyDeleting = () => ({
  type: PARTY_DELETING,
});

export const partyDeleted = (data) => ({
  type: PARTY_DELETED,
  payload: {
    deleteData: data.message,
  },
});

export const partyDeleteHasError = (data) => ({
  type: PARTY_DELETE_HAS_ERROR,
  payload: data.message,
});

export const partyCreating = () => ({
  type: PARTY_CREATING,
});

export const partyCreated = (data) => ({
  type: PARTY_CREATED,
  payload: {
    createData: data.message,
  },
});

export const partyCreateHasError = (data) => ({
  type: PARTY_CREATE_HAS_ERROR,
  payload: data.message,
});

export const fetchParties = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partiesFetching());

    api
      .fetchParties(data)
      .then((data) => {
        dispatch(partiesFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partiesFetchHasError(err));
        reject(err);
      });
  });

export const fetchParty = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyFetching());

    api
      .fetchParty(id)
      .then((data) => {
        dispatch(partyFetched(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyFetchHasError(err));
        reject(err);
      });
  });

export const updateParty = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyUpdating());

    api
      .updateParty(data)
      .then((data) => {
        dispatch(partyUpdated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyUpdateHasError(err));
        reject(err);
      });
  });

export const deleteParty = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyDeleting());

    api
      .deleteParty(id)
      .then((data) => {
        dispatch(partyDeleted(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyDeleteHasError(err));
        reject(err);
      });
  });

export const createParty = (data) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(partyCreating());

    api
      .createParty(data)
      .then((data) => {
        dispatch(partyCreated(data));
        resolve(data);
      })
      .catch((err) => {
        dispatch(partyCreateHasError(err));
        reject(err);
      });
  });
