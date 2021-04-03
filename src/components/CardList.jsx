import Card from "../components/Card";
import MasonryGrid from "../components/MasonryGrid";
import React, { useEffect, useState } from "react";
import { getNotes } from "../firebase";

function CardList({ user }) {
  const [notes, setNotes] = useState([]);
  const ref = getNotes(user);
  useEffect(() => {
    if (ref) {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data["docID"] = doc.id;
          items.push(data);
        });
        setNotes(items);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
