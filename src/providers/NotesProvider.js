import React, { useState, createContext, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useAuth } from "../firebase/auth";
import { getNotesRef } from "../firebase/store";

export const NotesContext = createContext({ show: false });

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const ref = getNotesRef(user);
    if (!ref) return;
    const cancelSnapshot = ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["docID"] = doc.id;
        items.push(data);
      });
      setNotes(items);
    });
    return () => cancelSnapshot();
  }, [id, user]);

  const value = { notes };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export function useNotes() {
  return useContext(NotesContext);
}

export default NotesProvider;
