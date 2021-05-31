import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router";
import ModalCard from "../components/ModalCard";
import { useNotes } from "../providers/NotesProvider";

export default function Home() {
  const { notes } = useNotes();
  const filteredNotes = notes.filter((note) => !note["isArchived"] && !note["isTrashed"]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (id) {
      setShowModal(true);
    }
  }, [id]);

  return (
    <>
      <AddNote />
      {filteredNotes.filter((i) => i["isPinned"]).length > 0 ? (
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
        <CardList notes={filteredNotes} />
      )}
      {id && <ModalCard open={showModal} />}
    </>
  );
}

function Spacer() {
  return <div style={{ marginTop: 60 }} />;
}
