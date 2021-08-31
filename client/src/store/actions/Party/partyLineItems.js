import {
  PARTY_LINE_ITEMS_FETCHING,
  PARTY_LINE_ITEMS_FETCHED,
  PARTY_LINE_ITEMS_FETCH_HAS_ERROR,
} from "../../types";

import api from "../../api/Party/partyLineItems";

export const partyLineItemsFetching = () => ({
  type: PARTY_LINE_ITEMS_FETCHING,
});

export const partyLineItemsFetched = (data) => ({
  type: PARTY_LINE_ITEMS_FETCHED,
  payload: {
    lineItemsData: data,
  },
});

export const partyLineItemsFetchHasError = (data) => ({
  type: PARTY_LINE_ITEMS_FETCH_HAS_ERROR,
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
