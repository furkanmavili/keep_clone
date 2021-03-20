import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CreateIcon from "@material-ui/icons/Create";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
const routes = [
  {
    icon: <EmojiObjectsIcon />,
    text: "Notes",
    to: "/",
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

export default routes;
