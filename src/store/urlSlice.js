import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunks
export const createUrl = createAsyncThunk(
  'url/createUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await api.post('/url/create-url', urlData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create URL');
    }
  }
);

export const createFreeUrl = createAsyncThunk(
  'url/createFreeUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await api.post('/url/create-free-url', urlData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create URL');
    }
  }
);

export const deleteUrl = createAsyncThunk(
  'url/deleteUrl',
  async (shortUrl, { rejectWithValue }) => {
    try {
      await api.delete('/url/delete', { data: { shortUrl } });
      return shortUrl; // Return the deleted URL to remove from state
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete URL');
    }
  }
);

export const fetchMyUrls = createAsyncThunk(
  'url/fetchMyUrls',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/my_urls?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch URLs');
    }
  }
);

export const fetchUrlAnalytics = createAsyncThunk(
  'url/fetchUrlAnalytics',
  async (shortText, { rejectWithValue }) => {
    try {
      const response = await api.get(`/url/get-analytics/${shortText}`);
      return { shortText, data: response.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch analytics');
    }
  }
);

const initialState = {
  urls: [],
  createdUrl: null,
  isLoading: false,
  error: null,
  analytics: {}, // Store analytics by shortText
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCreatedUrl: (state) => {
      state.createdUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createUrl
      .addCase(createUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdUrl = action.payload.data;
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // createFreeUrl
      .addCase(createFreeUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFreeUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdUrl = action.payload.data;
      })
      .addCase(createFreeUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // deleteUrl
      .addCase(deleteUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urls = state.urls.filter(url => url.shortUrl !== action.payload);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchMyUrls
      .addCase(fetchMyUrls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urls = action.payload.data;
        state.pagination = {
          total: action.payload.total,
          page: parseInt(action.payload.page),
          limit: parseInt(action.payload.limit),
          totalPages: action.payload.totalPage,
        };
      })
      .addCase(fetchMyUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchUrlAnalytics
      .addCase(fetchUrlAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUrlAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics[action.payload.shortText] = action.payload.data;
      })
      .addCase(fetchUrlAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCreatedUrl } = urlSlice.actions;
export default urlSlice.reducer;
