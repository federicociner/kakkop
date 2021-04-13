import React from "react";

import PropTypes from "prop-types";
import {Draggable} from "react-beautiful-dnd";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./DraggableListItem.scss";

const DraggableListItem = props => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => (
        <ListGroupItem
          className="draggable-list-item mx-auto"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          variant="primary"
        >
          <span>
            <div className="dots float-left" />
            {props.content}
          </span>
        </ListGroupItem>
      )}
    </Draggable>
  );
};

DraggableListItem.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
};

export default DraggableListItem;
