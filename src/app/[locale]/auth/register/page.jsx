"use server";

import RegisterForm from "@/components/ui/forms/RegisterForm";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-[42px]">Sign Up</h1>
      <RegisterForm />
    </main>
  );
}
