import axios from "axios";
import { useAuthStore } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // آدرس از .env خوانده میشه
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const access = useAuthStore.getState().access // خواندن توکن از zustand
    if (access) {
      config.headers.Authorization = `Bearer ${access}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh = localStorage.getItem("refresh")
        if (refresh) {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users/refresh`,
            { refresh }
          )
          const newAccess = res.data.access

          useAuthStore.getState().login(newAccess, refresh)
          localStorage.setItem('access', newAccess)

          originalRequest.headers.Authorization = `Bearer ${newAccess}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().logout()
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
      }
    }
    return Promise.reject(error)
  }
)

export default api;