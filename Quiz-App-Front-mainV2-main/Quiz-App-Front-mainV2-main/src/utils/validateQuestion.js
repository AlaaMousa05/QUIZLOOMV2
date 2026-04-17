import { QUESTION_TYPES } from "../enums/enum";

export const validateQuestion = (question, existingQuestions, dispatch, showAlert) => {
  if (!question || !question.text?.trim()) {
    console.log(question + " is invalid");
    dispatch(showAlert("Question must be at least 5 characters long!"));
    return false;
  }

  if (question.type === QUESTION_TYPES.MCQ) {
     if (question.options.some((opt) => !opt.trim())) {
      dispatch(showAlert("All MCQ options must be filled!"));
      return false;
    }

  }

  const isDuplicate = existingQuestions.some(
    (q) =>
      q.text.trim().toLowerCase() === question.text.trim().toLowerCase() &&
      q?._id !== question?._id 
  );
  if (isDuplicate) {
    dispatch(showAlert("This question already exists!"));
    return false;
  }

  return true;
};
