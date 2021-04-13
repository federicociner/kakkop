import axios from "axios";

import store from "../store";
import * as actions from "../store/actions";
import * as states from "../store/states";
import * as endpoints from "./endpoints";

const config = {
  baseURL: endpoints.BASE_URL,
};

const instance = axios.create(config);
const {dispatch} = store;

// Interceptors
instance.interceptors.request.use(
  function (config) {
    dispatch(actions.requestStart());
    const token = localStorage.getItem(states.LOCAL_AUTH_TOKEN);
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    dispatch(actions.requestSuccess());
    return response;
  },
  error => {
    dispatch(actions.requestFail(error.response.data));
    return Promise.reject(error);
  }
);

export default instance;
