import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";
import { getNotesRef } from "../firebase/store";
import { useAuth } from "../firebase/auth";
import { Typography } from "@material-ui/core";

function Home() {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const ref = getNotesRef(user);
    if (ref) {
      const cancelSnapshot = ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data["docID"] = doc.id;
          items.push(data);
        });
        const filtered = items.filter((i) => !i["isArchived"]);
        setNotes(filtered);
        return () => cancelSnapshot();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <AddNote />
      {notes.filter((i) => i["isPinned"]).length > 0 ? (
        <>
          <Typography color="textSecondary" variant="caption">
            PINNED
          </Typography>
          <CardList notes={notes.filter((i) => i["isPinned"])} />
          <Spacer />
          <Typography color="textSecondary" variant="caption">
            OTHERS
          </Typography>
          <CardList notes={notes.filter((i) => !i["isPinned"])} />
        </>
      ) : (
        <CardList notes={notes} />
      )}
    </>
  );
}

function Spacer() {
  return <div style={{ marginTop: 60 }} />;
}

export default Home;
