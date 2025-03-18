
import { authInstance, axiosInstance } from "./axiosInstances";

export const getAllSubjects = async () => {
    try {
      const res = await authInstance.get("/subject");
  
      return res.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || "Error to get subjects",
      };
    }
  };