"use client";

import { useState } from "react";
import FormFieldInput from "./inputs/FormFieldInput";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import ImageInput from "./inputs/ImageInput";
import PostInput from "./inputs/PostInput";
import TextEditor from "@/components/textEditor/TextEditor";

export default function CreatePostForm() {
  const { isLoading } = useLoading();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    url: "",
    author: "",
    tags: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex mt-20 h-screen">
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
        />
        <TextEditor
          form={form}
          setForm={setForm}
          error={false}
          disabled={isLoading}
        />
      </div>

      <aside className="w-[400px] bg-white shadow-2xl flex flex-col items-start px-6 py-10">
        <h2 className="text-2xl mb-8 font-bold">Metadata</h2>
        <ImageInput label="Image:" id="post-image" name="image" />
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
