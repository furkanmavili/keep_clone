import React from "react";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    height: "80%",
    textAlign: "center",
  },
  largeIcon: {
    width: 120,
    height: 120,
  },
}));

function Reminders() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <NotificationsNoneOutlinedIcon color="disabled" className={classes.largeIcon} />
      </div>
      <Typography variant="h5" color="textSecondary">
        Notes with upcoming reminders appear here
      </Typography>
    </div>
  );
}

export default Reminders;
