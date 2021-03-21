import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { Avatar } from "@material-ui/core";
import { logOut } from "../firebase";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2, 2, 2),
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    backgroundColor: "inherit",
    outline: "none",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
  },
}));

export default function CustomAvatar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  return (
    <div>
      <button
        className={classes.button}
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <Avatar>H</Avatar>
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>
              <button onClick={logOut}>Logout</button>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
