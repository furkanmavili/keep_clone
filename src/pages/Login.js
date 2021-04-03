import React, { useEffect, useContext } from "react";
import { signInWithGoogle } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
  const user = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user, history]);

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
