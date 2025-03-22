import { authInstance, formInstance } from "./axiosInstances";

export const getAllPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  subject = "all",
}) => {
  try {
    const url = `/blog?page=${page}&limit=${limit}${
      search ? `&search=${encodeURIComponent(search)}` : ""
    }${subject !== "all" ? `&subject=${subject}` : ""}`;
    const res = await authInstance.get(url);
    const data = res.data;
    return data;
  } catch (error) {
    const errorData = {
      error: true,
      message: error.response?.data?.message || "Error to get posts",
    };
    return errorData;
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const res = await authInstance.get(`/blog/post/${slug}`);
    const data = res.data;
    return data;
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
    const data = res.data;
    return data;
  } catch (error) {
    const errorData = {
      error: true,
      message: error.response?.data?.message || "Error to get top viewed posts",
    };
    return errorData;
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

export const updatePost = async (postId, formData) => {
  try {
    const res = await formInstance.patch(`/blog/${postId}`, formData);
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to update post",
    };
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await formInstance.delete(`/blog/${postId}`);
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to delete post",
    };
  }
};
