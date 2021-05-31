import React from "react";
import CardList from "../components/CardList";
import { useNotes } from "../providers/NotesProvider";
import { makeStyles, Typography } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
const useStyles = makeStyles((theme) => ({
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
function Archive() {
  const { notes } = useNotes();
  const archivedNotes = notes.filter((note) => note["isArchived"] && !note["isTrashed"]);
  const classes = useStyles();
  if (notes.length === 0) {
    return (
      <div className={classes.root}>
        <div>
          <ArchiveOutlinedIcon color="disabled" className={classes.largeIcon} />
        </div>
        <Typography variant="h5" color="textSecondary">
          Your archived notes appear here
        </Typography>
      </div>
    );
  }

  return <CardList notes={archivedNotes} />;
}
export default Archive;
