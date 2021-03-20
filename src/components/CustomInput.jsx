import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(241,243,244,0.24)",
    maxWidth: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    color: "#e8eaed",
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: "#e8eaed",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      {/* <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <CloseIcon />
      </IconButton> */}
    </Paper>
  );
}
