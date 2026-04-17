import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const { user } = res.payload;
        if (user.role === "student") {
          navigate("/student");
        } else if (user.role === "admin") {
          navigate("/admin");
        }
      }
    });
  };

  return (
    <Box sx={Style.container}>
      <Paper elevation={8} sx={Style.paper}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            sx={Style.textField}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={Style.textField}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={Style.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {typeof error === "string"
                ? error
                : error.message || "Login failed"}
            </Typography>
          )}
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          New Account?{" "}
          <Link to="/register" style={{ color: "#2c356A" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
