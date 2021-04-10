import Card from "../components/Card";
import MasonryGrid from "../components/MasonryGrid";
import React, { useContext, useEffect, useState } from "react";
import { getNotes } from "../firebase";
import { UserContext } from "../providers/UserProvider";

function CardList({ filterCallback }) {
  const [notes, setNotes] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    const ref = getNotes(user);
    if (ref) {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data["docID"] = doc.id;
          items.push(data);
        });
        const filtered = items.filter(filterCallback);
        setNotes(filtered);
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
