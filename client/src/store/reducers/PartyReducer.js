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
  PARTY_CREATING,
  PARTY_CREATED,
  PARTY_CREATE_HAS_ERROR,
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

  lineItemsError: null,
  lineItemsLoading: false,
  lineItemsLoaded: false,
  lineItemsData: {},

  lineItemDeleteError: null,
  lineItemDeleteLoading: false,
  lineItemDeleteData: {},

  createExcelFileError: null,
  createExcelFileLoading: false,
  createExcelFileData: {},

  lineItemCreateError: null,
  lineItemCreateLoading: false,
  lineItemCreateData: {},
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

    case PARTY_UPDATING: {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    }
    case PARTY_UPDATED: {
      return {
        ...state,
        updateLoading: false,
        updateError: null,
        updateData: action.payload.updateData,
      };
    }
    case PARTY_UPDATE_HAS_ERROR: {
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };
    }

    case PARTY_DELETING: {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    }
    case PARTY_DELETED: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        deleteData: action.payload.deleteData,
      };
    }
    case PARTY_DELETE_HAS_ERROR: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };
    }

    case PARTY_CREATING: {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    }
    case PARTY_CREATED: {
      return {
        ...state,
        createLoading: false,
        createError: null,
        createData: action.payload.createData,
      };
    }
    case PARTY_CREATE_HAS_ERROR: {
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
      };
    }

    case PARTY_LINE_ITEMS_FETCHING: {
      return {
        ...state,
        lineItemsLoading: true,
        lineItemsLoaded: false,
        lineItemsError: null,
      };
    }
    case PARTY_LINE_ITEMS_FETCHED: {
      return {
        ...state,
        lineItemsLoading: false,
        lineItemsLoaded: true,
        lineItemsError: null,
        lineItemsData: action.payload.lineItemsData,
      };
    }
    case PARTY_LINE_ITEMS_FETCH_HAS_ERROR: {
      return {
        ...state,
        lineItemsLoading: false,
        lineItemsLoaded: false,
        lineItemsError: action.payload,
      };
    }

    case PARTY_LINE_ITEM_DELETING: {
      return {
        ...state,
        lineItemDeleteLoading: true,
        lineItemDeleteError: null,
      };
    }
    case PARTY_LINE_ITEM_DELETED: {
      return {
        ...state,
        lineItemDeleteLoading: false,
        lineItemDeleteError: null,
        lineItemDeleteData: action.payload.deleteData,
      };
    }
    case PARTY_LINE_ITEM_DELETE_HAS_ERROR: {
      return {
        ...state,
        lineItemDeleteLoading: false,
        lineItemDeleteError: action.payload,
      };
    }

    case EXCEL_FILE_CREATING: {
      return {
        ...state,
        createExcelFileLoading: true,
        createExcelFileError: null,
      };
    }
    case EXCEL_FILE_CREATED: {
      return {
        ...state,
        createExcelFileLoading: false,
        createExcelFileError: null,
        createExcelFileData: action.payload.excelFileData,
      };
    }
    case EXCEL_FILE_CREATE_HAS_ERROR: {
      return {
        ...state,
        createExcelFileLoading: false,
        createExcelFileError: action.payload,
      };
    }

    case PARTY_LINE_ITEM_CREATING: {
      return {
        ...state,
        lineItemCreateLoading: true,
        lineItemCreateError: null,
      };
    }
    case PARTY_LINE_ITEM_CREATED: {
      return {
        ...state,
        lineItemCreateLoading: false,
        lineItemCreateError: null,
        lineItemCreateData: action.payload.createData,
      };
    }
    case PARTY_LINE_ITEM_CREATE_HAS_ERROR: {
      return {
        ...state,
        lineItemCreateLoading: false,
        lineItemCreateError: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
