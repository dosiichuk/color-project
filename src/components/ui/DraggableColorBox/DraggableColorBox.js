import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from 'react-sortable-hoc';
import './DraggableColorBox.css';

const DraggableColorBox = SortableElement((props) => {
  return (
    <div className="DraggableColorBox" style={{ backgroundColor: props.color }}>
      <div className="box-content">
        <span>{props.name}</span>
        <span>
          <DeleteIcon
            className="delete"
            onClick={() => {
              console.log(props);
              props.handleDelete(props.name);
            }}
          />
        </span>
      </div>
    </div>
  );
});
export default DraggableColorBox;
