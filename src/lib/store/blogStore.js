import { create } from "zustand";

const useBlogStore = create((set) => ({
  blog: null,
  Blogs: [],
  setBlog: (blog) => set({ blog }),
  setBlogs: (Blogs) => set({ Blogs }),
}));

export default useBlogStore;
