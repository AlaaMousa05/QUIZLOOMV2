import React, { useEffect, useState, useMemo } from "react";
import { LinearProgress, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Timer({ startTime, duration, onTimeEnd }) {
  const theme = useTheme();
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const startTimeMs = new Date(startTime).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeMs) / 1000);
      const remaining = Math.max(duration - elapsed, 0);
      setSecondsLeft(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onTimeEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, onTimeEnd]);

  const timeDisplay = useMemo(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [secondsLeft]);

  const progressColor = useMemo(() => {
    const ratio = secondsLeft / duration;
    if (ratio <= 0.2) return theme.palette.error.main;
    if (ratio <= 0.5) return theme.palette.warning.main;
    return theme.palette.primary.main;
  }, [secondsLeft, duration, theme]);

  return (
    <Box display="flex" alignItems="center" gap={2} mt={1}>
      <Typography variant="body2" sx={{ minWidth: 70 }}>
        Time left: {timeDisplay}
      </Typography>
      <Box sx={{ flex: 1, height: 20, borderRadius: 5, overflow: "hidden" }}>
        <LinearProgress
          variant="determinate"
          value={(secondsLeft / duration) * 100}
          sx={{
            height: "100%",
            width: "100px",
            borderRadius: 5,
            backgroundColor: "#eee",
            ".MuiLinearProgress-bar": { backgroundColor: progressColor },
          }}
        />
      </Box>
    </Box>
  );
}
