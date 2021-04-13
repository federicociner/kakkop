import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";

import CenteredContainer from "../../components/UI/CenteredContainer";
import ErrorModal from "../../components/UI/ErrorModal";
import * as states from "../../store/states";
import NewGameForm from "./NewGameForm";

import "./NewGamePage.scss";

const NewGamePage = props => {
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
    if (props.requestError) {
      setShowModal(true);
    }
  }, [props.requestError]);

  return (
    <CenteredContainer>
      <NewGameForm currentUser={props.currentUserId} />
      {errorModal}
    </CenteredContainer>
  );
};

const mapStateToProps = state => {
  return {
    currentUserId: state.auth[states.AUTH_USER_ID],
    isLoading: state.api[states.REQUEST_LOADING],
    requestError: state.api[states.REQUEST_ERROR],
  };
};

NewGamePage.propTypes = {
  currentUserId: PropTypes.number,
  isLoading: PropTypes.bool,
  requestError: PropTypes.object,
};

export default connect(mapStateToProps)(NewGamePage);
