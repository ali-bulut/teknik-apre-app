import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/index";

const enhancers = [applyMiddleware(thunk)];

const configureStore = () => {
  const store = createStore(rootReducer, compose(...enhancers));
  return store;
};

export default configureStore;
