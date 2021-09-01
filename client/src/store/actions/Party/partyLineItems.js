import {
  PARTY_LINE_ITEMS_FETCHING,
  PARTY_LINE_ITEMS_FETCHED,
  PARTY_LINE_ITEMS_FETCH_HAS_ERROR,
  PARTY_LINE_ITEM_DELETING,
  PARTY_LINE_ITEM_DELETED,
  PARTY_LINE_ITEM_DELETE_HAS_ERROR,
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
