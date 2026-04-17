import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Quiz from "../../images/undraw_correct-answer_vjt7.svg";
import { COLORS } from "../../styles/colors";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { USER } from "../../enums/enum";
import { useState } from "react";
import StartQuiztDialog from "../../students/components/startQuiztDialog/StartQuiztDialog";
import {
  cardStyles,
  cardMediaStyles,
  descriptionTextStyles,
  cardActionsStyles,
  adminButtonStyles,
  deleteButtonStyles,
  studentButtonStyles,
} from "./SubCategoriesItem.styles";

const SubCategoriesItem = ({ data, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    navigate(`/admin/categories/${id}/${data._id}`);
  };

  const handleStartTest = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmStart = () => {
    console.log("Test started!");
    setOpenDialog(false);
    navigate(`/student/quiz/${data._id}`, { state: { subCategory: data } });
  };

  return (
    <>
      <Card sx={cardStyles}>
        <CardMedia
          component="img"
          alt="quiz"
          image={Quiz}
          sx={cardMediaStyles}
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={descriptionTextStyles}>
            {data.description}
          </Typography>
        </CardContent>

        <CardActions sx={cardActionsStyles}>
          {user.role === USER.ADMIN && (
            <>
              <Button
                size="small"
                variant="contained"
                sx={adminButtonStyles}
                onClick={handleClick}
              >
                View Questions
              </Button>

              <IconButton
                size="small"
                sx={deleteButtonStyles}
                onClick={onDelete}
              >
                <DeleteIcon sx={{ fontSize: 33 }} />
              </IconButton>
            </>
          )}

          {user.role === USER.STUDENT && (
            <Button
              size="small"
              variant="contained"
              sx={studentButtonStyles}
              onClick={handleStartTest}
            >
              Start Quiz
            </Button>
          )}
        </CardActions>
      </Card>

      <StartQuiztDialog
        open={openDialog}
        onClose={handleCloseDialog}
        data={data}
        onStart={handleConfirmStart}
      />
    </>
  );
};

export default SubCategoriesItem;
