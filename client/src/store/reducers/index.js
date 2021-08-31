import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import PartyReducer from "./PartyReducer";

export default combineReducers({
  auth: AuthReducer,
  party: PartyReducer,
});
