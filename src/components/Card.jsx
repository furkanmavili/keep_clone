import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardBottom from "./CardBottom";
import { updateNote } from "../firebase/store";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    backgroundColor: "inherit",
    transition: "all .3s ease",
    position: "relative",
  },
  bottomMenu: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallIcon: {
    zIndex: 10,
    padding: 4,
    "& svg": {
      fontSize: 18,
    },
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
  pinIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    marginLeft: 10,
  },
}));

export default function CustomCard({ item, setShowModal }) {
  const classes = useStyles();
  const [showBottom, setShowBottom] = useState(false);
  const { title, content, color, photoURL, isPinned, docID } = item;
  const history = useHistory();
  const handlePin = () => {
    updateNote(docID, { isPinned: true });
  };
  const handleUnpin = () => {
    updateNote(docID, { isPinned: false });
  };
  return (
    <>
      <Card
        className={classes.root}
        style={{
          backgroundColor: color ? color : "inherit",
          border: color ? "none" : "1px solid #5f6368",
        }}
        onMouseEnter={() => setShowBottom(true)}
        onMouseLeave={() => setShowBottom(false)}
      >
        <div className={classes.pinIcon}>
          {isPinned ? (
            <Tooltip title="Unpin note">
              <IconButton onClick={handleUnpin} className={classes.smallIcon}>
                <BookmarkOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Pin note">
              <IconButton onClick={handlePin} className={classes.smallIcon}>
                <BookmarkBorderOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div onClick={() => history.push("/home/" + docID)}>
          {photoURL && (
            <CardMedia component="img" alt={title} height="140" image={photoURL} title={title} />
          )}
          <CardContent>
            {title && (
              <Typography gutterBottom variant="subtitle2" component="h2">
                {title}
              </Typography>
            )}
            {content && (
              <Typography
                style={{ wordBreak: "break-all" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {content}
              </Typography>
            )}
          </CardContent>
        </div>

        <CardActions style={{ minHeight: 58 }}>
          {showBottom && (
            <CardBottom item={item} colorCallback={(i) => updateNote(docID, { color: i })} />
          )}
        </CardActions>
      </Card>
    </>
  );
}
