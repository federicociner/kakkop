import React, {memo, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

import DraggableListItem from "../../UI/DraggableListItem";

import "./PlayerOrderModal.scss";

const PlayerOrderModal = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const updatedPlayers = props.users.filter(user =>
      props.playerIds.includes(user.value)
    );

    setItems(updatedPlayers);
  }, [props.playerIds, props.users]);

  const handleDragEnd = result => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedItems = reorder(items, source.index, destination.index);

    props.handleUpdatePlayers(
      "playerOrder",
      updatedItems.map(p => p.value)
    );

    setItems(updatedItems);
  };

  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);

    return list;
  };

  return (
    <Modal
      centered
      className="player-modal"
      onHide={props.handleCloseModal}
      show={props.showModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Container>
            <h2 className="text-center">Set Player Order</h2>
            <small>
              <strong>Note:</strong> The player on top will also be set as the
              first dealer.
            </small>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <Container
                className="text-center"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items.map((user, index) => (
                  <DraggableListItem
                    id={user.label}
                    content={user.label}
                    index={index}
                    key={user.value}
                  />
                ))}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </Modal.Body>
    </Modal>
  );
};

PlayerOrderModal.propTypes = {
  handleCloseModal: PropTypes.func,
  handleUpdatePlayers: PropTypes.func,
  playerIds: PropTypes.array,
  showModal: PropTypes.bool,
  users: PropTypes.array,
};

export default memo(PlayerOrderModal);
