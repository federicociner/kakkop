import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import * as actionTypes from "./actions/action-types";
import {apiReducer, authReducer} from "./reducers";

const appReducer = combineReducers({
  api: apiReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.AUTH_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
