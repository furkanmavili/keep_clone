import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { Button, ClickAwayListener, IconButton, InputBase, Tooltip } from "@material-ui/core";
import { addNote } from "../firebase/store";
import CardBottom from "./CardBottom";
import { CheckBoxOutlined, GestureOutlined, ImageOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.25, 2),
    transition: "all .3s ease",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%)",
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
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
  },
  circleWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 120,
    gap: 2,
    borderRadius: "50%",
    transition: "all 500ms ease",
    "&:hover": {
      border: "1px solid #fff",
    },
  },
  note: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      flex: 1,
    },
  },
  icon: {
    margin: theme.spacing(0, 1),
  },
}));

function AddNote() {
  const [state, setState] = useState({
    title: "",
    content: "",
    color: "",
    isArchived: false,
    isPinned: false,
    isTrash: false,
    remindTime: "",
    photoURL: "",
    labels: [],
    edited: "",
  });
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const classes = useStyles();

  const handleState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };
  const handleCurrentColor = (c) => {
    handleState("color", c);
  };
  const handleSubmit = () => {
    if (!isNameFocused) return;
    if (state.title || state.content) {
      const result = addNote({
        title: state.title,
        content: state.content,
        color: state.color,
      });
      if (result) {
        handleState("title", "");
        handleState("content", "");
      }
    }
    setIsNamedFocused(false);
    handleCurrentColor("");
  };
  return (
    <div className={classes.flex}>
      <ClickAwayListener onClickAway={handleSubmit}>
        <div
          style={{
            backgroundColor: state.color ? state.color : "inherit",
            border: state.color ? "none" : "1px solid #5f6368",
          }}
          className={classes.root}
        >
          {state.photoURL && <img src={state.photoURL} alt="note" />}

          {!isNameFocused ? (
            <Typography
              onClick={() => {
                setIsNamedFocused(true);
              }}
            >
              {state.content}
            </Typography>
          ) : (
            <InputBase
              className={classes.input}
              placeholder="Title"
              inputProps={{ "aria-label": "naked" }}
              value={state.title}
              onChange={(e) => handleState("title", e.target.value)}
            />
          )}
          <div className={classes.note}>
            <InputBase
              autoFocus
              value={state.content}
              multiline
              placeholder="Take a note.."
              className={classes.input}
              onClick={() => setIsNamedFocused(true)}
              onChange={(e) => handleState("content", e.target.value)}
            />
            {!isNameFocused && <OtherNoteMethods />}
          </div>
          {isNameFocused && (
            <CardBottom
              item={false}
              colorCallback={handleCurrentColor}
              closeButton={
                <Button variant="text" onClick={handleSubmit} color="default">
                  Close
                </Button>
              }
            />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}
function OtherNoteMethods() {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Add list">
        <IconButton className={classes.icon}>
          <CheckBoxOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add drawing">
        <IconButton className={classes.icon}>
          <GestureOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Image">
        <IconButton className={classes.icon}>
          <ImageOutlined />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default AddNote;
