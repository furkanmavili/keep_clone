import React from "react";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../constants/colors";
import { deleteNote } from "../firebase";
import UploadPhoto from "./UploadPhoto";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popper,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bottomMenu: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all .4s ease",
  },
  icons: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    maxWidth: 300,
    paddingLeft: theme.spacing(1),
  },
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
  paper: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  circleWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 120,
    gap: 2,
    zIndex: 9999,
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
      <Popper
        style={{ zIndex: 9999 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
      >
        {popper}
      </Popper>
    </>
  );
}

export default function CardBottom({ handleCurrentColor, item, closeButton }) {
  const classes = useStyles();

  return (
    <div className={classes.bottomMenu}>
      <div className={classes.icons}>
        {/* Reminder for card */}
        <CardBottomButton
          icon={<AddAlertOutlinedIcon />}
          popper={<h2>hello</h2>}
          label="color-popper"
          title="Remind me"
        />

        {/* Color picker for card */}
        <CardBottomButton
          icon={<PaletteOutlinedIcon />}
          popper={<ColorPalette handleCurrentColor={handleCurrentColor} />}
          label="color-popper"
          placement="top-start"
          title="Color"
        />

        {/* Image upload */}
        <Tooltip title="Add Image">
          <UploadPhoto docID={item ? item["docID"] : ""} />
        </Tooltip>

        {/* Archive note */}
        <Tooltip title="Archive">
          <IconButton className={classes.smallIcon} aria-label="Archive">
            <ArchiveOutlinedIcon />
          </IconButton>
        </Tooltip>

        {/* More options */}
        <CardBottomButton
          icon={<MoreVertOutlinedIcon />}
          popper={<MorePoppper item={item} />}
          label="more-popper"
          placement="bottom-start"
          title="More"
        />
      </div>

      {closeButton}
    </div>
  );
}

// Popper for Color Picking
function ColorPalette({ handleCurrentColor }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
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
    </div>
  );
}

const MorePopperStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%)",
    backgroundColor: "#202124",
    borderRadius: 4,
  },
}));

// Popper for more Options
function MorePoppper({ item }) {
  const classes = MorePopperStyles();
  const handleDelete = () => {
    deleteNote(item["docID"]);
  };

  return (
    <div className={classes.root}>
      <List dense component="nav" aria-label="More options">
        <ListItem button onClick={handleDelete}>
          <ListItemText primary="Delete Note" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Add label" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Add drawing" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Make a copy" />
        </ListItem>
      </List>
    </div>
  );
}
