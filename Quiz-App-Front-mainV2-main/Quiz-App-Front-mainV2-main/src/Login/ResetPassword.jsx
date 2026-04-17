import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Style } from "./style";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <Box sx={Style.container}>
      <Paper elevation={8} sx={Style.paper}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
          Reset Password
        </Typography>

        <form onSubmit={handleReset}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={Style.textField}
            required
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            sx={Style.textField}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            sx={Style.textField}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={Style.button}>
            Reset Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
