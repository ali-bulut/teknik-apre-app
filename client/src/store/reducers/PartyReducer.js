import {
  PARTIES_FETCHING,
  PARTIES_FETCHED,
  PARTIES_FETCH_HAS_ERROR,
  PARTY_FETCHING,
  PARTY_FETCHED,
  PARTY_FETCH_HAS_ERROR,
} from "../types";

const INITIAL_STATE = {
  fetchAllError: null,
  fetchAllLoading: false,
  fetchAllLoaded: false,
  fetchAllData: {},

  fetchError: null,
  fetchLoading: false,
  fetchLoaded: false,
  fetchData: {},
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case PARTIES_FETCHING: {
      return {
        ...state,
        fetchAllLoading: true,
        fetchAllLoaded: false,
        fetchAllError: null,
      };
    }
    case PARTIES_FETCHED: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: true,
        fetchAllError: null,
        fetchAllData: action.payload.partiesData,
      };
    }
    case PARTIES_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: false,
        fetchAllError: action.payload,
      };
    }

    case PARTY_FETCHING: {
      return {
        ...state,
        fetchLoading: true,
        fetchLoaded: false,
        fetchError: null,
      };
    }
    case PARTY_FETCHED: {
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: true,
        fetchError: null,
        fetchData: action.payload.partyData,
      };
    }
    case PARTY_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: false,
        fetchError: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
