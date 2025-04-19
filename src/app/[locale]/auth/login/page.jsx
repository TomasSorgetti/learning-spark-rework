"use server";

import LoginForm from "@/components/ui/forms/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const loginSuccessParam = resolvedSearchParams?.success;
  const loginErrorParam = resolvedSearchParams?.error;

  const loginSuccess = loginSuccessParam === "true";

  const t = await getTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-[42px]">Sign In</h1>
      <LoginForm loginSuccess={loginSuccess} loginError={loginErrorParam} />
    </main>
  );
}
