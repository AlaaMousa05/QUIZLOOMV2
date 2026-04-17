export const styles = {
  container: {
    padding: 5,
  },
  headerStack: {
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    marginBottom:0, 
    gap: 10,
   width: "100%", 
  },
title: {
  fontWeight: 600,
  textAlign: "center",
  color: "#2c356A",
  fontSize: 24,
  marginBottom: 12,
  borderBottom: "2px solid #2c356A",
  paddingBottom: 6,
  width: "100%",  
},

  searchField: {
    width: { xs: "100%", md: 320 },
  },
  tableHeadCell: {
    paddingY: 0.5,
    fontWeight: 600,
  },
  tableNameText: {
    fontWeight: 600,
    fontSize: 14,
  },
  actionButtons: {
    display: "flex",
    gap: 1,
    justifyContent: "flex-end",
  },
  cardMobile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  cardMobileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
};
