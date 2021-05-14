import React, { useEffect } from "react";
import { signInWithGoogle } from "../firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
    color: "#fff",
    backgroundColor: "#4285f4",
    border: "1px solid #4285f4",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 25%)",
    outline: "none",
    cursor: "pointer",
  },
  icon: {
    backgroundColor: "#fff",
  },
  text: {
    padding: "0 20px",
  },
  page: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Login() {
  const { user } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  let location = useLocation();
  console.log(location);
  let { from } = location.state || { from: { pathname: "/" } };
  useEffect(() => {
    if (user) {
      history.replace(from);
    }
  }, [user, history, from]);

  return (
    <div className={classes.page}>
      <button className={classes.root} onClick={signInWithGoogle}>
        <img
          className={classes.icon}
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="google icon"
        />
        <span className={classes.text}> Continue with Google</span>
      </button>
    </div>
  );
}
