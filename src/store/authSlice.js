

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/signup', userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/verify-signup', verificationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Verification failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/logout');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/me');
      return response;
    } catch (error) {
      return rejectWithValue(null); // Silent failure for initial auth check
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  verificationEmail: '', // Store email during verification process
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationEmail = action.meta.arg.email; // Store email for verification
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Verify Signup
      .addCase(verifySignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifySignup.fulfilled, (state) => {
        state.isLoading = false;
        state.verificationEmail = ''; // Clear after verification
      })
      .addCase(verifySignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        // Still logout on the client side even if server fails
        state.isAuthenticated = false;
        state.user = null;
      })
      
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setVerificationEmail } = authSlice.actions;
export default authSlice.reducer;
