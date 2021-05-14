import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CustomDrawer from "../components/Sidebar";
import Header from "../components/Header";
import routes from "../routes/index";
import { useAuth } from "../firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    color: "#e8eaed",
    backgroundColor: theme.palette.background.default,
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
    padding: theme.spacing(3, 3, 3, 10),
    minHeight: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

const NormalRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const { user } = useAuth();
  if (!user) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <div className={classes.root}>
            <Header />
            <CustomDrawer />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Component {...props} />
            </main>
          </div>
        ) : (
          <div className={classes.root}></div>
        )
      }
    />
  );
};

function Layout() {
  return (
    <Switch>
      <ProtectedRoute exact path="/home/:id" component={routes.home.component} />
      <ProtectedRoute exact path={routes.home.to} component={routes.home.component} />
      <ProtectedRoute exact path={routes.reminders.to} component={routes.reminders.component} />
      <ProtectedRoute exact path={routes.edit.to} component={routes.edit.component} />
      <ProtectedRoute exact path={routes.archive.to} component={routes.archive.component} />
      <ProtectedRoute exact path={routes.trash.to} component={routes.trash.component} />
      <ProtectedRoute exact path={routes.search.to} component={routes.search.component} />
      <NormalRoute exact path={routes.login.to} component={routes.login.component} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default Layout;
