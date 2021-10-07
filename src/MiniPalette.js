import React from "react";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "grey",
    height: "150px",

    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5em",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "27%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-5.5px",
  },

  deleteIcon: {
    color: "white",
    backgroundColor: "red",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    zIndex: "10",
    opacity: "0",
    transition: "all 0.5s",
  },
});

export default function MiniPalette(props) {
  const classes = useStyles();
  const { paletteName, emoji, colors, id } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));
  const deletePalette = function (id) {
    props.handleDelete(id);
  };
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <DeleteIcon
        className={classes.deleteIcon}
        onClick={(e) => {
          e.stopPropagation();
          deletePalette(id);
        }}
      />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
