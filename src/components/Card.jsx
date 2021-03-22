import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ModalCard from "./ModalCard";
import CardBottom from "./CardBottom";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    backgroundColor: "inherit",
    border: "1px solid #5f6368",
    transition: "all .3s ease",
  },

  bottomMenu: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallIcon: {
    zIndex: 10,
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
}));

export default function CustomCard({ item }) {
  const classes = useStyles();
  const [showBottom, setShowBottom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { title, content, color, image } = item;
  const [currentColor, setCurrentColor] = useState("");
  const handleCurrentColor = (c) => {
    setCurrentColor(c);
  };
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);
  return (
    <>
      <ModalCard
        item={item}
        open={showModal}
        setOpen={(value) => setShowModal(value)}
        currentColor={currentColor}
      />
      <Card
        className={classes.root}
        style={{ backgroundColor: currentColor ? currentColor : "inherit" }}
        onMouseEnter={() => setShowBottom(true)}
        onMouseLeave={() => setShowBottom(false)}
      >
        <CardActionArea
          onClick={() => setShowModal(true)}
          disableRipple
          disableTouchRipple
        >
          {image && (
            <CardMedia
              component="img"
              alt={title}
              height="140"
              image={image}
              title={title}
            />
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
        </CardActionArea>

        <CardActions style={{ minHeight: 58 }}>
          {showBottom && <CardBottom handleCurrentColor={handleCurrentColor} />}
        </CardActions>
      </Card>
    </>
  );
}