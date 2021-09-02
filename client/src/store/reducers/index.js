import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import PartyReducer from "./PartyReducer";
import BarcodeTemplateReducer from "./BarcodeTemplateReducer";

export default combineReducers({
  auth: AuthReducer,
  party: PartyReducer,
  barcodeTemplate: BarcodeTemplateReducer,
});
