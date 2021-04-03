import React, { useContext } from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";
import { UserContext } from "../providers/UserProvider";

function Home() {
  const user = useContext(UserContext);
  return (
    <>
      <AddNote />
      <CardList user={user} />
    </>
  );
}

export default Home;
