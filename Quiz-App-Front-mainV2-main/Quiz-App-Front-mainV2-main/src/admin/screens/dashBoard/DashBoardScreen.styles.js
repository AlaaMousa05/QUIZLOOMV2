export const dashboardRoot = {
  minHeight: "calc(100vh - 120px)",
  p: { xs: 1, md: 2 },
  borderRadius: 3,
  background:
    "radial-gradient(1200px 400px at 15% -10%, rgba(39, 110, 224, 0.32), transparent 70%), radial-gradient(900px 300px at 100% 0%, rgba(2,132,199,0.15), transparent 60%), #f8fafc",
};

export const headingWrap = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", md: "center" },
  flexDirection: { xs: "column", md: "row" },
  gap: 1.5,
  mb: 2.5,
};

export const metricsGrid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    xl: "repeat(4, minmax(0, 1fr))",
  },
  gap: 2,
  mb: 2.5,
};

export const metricCard = {
  p: 2,
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.35)",
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
};

export const chartsGrid = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
  gap: 2,
};

export const panelCard = {
  p: 2,
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.35)",
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
};

export const bottomGrid = {
  mt: 2,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
  gap: 2,
};

export const quizListItem = {
  p: 1.25,
  borderRadius: 2,
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
};
