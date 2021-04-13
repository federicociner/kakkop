import axios from "../../api/axios";
import * as endpoints from "../../api/endpoints";
import * as states from "../states";
import * as actionTypes from "./action-types";

const authLogout = () => {
  localStorage.removeItem(states.LOCAL_TOKEN_EXPIRATION);
  localStorage.removeItem(states.LOCAL_AUTH_TOKEN);
  localStorage.removeItem(states.LOCAL_USER_ID);
  localStorage.removeItem(states.LOCAL_USER_EMAIL);

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authSetRedirectPath = path => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path,
  };
};

const authSuccess = (token, userId, userEmail) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userEmail: userEmail,
  };
};

/**
 * Returns an action object which sends a POST request to authenticate a user. * If successful, it saves the response object's user ID and token in local
 * browser storage and dispatches the "authentication success" action. If
 * unsuccessful, it dispatches the "authentication failure" action with the
 * error message received from the server.
 * @param {string} userEmail
 * @param {string} password
 * @return {Object}
 */
const authLogin = (userEmail, password) => {
  return dispatch => {
    return axios
      .post(endpoints.AUTH_LOGIN, {
        email: userEmail,
        password: password,
      })
      .then(response => {
        const userId = parseInt(response.data.user.id);
        const token = response.data.accessToken.value;
        const expiration = response.data.accessToken.expiration;

        const expirationDate = new Date(
          new Date().getTime() + expiration * 1000
        );

        localStorage.setItem(states.LOCAL_TOKEN_EXPIRATION, expirationDate);
        localStorage.setItem(states.LOCAL_AUTH_TOKEN, token);
        localStorage.setItem(states.LOCAL_USER_ID, userId);
        localStorage.setItem(states.LOCAL_USER_EMAIL, userEmail);

        dispatch(authSuccess(token, userId, userEmail));
        dispatch(checkAuthTimeout(expiration));
      })
      .catch(error => error);
  };
};

/**
 * Returns an action object which checks whether or not the user's local token
 * has expired. If the token has expired, the user will be logged out, otherwise
 * they will be automatically logged in.
 * @returns {Object}
 */
const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem(states.LOCAL_AUTH_TOKEN);
    const expirationDate = new Date(
      localStorage.getItem(states.LOCAL_TOKEN_EXPIRATION)
    );

    if (expirationDate <= new Date()) {
      dispatch(authLogout());
    } else {
      const userId = parseInt(localStorage.getItem(states.LOCAL_USER_ID));
      const userEmail = localStorage.getItem(states.LOCAL_USER_EMAIL);

      dispatch(authSuccess(token, userId, userEmail));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};

/**
 * Returns an action object which sets a timeout, and then dispatches the logout
 * action after the specified expiration time, which is converted from
 * seconds to milliseconds.
 * @param {number} expirationTime
 */
const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export {authCheckState, authLogin, authLogout, authSetRedirectPath};
