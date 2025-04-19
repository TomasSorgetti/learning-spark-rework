"use client";

import { useState } from "react";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { register } from "@/lib/queries/auth";
import {
  validateRegisterField,
  validateRegisterForm,
} from "@/lib/validators/registerValidator";
import { usePathname, useRouter } from "next/navigation";
import FormFieldInput from "./inputs/FormFieldInput";
import { useTranslations } from "next-intl";
import GoogleButton from "../buttons/GoogleButton";

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const { startLoading, finishLoading, isLoading } = useLoading();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: validateRegisterField(name, value, t),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !form.name || !form.email || !form.password) return;

    const validationErrors = validateRegisterForm(form, t);

    setError(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    startLoading();

    try {
      const response = await register(form);
      if (response.error) {
        return;
      }
      resetForm();
      localStorage.setItem(
        "emailVerification",
        JSON.stringify({
          userId: response._id,
          createdAt: response.createdAt,
        })
      );
      router.push(`/${locale}/auth/verify-email`);
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      finishLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
      <GoogleButton />
      <p className="text-center">or</p>
      <FormFieldInput
        label={t("name.label")}
        type="text"
        placeholder={t("name.placeholder")}
        name="name"
        id="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        error={error.name}
      />
      <FormFieldInput
        label={t("email.label")}
        type="text"
        placeholder={t("email.placeholder")}
        name="email"
        id="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        error={error.email}
      />
      <FormFieldInput
        label={t("password.label")}
        type="password"
        name="password"
        placeholder={t("password.placeholder")}
        id="password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        error={error.password}
        isPassword
      />

      <button
        type="submit"
        className={`${
          isLoading
            ? "pointer-events-none opacity-50"
            : "cursor-pointer hover:bg-red-600"
        }  bg-red-500 text-white py-3 rounded-full transition-all duration-500`}
      >
        Register
      </button>
    </form>
  );
}
