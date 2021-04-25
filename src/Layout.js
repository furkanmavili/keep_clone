import { makeStyles } from "@material-ui/core";
import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { routerRoutes } from "./routes/";
import { RouteWrapper } from "./routes/RouteWrapper";
import CustomDrawer from "./components/CustomDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    color: "#e8eaed",
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

function Layout() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {routerRoutes.map((item, index) => {
              return (
                <RouteWrapper
                  path={item.to}
                  component={item.component}
                  isPrivate={item.isPrivate}
                  key={item.to}
                  exact
                />
              );
            })}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default Layout;
