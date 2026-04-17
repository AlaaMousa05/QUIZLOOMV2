import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import {
  dialogPaper,
  iconWrapper,
  iconStyle,
  dialogTitle,
  contentBox,
  labelText,
  valueText,
  dividerStyle,
  dialogActions,
  cancelButton,
  startButton,
} from "./StartQuizDialog.styles";

const StartQuizDialog = ({ open, onClose, data, onStart }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: dialogPaper }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mt={-3}>
        <Box sx={iconWrapper}>
          <MenuBookIcon sx={iconStyle} />
        </Box>
      </Box>

      <DialogTitle sx={dialogTitle}>Are you ready?</DialogTitle>

      <DialogContent sx={{ mt: 1, mb: 1 }}>
        <Box sx={contentBox}>
          <Typography variant="h6" sx={labelText}>
            Quiz Name: <span style={valueText}>{data.name}</span>
          </Typography>
          <Typography variant="h6" sx={labelText}>
            Quiz Description: <span style={valueText}>{data.description}</span>
          </Typography>
          <Typography variant="h6" sx={labelText}>
            Number of Questions: <span style={valueText}>20</span>
          </Typography>
          <Typography variant="h6" sx={labelText}>
            Duration: <span style={valueText}>30 minutes</span>
          </Typography>
          <Divider sx={dividerStyle} />
        </Box>
      </DialogContent>

      <DialogActions sx={dialogActions}>
        <Button onClick={onClose} sx={cancelButton}>
          Cancel
        </Button>
        <Button onClick={onStart} variant="contained" sx={startButton}>
          Start Quiz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartQuizDialog;
