import { Box, Typography } from "@mui/material";

export default function NotFoundData({ message = "No Data Found", imag }) {
  return (
    <Box
      sx={{
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <Box
        component="img"
        src={imag}
        alt="No Data"
        sx={{
          width: "90%",
          maxWidth: 300,
          mb: 2,
        }}
      />

      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
