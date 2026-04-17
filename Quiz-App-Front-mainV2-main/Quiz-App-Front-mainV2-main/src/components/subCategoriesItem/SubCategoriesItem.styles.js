import { COLORS } from "../../styles/colors";

export const cardStyles = {
  width: 300,
  height: 320,
  position: "relative",
  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
  borderRadius: "16px",
  transition: "transform 0.2s",
  "&:hover": { transform: "scale(1.03)" },
};

export const cardMediaStyles = {
  width: "100%",
  height: 150,
  objectFit: "contain",
  bgcolor: COLORS.primary,
};

export const descriptionTextStyles = {
  color: "text.secondary",
  fontSize: "0.8rem",
  mt: -1,
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const cardActionsStyles = {
  justifyContent: "space-between",
  position: "absolute",
  bottom: 8,
  right: 8,
  left: 8,
};

export const adminButtonStyles = {
  bgcolor: COLORS.primary,
};

export const deleteButtonStyles = {
  borderRadius: "8px",
  color: "#a50c0cff",
  bgcolor: "#fde4e4ff",
  "&:hover": { bgcolor: "#e7e0e0ff", color: "#fd0505ff" },
};

export const studentButtonStyles = {
  bgcolor: "#ff9800",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": { bgcolor: "#d5921dff" },
};
