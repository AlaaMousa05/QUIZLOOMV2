import { PieChart } from "@mui/x-charts/PieChart";
import { Paper, Typography, Divider, Box } from "@mui/material";

const COLORS = ["#544cafff", "#c530d6ff"];

export default function HalfCircleChart({ data = [], title = "Question Types" }) {
  const chartData = data.map((item, index) => ({
    ...item,
    id: index,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 3, mb: 1, width: "100%", maxWidth: 500 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: "center", mb: 0.5 }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 0.5 }} />


      <Box sx={{ display: "flex", justifyContent: "center", height: 220, mt: -1 }}> 
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: 70,
              outerRadius: 120,
              startAngle: -90,
              endAngle: 90,
              cx: "50%",
              cy: "100%",
              arcLabel: undefined,
              valueFormatter: undefined,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 40, additionalRadius: -10, color: "gray" },
            },
          ]}
          height={140}
          width={400}
          sx={{
            "& .MuiChartsLegend-root": {
              display: "none",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 1.5,
          flexWrap: "wrap",
        }}
      >
        {chartData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5, 
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <Typography variant="body2" fontWeight="medium">
              {item.label}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
