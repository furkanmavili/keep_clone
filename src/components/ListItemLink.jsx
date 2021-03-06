import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {},

  listItemOpen: {
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    paddingLeft: theme.spacing(2),
  },
  listItemClose: {
    borderRadius: "53%",
    width: "48px",
    paddingLeft: 0,
    marginLeft: theme.spacing(2),
    transition: "all .3s ease",
  },
  icon: {
    paddingLeft: "12px",
  },
}));
function ListItemLink(props) {
  const { icon, primary, to, open } = props;
  const classes = useStyles();
  let match = useRouteMatch({
    path: to,
    exact: true,
  });
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem
      className={clsx(classes.root, {
        [classes.listItemOpen]: open,
        [classes.listItemClose]: !open,
      })}
      style={{ backgroundColor: match ? "#41331c" : "inherit" }}
      button
      component={renderLink}
      disableRipple
      disableTouchRipple
    >
      {icon ? (
        <ListItemIcon
          className={classes.icon}
          style={{ color: match ? "#e8eaed" : "rgba(255,255,255,.3)" }}
        >
          {icon}
        </ListItemIcon>
      ) : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
export default ListItemLink;
