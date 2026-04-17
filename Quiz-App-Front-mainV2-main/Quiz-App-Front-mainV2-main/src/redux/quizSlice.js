// quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainCategoryId: "",
  subcategoryId: "",
  questions: [],
  editingQuestion: null, 
  alert: { show: false, message: "" },
  showSubcategoryDialog: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;

      if (field === "mainCategoryId") {
        state.subcategoryId = "";
        state.questions = [];
        state.editingQuestion = null;
      }
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
      state.editingQuestion = null;
    },
    setEditingQuestion: (state, action) => {
      state.editingQuestion = action.payload;
    },
    setShowSubcategoryDialog: (state, action) => {
      state.showSubcategoryDialog = action.payload;
    },
    showAlert: (state, action) => {
      state.alert = { show: true, message: action.payload };
    },
    hideAlert: (state) => {
      state.alert = { show: false, message: "" };
    },
    resetQuizState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setQuizField,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setEditingQuestion,
  setShowSubcategoryDialog,
  showAlert,
  hideAlert,
  resetQuizState,
} = quizSlice.actions;

export default quizSlice.reducer;
