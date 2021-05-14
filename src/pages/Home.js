import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";
import { getNotesRef } from "../firebase/store";
import { useAuth } from "../firebase/auth";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router";
import ModalCard from "../components/ModalCard";

function Home() {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const ref = getNotesRef(user);
    if (id) {
      setShowModal(true);
    }
    if (!ref) return;
    const cancelSnapshot = ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["docID"] = doc.id;
        items.push(data);
      });
      const filtered = items.filter((i) => !i["isArchived"]);
      setNotes(filtered);
    });
    return () => cancelSnapshot();
  }, [id, user]);

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
      {id && <ModalCard open={showModal} />}
    </>
  );
}

function Spacer() {
  return <div style={{ marginTop: 60 }} />;
}

export default Home;
