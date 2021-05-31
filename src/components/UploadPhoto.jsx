/* eslint-disable no-unused-vars */
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { addNote, storage, updateNote } from "../firebase/store";

const useStyles = makeStyles((theme) => ({
  smallIcon: {
    zIndex: 10,
    color: "#fff",
    opacity: 0.7,
    "& svg": {
      fontSize: 18,
    },
    "&:hover": {
      opacity: 0.87,
      backgroundColor: "rgba(154,160,166,0.157)",
    },
  },
  input: {
    display: "none",
  },
}));

const UploadPhoto = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [url, setURL] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (!file) return;
    const storageRef = storage.ref(props.docID);
    const unsubscribe = storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        if (props.docID) {
          updateNote(props.docID, { photoURL: url });
        } else {
          addNote({ photoURL: url });
        }
        unsubscribe();
      }
    );
  }, [file, props.docID]);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    const types = ["image/png", "image/jpeg"];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setError("Please select and image file (png or jpeg) ");
    }
  };
  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="icon-button-file">
        <Tooltip title="Upload image">
          <IconButton className={classes.smallIcon} aria-label="upload picture" component="span">
            <ImageOutlined />
          </IconButton>
        </Tooltip>
      </label>
    </>
  );
};

export default UploadPhoto;
