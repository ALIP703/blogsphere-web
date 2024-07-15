import axios from 'axios';
import Cookies from 'js-cookie';
// import { useHistory } from 'react-router-dom';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
});

// Add a request interceptor to attach the session ID from cookies
axiosInstance.interceptors.request.use(
  config => {
    const sessionId = Cookies.get('sessionId');
    if (sessionId) {
      config.headers['Authorization'] = `Bearer ${sessionId}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle forbidden responses
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response
      // useHistory().push('/login'); // Redirect to login route
      console.log('forbidden');
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;