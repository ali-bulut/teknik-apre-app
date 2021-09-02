import {
  TEMPLATES_DATA_FETCHING,
  TEMPLATES_DATA_FETCHED,
  TEMPLATES_DATA_FETCH_HAS_ERROR,
} from "../types";

const INITIAL_STATE = {
  fetchAllError: null,
  fetchAllLoading: false,
  fetchAllLoaded: false,
  fetchAllData: [],
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case TEMPLATES_DATA_FETCHING: {
      return {
        ...state,
        fetchAllLoading: true,
        fetchAllLoaded: false,
        fetchAllError: null,
      };
    }
    case TEMPLATES_DATA_FETCHED: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: true,
        fetchAllError: null,
        fetchAllData: action.payload.templatesData,
      };
    }
    case TEMPLATES_DATA_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: false,
        fetchAllError: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
