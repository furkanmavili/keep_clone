import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DrawerProvider from "./providers/DrawerProvider";
import { BrowserRouter } from "react-router-dom";
import { dark } from "./theme";
import Layout from "./pages/Layout";
import { CssBaseline } from "@material-ui/core";
import { useAuth } from "./firebase/auth";
import { cleanDeletedNotes } from "./firebase/store";
function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      cleanDeletedNotes();
    }
  }, [user]);

  return (
    <DrawerProvider>
      <CssBaseline />
      <ThemeProvider theme={dark}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </DrawerProvider>
  );
}

export default App;
