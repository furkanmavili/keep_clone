import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CreateIcon from "@material-ui/icons/Create";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Reminders from "../pages/Reminders";
import Archive from "../pages/Archive";
import Trash from "../pages/Trash";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
const routes = {
  home: {
    icon: <EmojiObjectsIcon />,
    text: "Notes",
    to: "/home",
    component: Home,
  },
  reminders: {
    icon: <NotificationsNoneIcon />,
    text: "Reminders",
    to: "/reminders",
    component: Reminders,
  },
  edit: {
    icon: <CreateIcon />,
    text: "Edit Labels",
    to: "/edit",
    component: Edit,
  },
  archive: {
    icon: <ArchiveOutlinedIcon />,
    text: "Archive",
    to: "/archive",
    component: Archive,
  },
  trash: {
    icon: <DeleteOutlinedIcon />,
    text: "Trash",
    to: "/trash",
    component: Trash,
  },
  login: {
    icon: <> </>,
    text: "Login",
    to: "/login",
    component: Login,
  },
  search: {
    icon: <>Search</>,
    text: "Search",
    to: "/search",
    component: Search,
  },
};

export default routes;
