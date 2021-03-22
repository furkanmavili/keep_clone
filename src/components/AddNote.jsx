import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { Button, ClickAwayListener, InputBase } from "@material-ui/core";
import { addNote } from "../firebase";
import CardBottom from "./CardBottom";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #5f6368",
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    transition: "all .3s ease",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },

  bottomMenu: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginLeft: -10,
    justifyContent: "space-between",
  },
  smallIcon: {
    "& svg": {
      fontSize: 18,
    },
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#202124",
    borderRadius: theme.shape.borderRadius,
  },
  circleWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 120,
    gap: 2,
  },
  circle: {
    cursor: "pointer",
    width: 25,
    height: 25,
    borderRadius: "50%",
    transition: "all 500ms ease",
    "&:hover": {
      border: "1px solid #fff",
    },
  },
}));

function AddNote({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const classes = useStyles();

  const handleCurrentColor = (c) => {
    setCurrentColor(c);
  };
  const handleSubmit = () => {
    if (title || content) {
      const result = addNote(title, content, currentColor, user.uid);
      if (result) {
        setTitle("");
        setContent("");
      }
    }
    setIsNamedFocused(false);
    setCurrentColor("");
  };
  return (
    <div className={classes.flex}>
      <ClickAwayListener onClickAway={handleSubmit}>
        <div
          style={{ backgroundColor: currentColor ? currentColor : "inherit" }}
          className={classes.root}
        >
          {!isNameFocused ? (
            <Typography
              onClick={() => {
                setIsNamedFocused(true);
              }}
            >
              {content}
            </Typography>
          ) : (
            <InputBase
              className={classes.margin}
              placeholder="Title"
              inputProps={{ "aria-label": "naked" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <InputBase
            autoFocus
            value={content}
            multiline
            placeholder="Take a note.."
            style={{ display: "block" }}
            onClick={() => setIsNamedFocused(true)}
            onChange={(e) => setContent(e.target.value)}
          />
          {isNameFocused && (
            <CardBottom
              handleCurrentColor={handleCurrentColor}
              closeButton={
                <Button variant="text" onClick={handleSubmit} color="default">
                  Cancel
                </Button>
              }
            />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default AddNote;
