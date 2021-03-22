import React from "react";

import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { IconButton, Popper, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../constants/colors";
const useStyles = makeStyles((theme) => ({
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
      <Popper
        style={{ zIndex: 9999 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
      >
        <div className={classes.paper}>{popper}</div>
      </Popper>
    </>
  );
}

export default function CardBottom({ handleCurrentColor, closeButton }) {
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
      {closeButton}
    </div>
  );
}
