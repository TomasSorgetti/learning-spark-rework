"use client";

import "./TextEditor.css";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Italic, Quote, ListOrdered, List } from "lucide-react";

export default function TextEditor({ form, setForm, error, disabled, onBlur }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            "data-placeholder": "Ingresa tu contenido aquí...",
          },
        },
      }),
    ],
    content: form.content || "",
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setForm((prevForm) => ({
        ...prevForm,
        content: editor.getHTML(),
      }));
    },
    onBlur: ({ editor }) => {
      if (onBlur) {
        onBlur({ target: { name: "content", value: editor.getHTML() } });
      }
    },
    immediatelyRender: false,
  });

  if (!isMounted || !editor) {
    return <div>Cargando editor...</div>;
  }

  return (
    <div
      className={`textEditorContainer`}
      style={{
        border: error ? "1px solid red" : "1px solid #ccc",
        padding: "10px",
        minHeight: "300px",
        maxHeight: "420px",
        width: "100%",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {/* Barra de herramientas */}
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleBold().run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("bold") ? "#ddd" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleItalic().run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("italic") ? "#ddd" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <Italic />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("heading", { level: 2 })
              ? "#ddd"
              : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("heading", { level: 3 })
              ? "#ddd"
              : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("heading", { level: 4 })
              ? "#ddd"
              : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("heading", { level: 5 })
              ? "#ddd"
              : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          H5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleHeading({ level: 6 }).run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("heading", { level: 6 })
              ? "#ddd"
              : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          H6
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleBulletList().run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("bulletList") ? "#ddd" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <List />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleOrderedList().run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("orderedList") ? "#ddd" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <ListOrdered />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleBlockquote().run()
          }
          style={{
            padding: "5px 10px",
            background: editor.isActive("blockquote") ? "#ddd" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <Quote />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: "0",
          overflow: "auto",
        }}
      >
        <EditorContent
          editor={editor}
          className="editor"
          style={{
            width: "100%",
            height: "100%",
            padding: "5px",
            outline: "none",
            boxSizing: "border-box",
            minHeight: "200px",
            background: disabled ? "#f5f5f5" : "white",
          }}
        />
      </div>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}
