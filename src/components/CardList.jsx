import Card from "../components/Card";
import MasonryGrid from "../components/MasonryGrid";
import React, { useContext, useEffect, useState } from "react";
import { getNotes } from "../firebase";
import { UserContext } from "../providers/UserProvider";

function CardList() {
  const [notes, setNotes] = useState([]);
  const user = useContext(UserContext);
  const ref = getNotes(user);

  useEffect(() => {
    if (!ref) return;
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["docID"] = doc.id;
        items.push(data);
      });
      setNotes(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
