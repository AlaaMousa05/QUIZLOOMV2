import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";

export const STUDENT_MENU_ITEMS = [
  
  { text: "Profile", icon: <PersonIcon />, path: "/student/profile" },
  { text: "Category", icon: <CategoryIcon />, path: "/student" },  
  { text: "Quiz History", icon: <HistoryIcon />, path: "/student/history" },
  { text: "Logout", icon: <LogoutIcon />, path: "/" },


];