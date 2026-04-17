import { useState } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, Tooltip, CircularProgress } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { api } from "../../api/baseUrl";

export default function DialogAction({ student, iconSize = 20 }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await api.get(`/students/${student._id}`);
      setDetails(res.data?.student || null);
    } catch (err) {
      console.error('Failed to fetch student details', err);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="View Details">
        <IconButton onClick={handleOpen} color="primary" size="large">
          <VisibilityIcon sx={{ fontSize: iconSize }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Student Information</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" my={0}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1} mt={1}>
              <Typography variant="body1"><strong>Score:</strong> {details?.score ?? student.score}</Typography>
              <Typography variant="body1"><strong>Quizzes Completed:</strong> {details?.quizzesCompleted ?? student.quizzesCompleted}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {details?.status ?? student.status}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="contained" size="small">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
