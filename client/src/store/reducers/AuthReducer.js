import {
  USER_AUTHENTICATING,
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_HAS_ERROR,
} from "../types";

const INITIAL_STATE = {
  authError: null,
  userAuthenticationLoading: false,
  userInfo: {},
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case USER_AUTHENTICATING: {
      return { ...state, userAuthenticationLoading: true, authError: null };
    }
    case USER_AUTHENTICATED: {
      return {
        ...state,
        userAuthenticationLoading: false,
        authError: null,
        userInfo: action.payload.userInfo,
      };
    }
    case USER_AUTHENTICATION_HAS_ERROR: {
      return {
        ...state,
        userAuthenticationLoading: false,
        authError: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
