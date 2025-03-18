"use client";

import { useEffect, useRef } from "react";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useSubjectStore from "@/lib/store/subjectStore";
import { getAllSubjects } from "@/lib/queries/subjects";

export const useSubjects = () => {
  const {
    subjects,
    setSubjects,
    loading: subjectsLoading,
    setLoading,
    error,
    setError,
  } = useSubjectStore();
  const { startLoading, finishLoading } = useLoading();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      startLoading();
      try {
        const response = await getAllSubjects();
        const data = Array.isArray(response) ? response : [];
        setSubjects(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch subjects"
        );
        setSubjects([]);
      } finally {
        setLoading(false);
        finishLoading();
      }
    };

    if (!hasFetched.current && !subjects.length && !subjectsLoading && !error) {
      hasFetched.current = true;
      fetchSubjects();
    }
  }, [subjects, subjectsLoading, error, setSubjects, setLoading, setError]);

  return { subjects, loading: subjectsLoading, error };
};
