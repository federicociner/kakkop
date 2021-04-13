import React, {memo} from "react";

import PropTypes from "prop-types";

import NavigationBar from "../Navigation/NavigationBar";

import "./MainLayout.scss";

const MainLayout = props => {
  return (
    <React.Fragment>
      <NavigationBar activeRoute={props.location} />
      {props.children}
    </React.Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
};

export default memo(MainLayout);
