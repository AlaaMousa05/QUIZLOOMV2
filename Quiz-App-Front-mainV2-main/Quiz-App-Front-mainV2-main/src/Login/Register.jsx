import { useState} from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };


  return (
    <Box sx={Style.container}>
      <Paper elevation={8} sx={Style.paper}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>Sign Up</Typography>

        <form onSubmit={handleRegister}>
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth sx={Style.textField} required />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth sx={Style.textField} required />
          <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth sx={Style.textField} required />

          <Button type="submit" variant="contained" fullWidth sx={Style.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {typeof error === "string" ? error : error.message || "Register failed"}
            </Typography>
          )}


          {user && <Typography color="primary" sx={{ mt: 1 }}>{user.name} {user.role === "admin" && "(Admin)"}</Typography>}
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account? <a href="/login" style={{ color: "#2c356A" }}>Login</a>
        </Typography>
      </Paper>
    </Box>
  );
}
