import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { Avatar, Button, Divider, Typography } from "@material-ui/core";
import { logOut } from "../firebase";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.dark,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  popperTop: {
    padding: theme.spacing(3, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    backgroundColor: "inherit",
    outline: "none",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  bigAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  roundedButton: {
    border: "1px solid #5f6368",
    borderRadius: "100px",
    padding: theme.spacing(0.5, 2),
    marginTop: theme.spacing(2),
  },
  logout: {
    display: "block",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(0.3, 2),
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
}));

export default function CustomAvatar({ user }) {
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
        <Avatar className={classes.avatar} src={user.photoURL}>
          H
        </Avatar>
      </button>
      <Popper
        style={{ zIndex: 1202 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <div className={classes.paper}>
              <div className={classes.popperTop}>
                <Avatar className={classes.bigAvatar} src={user.photoURL}>
                  H
                </Avatar>
                <Typography>{user.displayName}</Typography>
                <Typography variant="subtitle2">{user.email}</Typography>
                <Button
                  target="_blank"
                  href="https://myaccount.google.com/"
                  size="small"
                  className={classes.roundedButton}
                >
                  Manage your Google Account
                </Button>
              </div>
              <Divider />
              <Button
                variant="outlined"
                className={classes.logout}
                onClick={logOut}
              >
                Logout
              </Button>
              <Divider />
              <div className={classes.footer}>
                <Button variant="text" size="small">
                  Privacy Policy
                </Button>
                <Button variant="text" size="small">
                  Terms of Service
                </Button>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
