"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useUserStore from "@/lib/store/userStore";
import { useState } from "react";
import FormFieldInput from "../forms/inputs/FormFieldInput";
import { changePassword } from "@/lib/queries/users";

export default function ProfileInfo() {
  const { user } = useUserStore();
  const { isLoading, startLoading, finishLoading } = useLoading();
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = (e) => {
    setForm({
      password: "",
      newPassword: "",
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    startLoading();
    try {
      await changePassword(form);
      resetForm();
      setError("");
    } catch (error) {
      if (error.response) {
        setError(error.response?.data?.message || "Error to change Password");
      } else {
        setError(error.message || "Unknown error");
      }
    } finally {
      finishLoading();
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl">Profile Information</h1>
      <form
        onSubmit={handleChangePassword}
        className="flex flex-col gap-4 max-w-[300px]"
      >
        <span>Name: {user?.name}</span>
        <span>Email: {user?.email}</span>
        <p>
          Roles:{" "}
          {user?.roles?.map((role, index) => (
            <span key={index}>{role.name},</span>
          ))}
        </p>
        <div>
          <FormFieldInput
            label="Password:"
            type="password"
            name="password"
            placeholder="********"
            id="profile-password"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            isPassword
          />
          <FormFieldInput
            label="New Password:"
            type="password"
            name="newPassword"
            placeholder="********"
            id="profile-new-password"
            value={form.newPassword}
            onChange={handleChange}
            disabled={isLoading}
            isPassword
          />
        </div>
        <button
          type="submit"
          className={`${
            isLoading
              ? "pointer-events-none opacity-50"
              : "cursor-pointer hover:bg-red-600"
          }  bg-red-500 text-white py-3 rounded-full transition-all duration-500`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Update password"}
        </button>
        {<p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}
