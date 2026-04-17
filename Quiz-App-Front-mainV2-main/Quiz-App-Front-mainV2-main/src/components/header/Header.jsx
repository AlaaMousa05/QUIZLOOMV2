import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { COLORS } from "../../styles/colors";
import { HeaderStyles } from "./HeaderStyles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header({ open, handleDrawerOpen }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <HeaderStyles
      position="fixed"
      open={open}
      sx={{
        backgroundColor: COLORS.primary,
        color: COLORS.secondary,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <AutoStoriesIcon sx={{ fontSize: 32 }} />
            QuizLoom
          </Typography>
        </Box>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
            <PersonIcon />
            <Typography variant="body1">Hi {user.username}</Typography>
          </Box>
        )}
      </Toolbar>
    </HeaderStyles>
  );
}
