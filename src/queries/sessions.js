import axios from "axios";
import { authInstance, axiosInstance } from "./axiosInstances";

axios.defaults.withCredentials = true;

export const getAllSessions = async () => {
  try {
    const res = await axiosInstance.get(`/session`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get sessions",
    };
  }
};
