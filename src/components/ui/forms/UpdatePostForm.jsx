"use client";

import { useState } from "react";
import FormFieldInput from "./inputs/FormFieldInput";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import ImageInput from "./inputs/ImageInput";
import TextEditor from "@/components/ui/textEditor/TextEditor";
import {
  ValidatePost,
  validatePostForm,
} from "../../../lib/validators/UpdatePostValidation";
import { useSubjects } from "@/hooks/useSubjects";
import SubjectSelector from "./inputs/SubjectSelector";
import { updatePost, deletePost } from "@/lib/queries/blog";
import { useToastContext } from "@/features/toast/ToastContext";
import { useRouter } from "@/i18n/routing";

export default function UpdatePostForm({ post = {} }) {
  const router = useRouter();
  const { addToast } = useToastContext();
  const { isLoading, startLoading, finishLoading } = useLoading();
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = useSubjects();

  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
    image: null,
    url: post.url,
    author: post.author,
    tags: post.tags,
    subject: post.subjectId._id,
  });

  const [previewImage, setPreviewImage] = useState(
    post.image || "/images/placeholder.png"
  );

  const [error, setError] = useState({
    title: "",
    content: "",
    image: "",
    url: "",
    author: "",
    tags: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "image") {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setError((prev) => ({
            ...prev,
            image: "Please select an image file",
          }));
          return;
        }
        setForm((prev) => ({
          ...prev,
          image: file,
        }));

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (name === "tags") {
      const tags = value.split(",").map((tag) => tag.trim());

      setForm((prev) => ({
        ...prev,
        tags,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = ValidatePost(name, value);
    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePostForm(form);
    setError(errors);

    if (Object.values(errors).some((error) => error !== "")) return;

    if (
      isLoading ||
      !post._id ||
      !form.title ||
      !form.content ||
      !form.url ||
      !form.author ||
      !form.tags
    )
      return;

    startLoading();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("url", form.url);
    formData.append("author", form.author);
    formData.append("tags", form.tags);
    formData.append("subjectId", form.subject);

    if (form.image && form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      const res = await updatePost(post._id, formData);
      console.log(res);
      if (res.error) {
        throw new Error(res.message);
      }
      addToast("Post updated successfully", "success");
      router.replace("/admin/blog");
    } catch (error) {
      addToast("Error to update post", "error");
      console.log(error.message);
    } finally {
      finishLoading();
    }
  };

  const handleDeletePost = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;
    try {
      startLoading();
      const res = await deletePost(post._id);
      console.log(res);
      if (res.error) {
        console.log("error:", res.message);
        throw new Error(res.message);
      } else {
        addToast("Post deleted successfully", "success");
        router.replace("/admin/blog");
      }
    } catch (error) {
      console.log("Second Error:", error);
      addToast("Error to delete post", "error");
    } finally {
      finishLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full flex mt-20 h-screen"
    >
      <div
        className="absolute top-0 left-0 w-full h-[300px] bg-center bg-no-repeat bg-cover z-[-1] bg-gray-400"
        style={{
          backgroundImage: `url(${previewImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <title>{`Update Post - ${
        form.title.trim() !== "" ? form.title : "Learning Spark"
      }`}</title>

      <div className="w-full flex flex-col items-center gap-4">
        <h1 className="text-3xl text-white font-bold mt-16">Update Post</h1>
        <input
          type="text"
          placeholder="Complete the title..."
          name="title"
          onChange={handleChange}
          value={form.title}
          onBlur={handleBlur}
          disabled={isLoading}
          error={error.title}
          className="bg-transparent text-[3rem] text-center text-white font-bold mx-auto"
        />
        <TextEditor
          form={form}
          setForm={setForm}
          error={error.content}
          disabled={isLoading}
          onBlur={handleBlur}
        />
      </div>

      <aside className="w-[400px] bg-white shadow-2xl flex flex-col items-start px-6 py-10">
        <h2 className="text-2xl mb-8 font-bold">Metadata</h2>
        <SubjectSelector
          name="subject"
          id="post-subject"
          subjectsLoading={subjectsLoading}
          subjectsError={subjectsError}
          subjects={subjects}
          form={form}
          isLoading={isLoading}
          error={error.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ImageInput
          label="Image: (1440x400)"
          id="post-image"
          name="image"
          onChange={handleChange}
          disabled={isLoading}
          error={error.image}
          fileName={form.image?.name || ""}
          onBlur={handleBlur}
        />
        <FormFieldInput
          label="Url:"
          type="text"
          placeholder="primer-post"
          name="url"
          id="post-url"
          value={form.url}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          error={error.url}
        />
        <FormFieldInput
          label="Author:"
          type="text"
          placeholder="Anonymous"
          name="author"
          id="post-author"
          value={form.author}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          error={error.author}
        />
        <FormFieldInput
          label="Tags:"
          type="text"
          placeholder="tag1, tag2, tag3"
          name="tags"
          id="post-tags"
          value={form.tags}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          error={error.tags}
        />
        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-primary transition-all duration-500 hover:bg-alter3 hover:shadow-xl focus:bg-alter4 py-2 text-center text-white font-semibold lg:py-4"
        >
          Update Post
        </button>
        <div className="flex items-center gap-2 w-full justify-center mt-4">
          <p>I want to</p>
          <button
            type="button"
            onClick={handleDeletePost}
            className="text-red-500 underline hover:text-red-700"
          >
            Delete Post
          </button>
        </div>
      </aside>
    </form>
  );
}
