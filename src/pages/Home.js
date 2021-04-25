import React, { useContext, useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";
import { getNotes } from "../firebase";
import { UserContext } from "../providers/UserProvider";

function Home() {
  const [notes, setNotes] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    if (!user) return;
    const ref = getNotes(user);
    if (ref) {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data["docID"] = doc.id;
          items.push(data);
        });
        const filtered = items.filter((i) => !i["isArchived"]);
        setNotes(filtered);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <AddNote />
      {notes.filter((i) => i["isPinned"]).length > 0 ? (
        <>
          <h1>pinned:</h1>
          <CardList notes={notes.filter((i) => i["isPinned"])} />

          <h1>Others</h1>
          <CardList notes={notes.filter((i) => !i["isPinned"])} />
        </>
      ) : (
        <CardList notes={notes} />
      )}
    </>
  );
}

export default Home;
