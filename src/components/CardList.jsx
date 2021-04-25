import Card from "../components/Card";
import MasonryGrid from "../components/MasonryGrid";
import React from "react";

function CardList({ notes }) {
  return (
    <MasonryGrid>
      {notes.map((item, index) => {
        return (
          <Card style={{ marginBottom: "20px" }} key={index} item={item} />
        );
      })}
    </MasonryGrid>
  );
}

export default CardList;
