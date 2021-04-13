import React, {memo} from "react";

import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";

import * as routes from "../../../constants/routes";
import * as states from "../../../store/states";

const ProtectedRoute = ({component: Component, ...params}) => {
  return (
    <Route
      {...params}
      render={props => {
        const token = localStorage.getItem(states.LOCAL_AUTH_TOKEN);

        if (token !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{pathname: routes.LOGIN, state: {from: props.location}}}
            />
          );
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default memo(ProtectedRoute);
