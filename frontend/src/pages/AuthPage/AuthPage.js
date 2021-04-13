import React, {memo, useState, useEffect} from "react";

import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import CenteredContainer from "../../components/UI/CenteredContainer";
import ErrorModal from "../../components/UI/ErrorModal";
import * as routes from "../../constants/routes";
import * as actions from "../../store/actions";
import * as states from "../../store/states";
import LoginForm from "./LoginForm";

import "./AuthPage.scss";

const AuthPage = props => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const errorModal = (
    <ErrorModal
      handleCloseModal={handleCloseModal}
      showModal={showModal}
      errorMessage={
        props.requestError ? props.requestError.errors[0].message : null
      }
    />
  );

  useEffect(() => {
    if (props.authRedirectPath !== routes.HOME) {
      props.onSetRedirectPath();
    }
  });

  useEffect(() => {
    if (props.requestError) {
      setShowModal(true);
    }
  }, [props.requestError]);

  let authRedirect;

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <React.Fragment>
      {authRedirect}
      {errorModal}
      <CenteredContainer>
        <Card border="primary">
          <Card.Img variant="top" src="logo_light.png" />
          <Card.Body className="card-body">
            <LoginForm {...props} />
          </Card.Body>
        </Card>
      </CenteredContainer>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authRedirectPath: state.auth[states.AUTH_REDIRECT_PATH],
    isAuthenticated: state.auth[states.AUTH_TOKEN] !== null,
    isLoading: state.api[states.REQUEST_LOADING],
    requestError: state.api[states.REQUEST_ERROR],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userEmail, password) =>
      dispatch(actions.authLogin(userEmail, password)),
    onSetRedirectPath: () => dispatch(actions.authSetRedirectPath(routes.HOME)),
  };
};

AuthPage.propTypes = {
  authRedirectPath: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  onLogin: PropTypes.func,
  onSetRedirectPath: PropTypes.func,
  requestError: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(AuthPage));
