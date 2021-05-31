import React, { createContext, useContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
const Context = createContext();

const useStyles = makeStyles((theme) => ({
  snack: {
    background: theme.palette.grey["800"],
    color: theme.palette.text.primary,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
  },
}));
function RenderSnack({ id, message, open, handleClose, undoCallback }) {
  const messageId = `message-${id}`;
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": messageId,
        className: classes.snack,
      }}
      message={<span id={messageId}>{message}</span>}
      action={[
        <Button
          key="undo"
          color="primary"
          onClick={() => {
            handleClose();
            undoCallback();
          }}
        >
          UNDO
        </Button>,
        <IconButton
          size="small"
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

let uniqueId = 2;

const SnackProvider = ({ children }) => {
  const [{ current, queue }, setState] = useState({ current: null, queue: [] });
  function createSnack(message, options, undoCallback, open) {
    const id = uniqueId++;
    const snack = { id, message, open, options, undoCallback };

    if (current) {
      setState({ current, queue: queue.concat(snack) });
    } else {
      setState({ queue, current: snack });
    }

    return id;
  }

  function handleClose() {
    setState((currentState) => ({
      ...currentState,
      current: { ...currentState.current, open: false },
    }));
    // time to snack close animation
    setTimeout(openNext, 1000);
  }

  function openNext() {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) });
    } else {
      setState({ current: null, queue: [] });
    }
  }

  return (
    <Context.Provider value={{ createSnack }}>
      {current && (
        <RenderSnack
          key={current.id}
          {...current}
          handleClose={handleClose}
          undoCallback={current.undoCallback}
        />
      )}
      {children}
    </Context.Provider>
  );
};

export function useSnack() {
  return useContext(Context);
}
export default SnackProvider;
