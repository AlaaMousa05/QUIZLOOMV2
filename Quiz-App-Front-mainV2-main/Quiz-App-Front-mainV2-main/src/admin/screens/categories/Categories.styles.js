
export const pageWrapper = {
  py: 3,
  px: { xs: 1, md: 2 },
};

export const titleStyle = {
  fontWeight: 700,
  mb: 3,
  color: "#1f2b5f",
  letterSpacing: "0.02em",
};

export const contentGrid = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "360px 1fr" },
  gap: 3,
  alignItems: "start",
};

export const formCard = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px rgba(17, 24, 39, 0.08)",
};

export const formActions = {
  display: "flex",
  gap: 1,
  mt: 2,
};

export const previewBox = {
  width: "100%",
  height: 170,
  borderRadius: 2,
  border: "1px dashed #b0bec5",
  bgcolor: "#f8fafc",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 2,
};

export const categoriesPanel = {
  borderRadius: 3,
  p: { xs: 1, md: 2 },
  border: "1px solid #e2e8f0",
  background:
    "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.95) 100%)",
};

export const panelHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const listWrapper = {
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
  justifyContent: { xs: "center", md: "flex-start" },
};

export const itemWrapper = {
  flex: "0 0 auto",
};
