import React from "react";
import CardList from "../components/CardList";

function Archive() {
  return <CardList filterCallback={(i) => i["isArchived"]} />;
}
export default Archive;
