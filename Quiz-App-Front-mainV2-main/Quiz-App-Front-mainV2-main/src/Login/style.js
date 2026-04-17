export const Style = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  paper: {
    padding: 5,
    width: { xs: "90%", sm: "400px" },
    borderRadius: 3,
    textAlign: "center",
    backgroundColor: "#EEE8df",
    color: "#2c356A",
  },
  textField: {
    mb: 3,
    input: { color: "#2c356A" },
    label: { color: "#2c356A" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#2c356A" },
      "&:hover fieldset": { borderColor: "#507CA9" },
      "&.Mui-focused fieldset": { borderColor: "#507CA9" },
    },
  },
  button: {
    backgroundColor: "#2c356A",
    color: "#EEE8df",
    py: 1.5,
    fontWeight: 600,
    "&:hover": { backgroundColor: "#507CA9" },
  },
};
