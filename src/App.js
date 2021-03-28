import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Login from "./pages/Login";
import UserProvider from "./providers/UserProvider";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiCssBaseline: {
            "@global": {
              "*": {
                "scrollbar-width": "thin",
              },
              "*::-webkit-scrollbar": {
                width: "12px",
              },
              "::-webkit-scrollbar": {
                height: "16px",
                overflow: "visible",
                width: "16px",
              },
              "::-webkit-scrollbar-button": {
                height: 0,
                width: 0,
              },
              "body::-webkit-scrollbar-corner": {
                backgroundClip: "padding-box",
                backgroundColor: " #202124",
                border: "solid #5f6368",
                borderWidth: "3px 0 0 3px",
                webkitBoxShadow: "inset 1px 1px 0 rgb(0 0 0 / 14%)",
                boxShadow: " inset 1px 1px 0 rgb(0 0 0 / 14%)",
              },
              "::-webkit-scrollbar-corner": {
                background: "transparent",
              },
              "body::-webkit-scrollbar-thumb": {
                borderWidth: "1px 1px 1px 2px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,.3)",
                backgroundClip: "padding-box",
                border: "solid transparent",
                borderWidth: "1px 1px 1px 6px",
                minHeight: 28,
                padding: "100px 0 0",
                boxShadow:
                  "inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)",
              },
              "::-webkit-scrollbar-track": {
                backgroundClip: "padding-box",
                border: "solid transparent",
                borderWidth: " 0 0 0 4px",
              },
              "body::-webkit-scrollbar-track-piece": {
                borderWidth: 0,
              },
            },
          },
        },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
