import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { IconButton, Popper, Tooltip } from "@material-ui/core";

const colors = [
  "#442f19",
  "#5b2245",
  "#42275e",
  "#1e3a5f",
  "#16504b",
  "#345920",
  "#202124",
  "#614a19",
  "#635d19",
  "#5c2b29",
  "#3c3f43",
  "#2d555e",
];

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

function ColorPalette({ handleCurrentColor }) {
  const classes = useStyles();
  return (
    <div className={classes.circleWrapper}>
      {colors.map((item, index) => (
        <div
          key={index}
          onClick={() => handleCurrentColor(item)}
          className={classes.circle}
          style={{ backgroundColor: item }}
        ></div>
      ))}
    </div>
  );
}
function CardBottomButton({ label, placement, popper, icon, title }) {
  const classes = useStyles();
  const [anchorEl, setanchorEl] = React.useState(null);
  const handleColor = (event) => {
    setanchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? label : undefined;
  return (
    <>
      <Tooltip title={title}>
        <IconButton
          aria-describedby={id}
          onClick={handleColor}
          className={classes.smallIcon}
          aria-label="Color"
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={placement}>
        <div className={classes.paper}>{popper}</div>
      </Popper>
    </>
  );
}
function CardBottom({ handleCurrentColor }) {
  const classes = useStyles();

  return (
    <div className={classes.bottomMenu}>
      <CardBottomButton
        icon={<AddAlertOutlinedIcon />}
        popper={<h2>hello</h2>}
        label="color-popper"
        handleCurrentColor={handleCurrentColor}
        placement="bottom-start"
        title="Remind me"
      />

      <CardBottomButton
        icon={<PaletteOutlinedIcon />}
        popper={<ColorPalette handleCurrentColor={handleCurrentColor} />}
        label="color-popper"
        handleCurrentColor={handleCurrentColor}
        placement="top-start"
        title="Color"
      />
      <Tooltip title="Add Image">
        <IconButton className={classes.smallIcon} aria-label="Add Image">
          <ImageOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive">
        <IconButton className={classes.smallIcon} aria-label="Archive">
          <ArchiveOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="More">
        <IconButton className={classes.smallIcon} aria-label="More">
          <MoreVertOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default function CustomCard({ title, content, color, image }) {
  const classes = useStyles();
  const [showBottom, setShowBottom] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const handleCurrentColor = (c) => {
    setCurrentColor(c);
  };
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);
  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: currentColor ? currentColor : "inherit" }}
      onMouseEnter={() => setShowBottom(true)}
      onMouseLeave={() => setShowBottom(false)}
    >
      <CardActionArea disableRipple disableTouchRipple>
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
          <Typography gutterBottom variant="subtitle2" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ minHeight: 58 }}>
        {showBottom && <CardBottom handleCurrentColor={handleCurrentColor} />}
      </CardActions>
    </Card>
  );
}
