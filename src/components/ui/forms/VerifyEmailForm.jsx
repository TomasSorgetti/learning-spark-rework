"use client";

import { useEffect, useState } from "react";
import { verifyEmail, resendCode } from "@/lib/queries/auth";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { usePathname, useRouter } from "next/navigation";
import CodeVerification from "./inputs/CodeVerification";
import ExpirationCodeCoundown from "../countdowns/ExpirationCodeCoundown";

export default function VerifyEmailForm() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const [userId, setUserId] = useState("");
  const [expiresIn, setExpiresIn] = useState(null);
  const [error, setError] = useState("");

  const { startLoading, finishLoading, isLoading } = useLoading();

  // Get user id and expires in
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

  // check if code is expired
  useEffect(() => {
    if (expiresIn !== null && expiresIn <= 0) {
      setError("The code has expired.");
    }
  }, [expiresIn]);

  const handleComplete = async (code) => {
    if (isLoading || !code || !userId) return;
    if (expiresIn !== null && expiresIn <= 0) {
      setError("The code has expired.");
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
        return;
      }

      localStorage.removeItem("emailVerification");

      router.push(`/${locale}/auth/login`);
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      finishLoading();
    }
  };

  const resendVerificationCode = async () => {
    if (!userId) return;
    try {
      startLoading();

      const response = await resendCode(userId);

      console.log("response:", response);
    } catch (error) {
      console.log("error:", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <ExpirationCodeCoundown
        expiresIn={expiresIn}
        setExpiresIn={setExpiresIn}
      />

      <div className="flex flex-col gap-4">
        <p className="text-red-500 h-6">{error}</p>
        <CodeVerification
          length={6}
          onComplete={handleComplete}
          disabled={isLoading}
        />
      </div>

      <button
        type="button"
        className="underline"
        onClick={resendVerificationCode}
        disabled={isLoading}
      >
        resend verification code
      </button>
    </section>
  );
}
