import React, {memo, useEffect} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";

import MainLayout from "../../components/MainLayout";
import ProtectedRoute from "../../components/Navigation/ProtectedRoute";
import * as routeNames from "../../constants/routes";
import * as actions from "../../store/actions";
import AuthPage from "../AuthPage";
import Logout from "../AuthPage/Logout";
import GameRoundPage from "../GameRoundPage";
import HomePage from "../HomePage";
import NewGamePage from "../NewGamePage";
import RankingsPage from "../RankingsPage";
import styles from "./App.scss";

const App = props => {
  useEffect(() => {
    // TODO: Move to a utility method
    if (props.location.pathname === routeNames.LOGIN) {
      document.body.style = `background: ${styles.authBgColor}`;
    } else {
      document.body.style = `background: ${styles.homeBgColor}`;
    }

    props.onAutoLogin();
  });

  const authenticatedRoutes = () => {
    return (
      <MainLayout location={props.location.pathname}>
        <Switch>
          <ProtectedRoute component={Logout} path={routeNames.LOGOUT} />
          <ProtectedRoute
            component={GameRoundPage}
            path={routeNames.GAME_ROUND}
          />
          <ProtectedRoute component={NewGamePage} path={routeNames.NEW_GAME} />
          <ProtectedRoute component={RankingsPage} path={routeNames.RANKINGS} />
          <ProtectedRoute exact component={HomePage} path={routeNames.HOME} />
          <Redirect to={routeNames.LOGIN} />
        </Switch>
      </MainLayout>
    );
  };

  const routes = (
    <Switch>
      <Route component={AuthPage} path={routeNames.LOGIN} />
      <Route component={authenticatedRoutes} />
    </Switch>
  );

  return routes;
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

App.propTypes = {
  onAutoLogin: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(withRouter(memo(App)));
