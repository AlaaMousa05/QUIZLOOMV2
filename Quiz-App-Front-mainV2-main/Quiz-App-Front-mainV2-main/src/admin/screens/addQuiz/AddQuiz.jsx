import { Container, Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import QuizDetails from "../../components/quizForm/QuizDetails";
import QuestionsList from "../../components/quizForm/QuestionsList";
import QuestionEditor from "../../components/quizForm/QuestionEditor";
import AlertMessage from "../../components/quizForm/AlertMessage";
import AddSubcategoryDialog from "../../components/quizForm/AddSubcategoryDialog";
import { useFetch } from "../../../hooks/useFetch";
import { useQuizManager } from "../../../hooks/useQuizManager";
import { setShowSubcategoryDialog } from "../../../redux/quizSlice";

import { styles } from '../students/style'

import {
  containerStyle,
  paperWrapper,
  dividerStyle,
  gridWrapper,
  leftColumn,
  rightColumn,
} from "./AddQuiz.styles";

const AddQuiz = () => {
  const dispatch = useDispatch();
  const { showSubcategoryDialog } = useSelector((state) => state.quiz);
  const { data: categories, loading: loadingCat } = useFetch("categories");
  const { handleAddSubcategory } = useQuizManager();

  return (
    <Container maxWidth="xl" sx={containerStyle}>
      <AlertMessage />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={styles.title}
        >
          Question Bank & Categories Manager
        </Typography>
      


      <Paper elevation={2} sx={paperWrapper}>
        <QuizDetails
          categories={categories?.categories || []}
          loadingCat={loadingCat}
          onAddSubcategory={() => dispatch(setShowSubcategoryDialog(true))}
        />

        <Box sx={dividerStyle} />

        <Box sx={gridWrapper}>
          <Box sx={leftColumn}>
            <QuestionEditor />
          </Box>

          <Box sx={rightColumn}>
            <QuestionsList />
          </Box>
        </Box>
      </Paper>
</Box>
      <AddSubcategoryDialog
        open={showSubcategoryDialog}
        onClose={() => dispatch(setShowSubcategoryDialog(false))}
        categories={categories?.categories || []}
        onAddSubcategory={handleAddSubcategory}
      />
    </Container>
  );
};

export default AddQuiz;
