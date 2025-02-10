import axios from "axios";
import authInterceptor from "@/lib/config/axios";

const BASE_URL = "http://localhost:8080/v1";

export const authInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authInterceptor(axiosInstance);
