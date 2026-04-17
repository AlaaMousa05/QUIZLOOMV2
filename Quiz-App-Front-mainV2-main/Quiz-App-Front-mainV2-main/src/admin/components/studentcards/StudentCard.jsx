import { Card, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styles } from "../../screens/students/style";

export default function StudentCard({ student, onDelete, onView }) {
  return (
    <Card key={student._id} sx={styles.cardMobile}>
      <Box sx={styles.cardMobileInfo}>
        <Typography sx={styles.tableNameText}>
          {student.name || student.fullName || student.username}
        </Typography>
        <Typography>{student.email}</Typography>
      </Box>
      <Box sx={styles.actionButtons}>
        <IconButton
          aria-label={`view-${student._id}`}
          color="primary"
          size="large"
          onClick={() => onView(student)}
        >
          <VisibilityIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label={`delete-${student._id}`}
          color="error"
          size="large"
          onClick={() => onDelete(student)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Box>
    </Card>
  );
}
