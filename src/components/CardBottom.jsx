import React from "react";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../constants/colors";
import { deleteNote, trashNote, updateNote } from "../firebase/store";
import UploadPhoto from "./UploadPhoto";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import {
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { useSnack } from "../providers/SnackProvider";

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
    marginLeft: theme.spacing(-1.5),
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

function ButtonWithPopper({ label, placement, popper, icon, title }) {
  const classes = useStyles();
  const [anchorEl, setanchorEl] = React.useState(null);
  const handleColor = (event) => {
    setanchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setanchorEl(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? label : undefined;
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
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
        </div>
      </ClickAwayListener>
    </>
  );
}

// item: note, closeButton:  showing close button, colorCallback: when color is selected on color palette
export default function CardBottom({ item, closeButton, colorCallback }) {
  const classes = useStyles();
  const handleArchive = () => {
    if (!item) return;
    updateNote(item["docID"], { isArchived: true });
  };
  const handleUnarchive = () => {
    updateNote(item["docID"], { isArchived: false });
  };

  const handleDeleteNote = () => {
    deleteNote(item["docID"]);
  };
  const handleRestore = () => {
    updateNote(item["docID"], { isTrashed: false });
  };

  // If note is trashed show restore & delete buttons
  if (item["isTrashed"]) {
    return (
      <div className={classes.bottomMenu}>
        <div className={classes.icons} style={{ justifyContent: "flex-start" }}>
          <Tooltip title="Delete Forever">
            <IconButton
              className={classes.smallIcon}
              aria-label="Delete forever"
              onClick={handleDeleteNote}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore">
            <IconButton className={classes.smallIcon} aria-label="Restore" onClick={handleRestore}>
              <RestoreFromTrashIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }

  // If note is not trashed show normal card bottom icons
  return (
    <div className={classes.bottomMenu}>
      <div className={classes.icons}>
        {/* Reminder for card */}
        <Tooltip title="Remind me">
          <IconButton className={classes.smallIcon} aria-label="Add reminder" onClick={() => {}}>
            <AddAlertOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Collaborator">
          <IconButton
            className={classes.smallIcon}
            aria-label="Add collaborator"
            onClick={() => {}}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
        {/* Color picker for card */}
        <ButtonWithPopper
          icon={<PaletteOutlinedIcon />}
          popper={<ColorPalette click={colorCallback} />}
          label="color-popper"
          placement="top-start"
          title="Color"
        />

        {/* Image upload */}
        {item && <UploadPhoto docID={item["docID"]} />}

        {/* Archive note */}
        {item["isArchived"] ? (
          <Tooltip title="Unarchive">
            <IconButton
              className={classes.smallIcon}
              aria-label="Unarchive"
              onClick={handleUnarchive}
            >
              <UnarchiveOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Archive">
            <IconButton className={classes.smallIcon} aria-label="Archive" onClick={handleArchive}>
              <ArchiveOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* More options */}
        <ButtonWithPopper
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
function ColorPalette({ click }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <div className={classes.circleWrapper}>
        {colors.map((i, index) => (
          <div
            key={index}
            onClick={() => click(i)}
            className={classes.circle}
            style={{ backgroundColor: i }}
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
    color: theme.palette.text.primary,
    borderRadius: 4,
  },
}));

// Popper for more Options
function MorePoppper({ item }) {
  const classes = MorePopperStyles();
  const { createSnack } = useSnack();

  const handleDelete = () => {
    trashNote(item["docID"]);
    createSnack("Note trashed", {}, undoNote, true);
  };

  const undoNote = () => {
    updateNote(item["docID"], item);
  };

  return (
    <>
      <div className={classes.root}>
        <List dense component="nav" aria-label="More options">
          {item && (
            <ListItem button onClick={handleDelete}>
              <ListItemText primary="Delete Note" />
            </ListItem>
          )}
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
    </>
  );
}
