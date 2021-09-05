import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import BarcodeReducer from "./BarcodeReducer";
import PartyReducer from "./PartyReducer";
import BarcodeTemplateReducer from "./BarcodeTemplateReducer";

export default combineReducers({
  auth: AuthReducer,
  barcode: BarcodeReducer,
  party: PartyReducer,
  barcodeTemplate: BarcodeTemplateReducer,
});
