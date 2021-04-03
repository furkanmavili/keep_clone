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
const routes = [
  {
    icon: <EmojiObjectsIcon />,
    text: "Notes",
    to: "/home",
  },
  {
    icon: <NotificationsNoneIcon />,
    text: "Reminders",
    to: "/reminders",
  },
  {
    icon: <CreateIcon />,
    text: "Edit Labels",
    to: "/edit",
  },
  {
    icon: <ArchiveOutlinedIcon />,
    text: "Archive",
    to: "/archive",
  },
  {
    icon: <DeleteOutlinedIcon />,
    text: "Trash",
    to: "/trash",
  },
];

export const routerRoutes = [
  {
    to: "/home",
    isPrivate: true,
    component: Home,
  },
  {
    to: "/reminders",
    isPrivate: true,
    component: Reminders,
  },
  {
    to: "/edit",
    isPrivate: true,
    component: Edit,
  },
  {
    to: "/archive",
    isPrivate: true,
    component: Archive,
  },
  {
    to: "/trash",
    isPrivate: true,
    component: Trash,
  },
  {
    to: "/search",
    isPrivate: true,
    component: Search,
  },
  {
    to: "/login",
    isPrivate: false,
    component: Login,
  },
];

export default routes;
