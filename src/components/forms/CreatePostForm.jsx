"use client";

import { useState } from "react";
import FormFieldInput from "./inputs/FormFieldInput";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import ImageInput from "./inputs/ImageInput";
import PostInput from "./inputs/PostInput";
import TextEditor from "@/components/textEditor/TextEditor";
import {
  ValidatePost,
  validatePostForm,
} from "../../lib/validators/PostValidation";
import { useSubjects } from "@/hooks/useSubjects";
import SubjectSelector from "./inputs/SubjectSelector";

export default function CreatePostForm() {
  const { isLoading, startLoading, finishLoading } = useLoading();
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = useSubjects();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    url: "",
    author: "",
    tags: "",
    subject: "",
  });

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
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatePostForm(form);
    setError(errors);

    if (Object.values(errors).some((error) => error !== "")) return;

    if (
      isLoading ||
      !form.title ||
      !form.content ||
      !form.image ||
      !form.url ||
      !form.author ||
      !form.tags
    )
      return;

    startLoading();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    // Images need to be sended as files in FormData
    formData.append("image", form.image);
    formData.append("url", form.url);
    formData.append("author", form.author);
    formData.append("tags", form.tags);
    formData.append("subject", form.subject);

    try {
    } catch (error) {
      console.log(error.message);
    } finally {
      finishLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex mt-20 h-screen">
      <title>{`Create Post - ${
        form.title.trim() !== "" ? form.title : "Learning Spark"
      }`}</title>
      <div className="w-full flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mt-16">Create Post</h1>
        <PostInput
          type="text"
          placeholder="Complete the title..."
          name="title"
          onChange={handleChange}
          value={form.title}
          onBlur={handleBlur}
          disabled={isLoading}
          error={error.title}
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
          label="Image:"
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
          placeholder="#tag1, #tag2, #tag3"
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
          Create Post
        </button>
      </aside>
    </form>
  );
}
