"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmailForm() {
  const [code, setCode] = useState("");
  const handleChange = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (code.length >= 6) {
      handleSubmit();
    }
  }, [code]);
  const handleSubmit = async () => {
    await axios
      .patch("http://localhost:8080/v1/auth/verify", {
        code,
        userId: "67a4d454347d85425baf6f5b",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <form className="flex flex-col gap-4 bg-gray-100">
      <label>
        <input
          type="text"
          placeholder="code"
          name="code"
          id="code"
          value={code}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
