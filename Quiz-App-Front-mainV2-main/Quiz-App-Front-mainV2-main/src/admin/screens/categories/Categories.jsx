import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { useSelector } from "react-redux";
import CategoriesItem from "../../../components/categoriesItem/CategoriesItem";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../api/baseUrl";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import loadingImg from "../../../images/Loading-rafiki (1).png";
import noDataImg from "../../../images/undraw_no-data_ig65 (1).png";
import { USER } from "../../../enums/enum";
import {
  categoriesPanel,
  contentGrid,
  formActions,
  formCard,
  itemWrapper,
  listWrapper,
  pageWrapper,
  panelHeader,
  previewBox,
  titleStyle,
} from "./Categories.styles";

const INITIAL_FORM = {
  name: "",
  description: "",
  imageUrl: "",
};

export default function Categories() {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === USER.ADMIN;
  const { data: categoriesResponse, loading, error } = useFetch("categories");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    setCategories(categoriesResponse?.categories || []);
  }, [categoriesResponse]);

  const categoryCount = useMemo(() => categories.length, [categories]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", message: "Please select an image file only." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ type: "error", message: "Image must be 2MB or smaller." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
      setFeedback({ type: "", message: "" });
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingCategory(null);
    setFeedback({ type: "", message: "" });
  };

  const handleSubmitCategory = async () => {
    const name = form.name.trim();
    if (!name) {
      setFeedback({ type: "error", message: "Category name is required." });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const payload = {
        name,
        description: form.description.trim(),
        imageUrl: form.imageUrl || null,
      };
      if (editingCategory?._id) {
        const response = await api.put(`/categories/${editingCategory._id}`, payload);
        const updatedCategory = response.data?.category;
        if (updatedCategory) {
          setCategories((prev) =>
            prev.map((item) => (item._id === updatedCategory._id ? updatedCategory : item))
          );
        }
        setFeedback({ type: "success", message: "Category updated successfully." });
      } else {
        const response = await api.post("/categories", payload);
        const createdCategory = response.data?.category;
        if (createdCategory) {
          setCategories((prev) => [createdCategory, ...prev]);
        }
        setFeedback({ type: "success", message: "Category created successfully." });
      }
      setForm(INITIAL_FORM);
      setEditingCategory(null);
    } catch (requestError) {
      setFeedback({
        type: "error",
        message:
          requestError.response?.data?.message ||
          "Failed to save category. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (category) => {
    if (!isAdmin) return;
    setEditingCategory(category);
    setForm({
      name: category?.name || "",
      description: category?.description || "",
      imageUrl: category?.imageUrl || "",
    });
    setFeedback({ type: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmDelete = async () => {
    if (!toDelete?._id || !isAdmin) return;

    try {
      await api.delete(`/categories/${toDelete._id}`);
      setCategories((prev) => prev.filter((item) => item._id !== toDelete._id));
      if (editingCategory?._id === toDelete._id) {
        resetForm();
      }
      setFeedback({ type: "success", message: "Category deleted successfully." });
    } catch (requestError) {
      setFeedback({
        type: "error",
        message:
          requestError.response?.data?.message ||
          "Failed to delete category. Please try again.",
      });
    } finally {
      setToDelete(null);
    }
  };

  return (
    <Box sx={pageWrapper}>
      <Typography variant="h4" sx={titleStyle}>
        {isAdmin ? "Category Management" : "Categories"}
      </Typography>

      <Box sx={isAdmin ? contentGrid : undefined}>
        {isAdmin && (
          <Paper elevation={0} sx={formCard}>
            <Box p={2.5}>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Add or update category name, description, and image.
              </Typography>

              <Box sx={previewBox}>
                {form.imageUrl ? (
                  <Box
                    component="img"
                    src={form.imageUrl}
                    alt="Category preview"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Stack alignItems="center" spacing={1} color="text.secondary">
                    <AddPhotoAlternateOutlinedIcon />
                    <Typography variant="caption">Image Preview</Typography>
                  </Stack>
                )}
              </Box>

              <Button component="label" variant="outlined" fullWidth sx={{ mb: 2 }}>
                Upload Image
                <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
              </Button>

              <TextField
                label="Category Name"
                name="name"
                value={form.name}
                onChange={handleFieldChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleFieldChange}
                fullWidth
                multiline
                rows={3}
              />

              <Box sx={formActions}>
                <Button
                  variant="contained"
                  startIcon={<PlaylistAddOutlinedIcon />}
                  onClick={handleSubmitCategory}
                  disabled={submitting}
                >
                  {submitting
                    ? editingCategory
                      ? "Updating..."
                      : "Creating..."
                    : editingCategory
                    ? "Update"
                    : "Create"}
                </Button>
                <Button
                  variant="text"
                  startIcon={<RestartAltOutlinedIcon />}
                  onClick={resetForm}
                  disabled={submitting}
                >
                  {editingCategory ? "Cancel Edit" : "Reset"}
                </Button>
              </Box>

              {feedback.message && (
                <Alert severity={feedback.type || "info"} sx={{ mt: 2 }}>
                  {feedback.message}
                </Alert>
              )}
            </Box>
          </Paper>
        )}

        <Paper elevation={0} sx={categoriesPanel}>
          {isAdmin && (
          <Box sx={panelHeader}>
            <Typography variant="h6" fontWeight={700}>
              Categories
            </Typography>
            <Chip label={`${categoryCount} items`} color="primary" />
          </Box>
          )}

          {loading && <Loader />}

          {!loading && error && (
            <NotFoundData message="Error loading categories" imag={loadingImg} />
          )}

          {!loading && !error && categories.length === 0 && (
            <NotFoundData message="No Categories Available" imag={noDataImg} />
          )}

          {!loading && !error && categories.length > 0 && (
            <Box sx={listWrapper}>
              {categories.map((item) => (
                <Box key={item._id} sx={itemWrapper}>
                  <CategoriesItem
                    data={item}
                    showAdminActions={isAdmin}
                    onEdit={handleStartEdit}
                    onDelete={setToDelete}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete Category"
        message={`Are you sure you want to delete "${toDelete?.name}"?`}
        onClose={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
