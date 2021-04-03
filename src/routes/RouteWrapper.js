import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export function RouteWrapper({
  component: Component,
  path,
  isPrivate,
  ...props
}) {
  const user = useContext(UserContext);
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && user === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
      {...props}
    />
  );
}
