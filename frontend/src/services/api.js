import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // آدرس از .env خوانده میشه
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;