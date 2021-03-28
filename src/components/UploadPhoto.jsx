import { IconButton, makeStyles } from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";
import React, { forwardRef, useState } from "react";
import useStorage from "../hooks/useStorage";

const useStyles = makeStyles((theme) => ({
  smallIcon: {
    zIndex: 10,
    "& svg": {
      fontSize: 18,
    },
  },
  input: {
    display: "none",
  },
}));

const UploadPhoto = forwardRef((props, ref) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // const { url, progress } = useStorage(file, props.docID);
  const classes = useStyles();

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
  console.log(file,error)
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          ref={ref}
          className={classes.smallIcon}
          aria-label="upload picture"
          component="span"
        >
          <ImageOutlined />
        </IconButton>
      </label>
    </div>
  );
});

export default UploadPhoto;
