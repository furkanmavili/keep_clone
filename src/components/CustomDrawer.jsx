import React, { useContext, useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemLink from "./ListItemLink";
import routes from "../routes/";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CustomInput from "./CustomInput";
import { Tooltip } from "@material-ui/core";
import CustomAvatar from "./CustomAvatar";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { UserContext } from "../providers/UserProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    color: "#e8eaed",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    borderBottom: "1px solid rgba(255,255,255,.3)",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
  },
  logo: {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
    minWidth: "220px",
    color: theme.palette.text.primary,
  },
  input: {
    flex: 1,
    paddingRight: 50,
  },
  iconGroup: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
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
    paddingLeft: 10,
  },
  drawerClose: {
    paddingLeft: 10,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CustomDrawer() {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Keeb
            </Typography>
          </div>
          <div className={classes.input}>
            <CustomInput />
          </div>
          <div className={classes.iconGroup}>
            <Tooltip title="Refresh" arrow>
              <IconButton aria-label="refresh">
                <RefreshOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="List View" arrow>
              <IconButton aria-label="list">
                <ViewAgendaOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings" arrow>
              <IconButton aria-label="settings">
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          {user && <CustomAvatar user={user} />}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        elevation={16}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
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
        <List>
          {routes.map((item, index) => (
            <ListItemLink
              key={index}
              icon={item.icon}
              primary={item.text}
              to={item.to}
              open={open}
            />
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default CustomDrawer;
