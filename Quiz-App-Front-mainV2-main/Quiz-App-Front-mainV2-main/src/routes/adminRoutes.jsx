import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import LogoutIcon from "@mui/icons-material/Logout";
export const ADMIN_MENU_ITEMS = [
  { text: "DashBoard", icon: <HomeIcon />, path: "/admin" },
  { text: "Category", icon: <CategoryIcon />, path: "/admin/categories" },
  { text: "Students", icon: <SchoolIcon />, path: "/admin/students" },
  { text: "Add Quiz", icon: <SaveAsIcon />, path: "/admin/addQuiz" },
  { text: "Logout", icon: <LogoutIcon />, path: "/" },
];
