import { makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CardList from "../components/CardList";
import { useNotes } from "../providers/NotesProvider";
import LinkIcon from "@material-ui/icons/Link";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import BookIcon from "@material-ui/icons/Book";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import HeadsetIcon from "@material-ui/icons/Headset";
import LocationOnIcon from "@material-ui/icons/LocationOn";
const getQueryParams = () =>
  window.location.search
    .replace("?", "")
    .split("&")
    .reduce((r, e) => ((r[e.split("=")[0]] = decodeURIComponent(e.split("=")[1])), r), {});

const validQueryParams = {
  color: ["color"],
  text: ["title", "content"],
  url: ["title", "content"],
  category: ["title", "content"],
};

function Search() {
  const { notes } = useNotes();
  const params = getQueryParams();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  console.log(history);
  useEffect(() => {
    if (notes.length === 0) return;
    const results = [];

    Object.keys(params).forEach((param) =>
      results.push(Object.keys(validQueryParams).includes(param))
    );
    if (results.includes(false)) {
      setFilteredNotes([]);
      return;
    }
    const filtered = notes.filter((note) => {
      const appliedQueries = [];
      if (params["color"]) {
        appliedQueries.push(note["color"].substring(1) === params["color"]);
      }
      if (params["text"]) {
        appliedQueries.push(
          note["title"].includes(params["text"]) || note["content"].includes(params["text"])
        );
      }
      return appliedQueries.includes(false) ? false : true;
    });
    setFilteredNotes(filtered);
  }, [notes, history.location]);
  console.log(filteredNotes);

  if (filteredNotes.length > 0) return <CardList notes={filteredNotes} />;
  return (
    <div className={classes.root}>
      <div>
        <Types />
        <Things />
        <Colors />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.palette.background.dark,
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 1px 3px 1px rgb(0 0 0 / 30%)",
    padding: theme.spacing(1, 0),
    maxWidth: 640,
  },
  cardHeader: {
    padding: theme.spacing(0, 1, 1, 1),
  },
  typesBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    padding: theme.spacing(7),
    cursor: "pointer",
    flexBasis: "100%",
    [theme.breakpoints.up("sm")]: {
      flexBasis: "23%",
      maxWidth: "25%",
    },
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(0.5),
  },
}));

function Card({ children, title }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <Typography variant="body2">{title}</Typography>
      </div>
      {children}
    </div>
  );
}
function CardBox({ icon, title, bgColor }) {
  const classes = useStyles();
  return (
    <div className={classes.typesBox} style={{ backgroundColor: bgColor }}>
      {icon}
      <Typography variant="subtitle2">{title}</Typography>
    </div>
  );
}
function Types() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card title="Types">
      <div className={classes.flex}>
        <CardBox icon={<LinkIcon />} title="URL's" bgColor={theme.palette.primary.main} />
        <CardBox
          icon={<NotificationsNoneOutlinedIcon />}
          title="Reminders"
          bgColor={theme.palette.primary.main}
        />
      </div>
    </Card>
  );
}

function Things() {
  const classes = useStyles();
  return (
    <Card title="Things">
      <div className={classes.flex}>
        <CardBox icon={<BookIcon color="primary" />} title="Books" bgColor="#3d4043" />
        <CardBox icon={<RestaurantIcon color="primary" />} title="Food" bgColor="#3d4043" />
        <CardBox icon={<HeadsetIcon color="primary" />} title="Music" bgColor="#3d4043" />
        <CardBox icon={<LocationOnIcon color="primary" />} title="Places" bgColor="#3d4043" />
      </div>
    </Card>
  );
}

function Colors() {
  return <Card title="Colors"></Card>;
}

export default Search;
