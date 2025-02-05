"use client";

import { useState, useEffect, useCallback } from "react";

const useLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const finishLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 500);
  }, []);

  return { progress, isLoading, startLoading, finishLoading };
};

export default useLoadingBar;
