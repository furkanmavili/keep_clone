import Card from "../components/Card";
import MasonryGrid from "../components/MasonryGrid";
import React from "react";

function CardList({ notes, setShowModal }) {
  return (
    <MasonryGrid>
      {notes.map((item, index) => {
        return (
          <Card
            style={{ marginBottom: "20px" }}
            key={index}
            item={item}
            setShowModal={setShowModal}
          />
        );
      })}
    </MasonryGrid>
  );
}

export default CardList;
