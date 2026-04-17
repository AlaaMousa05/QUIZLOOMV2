import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { showAlert } from "../../../redux/quizSlice";
import { useDispatch } from "react-redux";
const AddSubcategoryDialog = ({
  open,
  onClose,
  categories,
  onAddSubcategory,
}) => {
  const [newSub, setNewSub] = useState({
    name: "",
    description: "",
    mainCategoryId: "",
  });
  const dispatch = useDispatch();
  const handleAdd = async () => {
    if (!newSub.name || !newSub.description || !newSub.mainCategoryId) {
      dispatch(showAlert("Failed to add subcategory"));
      return;
    }

    const success = await onAddSubcategory({
      ...newSub,
      mainCategoryId: String(newSub.mainCategoryId),
    });

    if (success) {
      setNewSub({ name: "", description: "", mainCategoryId: "" });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Subcategory</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          select
          label="Category"
          value={newSub.mainCategoryId}
          onChange={(e) =>
            setNewSub({ ...newSub, mainCategoryId: String(e.target.value) })
          }
          sx={{ mb: 2, mt: 1 }}
        >
          {categories?.map((cat) => (
            <MenuItem key={cat._id} value={String(cat._id)}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Subcategory Name"
          value={newSub.name}
          onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={newSub.description}
          onChange={(e) =>
            setNewSub({ ...newSub, description: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubcategoryDialog;
