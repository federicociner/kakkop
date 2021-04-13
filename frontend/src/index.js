import React from "react";

import {ApolloProvider} from "@apollo/client";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import client from "./api/apollo";
import App from "./pages/App";
import store from "./store";

import "./scss/reset.scss";
import "./scss/main.scss";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
