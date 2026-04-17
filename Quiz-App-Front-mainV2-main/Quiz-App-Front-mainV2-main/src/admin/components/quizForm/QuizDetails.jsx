// QuizDetails.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Box, Button } from "@mui/material";
import { setQuizField } from "../../../redux/quizSlice";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../../components/loader/Loader";
import { style } from "./style";

const QuizDetails = ({ categories, loadingCat, onAddSubcategory }) => {
  const dispatch = useDispatch();
  const { mainCategoryId, subcategoryId } = useSelector((state) => state.quiz);
  const { data: subcategories, loading: loadingSub } = useFetch(
    mainCategoryId ? `categories/${mainCategoryId}/subcategories` : null
  );
console.log(subcategories)
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Button
        variant="outlined"
        onClick={onAddSubcategory}
        sx={style.container}
      >
        Add Subcategory
      </Button>
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-end">
        {loadingCat ? (
          <Loader />
        ) : (
          <TextField
            select
            label="Category"
            value={mainCategoryId || ""}
            onChange={(e) =>
              dispatch(
                setQuizField({
                  field: "mainCategoryId",
                  value: String(e.target.value),
                })
              )
            }
            sx={{ flex: 1, minWidth: 200 }}
          >
            {categories?.map((cat) => (
              <MenuItem key={cat._id} value={String(cat._id)}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          select
          label="Subcategory"
          value={subcategoryId || ""}
          onChange={(e) =>
            dispatch(
              setQuizField({
                field: "subcategoryId",
                value: String(e.target.value),
              })
            )
          }
          disabled={!mainCategoryId || loadingSub}
          sx={{ flex: 1, minWidth: 200 }}
        >
          {subcategories.subCategories?.map?.((sub) => (
            <MenuItem key={sub._id} value={String(sub._id)}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default QuizDetails;
