import { Box, Container, Divider, Grid, IconButton, Link, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      background:
        "linear-gradient(130deg, #0f172a 0%, #111d46 45%, #1f2b5f 100%)",
      color: "#e2e8f0",
      pt: 6,
      pb: 4,
      borderTop: "1px solid rgba(226,232,240,0.14)",
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box display="flex" alignItems="center" gap={1} mb={1.5}>
            <AutoStoriesIcon />
            <Typography variant="h6" fontWeight={800} letterSpacing="0.02em">
              QuizLoom
            </Typography>
          </Box>
          <Typography variant="body2" color="rgba(226,232,240,0.9)" lineHeight={1.8}>
            A focused quiz platform for students and admins to practice, manage,
            and track learning outcomes with clarity.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight={700} mb={1.2}>
            Navigate
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.8}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link component={RouterLink} to="/login" color="inherit" underline="hover">
              Login
            </Link>
            <Link component={RouterLink} to="/register" color="inherit" underline="hover">
              Register
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" fontWeight={700} mb={1.2}>
            Connect
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton href="#" sx={{ color: "#e2e8f0" }}>
              <FaFacebookF />
            </IconButton>
            <IconButton href="#" sx={{ color: "#e2e8f0" }}>
              <FaTwitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "#e2e8f0" }}>
              <FaInstagram />
            </IconButton>
          </Box>
          <Typography variant="caption" display="block" mt={1.5} color="rgba(226,232,240,0.78)">
            Built for steady learning and stronger outcomes.
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: "rgba(226,232,240,0.2)" }} />

      <Typography variant="body2" textAlign="center" color="rgba(226,232,240,0.85)">
        &copy; {new Date().getFullYear()} QuizLoom. Crafted for meaningful practice.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
