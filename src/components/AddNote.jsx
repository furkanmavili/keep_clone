import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import {
  Button,
  ClickAwayListener,
  IconButton,
  InputBase,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { addNote } from "../firebase";
import {
  AddAlertOutlined,
  ArchiveOutlined,
  ImageOutlined,
  MoreVertOutlined,
  PaletteOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #5f6368",
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    transition: "all .3s ease",
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
}));

function AddNote({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const classes = useStyles();

  const handleCurrentColor = (c) => {
    setCurrentColor(c);
  };
  const handleSubmit = () => {
    if (title || content) {
      const result = addNote(title, content, currentColor, user.uid);
      if (result) {
        setIsNamedFocused(false);
        setTitle("");
        setContent("");
        setCurrentColor("");
      }
    }
  };
  return (
    <div className={classes.flex}>
      <ClickAwayListener onClickAway={handleSubmit}>
        <div
          style={{ backgroundColor: currentColor ? currentColor : "inherit" }}
          className={classes.root}
          onClick={() => setIsNamedFocused(true)}
        >
          {!isNameFocused ? (
            <Typography
              onClick={() => {
                setIsNamedFocused(true);
              }}
            >
              {content}
            </Typography>
          ) : (
            <InputBase
              className={classes.margin}
              placeholder="Title"
              inputProps={{ "aria-label": "naked" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <InputBase
            autoFocus
            value={content}
            multiline
            placeholder="Take a note.."
            style={{ display: "block" }}
            onChange={(e) => setContent(e.target.value)}
          />
          {isNameFocused && (
            <CardBottom handleCurrentColor={handleCurrentColor} />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}

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
function CardBottom({ handleCurrentColor }) {
  const classes = useStyles();

  return (
    <div className={classes.bottomMenu}>
      <CardBottomButton
        icon={<AddAlertOutlined />}
        popper={<h2>hello</h2>}
        label="color-popper"
        handleCurrentColor={handleCurrentColor}
        placement="bottom-start"
        title="Remind me"
      />

      <CardBottomButton
        icon={<PaletteOutlined />}
        popper={<ColorPalette handleCurrentColor={handleCurrentColor} />}
        label="color-popper"
        handleCurrentColor={handleCurrentColor}
        placement="top-start"
        title="Color"
      />
      <Tooltip title="Add Image">
        <IconButton className={classes.smallIcon} aria-label="Add Image">
          <ImageOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive">
        <IconButton className={classes.smallIcon} aria-label="Archive">
          <ArchiveOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="More">
        <IconButton className={classes.smallIcon} aria-label="More">
          <MoreVertOutlined />
        </IconButton>
      </Tooltip>
      <Button>Create Note</Button>
    </div>
  );
}
function CardBottomButton({ label, placement, popper, icon, title }) {
  const classes = useStyles();
  const [anchorEl, setanchorEl] = useState(null);
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

export default AddNote;
