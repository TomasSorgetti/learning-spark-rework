"use client";

import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    if (!ref?.current || typeof callback !== "function") return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback]);
}
