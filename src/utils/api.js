import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  // Auth endpoints
  me: '/me',
  signup: '/user/signup',
  verifySignup: '/user/verify-signup',
  login: '/user/login',
  logout: '/user/logout',
  
  // URL endpoints
  createFreeUrl: '/url/create-free-url',
  createUrl: '/url/create-url',
  deleteUrl: '/url/delete',
  myUrls: '/user/my_urls',
  getAnalytics: (shortText) => `/get-analytics/${shortText}`,
  getOriginalUrl: (shortText) => `/get/${shortText}`,
};

// Auth services
export const authService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get(endpoints.me);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error fetching user data' };
    }
  },
  
  signup: async (userData) => {
    try {
      const response = await api.post(endpoints.signup, userData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  },
  
  verifySignup: async (verificationData) => {
    try {
      const response = await api.post(endpoints.verifySignup, verificationData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Verification failed' };
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await api.post(endpoints.login, credentials);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  },
  
  logout: async () => {
    try {
      const response = await api.post(endpoints.logout);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Logout failed' };
    }
  },
};

// URL services
export const urlService = {
  createFreeUrl: async (urlData) => {
    try {
      const response = await api.post(endpoints.createFreeUrl, urlData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create URL' };
    }
  },
  
  createUrl: async (urlData) => {
    try {
      const response = await api.post(endpoints.createUrl, urlData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create URL' };
    }
  },
  
  deleteUrl: async (shortUrl) => {
    try {
      const response = await api.delete(endpoints.deleteUrl, { data: { shortUrl } });
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete URL' };
    }
  },
  
  getMyUrls: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`${endpoints.myUrls}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch URLs' };
    }
  },
  
  getAnalytics: async (shortText) => {
    try {
      const response = await api.get(endpoints.getAnalytics(shortText));
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch analytics' };
    }
  },
  
  getOriginalUrl: async (shortText) => {
    try {
      const response = await api.get(endpoints.getOriginalUrl(shortText));
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch original URL' };
    }
  },
};

export default api;