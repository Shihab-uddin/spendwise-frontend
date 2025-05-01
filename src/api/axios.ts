import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // use your backend base URL
  withCredentials: true, // if using cookies
});

// Add a request interceptor to dynamically set the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
