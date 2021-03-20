import { makeStyles } from "@material-ui/core";
import React from "react";
import Card from "../components/Card";
import data from "../mock";
import MasonryGrid from "../components/MasonryGrid";
const useStyles = makeStyles((theme) => ({}));

function Home() {
  const classes = useStyles();
  return (
    <MasonryGrid>
      {data.map((item, index) => {
        return (
          <Card
            style={{ marginBottom: "20px" }}
            key={item.id}
            title={item.title}
            content={item.content}
            color={item.color}
            image={item.image}
          />
        );
      })}
    </MasonryGrid>
  );
}

export default Home;
