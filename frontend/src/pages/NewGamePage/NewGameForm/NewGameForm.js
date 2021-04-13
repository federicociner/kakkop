import React, {useEffect, useState} from "react";

import {useMutation} from "@apollo/client";
import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import {Link} from "react-router-dom";
import {generatePath, withRouter} from "react-router-dom";
import * as Yup from "yup";

import axios from "../../../api/axios";
import * as endpoints from "../../../api/endpoints";
import CustomSelect from "../../../components/Forms/CustomSelect";
import PlayerOrderModal from "../../../components/Games/PlayerOrderModal";
import * as games from "../../../constants/games";
import * as routes from "../../../constants/routes";
import {gameOptions} from "../../../games";
import {CREATE_GAME_MUTATION} from "../../../graph";

import "./NewGameForm.scss";

const BaseForm = ({dirty, isSubmitting, isValid, setFieldValue, values}) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const playerOrderModal = (
    <PlayerOrderModal
      handleCloseModal={handleCloseModal}
      handleUpdatePlayers={setFieldValue}
      playerIds={values.players}
      showModal={showModal}
      users={users}
    />
  );

  useEffect(() => {
    axios
      .get(endpoints.USERS)
      .then(res => {
        const userOptions = res.data.map(user => {
          return {label: user.firstName, value: user.id};
        });
        setUsers(prevUsers => [...prevUsers, ...userOptions]);
      })
      .catch(err => err);
  }, []);

  useEffect(() => {
    /* Used to align "playerOrder" and "players" arrays if the latter changes
    after player order has been set */
    setFieldValue("playerOrder", values.players);
  }, [setFieldValue, values.players]);

  return (
    <React.Fragment>
      <Form>
        <Container className="new-game-form">
          <FormGroup>
            <FormLabel>Game Type</FormLabel>
            <CustomSelect
              isMulti={false}
              name="gameType"
              options={gameOptions}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Players</FormLabel>
            <CustomSelect isMulti={true} name="players" options={users} />
          </FormGroup>
          <FormGroup>
            <Button
              block
              disabled={values.players.length < 2}
              onClick={() => setShowModal(true)}
              variant="dark"
            >
              Set player order
            </Button>
          </FormGroup>
        </Container>
        <Container className="text-center">
          <Link to={routes.HOME}>
            <Button className="new-game-btn float-left" variant="primary">
              Cancel
            </Button>
          </Link>
          <Button
            className="new-game-btn float-right"
            disabled={isSubmitting || !(dirty && isValid)}
            type="submit"
            variant="primary"
          >
            Start Game
          </Button>
        </Container>
      </Form>
      {playerOrderModal}
    </React.Fragment>
  );
};

const schema = Yup.object().shape({
  gameType: Yup.string().required("*Please select game type."),
  players: Yup.array().when("gameType", {
    is: gameType => gameType === games.HANNIBAL,
    then: Yup.array()
      .min(3, "*Please select at least 3 players.")
      .max(7, "*Please select no more than 7 players.")
      .of(Yup.string().required()),
  }),
});

const NewGameForm = props => {
  const [createGame] = useMutation(CREATE_GAME_MUTATION);

  const handleSubmit = values => {
    const {history} = props;

    const playersPayload = values.playerOrder.map((id, index) => {
      return {
        userId: id,
        position: index + 1,
        isFirstDealer: index === 0 ? true : false,
      };
    });

    createGame({
      variables: {
        creatorId: props.currentUser,
        gameType: values.gameType,
        players: playersPayload,
      },
    })
      .then(res => {
        const game = res.data.createGame.game;
        const gameId = game.id;
        const roundId = game.rounds.find(round => round.number === 1).id;
        const path = generatePath(routes.GAME_ROUND, {gameId, roundId});
        history.push(path);
      })
      .catch(err => err);
  };
  return (
    <Formik
      component={BaseForm}
      initialValues={{
        gameType: "",
        players: [],
        playerOrder: [],
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    />
  );
};

BaseForm.propTypes = {
  dirty: PropTypes.bool,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  setFieldValue: PropTypes.func,
  values: PropTypes.shape({
    players: PropTypes.array,
  }),
};

NewGameForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.number,
};

export default withRouter(NewGameForm);
