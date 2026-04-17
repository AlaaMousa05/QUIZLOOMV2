import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import {
  cardStyle,
  cardContentStyle,
  headerStack,
  headerTitle,
  chipStyle,
  questionText,
  cardActionsStyle,
  navigationButton,
} from "./QuestionCard.styles";

export default function QuestionCard({
  q,
  index,
  answers,
  handleSelect,
  current,
  goNext,
  goPrev,
  totalQuestions,
}) {
  const questionId = q._id || q.id;
  const selected =
    answers?.find((a) => (a.id || a.questionId) === questionId)?.selectedAnswer ??
    null;
  const options =
    q.type === "multiple-choice" ? q.options : q.options || ["True", "False"];

  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <Stack sx={headerStack}>
          <Typography variant="subtitle1" sx={headerTitle}>
            Question {index + 1}
          </Typography>
          <Chip
            label={q.type === "true-false" ? "True / False" : "Multiple"}
            size="small"
            sx={chipStyle}
          />
        </Stack>

        <Typography variant="h6" sx={questionText}>
          {q.text || q.question}
        </Typography>

        <RadioGroup
          value={selected !== null ? selected : ""}
          onChange={(e) => handleSelect(questionId, Number(e.target.value))}
        >
          {options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={i}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>
      </CardContent>

      <CardActions sx={cardActionsStyle}>
        <Box sx={navigationButton}>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={goPrev}
            disabled={current === 0}
          >
            Prev
          </Button>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            onClick={goNext}
            disabled={current === totalQuestions - 1}
          >
            Next
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
