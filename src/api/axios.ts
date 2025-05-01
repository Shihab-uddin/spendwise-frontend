import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // use your backend base URL
  withCredentials: true, // if using cookies
});

export default instance;
