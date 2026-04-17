import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import { Drawer, DrawerHeader } from "./DrawerStyles";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ open, handleDrawerClose, links }) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        {links.map((item) => (
          <SidebarItem key={item.text} item={item} open={open} />
        ))}
      </List>

      <Divider />
    </Drawer>
  );
}
