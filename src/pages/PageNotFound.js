import { makeStyles } from "@material-ui/core";
import React from "react";
import NotFoundImage from "../assets/notfound.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
  },
  image: {
    maxWidth: 500,
  },
}));

function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.image} src={NotFoundImage} alt="Not found" />
    </div>
  );
}

export default PageNotFound;
