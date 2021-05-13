import { AppBar, IconButton, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CustomInput from "./CustomInput";
import CustomAvatar from "./CustomAvatar";
import { DrawerContext } from "../providers/DrawerProvider";
import { useAuth } from "../firebase/auth";
import Logo from "../assets/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    marginRight: theme.spacing(2),
  },
  logo: {
    marginRight: theme.spacing(4),
    paddingLeft: theme.spacing(1.2),
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    marginTop: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function Header() {
  const classes = useStyles();
  const { user } = useAuth();
  const { show, handleDrawerOpen, handleDrawerClose } = useContext(DrawerContext);
  return (
    <AppBar
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: false,
      })}
    >
      <Toolbar>
        <div className={classes.logo}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={show ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="logo" width={40} height={40} />
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
        {user && <CustomAvatar />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
