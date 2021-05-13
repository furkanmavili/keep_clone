import React, { useState, createContext } from "react";
export const DrawerContext = createContext({ show: false });
const DrawerProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleDrawerOpen = () => {
    setShow(true);
  };
  const handleDrawerClose = () => {
    setShow(false);
  };
  const value = { show, handleDrawerOpen, handleDrawerClose };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};
export default DrawerProvider;
