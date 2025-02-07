"use client";

import { useEffect, useState } from "react";
import { verifyEmail } from "@/lib/api/auth";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { usePathname, useRouter } from "next/navigation";

export default function VerifyEmailForm() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [expiresIn, setExpiresIn] = useState(null);
  const [error, setError] = useState("");

  const { startLoading, finishLoading } = useLoading();

  useEffect(() => {
    const emailVerification = localStorage.getItem("emailVerification");

    if (emailVerification) {
      const { userId, createdAt } = JSON.parse(emailVerification);
      setUserId(userId);

      const codeExpiresAt = new Date(createdAt);
      codeExpiresAt.setMinutes(codeExpiresAt.getMinutes() + 10);
      setExpiresIn(codeExpiresAt.getTime() - Date.now());
    }
  }, []);

  useEffect(() => {
    if (expiresIn && expiresIn <= 0) {
      setError("The code has expired.");
    }
  }, [expiresIn]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const resetForm = () => {
    setCode("");
    setError("");
  };

  const handleSubmit = async () => {
    if (expiresIn <= 0) {
      setError("El código ha expirado.");
      return;
    }

    startLoading();
    try {
      const response = await verifyEmail({
        userId,
        code,
      });
      if (response.error) {
        setError(response.message);
        console.log(response.message);
        return;
      }
      resetForm();
      localStorage.removeItem("emailVerification");
      console.log(response);

      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      finishLoading();
    }
  };

  const resendCode = async () => {};

  return (
    <>
      <p>Expires in: {expiresIn}</p>
      <form className="flex flex-col gap-4 bg-gray-100">
        {error && <p className="text-red-500">{error}</p>}
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
        <button type="button" onClick={handleSubmit}>
          verify
        </button>
      </form>
      <button type="button" onClick={resendCode}>
        resend verification code
      </button>
    </>
  );
}
