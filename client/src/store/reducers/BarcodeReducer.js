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
} from "../types";

const INITIAL_STATE = {
  fetchAllError: null,
  fetchAllLoading: false,
  fetchAllLoaded: false,
  fetchAllData: [],

  fetchError: null,
  fetchLoading: false,
  fetchLoaded: false,
  fetchData: {},

  updateError: null,
  updateLoading: false,
  updateData: {},

  deleteError: null,
  deleteLoading: false,
  deleteData: {},

  createError: null,
  createLoading: false,
  createData: {},

  fetchAllPartiesError: null,
  fetchAllPartiesLoading: false,
  fetchAllPartiesLoaded: false,
  fetchAllPartiesData: [],
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case BARCODES_FETCHING: {
      return {
        ...state,
        fetchAllLoading: true,
        fetchAllLoaded: false,
        fetchAllError: null,
      };
    }
    case BARCODES_FETCHED: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: true,
        fetchAllError: null,
        fetchAllData: action.payload.barcodesData,
      };
    }
    case BARCODES_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchAllLoading: false,
        fetchAllLoaded: false,
        fetchAllError: action.payload,
      };
    }

    case BARCODE_FETCHING: {
      return {
        ...state,
        fetchLoading: true,
        fetchLoaded: false,
        fetchError: null,
      };
    }
    case BARCODE_FETCHED: {
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: true,
        fetchError: null,
        fetchData: action.payload.barcodeData,
      };
    }
    case BARCODE_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: false,
        fetchError: action.payload,
      };
    }

    case BARCODE_UPDATING: {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    }
    case BARCODE_UPDATED: {
      return {
        ...state,
        updateLoading: false,
        updateError: null,
        updateData: action.payload.updateData,
      };
    }
    case BARCODE_UPDATE_HAS_ERROR: {
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };
    }

    case BARCODE_DELETING: {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    }
    case BARCODE_DELETED: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        deleteData: action.payload.deleteData,
      };
    }
    case BARCODE_DELETE_HAS_ERROR: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };
    }

    case BARCODE_CREATING: {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    }
    case BARCODE_CREATED: {
      return {
        ...state,
        createLoading: false,
        createError: null,
        createData: action.payload.createData,
      };
    }
    case BARCODE_CREATE_HAS_ERROR: {
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
      };
    }

    case BARCODE_PARTIES_FETCHING: {
      return {
        ...state,
        fetchAllPartiesLoading: true,
        fetchAllPartiesLoaded: false,
        fetchAllPartiesError: null,
      };
    }
    case BARCODE_PARTIES_FETCHED: {
      return {
        ...state,
        fetchAllPartiesLoading: false,
        fetchAllPartiesLoaded: true,
        fetchAllPartiesError: null,
        fetchAllPartiesData: action.payload.barcodePartiesData,
      };
    }
    case BARCODE_PARTIES_FETCH_HAS_ERROR: {
      return {
        ...state,
        fetchAllPartiesLoading: false,
        fetchAllPartiesLoaded: false,
        fetchAllPartiesData: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
