import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardList from "../components/CardList";
import { deleteNote } from "../firebase/store";
import { useNotes } from "../providers/NotesProvider";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontStyle: "italic",
    textAlign: "center",
    marginRight: theme.spacing(2),
  },
  button: {
    fontWeight: "bold",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    height: "80%",
    textAlign: "center",
  },
  largeIcon: {
    width: 120,
    height: 120,
  },
}));

function Trash() {
  const { notes } = useNotes();
  const trashNotes = notes.filter((note) => note["isTrashed"]);
  const classes = useStyles();

  const handleEmptyTrash = () => {
    trashNotes.forEach((note) => {
      deleteNote(note.docID);
    });
  };
  return (
    <>
      <div className={classes.flex}>
        <Typography className={classes.title}>Notes in Trash are deleted after 7 days.</Typography>
        {trashNotes.length > 0 && (
          <Button
            onClick={handleEmptyTrash}
            className={classes.button}
            color="primary"
            variant="text"
          >
            Empty Trash
          </Button>
        )}
      </div>
      {trashNotes.length === 0 && (
        <div className={classes.root}>
          <div>
            <DeleteOutlineIcon color="disabled" className={classes.largeIcon} />
          </div>
          <Typography variant="h5" color="textSecondary">
            No notes in Trash
          </Typography>
        </div>
      )}

      <CardList notes={trashNotes} />
    </>
  );
}
export default Trash;
