import React from "react";

import {useParams} from "react-router-dom";

const GameRoundPage = () => {
  let {gameId, roundId} = useParams();

  return (
    <div>
      <h1>Welcome to a round page!</h1>
      <p>You are playing game with ID: {gameId}</p>
      <p>You are on round ID: {roundId}</p>
    </div>
  );
};

export default GameRoundPage;
