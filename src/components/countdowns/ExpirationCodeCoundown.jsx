"use client";

import { useEffect } from "react";

export default function ExpirationCodeCountdown({ expiresIn, setExpiresIn }) {
  useEffect(() => {
    if (!expiresIn || expiresIn <= 0) return;

    const interval = setInterval(() => {
      setExpiresIn((prev) => (prev !== null ? prev - 1000 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresIn]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2">
      <p>Code expires in:</p>
      <span>{expiresIn !== null ? formatTime(expiresIn) : "Loading..."}</span>
    </div>
  );
}
