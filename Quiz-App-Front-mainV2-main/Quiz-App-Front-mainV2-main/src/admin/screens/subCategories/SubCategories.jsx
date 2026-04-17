import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { Typography, Box } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import loadingImg from "../../../images/Loading-rafiki (1).png";
import noDataImg from "../../../images/undraw_no-data_ig65 (1).png";
import SubCategoriesItem from "../../../components/subCategoriesItem/SubCategoriesItem";
import { useState , useEffect } from "react";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import {api} from "../../../api/baseUrl";
import {
  pageWrapper,
  mainWrapper,
  listWrapper,
  itemWrapper,
} from "./SubCategories.styles";
import { styles } from "../students/style";

const SubCategories = () => {
 const location = useLocation();
  const { id } = useParams();
  const { mainCategory } = location.state || {};

  const { data, loading, error } = useFetch(
    `categories/${id}/subcategories`
  );
  console.log("Fetched subcategories:", data);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (data && data.subCategories) {
      setSubCategories(data.subCategories);
    }
  }, [data]);

  const [toDelete, setToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/subcategories/${toDelete._id}`);
      setSubCategories((prev) =>
        prev.filter((item) => item._id !== toDelete._id)
      );
      setToDelete(null);
    } catch (err) {
      console.error("Error deleting subcategory:", err);
    }
  };
  return (
     <>
      <Box sx={pageWrapper}>
        <Typography variant="h4" gutterBottom sx={styles.title}>
          {mainCategory?.name} Topics
        </Typography>

        {loading && <Loader />}

        {error && (
          <NotFoundData message="Error loading quizzes" imag={loadingImg} />
        )}

        {!loading && !error && subCategories.length === 0 && (
          <NotFoundData message="No quizzes Available" imag={noDataImg} />
        )}

        {!loading && !error && subCategories.length > 0 && (
          <Box sx={mainWrapper}>
            <Box sx={listWrapper}>
              {subCategories.map((item) => (
                <Box key={item._id} sx={itemWrapper}>
                  <SubCategoriesItem
                    data={item}
                    onDelete={() => setToDelete(item)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${toDelete?.name}"?`}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default SubCategories;
