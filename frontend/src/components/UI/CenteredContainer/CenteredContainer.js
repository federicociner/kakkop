import React, {memo} from "react";

import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "./CenteredContainer.scss";

const CenteredContainer = props => {
  const lgCols = {span: 4, offset: 4};
  const mdCols = {span: 6, offset: 3};
  const smCols = {span: 8, offset: 2};
  const xsCols = {span: 10, offset: 1};

  return (
    <Container className="centered-container">
      <Row>
        <Col xs={xsCols} sm={smCols} md={mdCols} lg={lgCols}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

CenteredContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(CenteredContainer);
