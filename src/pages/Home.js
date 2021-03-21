import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Card from "../components/Card";
import data from "../mock";
import MasonryGrid from "../components/MasonryGrid";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({}));

function Home() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  console.log("home page", user);
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

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
