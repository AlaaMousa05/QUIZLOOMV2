import { useSelector, useDispatch } from "react-redux";
import { QUESTION_TYPES } from "../../../enums/enum";
import { validateQuestion } from "../../../utils/validateQuestion";
import { api } from "../../../api/baseUrl";
import {
  addQuestion,
  updateQuestion,
  setEditingQuestion,
  showAlert,
} from "../../../redux/quizSlice";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Button,
} from "@mui/material";

const QuestionEditor = () => {
  const dispatch = useDispatch();
  const { questions, editingQuestion, subcategoryId, mainCategoryId } = useSelector(
    (state) => state.quiz
  );
  // determine the current question being edited
  const question =
    typeof editingQuestion === "number"
      ? questions[editingQuestion]
      : editingQuestion;
      console.log("Editing question:", question);
  // handle field changes
  const handleChange = (field, value) => {
    if (!question) return;

    if (typeof editingQuestion === "number") {
      dispatch(
        updateQuestion({ index: editingQuestion, data: { [field]: value } })
      );
    } else {
      dispatch(setEditingQuestion({ ...question, [field]: value }));
    }
  };
  // handle option text changes for MCQ
  const handleOptionChange = (optionIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    handleChange("options", newOptions);
  };
  // handle saving the question (add or update)
  const handleSaveQuestion = async () => {
    if (!validateQuestion(question, questions, dispatch, showAlert)) return;

    try {
      if (question?._id) {
        const res = await api.put(`/questions/${question._id}`, question);
        dispatch(
          updateQuestion({
            index: editingQuestion,
            data: res.data?.question || res.data,
          })
        );
      } else {
        const res = await api.post("/questions", {
          ...question,
          subCategoryId: subcategoryId,
          categoryId: mainCategoryId,
        });
        dispatch(addQuestion(res.data?.question || res.data));
        dispatch(setEditingQuestion(questions.length));
      }

      dispatch(showAlert("Question saved successfully!"));
    } catch (err) {
      console.error(err);
      dispatch(showAlert("Failed to save question!"));
    }
  };

  if (!question)
    return (
      <Box sx={{ minWidth: "700px" }}>
        <Typography>Select or add a question</Typography>
      </Box>
    );

  return (
    <Card>
      <CardHeader
        title={question?._id ? "Edit Question" : "New Question"}
        subheader={
          question.type === QUESTION_TYPES.MCQ
            ? "Multiple Choice"
            : "True/False"
        }
      />
      <CardContent>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Question Text"
          value={question.text || ""}
          onChange={(e) => handleChange("text", e.target.value)}
          sx={{ mb: 3 }}
        />

        {question.type === QUESTION_TYPES.MCQ ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Options (select the correct answer)
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={question.correctAnswer?.toString() || "0"}
                onChange={(e) =>
                  handleChange("correctAnswer", parseInt(e.target.value))
                }
              >
                {question.options.map((opt, idx) => (
                  <Box
                    key={idx}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Radio value={idx.toString()} />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={opt}
                      placeholder={`Option ${idx + 1}`}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          </>
        ) : (
          <FormControl component="fieldset">
            <FormLabel>Select correct answer</FormLabel>
            <RadioGroup
              value={question.correctAnswer?.toString() || "0"}
              onChange={(e) =>
                handleChange("correctAnswer", parseInt(e.target.value))
              }
            >
              <FormControlLabel value="0" control={<Radio />} label="True" />
              <FormControlLabel value="1" control={<Radio />} label="False" />
            </RadioGroup>
          </FormControl>
        )}

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" onClick={handleSaveQuestion}>
            Save Question
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
