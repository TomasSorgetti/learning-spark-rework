"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import SubjectSelector from "./inputs/SubjectSelector";
import FormFieldInput from "./inputs/FormFieldInput";
import { useSubjects } from "@/hooks/useSubjects";
import { useLoading } from "@/features/loadingBar/context/loadingContext";

export default function BlogSearchBar({ search: initialSearch = "" }) {
  const { startLoading, finishLoading } = useLoading();

  const router = useRouter();
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = useSubjects();

  const [filter, setFilter] = useState({
    search: initialSearch,
    subject: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    startLoading();
    const delayDebounce = setTimeout(() => {
      const searchParam = filter.search
        ? `&search=${encodeURIComponent(filter.search)}`
        : "";
      const subjectParam =
        filter.subject !== "none" ? `&subject=${filter.subject}` : "";

      if (filter.search !== initialSearch || filter.subject !== "none") {
        finishLoading();
        router.push(`/blog?page=1${searchParam}${subjectParam}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filter.search, filter.subject, initialSearch, router]);

  return (
    <form
      className="w-full flex flex-col items-center lg:flex-row lg:justify-start gap-4 max-w-[1000px] mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormFieldInput
        label=""
        type="text"
        placeholder="search..."
        name="search"
        id="blog-search"
        value={filter.search}
        onChange={handleChange}
        disabled={false}
      />
      <SubjectSelector
        name="subject"
        id="blog-subject"
        subjectsLoading={subjectsLoading}
        subjectsError={subjectsError}
        subjects={subjects}
        form={filter}
        isLoading={false}
        onChange={handleChange}
      />
    </form>
  );
}
