import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/authSlice";
import { COLORS } from "../../styles/colors";

export default function SidebarItem({ item, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(item.path);
  };

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={item.text === "Logout" ? "div" : NavLink}
        to={item.text !== "Logout" ? item.path : undefined}
        onClick={item.text === "Logout" ? handleLogout : undefined}
        {...(item.text !== "Logout" && { end: true })}
        sx={{
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          "&.active": {
            backgroundColor: COLORS.primary,
            color: COLORS.secondary,
          },
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: "center",
            mr: open ? 3 : "auto",
            minWidth: 0,
            color: "inherit",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
}
