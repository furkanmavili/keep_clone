import React, { useContext } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemLink from "./ListItemLink";
import routes from "../routes/index";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { DrawerContext } from "../providers/DrawerProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    borderRight: "none",
    boxShadow:
      "inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    borderRight: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8),
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    marginTop: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  list: {
    overflowX: "hidden",
  },
  listClose: {
    paddingLeft: theme.spacing(2),
  },
}));

function CustomDrawer() {
  const theme = useTheme();
  const classes = useStyles();
  const { show, handleDrawerOpen, handleDrawerClose } =
    useContext(DrawerContext);

  return (
    <Drawer
      variant="permanent"
      elevation={16}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: show,
        [classes.drawerClose]: !show,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: show,
          [classes.drawerClose]: !show,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        <ListItemLink
          icon={routes.home.icon}
          primary={routes.home.text}
          to={routes.home.to}
          open={show}
        />
        <ListItemLink
          icon={routes.reminders.icon}
          primary={routes.reminders.text}
          to={routes.reminders.to}
          open={show}
        />
        <ListItemLink
          icon={routes.edit.icon}
          primary={routes.edit.text}
          to={routes.edit.to}
          open={show}
        />
        <ListItemLink
          icon={routes.archive.icon}
          primary={routes.archive.text}
          to={routes.archive.to}
          open={show}
        />
        <ListItemLink
          icon={routes.trash.icon}
          primary={routes.trash.text}
          to={routes.trash.to}
          open={show}
        />
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
