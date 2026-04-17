import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/baseUrl";
import { showAlert, setQuizField } from "../redux/quizSlice";
import { useEffect } from "react";

export const useQuizManager = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((s) => s.quiz);

  // handle adding a new subcategory
  const handleAddSubcategory = async (data) => {
    try {
      const categoryId = data.mainCategoryId;
      // Transform the data to match server expectations
      const subcategoryData = {
        name: data.name,
        description: data.description,
        categoryId: categoryId,
      };
      await api.post(`/categories/${categoryId}/subcategories`, subcategoryData);
      dispatch(showAlert(`Subcategory "${data.name}" added!`));
      return true;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      dispatch(showAlert("Failed to add subcategory"));
      return false;
    }
  };

  // load questions when subcategoryId changes
  useEffect(() => {
    const loadQuestions = async () => {
      if (!quizState.subcategoryId) return;

      try {
        const response = await api.get(
          `/questions?subCategoryId=${quizState.subcategoryId}`
        );
        dispatch(
          setQuizField({ field: "questions", value: response.data.questions })
        );
      } catch (err) {
        console.error("Failed to load questions:", err);
        dispatch(showAlert("Failed to load questions"));
      }
    };

    loadQuestions();
  }, [quizState.subcategoryId, dispatch]);

  return {
    quizState,
    handleAddSubcategory,
  };
};
