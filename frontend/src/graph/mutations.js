import {gql} from "@apollo/client";

import {PLAYER_FRAGMENT, ROUND_FRAGMENT} from "./fragments";

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGame(
    $creatorId: ID!
    $gameType: String!
    $players: [PlayerInput]
  ) {
    createGame(creatorId: $creatorId, gameType: $gameType, players: $players) {
      game {
        id
        status
        gameType
        creator {
          id
        }
        players {
          ...Player
        }
        numberOfRounds
        rounds {
          ...Round
        }
      }
    }
  }

  ${PLAYER_FRAGMENT}
  ${ROUND_FRAGMENT}
`;
