import { authInstance, axiosInstance } from "./axiosInstances";
import { LRUCache } from "lru-cache";

const subjectsCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60,
});

export const getAllSubjects = async () => {
  const cachedSubjects = subjectsCache.get("subjects");
  if (cachedSubjects) {
    return cachedSubjects;
  }
  try {
    const res = await authInstance.get("/subject");
    subjectsCache.set("subjects", res.data);
    return res.data;
  } catch (error) {
    subjectsCache.delete("subjects");
    return {
      error: true,
      message: error.response?.data?.message || "Error to get subjects",
    };
  }
};

export const createSubject = async (name) => {
  try {
    const res = await axiosInstance.post("/subject", {
      name,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to create subject",
    };
  }
};
