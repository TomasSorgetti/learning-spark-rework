"use server";

import LoginForm from "@/components/ui/forms/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Login Form</h1>
      <LoginForm />
    </main>
  );
}
