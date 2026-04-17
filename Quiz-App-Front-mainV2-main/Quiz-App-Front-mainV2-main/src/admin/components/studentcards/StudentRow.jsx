import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styles } from "../../screens/students/style";

export default function StudentRow({ student, onDelete, onView }) {
  return (
    <TableRow key={student._id} hover sx={{ height: 40 }}>
      <TableCell sx={{ py: 0.5 }}>
        <Typography sx={styles.tableNameText}>
          {student.name || student.fullName || student.username}
        </Typography>
      </TableCell>
      <TableCell sx={{ py: 0.5 }}>{student.email}</TableCell>
      <TableCell sx={{ py: 0.5 }} align="right">
        <IconButton
          aria-label={`view-${student._id}`}
          color="primary"
          size="small"
          onClick={() => onView(student)}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label={`delete-${student._id}`}
          color="error"
          size="small"
          onClick={() => onDelete(student)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
