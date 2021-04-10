import React from "react";
import AddNote from "../components/AddNote";
import CardList from "../components/CardList";

function Home() {
  return (
    <>
      <AddNote />
      <CardList filterCallback={(i) => !i["isArchived"]} />
    </>
  );
}

export default Home;
