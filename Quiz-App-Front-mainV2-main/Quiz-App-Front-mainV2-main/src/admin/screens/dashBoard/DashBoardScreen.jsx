import { useMemo } from "react";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import loadingImg from "../../../images/Loading-rafiki (1).png";
import { useFetch } from "../../../hooks/useFetch";
import {
  bottomGrid,
  chartsGrid,
  dashboardRoot,
  headingWrap,
  metricCard,
  metricsGrid,
  panelCard,
  quizListItem,
} from "./DashBoardScreen.styles";

const PIE_COLORS = ["#2c356A", "#9ca3af"];

export default function DashBoardScreen() {
  const {
    data: landingResponse,
    loading: loadingLanding,
    error: errorLanding,
  } = useFetch("landingpagedata");
  const {
    data: performanceResponse,
    loading: loadingPerformance,
    error: errorPerformance,
  } = useFetch("students/performance");
  const {
    data: effectivenessResponse,
    loading: loadingEffectiveness,
    error: errorEffectiveness,
  } = useFetch("quizzes/effectiveness");

  const loading = loadingLanding || loadingPerformance || loadingEffectiveness;
  const hasCriticalError = errorLanding && errorPerformance && errorEffectiveness;

  const landingData = useMemo(() => landingResponse?.data || {}, [landingResponse]);
  const performance = useMemo(
    () => performanceResponse?.stats || {},
    [performanceResponse]
  );
  const quizzes = useMemo(
    () => effectivenessResponse?.quizzes || [],
    [effectivenessResponse]
  );

  const metricCards = useMemo(
    () => [
      {
        label: "Total Students",
        value: performance.totalStudents || landingData.totalStudents || 0,
        icon: <Groups2OutlinedIcon />,
        helper: "Active learners in platform",
      },
      {
        label: "Categories",
        value: landingData.totalCategories || 0,
        icon: <CategoryOutlinedIcon />,
        helper: "Published learning categories",
      },
      {
        label: "Quiz Attempts",
        value: performance.totalAttempts || 0,
        icon: <QuizOutlinedIcon />,
        helper: "Total attempts submitted",
      },
      {
        label: "Avg Score",
        value: `${performance.avgScore || 0}%`,
        icon: <TrendingUpOutlinedIcon />,
        helper: "Average student achievement",
      },
    ],
    [landingData.totalCategories, landingData.totalStudents, performance]
  );

  const passFailData = useMemo(
    () => [
      { name: "Passed", value: performance.passRate || 0 },
      { name: "Failed", value: performance.failRate || 0 },
    ],
    [performance.failRate, performance.passRate]
  );

  const quizChartData = useMemo(
    () =>
      quizzes.slice(0, 8).map((quiz) => ({
        name: quiz.title,
        Attempts: quiz.attempts || 0,
        Passed: quiz.passedAttempts || 0,
      })),
    [quizzes]
  );

  const topQuizzes = useMemo(
    () =>
      [...quizzes]
        .sort((a, b) => (b.attempts || 0) - (a.attempts || 0))
        .slice(0, 5),
    [quizzes]
  );

  const dashboardHighlights = useMemo(() => {
    const bestQuiz = topQuizzes[0];
    return [
      bestQuiz
        ? `Most attempted quiz: ${bestQuiz.title} (${bestQuiz.attempts} attempts)`
        : "No quiz attempts yet",
      `Pass rate is currently ${performance.passRate || 0}%`,
      `Motivated students: ${performance.motivatedStudents || 0}, Weak students: ${
        performance.weakStudents || 0
      }`,
    ];
  }, [performance.motivatedStudents, performance.passRate, performance.weakStudents, topQuizzes]);

  if (loading) return <Loader />;
  if (hasCriticalError) {
    return <NotFoundData message="Error loading dashboard data" imag={loadingImg} />;
  }

  return (
    <Box sx={dashboardRoot}>
      <Box sx={headingWrap}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="#1f2b5f">
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Performance overview, quiz activity, and key trends.
          </Typography>
        </Box>
        <Chip
          icon={<InsightsOutlinedIcon />}
          label={`Updated ${new Date().toLocaleDateString()}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box sx={metricsGrid}>
        {metricCards.map((card) => (
          <Paper key={card.label} elevation={0} sx={metricCard}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Box color="#2c356A">{card.icon}</Box>
            </Stack>
            <Typography variant="h4" fontWeight={700} color="#0f172a">
              {card.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {card.helper}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={chartsGrid}>
        <Paper elevation={0} sx={panelCard}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Quiz Attempts vs Passed
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Top quizzes by activity.
          </Typography>
          <Box height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Attempts" fill="#7dd3fc" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Passed" fill="#2c356A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        <Paper elevation={0} sx={panelCard}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Pass / Fail Ratio
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Based on student attempts.
          </Typography>
          <Box height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={passFailData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={102}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {passFailData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>

      <Box sx={bottomGrid}>
        <Paper elevation={0} sx={panelCard}>
          <Typography variant="h6" fontWeight={700} mb={1.5}>
            Top Quizzes
          </Typography>
          <List disablePadding>
            {topQuizzes.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No quiz data yet.
              </Typography>
            )}
            {topQuizzes.map((quiz) => (
              <ListItem key={quiz.quizId} disableGutters sx={quizListItem}>
                <ListItemText
                  primary={quiz.title}
                  secondary={`Attempts: ${quiz.attempts} | Passed: ${quiz.passedAttempts} | Accuracy: ${quiz.accuracy}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={0} sx={panelCard}>
          <Typography variant="h6" fontWeight={700} mb={1.5}>
            Quick Highlights
          </Typography>
          <Stack spacing={1.5}>
            {dashboardHighlights.map((insight) => (
              <Box key={insight}>
                <Typography variant="body2">{insight}</Typography>
                <Divider sx={{ mt: 1.5 }} />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
