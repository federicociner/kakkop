import React, {useEffect} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as actions from "../../../store/actions";

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  });

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

Logout.propTypes = {
  onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Logout);
