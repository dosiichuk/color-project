import React from "react";
import "./DraggableColorBox.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

const DraggableColorBox = SortableElement((props) => {
  return (
    <div className="DraggableColorBox" style={{ backgroundColor: props.color }}>
      <div className="box-content">
        <span>{props.name}</span>
        <span>
          <DeleteIcon
            className="delete"
            onClick={() => props.handleDelete(props.name)}
          />
        </span>
      </div>
    </div>
  );
});
export default DraggableColorBox;
