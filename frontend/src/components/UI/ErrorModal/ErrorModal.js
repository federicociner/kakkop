import React from "react";

import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

import "./ErrorModal.scss";

const ErrorModal = props => {
  return (
    <Modal
      centered
      className="error-modal"
      onHide={props.handleCloseModal}
      show={props.showModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={Icons.faTimesCircle} size="3x" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4>Oops!</h4>
        <p>Something went wrong: {props.errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
};

ErrorModal.propTypes = {
  errorMessage: PropTypes.string,
  handleCloseModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default ErrorModal;
