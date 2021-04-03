import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
export const UserContext = createContext({ user: null });
const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setuser({
          displayName,
          email,
          photoURL,
          uid,
        });
        return;
      }
      setuser(false);
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
