import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// Middleware (interceptor) to add Authorization header automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    // debugger;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use((response)=> response, (error)=>{
  if (error.response && error.response.status === 401) {
    console.warn("Unauthorized! Redirecting to login...");
    localStorage.removeItem("auth_token");

    window.location.href = "/login";
  }
  return Promise.reject(error);
});

export default api;
