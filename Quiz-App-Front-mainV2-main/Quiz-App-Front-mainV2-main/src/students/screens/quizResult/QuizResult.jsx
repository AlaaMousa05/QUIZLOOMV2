import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  containerStyle,
  paperStyle,
  finalScoreText,
  subtitleText,
  statsContainer,
  correctBox,
  wrongBox,
  chartContainer,
  backButton,
} from "./QuizResultHorizontal.styles";

const COLORS = ["#4caf50", "#f44336"]; // Correct - Wrong

export default function QuizResultHorizontal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result;

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!result) return;
    let start = 0;
    const end = Math.round(result.score ?? result.percentage ?? 0);
    const duration = 1000;
    const stepTime = end > 0 ? Math.abs(Math.floor(duration / end)) : duration;
    const timer = setInterval(() => {
      start += 1;
      if (start > end) clearInterval(timer);
      else setAnimatedScore(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [result]);

  if (!result)
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>
        Result not found
      </Typography>
    );

  const correctCount =
    result.correctCount ??
    result.answers?.filter((answer) => answer.isCorrect).length ??
    0;
  const wrongCount =
    result.wrongCount ??
    result.answers?.filter((answer) => !answer.isCorrect).length ??
    0;
  const timeTakenMinutes = result.timeTaken
    ? (Number(result.timeTaken) / 60).toFixed(1)
    : "0.0";

  const data = [
    { name: "Correct", value: correctCount },
    { name: "Wrong", value: wrongCount },
  ];

  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <Paper elevation={10} sx={paperStyle}>
        <Typography variant="h5" sx={finalScoreText}>
          Final Score: {animatedScore}
        </Typography>
        <Typography variant="subtitle1" sx={subtitleText}>
          Time Taken: {timeTakenMinutes} mins
        </Typography>

        {/* Boxes Horizontal */}
        <Box sx={statsContainer}>
          <Box sx={correctBox}>
            <Typography variant="h6">Correct</Typography>
            <Typography variant="h4">{correctCount}</Typography>
          </Box>
          <Box sx={wrongBox}>
            <Typography variant="h6">Wrong</Typography>
            <Typography variant="h4">{wrongCount}</Typography>
          </Box>
        </Box>

        {/* Pie Chart */}
        <Box sx={chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                isAnimationActive
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Questions"]} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={backButton}
          onClick={() => navigate("/student")}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
}
