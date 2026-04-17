// AlertMessage.js
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { hideAlert } from "../../../redux/quizSlice";

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.quiz);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideAlert());
  };

  return (
    <Snackbar
      open={!!alert.show}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 1400 }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        icon={<Notifications />}
        sx={{ borderRadius: 1 }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;