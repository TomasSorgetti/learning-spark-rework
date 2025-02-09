"use client";

import { useEffect, useState } from "react";
import { login } from "@/queries/auth";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useAuthStore from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/lib/store/userStore";
import FormFieldInput from "./inputs/FormFieldInput";

export default function LoginForm() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const { isLoading, startLoading, finishLoading } = useLoading();
  const { setIsAuthenticated, setIsAdmin } = useAuthStore();
  const { setUser } = useUserStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const rememberme = localStorage.getItem("rememberme");

    if (rememberme === "true") {
      setForm((prevForm) => ({
        ...prevForm,
        rememberme: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      localStorage.setItem("rememberme", checked ? "true" : "false");
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
      rememberme: false,
    });
  };
  const handleBlur = (e) => {
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    startLoading();

    try {
      const response = await login(form);

      if (response.error) {
        setError(response.message);
        return;
      }

      resetForm();
      setUser(response);
      setIsAuthenticated(true);

      response.roles.forEach((role) => {
        if (role.name === "admin") {
          setIsAdmin(true);
        }
      });

      router.push(`/${locale}`);
    } catch (error) {
      console.log(error);

      setError("Something went wrong.");
    } finally {
      finishLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
      {error && <p className="text-red-500">{error}</p>}
      <FormFieldInput
        label="Email:"
        type="text"
        placeholder="example@gmail.com"
        name="email"
        id="login-email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
      />
      <FormFieldInput
        label="Password:"
        type="password"
        name="password"
        placeholder="********"
        id="login-password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        isPassword
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="rememberme"
          checked={form.rememberme}
          onChange={handleChange}
        />
        Recordarme
      </label>
      <button
        type="submit"
        className="cursor-pointer bg-red-500 text-white mt-6 py-3 rounded-full transition-all duration-500 hover:bg-red-600"
      >
        Login
      </button>
    </form>
  );
}
