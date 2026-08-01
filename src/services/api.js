import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.success === false) {
      return Promise.reject(new Error(data.error || "Request failed"));
    }

    return response;
  },

  (error) => {
    if (error.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timeout."));
    }

    if (!error.response) {
      return Promise.reject(new Error("Unable to connect to the server."));
    }

    return Promise.reject(error);
  },
);

export default api;
