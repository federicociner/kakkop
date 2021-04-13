import React, {memo} from "react";

import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";

import * as routes from "../../../constants/routes";

import "./NavigationBar.css";

const NavigationBar = props => {
  return (
    <Navbar collapseOnSelect bg="dark" expand="sm" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={routes.HOME}>
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/logo_dark.png"}
            alt="Kakkop"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" activeKey={props.activeRoute}>
            <Nav.Item>
              <Nav.Link exact as={NavLink} to={routes.HOME}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link exact as={NavLink} to={routes.RANKINGS}>
                Rankings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link exact as={NavLink} to={routes.LOGOUT}>
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  activeRoute: PropTypes.string,
};

export default memo(NavigationBar);
