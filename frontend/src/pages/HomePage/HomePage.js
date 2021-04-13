import React, {memo} from "react";

import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

import CenteredContainer from "../../components/UI/CenteredContainer";
import * as routes from "../../constants/routes";

import "./HomePage.scss";

const HomePage = () => {
  const handleContinueGame = () => {
    console.log("Continue game!");
  };

  return (
    <CenteredContainer>
      <Button
        className="menu-button mx-auto"
        onClick={handleContinueGame}
        size="lg"
      >
        My Games
      </Button>
      <Link to={routes.NEW_GAME}>
        <Button className="menu-button mx-auto" size="lg">
          New Game
        </Button>
      </Link>
      <Link to={routes.RANKINGS}>
        <Button className="menu-button mx-auto" size="lg">
          Rankings
        </Button>
      </Link>
    </CenteredContainer>
  );
};

export default memo(HomePage);
