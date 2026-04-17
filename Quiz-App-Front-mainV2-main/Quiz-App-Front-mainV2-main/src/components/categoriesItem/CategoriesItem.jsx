import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import fallbackCategoryImage from "../../images/subcategorisImage.png";
const CategoriesItem = ({ data, showAdminActions = false, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handelClick = () => {
    navigate(`/${user.role}/categories/${data._id}`, {
      state: { mainCategory: data },
    });
  };
  return (
    <Card>
      <CardActionArea sx={{ width: 320, height: 300 }} onClick={handelClick}>
        <CardMedia
          component="img"
          image={data.imageUrl || fallbackCategoryImage}
          alt={data.name}
          sx={{ height: 140, objectFit: "contain", p: 0 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {showAdminActions && (
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => onEdit?.(data)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete?.(data)}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CategoriesItem;
