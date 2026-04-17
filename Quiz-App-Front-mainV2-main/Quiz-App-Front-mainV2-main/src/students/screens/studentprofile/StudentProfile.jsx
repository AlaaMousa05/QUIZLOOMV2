import { useEffect, useState } from "react";
import './studentprofile.css'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { FaCamera, FaEdit, FaSave } from "react-icons/fa";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import loadingImg from "../../../images/Loading-rafiki (1).png";
import { api } from "../../../api/baseUrl";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [saveError, setSaveError] = useState("");

  const { data, loading, error } = useFetch('students/profile');
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: ""
  });
  useEffect(() => {
    if (data?.student) {
      const student = data.student;
      setProfileData({
        fullName:
          student.fullName ||
          `${student.firstName || ""} ${student.lastName || ""}`.trim(),
        username: student.username || "",
        email: student.email || "",
        password: "",
        avatar: student.avatar || student.profileImage || "",
      });
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NotFoundData message="Error loading " imag={loadingImg} />;


  const handleEditToggle = () => {
    if (isEditing) {
      setOpenDialog(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSave = async () => {
    setOpenDialog(false);
    setSaveError("");
    try {
      const payload = {
        fullName: profileData.fullName,
        username: profileData.username,
        email: profileData.email,
        avatar: profileData.avatar,
      };

      if (profileData.password?.trim()) {
        payload.password = profileData.password.trim();
      }

      const res = await api.put("/students/profile", payload);
      const updated = res.data?.student;

      setProfileData((prev) => ({
        ...prev,
        fullName:
          updated?.fullName ||
          `${updated?.firstName || ""} ${updated?.lastName || ""}`.trim(),
        username: updated?.username || prev.username,
        email: updated?.email || prev.email,
        password: "",
        avatar: updated?.avatar || updated?.profileImage || prev.avatar,
      }));
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Failed to update profile");
    }
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <Box position="relative" textAlign="center">
        <Avatar src={profileData.avatar} alt={profileData.fullName} className="profile-avatar">
          <div className="camera-overlay">
            <label>
              <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
              <FaCamera size={26} color="white" style={{ cursor: "pointer" }} />
            </label>
          </div>
        </Avatar>
      </Box>

      <Stack className="profile-fields">
        <TextField
          fullWidth
          name="fullName"
          label="Full Name"
          value={profileData.fullName ?? ""}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={profileData.username ?? ""}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={profileData.email ?? ""}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={profileData.password ?? ""}
          disabled={!isEditing}
          onChange={handleChange}
        />
      </Stack>

      <div className="edit-button">
        <Button
          variant="contained"
          color={isEditing ? "success" : "primary"}
          startIcon={isEditing ? <FaSave /> : <FaEdit />}
          onClick={handleEditToggle}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
        {saveError && (
          <Box mt={1} color="error.main">
            {saveError}
          </Box>
        )}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Save Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to save the changes to your profile?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} autoFocus >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

