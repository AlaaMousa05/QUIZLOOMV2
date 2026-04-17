import { useSelector, useDispatch } from "react-redux";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { api } from "../../../api/baseUrl";
import { QUESTION_TYPES } from "../../../enums/enum";
import { useState } from "react";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import {
  Box,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  setEditingQuestion,
  deleteQuestion,
  showAlert,
} from "../../../redux/quizSlice";


const QuestionsList = () => {
  const dispatch = useDispatch();
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const { questions, editingQuestion, subcategoryId } = useSelector(
    (state) => state.quiz
  );

  console.log("Current questions in state:", questions);
// handle adding a new question
  const handleAddQuestion = (type) => {
    if (!subcategoryId) {
      dispatch(showAlert("Please select a subcategory first!"));
      return;
    }

    dispatch(
      setEditingQuestion({
        text: "",
        type,
        options:
          type === QUESTION_TYPES.MCQ ? ["", "", "", ""] : ["True", "False"],
        correctAnswer: 0,
      })
    );
  };

// handle deleting a question
  const handleDelete = async () => {
    try {
      await api.delete(`/questions/${questionToDelete._id}`);
      const index = questions.findIndex((q) => q._id === questionToDelete._id);
      if (index !== -1) dispatch(deleteQuestion(index));

      dispatch(showAlert("Question deleted successfully!"));
    } catch {
      dispatch(showAlert("Failed to delete question. Please try again."));
    } finally {
      setQuestionToDelete(null);
    }
  };



  return (
    <>
      <Typography variant="h6" gutterBottom>
        Questions
        <Chip label={questions.length} size="small" sx={{ ml: 1 }} />
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2, flexDirection: "column" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAddQuestion(QUESTION_TYPES.MCQ)}
        >
          Add Multiple Choice
        </Button>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAddQuestion(QUESTION_TYPES.TF)}
        >
          Add True/False
        </Button>
      </Box>

      <List>
        {questions.map((q, index) => (
          <ListItem
            key={q._id || `new-${index}`}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuestionToDelete(q);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => dispatch(setEditingQuestion(index))}
              selected={editingQuestion === index}
              sx={{
                width: '100%',
                mb: 1,
                borderRadius: 1,
                border: "1px solid",
                borderColor:
                  editingQuestion === index ? "primary.main" : "divider",
                bgcolor:
                  editingQuestion === index ? "primary.50" : "background.paper",
                justifyContent: 'space-between',
                pr: 1.5,
              }}
            >
              <ListItemText
                primary={`Question ${index + 1}`}
                secondary={
                  (q.text?.substring(0, 35) || '') +
                  ((q.text?.length || 0) > 35 ? "..." : "")
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ConfirmDialog
        open={!!questionToDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this question?"
        onClose={() => setQuestionToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default QuestionsList;
