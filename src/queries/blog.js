import { authInstance } from "./axiosInstances";

export const getAllPosts = async () => {
  try {
    const res = await authInstance.get("/blog");

    return res.data;
  } catch (error) {
    return [];
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const res = await authInstance.get(`/blog/${slug}`);

    return res.data;
  } catch (error) {
    return {};
  }
};
