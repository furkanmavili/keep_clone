import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
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
    flex: 1,
    color: "inherit",
  },
  focusedInput: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  iconButton: {
    padding: 10,
    color: "inherit",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const handleFocus = () => {
    setInputFocused(true);
    history.push("/search");
  };
  const handleClose = () => {
    history.push("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(location.pathname + "?text=" + inputValue);
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className={clsx(classes.root, {
        [classes.focusedInput]: inputFocused,
      })}
      onFocus={handleFocus}
      onBlur={() => setInputFocused(false)}
    >
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <IconButton onClick={handleClose} className={classes.iconButton} aria-label="search">
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}
