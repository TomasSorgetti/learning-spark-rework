import { authInstance, formInstance } from "./axiosInstances";

export const getAllPosts = async ({ page = 1, limit = 10 }) => {
  try {
    const res = await authInstance.get(`/blog?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get posts",
    };
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const res = await authInstance.get(`/blog/post/${slug}`);

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get post",
    };
  }
};

export const getTopViewedPosts = async () => {
  try {
    const res = await authInstance.get(`/blog/top-viewed`);

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get top viewed posts",
    };
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
