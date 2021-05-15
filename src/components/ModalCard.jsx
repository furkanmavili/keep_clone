import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, InputBase, makeStyles, useTheme } from "@material-ui/core";
import CardBottom from "./CardBottom";
import { getSingleNote, updateNote } from "../firebase/store";
import { DeleteOutline } from "@material-ui/icons";
import { useParams, useHistory } from "react-router";

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
  edited: { color: "#9aa0a6", textAlign: "right", fontSize: "12px" },
}));

function calculateEdited(date) {
  const dif = new Date().getTime() - date.getTime();
  const dayDif = dif / (1000 * 3600 * 24);
  if (dayDif > 1) {
    return date.toLocaleString("en-En", { month: "long" }) + " " + date.getDate();
  }
  return date.getHours() + ":" + date.getMinutes();
}
export default function ModalCard({ open }) {
  const classes = useStyles();
  const theme = useTheme();
  const [note, setNote] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newColor, setNewColor] = useState("");
  const [showImageButton, setShowImageButton] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) return;
    const data = getSingleNote(id);
    data
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          setNote(docData);
          setNewTitle(docData.title);
          setNewContent(docData.content);
          setNewColor(docData.color);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  const handleImageButton = () => {
    updateNote(id, {
      photoURL: "",
    });
    setNote({...note, photoURL: ''})
  };
  const handleClose = () => {
    const {title, content, color} = note
    if (newTitle !== title || newContent !== content || newColor !== color) {
      updateNote(id, {
        title: newTitle,
        content: newContent,
        color: newColor,
      });
    } 
    history.push("/");
    
  };
  if (!note) {
    return <></>;
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.backdrop}
        PaperProps={{
          className: classes.root,
          style: {
            backgroundColor: newColor ? newColor : theme.palette.background.paper,
          },
          elevation: 5,
        }}
        scroll="paper"
      >
        {note.photoURL && (
          <div
            className={classes.imageWrapper}
            onMouseEnter={() => setShowImageButton(true)}
            onMouseLeave={() => setShowImageButton(false)}
          >
            <img style={{ width: "100%" }} src={note.photoURL} alt={note.title} />
            {showImageButton && (
              <IconButton onClick={handleImageButton} size="small" className={classes.imageButton}>
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
          {note.edited && (
            <div className={classes.edited}>
              Edited {calculateEdited(new Date(note.edited["seconds"] * 1000))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <CardBottom
            closeButton={
              <Button variant="text" onClick={handleClose} color="default">
                Close
              </Button>
            }
            handleCurrentColor={(c) => setNewColor(new Date(note.edited["seconds"] * 1000))}
            item={note}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
