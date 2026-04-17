import { COLORS } from "../../../styles/colors";

export const dialogPaper = {
  borderRadius: 3,
  p: 2,
};

export const iconWrapper = {
  bgcolor: COLORS.primary,
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 3,
  mb: 1,
  mt: 4,
};

export const iconStyle = {
  color: "#fff",
  fontSize: 32,
};

export const dialogTitle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 22,
  pb: 1,
};

export const contentBox = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
};

export const labelText = {
  fontWeight: 600,
};

export const valueText = {
  fontWeight: 400,
  color: COLORS.primary,
  fontSize: 16,
};

export const dividerStyle = {
  my: 1.5,
};

export const dialogActions = {
  justifyContent: "center",
  pb: 2,
};

export const cancelButton = {
  mr: 1,
  textTransform: "none",
  fontWeight: 500,
  fontSize: 15,
  color: COLORS.primary,
  border: `1px solid ${COLORS.primary}`,
  "&:hover": { bgcolor: "#f0f0f0" },
  px: 3,
};

export const startButton = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: 15,
  bgcolor: COLORS.primary,
  "&:hover": { bgcolor: "#1976d2" },
  px: 3,
};
