import { authInstance, formInstance } from "./axiosInstances";
import { LRUCache } from "lru-cache";

const postsCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60,
});
const topPostsCache = new LRUCache({
  max: 10,
  ttl: 1000 * 60 * 60 * 24,
});

export const getAllPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  subject = "all",
}) => {
  const cacheKey = `posts_page_${page}_limit_${limit}_search_${
    search || "none"
  }_subject_${subject}`;
  const cached = postsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const url = `/blog?page=${page}&limit=${limit}${
      search ? `&search=${encodeURIComponent(search)}` : ""
    }${subject !== "all" ? `&subject=${subject}` : ""}`;
    const res = await authInstance.get(url);
    const data = res.data;
    postsCache.set(cacheKey, data);
    return data;
  } catch (error) {
    const errorData = {
      error: true,
      message: error.response?.data?.message || "Error to get posts",
    };
    postsCache.set(cacheKey, errorData);
    return errorData;
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
  const cacheKey = "top_viewed_posts";
  const cached = topPostsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const res = await authInstance.get(`/blog/top-viewed`);
    const data = res.data;
    topPostsCache.set(cacheKey, data);
    return data;
  } catch (error) {
    const errorData = {
      error: true,
      message: error.response?.data?.message || "Error to get top viewed posts",
    };
    topPostsCache.set(cacheKey, errorData);
    return errorData;
  }
};

export const createPost = async (formData) => {
  try {
    const res = await formInstance.post(`/blog`, formData);
    postsCache.clear();
    topPostsCache.clear();
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to create post",
    };
  }
};
