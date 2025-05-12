"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { useToastContext } from "@/features/toast/ToastContext";
import { createSubject } from "@/lib/queries/subjects";
import { useState } from "react";

export default function SubjectForm() {
  const [subject, setSubject] = useState("");
  const { isLoading, startLoading, finishLoading } = useLoading();
  const { addToast } = useToastContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) return;

    startLoading();
    try {
      const res = await createSubject(subject);
      if (res.error) {
        throw new Error(res.message);
      }
      addToast("Subject created successfully", "success");
      setSubject("");
    } catch (error) {
      addToast("Error to create subject", "error");
      console.log(error.message);
    } finally {
      finishLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-subject">Name:</label>
        <input
          type="text"
          id="create-subject"
          name="subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
      </div>
      <button>Create Subject</button>
    </form>
  );
}
