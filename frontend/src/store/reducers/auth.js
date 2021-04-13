import {updateObject} from "../../utilities/object-utilities";
import * as actionTypes from "../actions/action-types";
import * as states from "../states";

const initialState = {
  [states.AUTH_TOKEN]: null,
  [states.AUTH_USER_ID]: null,
  [states.AUTH_USER_EMAIL]: null,
  [states.AUTH_REDIRECT_PATH]: "/",
};

const authLogout = state => {
  return updateObject(state, {
    [states.AUTH_TOKEN]: null,
    [states.AUTH_USER_ID]: null,
    [states.AUTH_USER_EMAIL]: null,
  });
};

const authSetRedirectPath = (state, action) => {
  return updateObject(state, {[states.AUTH_REDIRECT_PATH]: action.path});
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    [states.AUTH_TOKEN]: action.token,
    [states.AUTH_USER_ID]: action.userId,
    [states.AUTH_USER_EMAIL]: action.userEmail,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      return authSetRedirectPath(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
