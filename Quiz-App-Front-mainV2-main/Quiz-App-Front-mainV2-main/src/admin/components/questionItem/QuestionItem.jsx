import { Card, CardContent, Typography, Box } from "@mui/material";
import OptionItem from "../optionItem/OptionItem";

const QuestionItem = ({ question }) => {
  return (
    <Card
      sx={{
        maxWidth: 1500,
        margin: "auto",
        mt: 5,
        p: 1,
        borderRadius: 4,
        boxShadow: 2,
        bgcolor: "#f5fdffff",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          color="primary"
          sx={{ mb: 2 }}
        >
          {question.text || question.question}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {question.options.map((option, index) => (
            <OptionItem
              key={index}
              option={option}
              correctAnswer={question.correctAnswer}
              Id={index}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionItem;
