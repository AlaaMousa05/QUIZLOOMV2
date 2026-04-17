import { Box, Typography } from "@mui/material";

const StatCard = ({ title, value, bgcolor = "#3f19ca", color = "#fff" }) => {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        borderRadius: 2,
        bgcolor,
        color,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow:4,
        minWidth:"132px"
      }}
    >
      <Typography variant="subtitle2" sx={{fontSize:25}}>{title}</Typography>
      <Typography variant="h6" fontWeight="bold" sx={{fontSize:25}}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatCard;
