import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, InputBase, makeStyles } from "@material-ui/core";
import CardBottom from "./CardBottom";
import { updateNote } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #5f6368",
    borderRadius: theme.shape.borderRadius,
    transition: "all .3s ease",
    width: 600,
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },

  bottomMenu: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginLeft: -10,
    justifyContent: "space-between",
  },
  smallIcon: {
    "& svg": {
      fontSize: 18,
    },
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#202124",
    borderRadius: theme.shape.borderRadius,
  },
  circleWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 120,
    gap: 2,
  },
  circle: {
    cursor: "pointer",
    width: 25,
    height: 25,
    borderRadius: "50%",
    transition: "all 500ms ease",
    "&:hover": {
      border: "1px solid #fff",
    },
  },
  titleInput: {
    fontSize: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  imageButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
}));

export default function ModalCard({ open, setOpen, item, currentColor }) {
  const { title, content, photoURL } = item;
  const classes = useStyles();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newColor, setNewColor] = useState("");
  const [showImageButton, setShowImageButton] = useState(false);
  const user = useContext(UserContext);
  useEffect(() => {
    setNewTitle(title);
    setNewContent(content);
    setNewColor(currentColor);
  }, [title, content, currentColor]);

  const handleImageButton = () => {
    updateNote(item["docID"], {
      photoURL: "",
    });
  };
  const handleClose = () => {
    console.log("iam working..");
    if (
      title !== newTitle ||
      content !== newContent ||
      currentColor !== newColor
    ) {
      updateNote(item["docID"], {
        title: newTitle,
        content: newContent,
        color: newColor,
        owner: user.uid,
      });
    }
    setOpen(false);
  };
  const handleSubmit = () => {};
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.backdrop}
        PaperProps={{
          className: classes.root,
          style: { backgroundColor: newColor ? newColor : "#202124" },
          elevation: 5,
        }}
        scroll="paper"
      >
        {photoURL && (
          <div
            className={classes.imageWrapper}
            onMouseEnter={() => setShowImageButton(true)}
            onMouseLeave={() => setShowImageButton(false)}
          >
            <img style={{ width: "100%" }} src={photoURL} alt={title} />
            {showImageButton && (
              <IconButton
                onClick={handleImageButton}
                size="small"
                className={classes.imageButton}
              >
                <DeleteOutline />
              </IconButton>
            )}
          </div>
        )}
        <DialogTitle id="form-dialog-title">
          <InputBase
            autoFocus
            margin="dense"
            id="newTitle"
            label="Title"
            placeholder="Title"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={classes.titleInput}
          />
        </DialogTitle>
        <DialogContent>
          <InputBase
            autoFocus
            multiline
            margin="dense"
            id="newContent"
            label="Content"
            placeholder="Note"
            type="text"
            fullWidth
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <CardBottom
            closeButton={
              <Button variant="text" onClick={handleSubmit} color="default">
                Cancel
              </Button>
            }
            handleCurrentColor={(c) => setNewColor(c)}
            item={item}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
