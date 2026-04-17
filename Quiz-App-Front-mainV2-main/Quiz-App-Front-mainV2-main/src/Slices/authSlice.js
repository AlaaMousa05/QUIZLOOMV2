import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/baseUrl";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
        firstName: username,
        lastName: username,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    isAdmin: false,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAdmin = false;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setUserFromStorage: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user?.role;
      state.isAdmin = action.payload.user?.role === "admin";
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.role = action.payload.user?.role || null;
        state.isAdmin = action.payload.user?.role === "admin";
        state.token = action.payload.token || null;

        if (state.user)
          localStorage.setItem("user", JSON.stringify(state.user));
        if (state.token) localStorage.setItem("token", state.token);

        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.role = action.payload.user?.role || null;
        state.isAdmin = action.payload.user?.role === "admin";
        state.token = action.payload.token || null;

        if (state.user)
          localStorage.setItem("user", JSON.stringify(state.user));
        if (state.token) localStorage.setItem("token", state.token);

        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.user = null;
        state.role = null;
        state.isAdmin = false;
        state.token = null;
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
