import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
        src="/assets/404 Error Page not Found with people connecting a plug-cuate (1).png"
        alt="404 Not Found"
        sx={{
          width: "80%",
          maxWidth: 400,
        }}
      />

      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}
