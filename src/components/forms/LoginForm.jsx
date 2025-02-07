"use client";

import { useState } from "react";
import { login } from "@/queries/auth";
import { useLoading } from "@/features/loadingBar/context/loadingContext";

export default function LoginForm() {
  const { startLoading, finishLoading } = useLoading();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

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

      console.log(response);
      resetForm();
      localStorage.setItem("isAuthenticated", true);
      // navigate("/");
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      finishLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}
      <label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="rememberme"
          checked={form.rememberme}
          onChange={handleChange}
        />
        Recordarme
      </label>
      <button type="submit" className="cursor-pointer bg-red-500 text-white">
        Login
      </button>
    </form>
  );
}
