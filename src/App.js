import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import UserProvider from "./providers/UserProvider";
import { dark } from "./theme";
import Layout from "./Layout";
function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={dark}>
        <Layout />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
