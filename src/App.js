import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DrawerProvider from "./providers/DrawerProvider";
import { BrowserRouter } from "react-router-dom";
import { dark } from "./theme";
import Layout from "./pages/Layout";
import { CssBaseline } from "@material-ui/core";
import { AuthProvider } from "./firebase/auth";
function App() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <CssBaseline />
        <ThemeProvider theme={dark}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ThemeProvider>
      </DrawerProvider>
    </AuthProvider>
  );
}

export default App;
