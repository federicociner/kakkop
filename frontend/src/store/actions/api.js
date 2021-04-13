import * as actionTypes from "./action-types";

const requestFail = error => {
  return {
    type: actionTypes.REQUEST_FAIL,
    error: error,
  };
};

const requestStart = () => {
  return {type: actionTypes.REQUEST_START};
};

const requestSuccess = () => {
  return {
    type: actionTypes.REQUEST_SUCCESS,
  };
};

export {requestFail, requestStart, requestSuccess};
