
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // This is important for cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - could redirect to login
        console.log('Unauthorized request');
      }
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default api;
