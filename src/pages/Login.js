import React, { useEffect, useContext } from "react";
import { signInWithGoogle } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";
export default function Login() {
  const user = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={signInWithGoogle}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Continue with Google</span>
      </button>
    </div>
  );
}
