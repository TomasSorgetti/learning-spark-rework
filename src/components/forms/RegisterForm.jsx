"use client";

import { useState } from "react";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { register } from "@/lib/api/auth";
import {
  validateRegisterField,
  validateRegisterForm,
} from "@/lib/validators/registerValidator";
import { useTranslations } from "use-intl";
import { usePathname, useRouter } from "next/navigation";

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];
  const { startLoading, finishLoading } = useLoading();
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

    const validationErrors = validateRegisterForm(form);

    setError(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    startLoading();

    try {
      const response = await register(form);
      if (response.error) {
        console.log(response.message);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100">
      <label>
        <input
          type="text"
          placeholder={t("name.placeholder")}
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.name && <small className="text-red-500">{error.name}</small>}
      </label>
      <label>
        <input
          type="text"
          placeholder={t("email.placeholder")}
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.email && <small className="text-red-500">{error.email}</small>}
      </label>
      <label>
        <input
          type="password"
          name="password"
          placeholder={t("password.placeholder")}
          id="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.password && (
          <small className="text-red-500">{error.password}</small>
        )}
      </label>
      <button type="submit" className="cursor-pointer bg-red-500 text-white">
        Register
      </button>
    </form>
  );
}
