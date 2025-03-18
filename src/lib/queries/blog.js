import { authInstance, formInstance } from "./axiosInstances";

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

export const createPost = async (formData) => {
  try {
    const res = await formInstance.post(`/blog`, formData);

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to create post",
    };
  }
};
