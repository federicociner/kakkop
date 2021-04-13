import {gql} from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment User on UserType {
    id
    firstName
    lastName
  }
`;

export const PLAYER_FRAGMENT = gql`
  fragment Player on PlayerType {
    id
    isFirstDealer
    position
    user {
      ...User
    }
  }

  ${USER_FRAGMENT}
`;

export const ROUND_FRAGMENT = gql`
  fragment Round on RoundType {
    id
    number
    numberOfCards
    status
    dealer {
      id
    }
  }
`;
