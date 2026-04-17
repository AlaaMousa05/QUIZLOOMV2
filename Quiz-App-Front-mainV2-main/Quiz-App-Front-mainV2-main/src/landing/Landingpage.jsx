import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Footer from "../components/footer/Footer";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/loader/Loader";
import loadingImg from "../images/Loading-rafiki (1).png";
import NotFoundData from "../components/notFoundData/NotFoundData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice";
import { styles } from "./style";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useFetch("landingpagedata");
  const landingData = data?.data || data || {};
  const categories = landingData.categories || [];
  const featuredCategories = categories.slice(0, 3);

  if (loading) return <Loader />;
  if (error) return <NotFoundData message="Error loading" imag={loadingImg} />;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const infoCards = [
    {
      icon: <CategoryOutlinedIcon />,
      title: "Focused Categories",
      text: "Learn by topic so every quiz session has a clear purpose.",
    },
    {
      icon: <QuizOutlinedIcon />,
      title: "Clear Quiz Experience",
      text: "Simple interface, instant results, and steady learning flow.",
    },
    {
      icon: <BoltOutlinedIcon />,
      title: "Real Progress",
      text: "Practice consistently and track measurable improvement over time.",
    },
  ];

  return (
    <Box sx={styles.page}>
      <Box sx={styles.heroShell}>
        <Box sx={styles.glowA} />
        <Box sx={styles.glowB} />

        <Container maxWidth="lg">
          <Box sx={styles.topBar}>
            <Typography variant="h6" sx={styles.brand}>
              <AutoStoriesIcon />
              QuizLoom
            </Typography>

            {!user ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  sx={styles.secondaryBtn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={styles.primaryBtn}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  sx={styles.primaryBtn}
                  onClick={() =>
                    user.role === "admin" ? navigate("/admin") : navigate("/student")
                  }
                >
                  Dashboard
                </Button>
                <Button variant="outlined" sx={styles.secondaryBtn} onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            )}
          </Box>

          <Box sx={styles.heroGrid}>
            <Box>
              <Typography sx={styles.heroTitle}>
                Learn in short, focused quiz sessions.
              </Typography>
              <Typography sx={styles.heroText}>
                QuizLoom gives you a clean way to practice, stay consistent, and
                improve by category without distractions.
              </Typography>

              <Box sx={styles.heroActions}>
                {!user ? (
                  <>
                    <Button
                      variant="contained"
                      sx={styles.primaryBtn}
                      onClick={() => navigate("/register")}
                    >
                      Start Learning
                    </Button>
                    <Button
                      variant="outlined"
                      sx={styles.secondaryBtn}
                      onClick={() => navigate("/login")}
                    >
                      I Have Account
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    sx={styles.primaryBtn}
                    onClick={() =>
                      user.role === "admin" ? navigate("/admin") : navigate("/student")
                    }
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </Box>

            <Box sx={styles.heroCard}>
              <Typography fontWeight={700} mb={1.4}>
                Featured Tracks
              </Typography>
              <Stack spacing={1}>
                {featuredCategories.map((cat) => (
                  <Box key={cat._id} sx={styles.heroCardRow}>
                    <Typography fontWeight={700}>{cat.name}</Typography>
                    <Typography variant="caption" color="rgba(248,250,252,0.86)">
                      {cat.description || "Practice curated questions in this track."}
                    </Typography>
                  </Box>
                ))}
                {categories.length > 3 && (
                  <Typography variant="caption" color="rgba(248,250,252,0.82)">
                    +{categories.length - 3} more categories inside the platform
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={styles.section}>
        <Container maxWidth="lg">
          <Typography sx={styles.sectionHeading}>Featured Categories</Typography>
          <Typography sx={styles.sectionSub}>
            A quick look at the most important tracks. We keep the landing clean,
            and show the full list inside the platform.
          </Typography>

          <Grid container spacing={2}>
            {featuredCategories.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat._id}>
                <Card sx={styles.categoryCard}>
                  {cat.imageUrl ? (
                    <Box
                      component="img"
                      src={cat.imageUrl}
                      alt={cat.name}
                      sx={styles.categoryImage}
                    />
                  ) : (
                    <Box
                      sx={{
                        ...styles.categoryImage,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CategoryOutlinedIcon sx={{ color: "#1f2b5f", fontSize: 38 }} />
                    </Box>
                  )}
                  <CardContent sx={styles.categoryBody}>
                    <Typography variant="h6" fontWeight={800} color="#111d46" mb={0.8}>
                      {cat.name}
                    </Typography>
                    <Typography variant="body2" color="#475569" lineHeight={1.65}>
                      {cat.description || "Curated quizzes for this learning track."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ ...styles.section, pt: 0 }}>
        <Container maxWidth="lg">
          <Box sx={styles.infoGrid}>
            {infoCards.map((item) => (
              <Box key={item.title} sx={styles.infoCard}>
                <Box mb={1} color="#1f2b5f">
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight={800} mb={0.8} color="#111d46">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="#475569" lineHeight={1.7}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
