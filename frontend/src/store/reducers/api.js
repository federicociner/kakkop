import {updateObject} from "../../utilities/object-utilities";
import * as actionTypes from "../actions/action-types";
import * as states from "../states";

const initialState = {
  [states.REQUEST_ERROR]: null,
  [states.REQUEST_LOADING]: false,
};

const requestFail = (state, action) => {
  return updateObject(state, {
    [states.REQUEST_ERROR]: action.error,
    [states.REQUEST_LOADING]: false,
  });
};

const requestStart = state => {
  return updateObject(state, {
    [states.REQUEST_ERROR]: null,
    [states.REQUEST_LOADING]: true,
  });
};

const requestSuccess = state => {
  return updateObject(state, {
    [states.REQUEST_ERROR]: null,
    [states.REQUEST_LOADING]: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_FAIL:
      return requestFail(state, action);
    case actionTypes.REQUEST_START:
      return requestStart(state);
    case actionTypes.REQUEST_SUCCESS:
      return requestSuccess(state);
    default:
      return state;
  }
};

export default reducer;
