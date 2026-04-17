import { useState, useEffect, Box, Typography, Stack, TextField, InputAdornment, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, SearchIcon, Loader, NotFoundData, ConfirmDialog, loadingImg, api, styles, } from "./studentsImports";
import StudentCard from "../../components/studentcards/StudentCard";
import StudentRow from "../../components/studentcards/StudentRow";
import { useFetch } from "../../../hooks/useFetch";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material"
export default function Students() {
  const { data: fetchedStudents, loading, error } = useFetch("students");
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setStudents(fetchedStudents?.students || []);
  }, [fetchedStudents]);

  const filtered = students.filter((s) =>
    `${s.name || s.fullName || s.username || ""} ${s.email || ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    try {
      await api.delete(`/students/${toDelete._id}`);
      setStudents((prev) =>
        prev.filter((s) => s._id !== toDelete._id)
      );
    } catch (err) {
      console.error("Failed to delete student", err);
    } finally {
      setToDelete(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <NotFoundData message="Error loading data" imag={loadingImg} />;


  return (
    <Box sx={styles.container}>
      <Stack sx={styles.headerStack}>
        <Typography sx={styles.title} variant="h4">Students Data</Typography>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          size="small"
          sx={styles.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {filtered.length === 0 ? (
        <NotFoundData message="No students found" imag={loadingImg} />
      ) : (
        <>
          <Box sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            {filtered.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onDelete={setToDelete}
                onView={setSelectedStudent}
              />
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeadCell}>Name</TableCell>
                    <TableCell sx={styles.tableHeadCell}>Email</TableCell>
                    <TableCell sx={styles.tableHeadCell} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((student) => (
                    <StudentRow
                      key={student._id}
                      student={student}
                      onDelete={setToDelete}
                      onView={setSelectedStudent}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete Student"
        message={`Are you sure you want to delete "${toDelete?.name}"?`}
        onClose={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <Dialog
        open={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Student Info</DialogTitle>
        <DialogContent dividers>
          {selectedStudent && (
            <>
              <Typography><b>Status:</b> {selectedStudent.status}</Typography>
              <Typography><b>Quizzes Completed:</b> {selectedStudent.quizzesCompleted}</Typography>
              <Typography><b>Score:</b> {selectedStudent.score}%</Typography>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedStudent(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

};


